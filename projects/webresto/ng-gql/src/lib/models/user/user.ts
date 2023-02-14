import type { Dish } from '../dish/dish.gql';
import type { Order } from '../order';
import { Phone } from './../customer/customer';
import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';
import { ValuesOrBoolean } from '../values-or-boolean';

/**
 *  Модели, описывающие авторизованного пользователя и его данные
 */

export interface User extends BaseModelWithCustomData {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: Phone;
  birthday: string;
  favorites: Dish[];
  bonusProgram: UserBonusProgram[];
  history: Order[];
  locations: UserLocation[];
  devices: UserDevice[];
  verified: boolean;
  lastPasswordChange: number;
  temporaryCode: string;
}

export const defaultUserFragments: ValuesOrBoolean<User> = {};

export interface BonusProgram extends BaseModelWithCustomData {
  id: string;
  adapter: string;
  order: number;
  description: string;
  enable: boolean;
}

export interface UserBonusProgram extends BaseModelWithCustomData {
  id: string;
  active: boolean;
  balance: number;
  user: User;
  userId: string;
  BonusProgram: BonusProgram;
  BonusProgramId: string;
  syncedToTime: string;
}

export interface UserBonusTransaction extends BaseModelWithCustomData {
  id: string;
  type: string;
  group: string;
  isPositive: boolean;
  amount: number;
  balanceAfter: number;
  user: User;
  userId: string;
}

export interface UserDevice extends BaseModelWithCustomData {
  id: string;
  name: string;
  userAgent: string;
  isLogined: boolean;
  user: User;
  userId: string;
  lastIP: string;
  loginTime: number;
  lastActivity: number;
  sessionId: string;
}

export interface UserLocation extends BaseModelWithCustomData {
  id: string;
  name: string;
  city: string;
  home: string;
  housing: string;
  index: string;
  entrance: string;
  floor: string;
  apartment: string;
  doorphone: string;
  street: string;
  user: User;
  userId: string;
  comment: string;
}

export interface OneTimePassword extends BaseModelWithCustomData {
  id: number;
  login: string;
  password: string;
  expires: number;
}
