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
  RegistrationPayload,
  OTPRequestPayload,
  CaptchaJob,
  CaptchaJobPayload,
  CaptchaTask,
  RestorePasswordPayload,
  UpdateUserDataPayload,
  InputLocation,
  Response,
} from '../models';
import {
  ACTION_FRAGMENTS,
  MESSAGE_FRAGMENTS,
  USER_FRAGMENTS,
  OTP_RESPONSE_FRAGMENTS,
  CAPTCHA_GET_JOB_FRAGMENTS,
} from '../injection-tokens';
import { BehaviorSubject, concatMap, Observable } from 'rxjs';
import { map, catchError, of, switchMap } from 'rxjs';
import { deepClone, isValue } from '@axrl/common';

export type UserBusEventType =
  | 'OTPRequest'
  | 'login'
  | 'UpdateUserData'
  | 'RestorePassword'
  | 'AddDishFavor'
  | 'captchaGetJob'
  | 'registrationApp'
  | 'logout'
  | 'userDelete'
  | 'locationCreate'
  | 'locationDelete'
  | 'locationSetDefault';

type UserBusEventMixin<
  T extends UserBusEventType = UserBusEventType,
  P extends unknown = unknown,
  R extends unknown = unknown
> = {
  type: T;
  payload: P;
  successCb: (result: R) => void;
};

export type UserBusEvent = {
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb: (err: unknown) => void;
  /** BehaviorSubject, отслеживающий состояние выполняемого действия. */
  loading?: BehaviorSubject<boolean>;
} & (
  | UserBusEventMixin<'captchaGetJob', CaptchaJobPayload, CaptchaJob<any>>
  | UserBusEventMixin<'registrationApp', RegistrationPayload, UserResponse>
  | UserBusEventMixin<'OTPRequest', OTPRequestPayload, OTPResponse>
  | UserBusEventMixin<'login', LoginPayload, UserResponse>
  | UserBusEventMixin<'UpdateUserData', UpdateUserDataPayload, UserResponse>
  | UserBusEventMixin<'RestorePassword', RestorePasswordPayload, UserResponse>
  | UserBusEventMixin<'AddDishFavor', string, boolean>
  | UserBusEventMixin<'logout', null, Response>
  | UserBusEventMixin<'userDelete', string, Response>
  | UserBusEventMixin<'locationCreate', InputLocation, boolean>
  | UserBusEventMixin<'locationDelete', string, boolean>
  | UserBusEventMixin<'locationSetDefault', string, boolean>
);

/**
 * Отсюда выполняются запросы к API через шину событий.
 * Сервис NgGqlUserService содержит методы для отправки событий каждого вида в отдельности,
 * используя для этого единственный универсальный метод сервиса NgGqlUserBusService.
 */

@Injectable()
export class NgGqlUserBusService {
  constructor(
    private ngGqlService: NgGqlService,
    private ngGqlStorage: NgGqlStorageService,
    @Inject(ACTION_FRAGMENTS)
    private defaultActionFragments: ValuesOrBoolean<Action>,
    @Inject(MESSAGE_FRAGMENTS)
    private defaultMessageFragments: ValuesOrBoolean<Message>,
    @Inject(CAPTCHA_GET_JOB_FRAGMENTS)
    private defaultCaptchaGetJobFragments: ValuesOrBoolean<User>,
    @Inject(USER_FRAGMENTS)
    private defaultUserFragments: ValuesOrBoolean<User>,
    @Inject(OTP_RESPONSE_FRAGMENTS)
    private defaultOTPResponceFragments: ValuesOrBoolean<OTPResponse>
  ) {}

  private _userBus = new EventEmitter<UserBusEvent>();

  emitToBus<
    T extends UserBusEventType,
    P extends UserBusEvent['payload'],
    R
  >(data: {
    type: T;
    payload: P;
    loading?: BehaviorSubject<boolean>;
  }): Promise<R> {
    if (isValue(data.loading)) {
      data.loading.next(true);
    }
    return new Promise<R>((resolve, reject) => {
      this._userBus.emit(<UserBusEvent>{
        type: data.type,
        payload: data.payload,
        loading: data.loading,
        successCb: (res: R) => resolve(res),
        errorCb: (err: unknown) => reject(err),
      });
    });
  }

  private userServiceReducer(
    busEvent: UserBusEvent
  ): Observable<Parameters<UserBusEvent['successCb']>[0]> {
    switch (busEvent.type) {
      case 'OTPRequest':
        return this.otpRequest$(busEvent.payload);
      case 'login':
        return this.login$(busEvent.payload);
      case 'captchaGetJob':
        return this.captchaGetJob$(busEvent.payload);
      case 'registrationApp':
        return this.registrationApp$(busEvent.payload);
      case 'RestorePassword':
        return this.restorePassword$(busEvent.payload);
      case 'AddDishFavor':
        return this.addDishFavor$(busEvent.payload);
      case 'UpdateUserData':
        return this.updateUserData$(busEvent.payload);
      case 'logout':
        return this.logout$();
      case 'userDelete':
        return this.userDelete$(busEvent.payload);
      case 'locationCreate':
        return this.locationCreate$(busEvent.payload);
      case 'locationDelete':
        return this.locationDelete$(busEvent.payload);
      case 'locationSetDefault':
        return this.locationSetDefault$(busEvent.payload);
    }
  }

  readonly userBus$ = this._userBus.asObservable().pipe(
    switchMap((event) => {
      return this.userServiceReducer(event).pipe(
        concatMap((result) => {
          setTimeout(() => {
            const successCb = <
              (
                result:
                  | CaptchaJob<any>
                  | Response
                  | UserResponse
                  | OTPResponse
                  | boolean
              ) => void
            >event.successCb;
            successCb(result);

            if (isValue(event.loading)) {
              event.loading.next(false);
            }
          }, 1);
          return of(() => {});
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

  private captchaGetJob$<T extends CaptchaTask>(
    data: CaptchaJobPayload
  ): Observable<CaptchaJob<T>> {
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

  /** Обновление данных пользователя (профиль) */
  private updateUserData$(
    data: UpdateUserDataPayload
  ): Observable<UserResponse> {
    return this.ngGqlService
      .customMutation$<
        UserResponse,
        'userUpdate',
        { user: UpdateUserDataPayload }
      >(
        'userUpdate',
        {
          user: this.defaultUserFragments,
          message: this.defaultMessageFragments,
          action: this.defaultActionFragments,
        },
        {
          user: data,
        },
        {
          fieldsTypeMap: new Map([['user', 'InputUser!']]),
        }
      )
      .pipe(
        map((record) => {
          const userResponse = record.userUpdate;
          if (isValue(userResponse.action)) {
            const token = userResponse.action.data?.token;
            setTimeout(() => {
              this.ngGqlStorage.updateToken(token ?? null);
            }, 100);
          }
          if (isValue(userResponse.user)) {
            this.ngGqlStorage.updateUser(record.userUpdate.user);
          }
          return record.userUpdate;
        })
      );
  }

  /** Добавляет блюдо в избранное */
  private addDishFavor$(dishId: string): Observable<boolean> {
    return this.ngGqlService
      .customMutation$<boolean, 'favoriteDish'>('favoriteDish', true, {
        dishId,
      })
      .pipe(map((record) => record.favoriteDish));
  }

  private restorePassword$(
    data: RestorePasswordPayload
  ): Observable<UserResponse> {
    return this.ngGqlService
      .customMutation$<UserResponse, 'restorePassword', RestorePasswordPayload>(
        'restorePassword',
        {
          user: this.defaultUserFragments,
          message: this.defaultMessageFragments,
          action: this.defaultActionFragments,
        },
        data,
        {
          requiredFields: ['login', 'otp', 'password'],
          fieldsTypeMap: new Map([['captcha', 'Captcha!']]),
        }
      )
      .pipe(map((record) => record.restorePassword));
  }

  private login$(data: LoginPayload): Observable<UserResponse> {
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
      .pipe(
        map((record) => {
          const userResponse = record.login;
          if (isValue(userResponse.action)) {
            const token = userResponse.action.data?.token;
            setTimeout(() => {
              this.ngGqlStorage.updateToken(token ?? null);
            }, 100);
          }
          if (isValue(userResponse.user)) {
            this.ngGqlStorage.updateUser(record.login.user);
          }
          return record.login;
        })
      );
  }

  private otpRequest$(data: OTPRequestPayload): Observable<OTPResponse> {
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

  private registrationApp$(
    data: RegistrationPayload
  ): Observable<UserResponse> {
    return this.ngGqlService
      .customMutation$<UserResponse, 'registration', RegistrationPayload>(
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
            ['phone', 'InputPhone'],
            ['captcha', 'Captcha!'],
          ]),
        }
      )
      .pipe(map((record) => record.registration));
  }

  private logout$(): Observable<Response> {
    return this.ngGqlService
      .customMutation$(
        'logout',
        {
          message: this.defaultMessageFragments,
          action: this.defaultActionFragments,
        },
        {}
      )
      .pipe(map((record) => record.logout));
  }

  private userDelete$(otp: string): Observable<Response> {
    return this.ngGqlService
      .customMutation$(
        'userDelete',
        {
          message: this.defaultMessageFragments,
          action: this.defaultActionFragments,
        },
        { otp },
        { requiredFields: ['otp'] }
      )
      .pipe(map((record) => record.userDelete));
  }

  private locationCreate$(location: InputLocation): Observable<boolean> {
    return this.ngGqlService
      .customMutation$<boolean, 'locationCreate', { location: InputLocation }>(
        'locationCreate',
        true,
        { location },
        {
          fieldsTypeMap: new Map([['location', 'InputLocation!']]),
        }
      )
      .pipe(map((record) => record.locationCreate));
  }

  private locationDelete$(locationId: string): Observable<boolean> {
    return this.ngGqlService
      .customMutation$<boolean, 'locationDelete', { locationId: string }>(
        'locationDelete',
        true,
        {
          locationId,
        },
        {
          requiredFields: ['locationId'],
        }
      )
      .pipe(map((record) => record.locationDelete));
  }

  private locationSetDefault$(locationId: string): Observable<boolean> {
    return this.ngGqlService
      .customMutation$<boolean, 'locationSetDefault', { locationId: string }>(
        'locationSetDefault',
        true,
        {
          locationId,
        },
        {
          requiredFields: ['locationId'],
        }
      )
      .pipe(map((record) => record.locationSetDefault));
  }
}
