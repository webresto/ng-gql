import {EventEmitter, Inject, Injectable} from '@angular/core';
import {deepClone, isValue} from '@axrl/common';
import {BehaviorSubject, Observable, catchError, concatMap, map, of, switchMap} from 'rxjs';
import {
  ACTION_FRAGMENTS,
  Action,
  CAPTCHA_GET_JOB_FRAGMENTS,
  CaptchaJob,
  CaptchaJobPayload,
  CaptchaTask,
  InputLocation,
  LoginPayload,
  MESSAGE_FRAGMENTS,
  Message,
  OTPRequestPayload,
  OTPResponse,
  OTP_RESPONSE_FRAGMENTS,
  RegistrationPayload,
  Response,
  RestorePasswordPayload,
  USER_FRAGMENTS,
  UpdateUserDataPayload,
  User,
  UserResponse,
  ValuesOrBoolean,
} from '../models';
import {NgGqlStoreService} from './ng-gql-storage.service';
import {RequestService} from './request.service';

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
  | 'locationSetIsDefault';

/** @private */
type UserBusEventMixin<
  T extends UserBusEventType = UserBusEventType,
  P extends unknown = unknown,
  R extends unknown = unknown,
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
  | UserBusEventMixin<'locationSetIsDefault', string, boolean>
);

/**
 * Отсюда выполняются запросы к API через шину событий.
 * Сервис NgGqlUserService содержит методы для отправки событий каждого вида в отдельности,
 * используя для этого единственный универсальный метод сервиса NgGqlUserBusService.
 */

@Injectable()
export class NgGqlUserBusService {
  private _userBus = new EventEmitter<UserBusEvent>();

  readonly userBus$ = this._userBus.asObservable().pipe(
    switchMap(event => {
      return this._userServiceReducer(event).pipe(
        concatMap(result => {
          setTimeout(() => {
            const successCb = <
              (result: CaptchaJob<any> | Response | UserResponse | OTPResponse | boolean) => void
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
        }),
      );
    }),
  );

  constructor(
    private _requestService: RequestService,
    private _storage: NgGqlStoreService,
    @Inject(ACTION_FRAGMENTS)
    private _defaultActionFragments: ValuesOrBoolean<Action>,
    @Inject(MESSAGE_FRAGMENTS)
    private _defaultMessageFragments: ValuesOrBoolean<Message>,
    @Inject(CAPTCHA_GET_JOB_FRAGMENTS)
    private _defaultCaptchaGetJobFragments: ValuesOrBoolean<User>,
    @Inject(USER_FRAGMENTS)
    private _defaultUserFragments: ValuesOrBoolean<User>,
    @Inject(OTP_RESPONSE_FRAGMENTS)
    private _defaultOTPResponceFragments: ValuesOrBoolean<OTPResponse>,
  ) {}

  emitToBus<T extends UserBusEventType, P extends UserBusEvent['payload'], R>(data: {
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

  private _userServiceReducer(
    busEvent: UserBusEvent,
  ): Observable<Parameters<UserBusEvent['successCb']>[0]> {
    switch (busEvent.type) {
      case 'OTPRequest':
        return this._otpRequest$(busEvent.payload);
      case 'login':
        return this._login$(busEvent.payload);
      case 'captchaGetJob':
        return this._captchaGetJob$(busEvent.payload);
      case 'registrationApp':
        return this._registrationApp$(busEvent.payload);
      case 'RestorePassword':
        return this._restorePassword$(busEvent.payload);
      case 'AddDishFavor':
        return this._addDishFavor$(busEvent.payload);
      case 'UpdateUserData':
        return this._updateUserData$(busEvent.payload);
      case 'logout':
        return this._logout$();
      case 'userDelete':
        return this._userDelete$(busEvent.payload);
      case 'locationCreate':
        return this._locationCreate$(busEvent.payload);
      case 'locationDelete':
        return this._locationDelete$(busEvent.payload);
      case 'locationSetIsDefault':
        return this._locationSetIsDefault$(busEvent.payload);
    }
  }

  private _captchaGetJob$<T extends CaptchaTask>(
    data: CaptchaJobPayload,
  ): Observable<CaptchaJob<T>> {
    return this._requestService
      .customQuery$<CaptchaJob<T>, 'captchaGetJob', CaptchaJobPayload>(
        'captchaGetJob',
        this._defaultCaptchaGetJobFragments,
        data,
      )
      .pipe(
        map(data => {
          const job: CaptchaJob<T> = deepClone(
            Array.isArray(data.captchaGetJob) ? data.captchaGetJob[0] : data.captchaGetJob,
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
        }),
      );
  }

  /** Обновление данных пользователя (профиль) */
  private _updateUserData$(data: UpdateUserDataPayload): Observable<UserResponse> {
    return this._requestService
      .customMutation$<UserResponse, 'userUpdate', {user: UpdateUserDataPayload}>(
        'userUpdate',
        {
          user: this._defaultUserFragments,
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        {
          user: data,
        },
        {
          fieldsTypeMap: new Map([['user', 'InputUser!']]),
        },
      )
      .pipe(
        map(record => {
          const userResponse = record.userUpdate;
          if (isValue(userResponse.action)) {
            const token = userResponse.action.data?.token;
            setTimeout(() => {
              this._storage.updateToken(token ?? null);
            }, 100);
          }
          if (isValue(userResponse.user)) {
            this._storage.updateUser(record.userUpdate.user);
          }
          return record.userUpdate;
        }),
      );
  }

  /** Добавляет блюдо в избранное */
  private _addDishFavor$(dishId: string): Observable<boolean> {
    return this._requestService
      .customMutation$<boolean, 'favoriteDish'>('favoriteDish', true, {
        dishId,
      })
      .pipe(map(record => record.favoriteDish));
  }

  private _restorePassword$(data: RestorePasswordPayload): Observable<UserResponse> {
    return this._requestService
      .customMutation$<UserResponse, 'restorePassword', RestorePasswordPayload>(
        'restorePassword',
        {
          user: this._defaultUserFragments,
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        data,
        {
          requiredFields: ['login', 'otp', 'password'],
          fieldsTypeMap: new Map([['captcha', 'Captcha!']]),
        },
      )
      .pipe(map(record => record.restorePassword));
  }

  private _login$(data: LoginPayload): Observable<UserResponse> {
    return this._requestService
      .customMutation$<UserResponse, 'login', LoginPayload>(
        'login',
        {
          user: this._defaultUserFragments,
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        data,
        {
          requiredFields: ['login', 'otp'],
          fieldsTypeMap: new Map([
            ['phone', 'InputPhone'],
            ['captcha', 'Captcha!'],
          ]),
        },
      )
      .pipe(
        map(record => {
          const userResponse = record.login;
          if (isValue(userResponse.action)) {
            const token = userResponse.action.data?.token;
            setTimeout(() => {
              this._storage.updateToken(token ?? null);
            }, 100);
          }
          if (isValue(userResponse.user)) {
            this._storage.updateUser(record.login.user);
          }
          return record.login;
        }),
      );
  }

  private _otpRequest$(data: OTPRequestPayload): Observable<OTPResponse> {
    return this._requestService
      .customMutation$<OTPResponse, 'OTPRequest', OTPRequestPayload>(
        'OTPRequest',
        this._defaultOTPResponceFragments,
        data,
        {
          requiredFields: ['login'],
          fieldsTypeMap: new Map([['captcha', 'Captcha!']]),
        },
      )
      .pipe(map(record => record.OTPRequest));
  }

  private _registrationApp$(data: RegistrationPayload): Observable<UserResponse> {
    return this._requestService
      .customMutation$<UserResponse, 'registration', RegistrationPayload>(
        'registration',
        {
          user: this._defaultUserFragments,
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        data,
        {
          requiredFields: ['login', 'otp'],
          fieldsTypeMap: new Map([
            ['phone', 'InputPhone'],
            ['captcha', 'Captcha!'],
          ]),
        },
      )
      .pipe(map(record => record.registration));
  }

  private _logout$(): Observable<Response> {
    return this._requestService
      .customMutation$(
        'logout',
        {
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        {},
      )
      .pipe(map(record => record.logout));
  }

  private _userDelete$(otp: string): Observable<Response> {
    return this._requestService
      .customMutation$(
        'userDelete',
        {
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        {otp},
        {requiredFields: ['otp']},
      )
      .pipe(map(record => record.userDelete));
  }

  private _locationCreate$(location: InputLocation): Observable<boolean> {
    return this._requestService
      .customMutation$<boolean, 'locationCreate', {location: InputLocation}>(
        'locationCreate',
        true,
        {location},
        {
          fieldsTypeMap: new Map([['location', 'InputLocation!']]),
        },
      )
      .pipe(map(record => record.locationCreate));
  }

  private _locationDelete$(locationId: string): Observable<boolean> {
    return this._requestService
      .customMutation$<boolean, 'locationDelete', {locationId: string}>(
        'locationDelete',
        true,
        {
          locationId,
        },
        {
          requiredFields: ['locationId'],
        },
      )
      .pipe(map(record => record.locationDelete));
  }

  private _locationSetIsDefault$(locationId: string): Observable<boolean> {
    return this._requestService
      .customMutation$<boolean, 'locationSetIsDefault', {locationId: string}>(
        'locationSetIsDefault',
        true,
        {
          locationId,
        },
        {
          requiredFields: ['locationId'],
        },
      )
      .pipe(map(record => record.locationSetIsDefault));
  }
}
