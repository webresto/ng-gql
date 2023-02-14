import { RegistrationPayload } from './../models/user/methods';
import { Injectable, Inject } from '@angular/core';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { NgGqlService } from './ng-gql.service';
import {
  User,
  Action,
  Message,
  ValuesOrBoolean,
  RegistrationUserResponse,
} from '../models';
import {
  ACTION_FRAGMENTS,
  MESSAGE_FRAGMENTS,
  USER_FRAGMENTS,
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
    @Inject(USER_FRAGMENTS) private defaultUserFragments: ValuesOrBoolean<User>
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
}
