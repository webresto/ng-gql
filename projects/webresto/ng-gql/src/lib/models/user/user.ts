import type { Dish } from '../dish/dish.gql';
import type { Order } from '../order';
import type { Phone } from './../customer/customer';
import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';

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
  orderCount: number;
  locations: UserLocation[];
  devices: UserDevice[];
  lastPasswordChange: number;
  temporaryCode: string;
}

export interface BonusProgram extends BaseModelWithCustomData {
  id: string;
  adapter: string;
  sortOrder: number;
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

export interface InputLocation extends BaseModelWithCustomData {
  street: string;
  home: string;
  name: string;
  city: string;
  housing: string;
  index: string;
  entrance: string;
  floor: string;
  apartment: string;
  doorphone: string;
  comment: string;
  customFields: any;
}

export interface UserLocation extends InputLocation {
  id: string;
  user: User;
  userId: string;
}

export interface UserLocationResponse {
  userLocationCount: number;
  userLocation: UserLocation[];
}

export interface OneTimePassword extends BaseModelWithCustomData {
  id: number;
  login: string;
  password: string;
  expires: number;
}

export interface UserOrderHystory extends BaseModelWithCustomData {
  id: string;
  uniqueItems: number;
  orderTotal: number;
  total: number;
  order: Order;
  discountTotal: number;
  comment: string;
  totalWeight: number;
  userId: string;
}
