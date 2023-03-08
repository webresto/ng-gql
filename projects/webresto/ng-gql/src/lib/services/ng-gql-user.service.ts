import { Injectable, Inject, EventEmitter } from '@angular/core';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { NgGqlService } from './ng-gql.service';
import {
  User,
  Action,
  Message,
  ValuesOrBoolean,
  UserResponse,
  OTPResponse,
  LoginPayload,
  OTPRequestPayload,
  CaptchaJob,
  CaptchaJobPayload,
  CaptchaTask,
} from '../models';
import {
  ACTION_FRAGMENTS,
  MESSAGE_FRAGMENTS,
  USER_FRAGMENTS,
  OTP_RESPONSE_FRAGMENTS,
  CAPTCHA_GET_JOB_FRAGMENTS,
} from '../injection-tokens';
import type { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, of, switchMap } from 'rxjs';
import { deepClone, isValue } from '@axrl/common';
import Puzzle from 'crypto-puzzle';

type UserBusEvent = {
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb: (err: unknown) => void;

  /** BehaviorSubject, отслеживающий состояние выполняемого действия. */
  loading?: BehaviorSubject<boolean>;
} & (
  | {
      type: 'captchaGetJob';
      payload: CaptchaJobPayload;
      successCb: (result: CaptchaJob<any>) => void;
    }
  | {
      type: 'OTPRequest';
      payload: OTPRequestPayload;
      successCb: (result: OTPResponse) => void;
    }
  | {
      type: 'login';
      payload: LoginPayload;
      successCb: (result: UserResponse) => void;
    }
);

@Injectable({
  providedIn: 'root',
})
export class NgGqlUserService {
  constructor(
    private ngGqlService: NgGqlService,
    private ngGqlStorage: NgGqlStorageService,
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

  otpRequest$(data: OTPRequestPayload) {
    return this.ngGqlService
      .customMutation$<OTPResponse, 'OTPRequest', OTPRequestPayload>(
        'OTPRequest',
        this.defaultOTPResponceFragments,
        data,
        {
          requiredFields: ['login'],
          fieldsTypeMap: new Map([['captcha', 'Captcha!']]),
        }
      )
      .pipe(map((record) => record.OTPRequest));
  }

  otpRequest(
    data: OTPRequestPayload,
    loading?: BehaviorSubject<boolean>
  ): Promise<OTPResponse> {
    if (isValue(loading)) {
      loading.next(true);
    }
    return new Promise<OTPResponse>((resolve, reject) => {
      this._userBus.emit({
        type: 'OTPRequest',
        payload: data,
        loading,
        successCb: (res) => resolve(res),
        errorCb: (err) => reject(err),
      });
    });
  }

  login$(data: LoginPayload) {
    return this.ngGqlService
      .customMutation$<UserResponse, 'login', LoginPayload>(
        'login',
        {
          user: this.defaultUserFragments,
          message: this.defaultMessageFragments,
          action: this.defaultActionFragments,
        },
        data,
        {
          requiredFields: ['login', 'otp'],
          fieldsTypeMap: new Map([
            ['phone', 'InputPhone'],
            ['captcha', 'Captcha!'],
          ]),
        }
      )
      .pipe(map((record) => record.login));
  }

  login(
    data: LoginPayload,
    loading?: BehaviorSubject<boolean>
  ): Promise<UserResponse> {
    if (isValue(loading)) {
      loading.next(true);
    }
    return new Promise<UserResponse>((resolve, reject) => {
      this._userBus.emit({
        type: 'login',
        payload: data,
        loading,
        successCb: (res) => resolve(res),
        errorCb: (err) => reject(err),
      });
    });
  }

  getUser$(userId: string) {
    return this.ngGqlService
      .queryAndSubscribe('user', 'user', this.defaultUserFragments, 'id', {
        query: { userId },
      })
      .pipe(
        map((result) => {
          this.ngGqlStorage.updateUser(result[0]);
          return result;
        })
      );
  }

  captchaGetJob$<T extends CaptchaTask>(data: CaptchaJobPayload) {
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
              const difficulty = job.task.difficulty;
              job.task.difficulty = BigInt(String(difficulty).replace('n', ''));
            } catch (err) {
              console.log(err);
              return job;
            }
          }
          return job;
        })
      );
  }

  captchaGetJob<T extends CaptchaTask>(
    label: string,
    loading?: BehaviorSubject<boolean>
  ): Promise<CaptchaJob<T>> {
    if (isValue(loading)) {
      loading.next(true);
    }
    return new Promise<CaptchaJob<T>>((resolve, reject) => {
      this._userBus.emit({
        type: 'captchaGetJob',
        payload: { label },
        loading,
        successCb: (res) => resolve(res),
        errorCb: (err) => reject(err),
      });
    });
  }

  async getCaptchaSolution(task: CaptchaTask) {
    return await Puzzle.solve(task);
  }

  private _userBus = new EventEmitter<UserBusEvent>();

  private userReducer(
    busEvent: UserBusEvent
  ): Observable<Parameters<UserBusEvent['successCb']>[0]> {
    switch (busEvent.type) {
      case 'OTPRequest':
        return this.otpRequest$(busEvent.payload);
      case 'login':
        return this.login$(busEvent.payload);
      case 'captchaGetJob':
        return this.captchaGetJob$(busEvent.payload);
    }
  }

  userBus$ = this._userBus.asObservable().pipe(
    switchMap((event) => {
      return this.userReducer(event).pipe(
        map((result) => {
          setTimeout(() => {
            const successCb = <
              (result: CaptchaJob<any> | UserResponse | OTPResponse) => void
            >event.successCb;
            successCb(result);

            if (isValue(event.loading)) {
              event.loading.next(false);
            }
          }, 1);
        }),
        catchError((err: unknown) => {
          if (isValue(event.loading)) {
            event.loading.next(false);
          }
          event.errorCb(err);
          console.log(err);
          return of(() => {});
        })
      );
    })
  );
}
