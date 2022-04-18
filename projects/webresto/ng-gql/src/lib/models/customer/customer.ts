import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';

export interface Customer {
  phone: Phone | null;
  mail?: string;
  name: string | null;
}

export interface Phone {
  number: string | null;
  code: string | null;
  additionalNumber?: string | null;
}

export interface PhoneKnowledge extends BaseModelWithCustomData {
  id: number;
  phone: string;
  isFirst: boolean;
  isConfirm: boolean;
  codeTime: string;
  confirmCode: string;
}

export interface CheckPhoneCodeInput {
  phone: Phone;
  code: string;
};

export interface CheckPhoneResponse {
  type: string;
  title: string;
  message: string;
  confirmed: boolean;
  firstbuy: boolean;
}