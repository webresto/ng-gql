import { Captcha } from '../captcha';
import { Phone } from '../customer';
import type { Message, Action } from '../event-message/event-message';
import { User } from './user';

export interface BaseResponse {
  message: Message;
  action: Action;
}
export interface RestorePasswordPayload {
  login: string;
  password: string;
  otp: string;
  captcha: Captcha;
}

export type LoginPayload = Omit<RestorePasswordPayload, 'password' | 'otp'> & {
  phone?: Phone;
  password?: string;
  otp?: string;
};

export type RegistrationPayload = Omit<LoginPayload, 'otp'> & {
  phone?: Phone;
  otp: string;
  firstName?: string;
  lastName?: string;
  customFields?: {
    [key: string]: string | any | null;
  };
};

export type UpdateUserDataPayload = {
  firstName: string;
  lastName: string;
  birthday: string;
  customData?: any;
  customFields?: any;
};

export interface Response {
  message: Message;
  action: Action;
}

export interface UserResponse extends Response {
  user: User;
}

export interface OTPRequestPayload {
  login: string;
  captcha: Captcha;
}

export interface OTPResponse {
  id: string;
  nextOTPAfterSeconds: number;
  message: Message;
  action: Action;
}

export interface LogoutPayload {
  deviceName: string;
}
