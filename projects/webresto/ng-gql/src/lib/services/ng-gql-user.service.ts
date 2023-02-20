import { Injectable, Inject, EventEmitter } from '@angular/core';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { NgGqlService } from './ng-gql.service';
import {
  User,
  Action,
  Message,
  ValuesOrBoolean,
  RegistrationUserResponse,
  OTPResponse,
  LoginPayload,
  RegistrationPayload,
  OTPRequestPayload,
  CaptchaJob,
  CaptchaJobPayload,
  NgGqlConfig,
  CaptchaTask,
} from '../models';
import {
  ACTION_FRAGMENTS,
  MESSAGE_FRAGMENTS,
  USER_FRAGMENTS,
  OTP_RESPONSE_FRAGMENTS,
  CAPTCHA_GET_JOB_FRAGMENTS,
} from '../injection-tokens';
import { BehaviorSubject, Subscription,  } from 'rxjs';
import { concatMap,switchMap, map, catchError, of } from 'rxjs';
import { deepClone, isValue } from '@axrl/common';
import Puzzle from 'crypto-puzzle';

type UserBusEvent = {
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;

  /** BehaviorSubject, отслеживающий состояние выполняемого действия. */
  loading?: BehaviorSubject<boolean>;
} & (
  | {
      type: 'captchaGetJob';
      payload: CaptchaJobPayload;
      successCb: (result: Record<'captchaGetJob', CaptchaJob<any>>) => void;
    }
  | {
      type: 'registration';
      payload: RegistrationPayload;
      successCb: (
        result: Record<'registration', RegistrationUserResponse>
      ) => void;
    }
  | {
      type: 'OTPRequest';
      payload: OTPRequestPayload;
      successCb: (result: Record<'OTPRequest', OTPResponse>) => void;
    }
  | {
      type: 'login';
      payload: LoginPayload;
      successCb: (result: Record<'login', RegistrationUserResponse>) => void;
    }
);

@Injectable({
  providedIn: 'root',
})
export class NgGqlUserService {
  constructor(
    private ngGqlService: NgGqlService,
    private ngGqlStorage: NgGqlStorageService,
    @Inject('config') private config: NgGqlConfig,

    @Inject(ACTION_FRAGMENTS)
    private defaultActionFragments: ValuesOrBoolean<Action>,
    @Inject(MESSAGE_FRAGMENTS)
    private defaultMessageFragments: ValuesOrBoolean<Message>,
    @Inject(CAPTCHA_GET_JOB_FRAGMENTS)
    private defaultCaptchaGetJobFragments: ValuesOrBoolean<User>,

    @Inject(USER_FRAGMENTS) private defaultUserFragments: ValuesOrBoolean<User>,
    @Inject(OTP_RESPONSE_FRAGMENTS)
    private defaultOTPResponceFragments: ValuesOrBoolean<OTPResponse>
  ) {}

  private _registration(data: RegistrationPayload) {
    return this.ngGqlService.customMutation$<
      RegistrationUserResponse,
      'registration',
      RegistrationPayload
    >(
      'registration',
      {
        user: this.defaultUserFragments,
        message: this.defaultMessageFragments,
        action: this.defaultActionFragments,
      },
      data,
      {
        requiredFields: ['login', 'otp'],
        fieldsTypeMap: new Map([
          ['phone', 'InputPhone!'],
          ['captcha', 'Captcha!'],
        ]),
      }
    );
  }

  registration(
    data: RegistrationPayload,
    successCb: (
      result: Record<'registration', RegistrationUserResponse>
    ) => void
  ): void {
    console.log(data);
    this._userBus.emit({
      type: 'registration',
      payload: data,
      successCb,
    });
  }

  private _otpRequest(data: OTPRequestPayload) {
    return this.ngGqlService.customMutation$<
      OTPResponse,
      'OTPRequest',
      OTPRequestPayload
    >('OTPRequest', this.defaultOTPResponceFragments, data, {
      requiredFields: ['login'],
      fieldsTypeMap: new Map([
        ['captcha', 'Captcha!'],
      ]),
    });
  }
  otpRequest(
    data: OTPRequestPayload,
    successCb: (result: Record<'OTPRequest', OTPResponse>) => void
  ): void {
    this._userBus.emit({
      type: 'OTPRequest',
      payload: data,
      successCb,
    });
  }

  private _login(data: LoginPayload) {
    return this.ngGqlService.customMutation$<
      RegistrationUserResponse,
      'login',
      LoginPayload
    >(
      'login',
      {
        user: this.defaultUserFragments,
        message: this.defaultMessageFragments,
        action: this.defaultActionFragments,
      },
      data,
      {
        requiredFields: ['login', 'deviceName'],
        fieldsTypeMap: new Map([
          ['captcha', 'Captcha!'],
        ]),
      }
    );
  }

  login(
    data: LoginPayload,
    successCb: (result: Record<'login', RegistrationUserResponse>) => void
  ): void {
    this._userBus.emit({
      type: 'login',
      payload: data,
      successCb,
    });
  }

  getUser(userId: string) {
    return this.ngGqlService
      .queryAndSubscribe('user', 'user', this.defaultUserFragments, 'id', {
        query: { userId },
        subscribe: { userId },
      })
      .pipe(
        map((result) => {
          this.ngGqlStorage.updateUser(result[0]);
          return result;
        })
      );
  }

  private _captchaGetJob<T extends CaptchaTask>(data: CaptchaJobPayload) {
    return this.ngGqlService
      .customQuery$<CaptchaJob<T>, 'captchaGetJob', CaptchaJobPayload>(
        'captchaGetJob',
        this.defaultCaptchaGetJobFragments,
        data
      )
      .pipe(
        map((data) => {
          const job: CaptchaJob<T> = deepClone(
            Array.isArray(data.captchaGetJob)
              ? data.captchaGetJob[0]
              : data.captchaGetJob
          );
          if (typeof job.task === 'string') {
            try {
              job.task = JSON.parse(job.task);
            } catch (err) {
              console.log(err);
            }
          }
          return {
            ['captchaGetJob']: job,
          };
        })
      );
  }

  captchaGetJob<T extends CaptchaTask>(
    label: string,
    successCb: (result: Record<'captchaGetJob', CaptchaJob<T>>) => void
  ): void {
    this._userBus.emit({
      type: 'captchaGetJob',
      payload: { label },
      successCb,
    });
  }

  getCaptchaSolution(task: CaptchaTask) {
    return Puzzle.solve(task);
  }

  private _userBus = new EventEmitter<UserBusEvent>();

  private userHttpBus$ = this._userBus.asObservable().pipe(
    switchMap((event) => {
      const reducer = (busEvent: UserBusEvent) => {
        switch (busEvent.type) {
          case 'OTPRequest':
            return this._otpRequest(busEvent.payload).pipe(
              map((result) => {
                if (isValue(event.loading)) {
                  event.loading.next(false);
                }
                setTimeout(() => {
                  busEvent.successCb(result);
                }, 100);
              })
            );
          case 'login':
            return this._login(busEvent.payload).pipe(
              map((result) => {
                if (isValue(event.loading)) {
                  event.loading.next(false);
                }
                setTimeout(() => {
                  busEvent.successCb(result);
                }, 100);
              })
            );
          case 'registration':
            return this._registration(busEvent.payload).pipe(
              map((result) => {
                if (isValue(event.loading)) {
                  event.loading.next(false);
                }
                setTimeout(() => {
                  busEvent.successCb(result);
                }, 100);
              })
            );
          case 'captchaGetJob':
            return this._captchaGetJob(busEvent.payload).pipe(
              map((result) => {
                if (isValue(event.loading)) {
                  event.loading.next(false);
                }
                setTimeout(() => {
                  busEvent.successCb(result);
                }, 100);
              })
            );
        }
      };
      return reducer(event).pipe(
        catchError((err: unknown) => {
          if (isValue(event.loading)) {
            event.loading.next(false);
          }
          if (event.errorCb) {
            event.errorCb(err);
          }
          if (this.config.debugMode) {
            alert(JSON.stringify(err));
          }
          console.log(err);
          return of(() => {});
        })
      );
    })
  );

  private _userBusSubscription$: Subscription = this.userHttpBus$.subscribe({
    next: () => {},
    error: () => {},
    complete: () => this._userBusSubscription$.unsubscribe(),
  });
}
