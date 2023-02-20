import { Captcha } from '../captcha';
import { Phone } from '../customer';
import type { Message, Action } from '../event-message/event-message';
import { User } from './user';

export interface BaseResponse {
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

export type RegistrationPayload = Omit<LoginPayload, 'deviceName' | 'otp'> & {
  phone?: Phone;
  otp: string;
  firstName?: string;
  lastName?: string;
  customFields?: {
    [key: string]: string | any | null;
  };
};

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

export interface LogoutPayload {
  deviceName: string;
}
