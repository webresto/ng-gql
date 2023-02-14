import { Captcha } from '../captcha';
import { Phone } from '../customer';
import type { Message, Action } from '../event-message/event-message';
import { User } from './user';

export interface BaseResponse {
  message: Message;
  action: Action;
}

export interface RegistrationPayload {
  login: string;
  phone?: Phone;
  password?: string;
  otp: string;
  firstName: string;
  lastName?: string;
  customFields?: {
    [key: string]: string | any | null;
  };
  captcha: Captcha;
}

export interface RegistrationUserResponse {
  user: User;
  message: Message;
  action: Action;
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

export interface LoginPayload {
  login: string;
  password?: string;
  otp?: string;
  deviceName: string;
  captcha: Captcha;
}

export interface LogoutPayload {
  deviceName: string;
}
