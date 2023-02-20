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
import type { BehaviorSubject, Subscription } from 'rxjs';
import { concatMap, map, catchError, of } from 'rxjs';
import { isValue } from '@axrl/common';
import Puzzle from 'crypto-puzzle';

type UserBusEvent = {
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;

  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading?: BehaviorSubject<boolean>;
} & (
  | {
      type: 'captchaGetJob';
      payload: CaptchaJobPayload;
      successCb?: (result: Record<'captchaGetJob', CaptchaJob>) => void;
    }
  | {
      type: 'registration';
      payload: RegistrationPayload;
      successCb?: (
        result: Record<'registration', RegistrationUserResponse>
      ) => void;
    }
  | {
      type: 'OTPRequest';
      payload: OTPRequestPayload;
      successCb?: (result: Record<'OTPRequest', OTPResponse>) => void;
    }
  | {
      type: 'login';
      payload: LoginPayload;
      successCb?: (result: Record<'login', RegistrationUserResponse>) => void;
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
        requiredFields: ['login', 'otp', 'firstName', 'captcha'],
      }
    );
  }

  registration(
    data: RegistrationPayload,
    successCb?: (
      result: Record<'registration', RegistrationUserResponse>
    ) => void
  ): void {
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
      requiredFields: ['login', 'captcha'],
    });
  }
  otpRequest(
    data: OTPRequestPayload,
    successCb?: (result: Record<'OTPRequest', OTPResponse>) => void
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
        requiredFields: ['login', 'deviceName', 'captcha'],
      }
    );
  }

  login(
    data: LoginPayload,
    successCb?: (result: Record<'login', RegistrationUserResponse>) => void
  ): void {
    this._userBus.emit({
      type: 'login',
      payload: data,
      successCb,
    });
  }

  getUser(userId: string) {
    return this.ngGqlService.queryAndSubscribe(
      'user',
      'user',
      this.defaultUserFragments,
      'id',
      {
        query: { userId },
        subscribe: { userId },
      }
    );
  }

  private _captchaGetJob(data: CaptchaJobPayload) {
    return this.ngGqlService
      .customQuery$<CaptchaJob, 'captchaGetJob', CaptchaJobPayload>(
        'captchaGetJob',
        this.defaultCaptchaGetJobFragments,
        data
      )
      .pipe(
        map((data) => {
          const job = Array.isArray(data.captchaGetJob)
            ? data.captchaGetJob[0]
            : data.captchaGetJob;
          const task = <string>(<unknown>job.task);
          job.task = <CaptchaTask>JSON.parse(task);
          return {
            ['captchaGetJob']: job,
          };
        })
      );
  }

  captchaGetJob(
    label: string,
    successCb?: (result: Record<'captchaGetJob', CaptchaJob>) => void
  ): void {
    this._userBus.emit({
      type: 'captchaGetJob',
      payload: { label },
      successCb,
    });
  }

  getCaptchaSolution(task:CaptchaTask) {
    return Puzzle.solve(task);
  }

  private _userBus = new EventEmitter<UserBusEvent>();

  private userHttpBus$ = this._userBus.asObservable().pipe(
    concatMap((event) => {
      const reducer = (busEvent: UserBusEvent) => {
        switch (busEvent.type) {
          case 'OTPRequest':
            return this._otpRequest(busEvent.payload).pipe(
              map((result) => {
                if (isValue(busEvent.loading)) {
                  busEvent.loading.next(false);
                }
                if (isValue(busEvent.successCb)) {
                  busEvent.successCb(result);
                }
              })
            );
          case 'login':
            return this._login(busEvent.payload).pipe(
              map((result) => {
                if (isValue(busEvent.loading)) {
                  busEvent.loading.next(false);
                }
                if (isValue(busEvent.successCb)) {
                  busEvent.successCb(result);
                }
              })
            );
          case 'registration':
            return this._registration(busEvent.payload).pipe(
              map((result) => {
                if (isValue(busEvent.loading)) {
                  busEvent.loading.next(false);
                }
                if (isValue(busEvent.successCb)) {
                  busEvent.successCb(result);
                }
              })
            );
          case 'captchaGetJob':
            return this._captchaGetJob(busEvent.payload).pipe(
              map((result) => {
                if (isValue(busEvent.loading)) {
                  busEvent.loading.next(false);
                }
                if (isValue(busEvent.successCb)) {
                  busEvent.successCb(result);
                }
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
