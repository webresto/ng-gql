import {Inject, Injectable} from '@angular/core';
import {isValue} from '@axrl/common';
import Puzzle from 'crypto-puzzle';
import {
  BehaviorSubject,
  Observable,
  catchError,
  exhaustMap,
  map,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import {
  CaptchaJob,
  CaptchaTask,
  InputLocation,
  LoginPayload,
  OTPRequestPayload,
  OTPResponse,
  RegistrationPayload,
  RestorePasswordPayload,
  USER_FRAGMENTS,
  USER_LOCATION_FRAGMENTS,
  USER_ORDER_HYSTORY_FRAGMENTS,
  UpdateUserDataPayload,
  User,
  UserLocation,
  UserLocationResponse,
  UserOrderHystory,
  UserResponse,
  ValuesOrBoolean,
} from '../models';
import {NgGqlStoreService} from './ng-gql-storage.service';
import {NgGqlUserBusService} from './ng-gql-user-bus.service';
import {RequestService} from './request.service';

@Injectable()
export class NgGqlUserService {
  constructor(
    private requestService: RequestService,
    private ngGqlStorage: NgGqlStoreService,
    private _userBus: NgGqlUserBusService,
    @Inject(USER_ORDER_HYSTORY_FRAGMENTS)
    private defaultUserOrderHystoryFragments: ValuesOrBoolean<UserOrderHystory>,
    @Inject(USER_FRAGMENTS)
    private defaultUserFragments: ValuesOrBoolean<User>,
    @Inject(USER_LOCATION_FRAGMENTS)
    private defaultuserLocationFragments: ValuesOrBoolean<UserLocation>,
  ) {}

  private _loadUser$(): Observable<User | null> {
    return this.requestService
      .queryAndSubscribe('user', 'user', this.defaultUserFragments, 'id')
      .pipe(
        map(result => {
          console.log(result);
          return result[0] ?? null;
        }),
      );
  }

  updateStorageUser(newUser: User | null): void {
    this.ngGqlStorage.updateUser(newUser);
  }

  loadUserOrderHistory$(options: {skip: number; limit: number}): Observable<UserOrderHystory[]> {
    return this.ngGqlStorage.token.pipe(
      switchMap(token =>
        this.ngGqlStorage.orderHystory.pipe(
          exhaustMap(hystory => {
            if (isValue(token)) {
              if (hystory.length >= options.skip + options.limit) {
                return of(hystory.slice(0, options.skip + options.limit));
              } else {
                return this.requestService
                  .customQuery$<
                    UserOrderHystory,
                    'userOrderHistory',
                    {
                      skip: number;
                      limit: number;
                    }
                  >('userOrderHistory', this.defaultUserOrderHystoryFragments, {
                    skip: options.skip,
                    limit: options.limit,
                  })
                  .pipe(
                    switchMap(data => {
                      const result = Array.isArray(data.userOrderHistory)
                        ? data.userOrderHistory
                        : [data.userOrderHistory];
                      this.ngGqlStorage.updateOrderHystory(result);
                      return this.ngGqlStorage.orderHystory;
                    }),
                  );
              }
            } else {
              return of([]);
            }
          }),
        ),
      ),
    );
  }

  private _getUserLocations(options: {
    skip: number;
    limit: number;
  }): Observable<UserLocationResponse> {
    return this.requestService
      .customQuery$<number, 'userLocationCount', {criteria: {}}>('userLocationCount', 1, {
        criteria: {},
      })
      .pipe(
        switchMap(data => {
          const userLocationCount = Array.isArray(data.userLocationCount)
            ? data.userLocationCount[0]
            : data.userLocationCount;
          return this.requestService
            .customQuery$('userLocation', this.defaultuserLocationFragments, options)
            .pipe(
              map(data => {
                const userLocation = Array.isArray(data.userLocation)
                  ? data.userLocation
                  : [data.userLocation];
                const result = {
                  userLocationCount,
                  userLocation,
                };
                this.ngGqlStorage.updateUserLocations(result);
                return result;
              }),
            );
        }),
      );
  }

  getUserLocations$(
    options: {
      skip: number;
      limit: number;
    },
    update: boolean = false,
  ): Observable<UserLocationResponse> {
    return this.ngGqlStorage.token.pipe(
      switchMap(token =>
        this.ngGqlStorage.userLocations.pipe(
          exhaustMap(data => {
            if (isValue(token)) {
              if (
                !update &&
                isValue(data) &&
                data.userLocation.length >= options.skip + options.limit
              ) {
                return of({
                  userLocationCount: data.userLocationCount,
                  userLocation: data.userLocation.slice(0, options.skip + options.limit),
                });
              } else {
                return this._getUserLocations(options);
              }
            } else {
              return of({
                userLocationCount: 0,
                userLocation: [],
              });
            }
          }),
        ),
      ),
    );
  }

  private readonly _user$ = this.ngGqlStorage.user.pipe(
    exhaustMap(user =>
      isValue(user)
        ? this.ngGqlStorage.user
        : this.getToken$().pipe(
            switchMap(token =>
              isValue(token)
                ? this._loadUser$().pipe(
                    switchMap(user => {
                      this.updateStorageUser(user);
                      return this.ngGqlStorage.user;
                    }),
                  )
                : this.ngGqlStorage.user,
            ),
          ),
    ),
    catchError(err => this.ngGqlStorage.user),
    shareReplay(1),
  );

  getUser$(): Observable<User | null> {
    return this._user$;
  }

  getToken$(): Observable<string | null> {
    return this.ngGqlStorage.token;
  }

  /** Добавляет блюдо в избранное */
  addDishFavor(dishId: string, loading?: BehaviorSubject<boolean>): Promise<boolean> {
    return this._userBus.emitToBus({
      type: 'AddDishFavor',
      payload: dishId,
      loading,
    });
  }

  /** Обновление данных о пользователе */
  updateUserData(
    data: UpdateUserDataPayload,
    loading?: BehaviorSubject<boolean>,
  ): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'UpdateUserData',
      payload: data,
      loading,
    });
  }

  captchaGetJob<T extends CaptchaTask>(
    label: string,
    loading?: BehaviorSubject<boolean>,
  ): Promise<CaptchaJob<T>> {
    return this._userBus.emitToBus({
      type: 'captchaGetJob',
      payload: {label},
      loading,
    });
  }

  async getCaptchaSolution(task: CaptchaTask): Promise<bigint> {
    return await Puzzle.solve(task);
  }

  registrationApp(
    data: RegistrationPayload,
    loading?: BehaviorSubject<boolean>,
  ): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'registrationApp',
      payload: data,
      loading,
    });
  }

  otpRequest(data: OTPRequestPayload, loading?: BehaviorSubject<boolean>): Promise<OTPResponse> {
    return this._userBus.emitToBus({
      type: 'OTPRequest',
      payload: data,
      loading,
    });
  }

  login(data: LoginPayload, loading?: BehaviorSubject<boolean>): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'login',
      payload: data,
      loading,
    });
  }

  restorePassword(
    data: RestorePasswordPayload,
    loading?: BehaviorSubject<boolean>,
  ): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'RestorePassword',
      payload: data,
      loading,
    });
  }

  async logout(loading?: BehaviorSubject<boolean>): Promise<Response> {
    const res = await this._userBus.emitToBus<'logout', null, Response>({
      type: 'logout',
      payload: null,
      loading,
    });

    this.ngGqlStorage.updateToken(null);
    this.ngGqlStorage.updateUser(null);

    return res;
  }

  async userDelete(otp: string, loading?: BehaviorSubject<boolean>): Promise<Response> {
    const res = await this._userBus.emitToBus<'userDelete', string, Response>({
      type: 'userDelete',
      payload: otp,
      loading,
    });

    this.ngGqlStorage.updateToken(null);
    this.ngGqlStorage.updateUser(null);

    return res;
  }

  /** Добавить адрес у пользователя */
  locationCreate(location: InputLocation, loading?: BehaviorSubject<boolean>): Promise<boolean> {
    return this._userBus.emitToBus<'locationCreate', InputLocation, boolean>({
      type: 'locationCreate',
      payload: location,
      loading,
    });
  }

  /** Удалить сохраненный у пользователя адрес */
  locationDelete(locationId: string, loading?: BehaviorSubject<boolean>): Promise<boolean> {
    return this._userBus.emitToBus<'locationDelete', string, boolean>({
      type: 'locationDelete',
      payload: locationId,
      loading,
    });
  }

  /** Установить адрес в качестве адреса по-умолчанию */
  locationSetIsDefault(locationId: string, loading?: BehaviorSubject<boolean>): Promise<boolean> {
    return this._userBus.emitToBus<'locationSetIsDefault', string, boolean>({
      type: 'locationSetIsDefault',
      payload: locationId,
      loading,
    });
  }
}
