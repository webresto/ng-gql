import { ValuesOrBoolean } from './../values-or-boolean';
import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';

export interface Customer {
  phone: Partial<Phone> | null;
  mail?: string;
  name: string | null;
}

export interface Phone {
  number: string | null;
  code: string | null;
  additionalNumber?: string | null;
}

export interface PhoneKnowledge extends BaseModelWithCustomData {
  id: number | null;
  phone: string | null;
  isFirst: boolean;
  isConfirm: boolean;
  codeTime: string | null;
  confirmCode: string | null;
}

export interface CheckPhoneCodeInput {
  phone: Partial<Phone>;
  code: string;
};

export interface CheckPhoneResponse {
  type: string;
  title: string;
  message: string;
  confirmed: boolean;
  firstbuy: boolean;
}