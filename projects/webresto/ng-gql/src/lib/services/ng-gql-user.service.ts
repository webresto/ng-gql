import { Injectable, Inject } from '@angular/core';
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
} from '../models';
import {
  ACTION_FRAGMENTS,
  MESSAGE_FRAGMENTS,
  USER_FRAGMENTS,
  OTP_RESPONSE_FRAGMENTS,
} from '../injection-tokens';

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
    @Inject(USER_FRAGMENTS) private defaultUserFragments: ValuesOrBoolean<User>,
    @Inject(OTP_RESPONSE_FRAGMENTS)
    private defaultOTPResponceFragments: ValuesOrBoolean<OTPResponse>
  ) {}

  registration(data: RegistrationPayload) {
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
      data
    );
  }

  otpRequest(data: OTPRequestPayload) {
    return this.ngGqlService.customMutation$<
      OTPResponse,
      'registration',
      OTPRequestPayload
    >('registration', this.defaultOTPResponceFragments, data);
  }

  login(data: LoginPayload) {
    return this.ngGqlService.customMutation$<
      RegistrationUserResponse,
      'registration',
      LoginPayload
    >(
      'registration',
      {
        user: this.defaultUserFragments,
        message: this.defaultMessageFragments,
        action: this.defaultActionFragments,
      },
      data
    );
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
}
