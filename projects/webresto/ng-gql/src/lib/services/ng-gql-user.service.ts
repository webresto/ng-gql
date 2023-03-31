import { Injectable, Inject } from '@angular/core';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { NgGqlService } from './ng-gql.service';
import {
  User,
  ValuesOrBoolean,
  UserResponse,
  OTPResponse,
  LoginPayload,
  RegistrationPayload,
  OTPRequestPayload,
  CaptchaJob,
  CaptchaTask,
  RestorePasswordPayload,
  UserOrderHystory,
  UpdateUserDataPayload,
  InputLocation,
} from '../models';
import {
  USER_FRAGMENTS,
  USER_ORDER_HYSTORY_FRAGMENTS,
} from '../injection-tokens';
import { BehaviorSubject, Observable, exhaustMap } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs';
import { isValue } from '@axrl/common';
import Puzzle from 'crypto-puzzle';
import { NgGqlUserBusService } from './ng-gql-user-bus.service';

@Injectable()
export class NgGqlUserService {
  constructor(
    private ngGqlService: NgGqlService,
    private ngGqlStorage: NgGqlStorageService,
    private _userBus: NgGqlUserBusService,
    @Inject(USER_ORDER_HYSTORY_FRAGMENTS)
    private defaultUserOrderHystoryFragments: ValuesOrBoolean<UserOrderHystory>,
    @Inject(USER_FRAGMENTS)
    private defaultUserFragments: ValuesOrBoolean<User>
  ) {}

  loadUser$(): Observable<User | null> {
    return this.ngGqlService
      .queryAndSubscribe('user', 'user', this.defaultUserFragments, 'id')
      .pipe(
        map((result) => {
          console.log(result);
          return result[0] ?? null;
        })
      );
  }

  updateStorageUser(newUser: User | null): void {
    this.ngGqlStorage.updateUser(newUser);
  }

  loadUserOrderHistory$(options: {
    skip: number;
    limit: number;
    sort: string;
  }): Observable<UserOrderHystory[]> {
    return this.ngGqlService
      .customQuery$<
        UserOrderHystory,
        'userOrderHistory',
        {
          skip: number;
          limit: number;
          sort: string;
        }
      >('userOrderHistory', this.defaultUserOrderHystoryFragments, {
        skip: options.skip,
        limit: options.limit,
        sort: options.sort,
      })
      .pipe(
        map((result) =>
          Array.isArray(result.userOrderHistory)
            ? result.userOrderHistory
            : [result.userOrderHistory]
        )
      );
  }

  getUser$(): Observable<User | null> {
    return this.ngGqlStorage.user.pipe(
      exhaustMap((user) =>
        isValue(user)
          ? this.ngGqlStorage.user
          : this.getToken$().pipe(
              switchMap((token) =>
                isValue(token)
                  ? this.loadUser$().pipe(
                      switchMap((user) => {
                        this.updateStorageUser(user);
                        return this.ngGqlStorage.user;
                      })
                    )
                  : this.ngGqlStorage.user
              )
            )
      ),
      catchError((err) => this.ngGqlStorage.user)
    );
  }

  getToken$(): Observable<string | null> {
    return this.ngGqlStorage.token;
  }

  /** Добавляет блюдо в избранное */
  addDishFavor(
    dishId: string,
    loading?: BehaviorSubject<boolean>
  ): Promise<boolean> {
    return this._userBus.emitToBus({
      type: 'AddDishFavor',
      payload: dishId,
      loading,
    });
  }

  /** Добавляет блюдо в избранное */
  updateUserData(
    data: UpdateUserDataPayload,
    loading?: BehaviorSubject<boolean>
  ): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'UpdateUserData',
      payload: data,
      loading,
    });
  }

  captchaGetJob<T extends CaptchaTask>(
    label: string,
    loading?: BehaviorSubject<boolean>
  ): Promise<CaptchaJob<T>> {
    return this._userBus.emitToBus({
      type: 'captchaGetJob',
      payload: { label },
      loading,
    });
  }

  async getCaptchaSolution(task: CaptchaTask): Promise<bigint> {
    return await Puzzle.solve(task);
  }

  registrationApp(
    data: RegistrationPayload,
    loading?: BehaviorSubject<boolean>
  ): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'registrationApp',
      payload: data,
      loading,
    });
  }

  otpRequest(
    data: OTPRequestPayload,
    loading?: BehaviorSubject<boolean>
  ): Promise<OTPResponse> {
    return this._userBus.emitToBus({
      type: 'OTPRequest',
      payload: data,
      loading,
    });
  }

  login(
    data: LoginPayload,
    loading?: BehaviorSubject<boolean>
  ): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'login',
      payload: data,
      loading,
    });
  }

  restorePassword(
    data: RestorePasswordPayload,
    loading?: BehaviorSubject<boolean>
  ): Promise<UserResponse> {
    return this._userBus.emitToBus({
      type: 'RestorePassword',
      payload: data,
      loading,
    });
  }

  async logout$(loading?: BehaviorSubject<boolean>): Promise<Response> {
    const res = await this._userBus.emitToBus<'logout', null, Response>({
      type: 'logout',
      payload: null,
      loading,
    });

    this.ngGqlStorage.updateToken(null);
    this.ngGqlStorage.updateUser(null);

    return res;
  }

  async userDelete$(
    otp: string,
    loading?: BehaviorSubject<boolean>
  ): Promise<Response> {
    const res = await this._userBus.emitToBus<'userDelete', string, Response>({
      type: 'userDelete',
      payload: otp,
      loading,
    });

    this.ngGqlStorage.updateToken(null);
    this.ngGqlStorage.updateUser(null);

    return res;
  }

  locationCreate$(
    location: InputLocation,
    loading?: BehaviorSubject<boolean>
  ): Promise<boolean> {
    return this._userBus.emitToBus<'locationCreate', InputLocation, boolean>({
      type: 'locationCreate',
      payload: location,
      loading,
    });
  }

  locationDelete$(
    locationId: string,
    loading?: BehaviorSubject<boolean>
  ): Promise<boolean> {
    return this._userBus.emitToBus<'locationDelete', string, boolean>({
      type: 'locationDelete',
      payload: locationId,
      loading,
    });
  }
}
