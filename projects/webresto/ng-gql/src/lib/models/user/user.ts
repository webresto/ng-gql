import type {BaseModelWithCustomData} from '../base/base-model-with-custom-data';
import type {Dish} from '../dish/dish';
import type {Address, Order} from '../order';
import type {Phone} from './../customer/customer';

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
  isActive: boolean;
  balance: number;
  userId: string;
  bonusProgram: BonusProgram;
  bonusProgramId: string;
  syncedToTime: string;
}

export interface UserBonusTransaction extends BaseModelWithCustomData {
  id: string;
  type: string;
  group: string;
  isPositive: boolean;
  amount: number;
  balanceAfter: number;
  userId: string;
}

export interface UserDevice extends BaseModelWithCustomData {
  id: string;
  name: string;
  userAgent: string;
  isLogined: boolean;
  userId: string;
  lastIP: string;
  loginTime: number;
  lastActivity: number;
  sessionId: string;
}

export interface Street extends BaseModelWithCustomData {
  id: string;
  externalId: string;
  name: string;
}

export interface InputLocation extends Address {
  isDefault: boolean | null;
  customData: {
    [key: string]: string | any | null;
  } | null;
  name?: string | null;

  customFields?: any | null;
}

export type UserLocation = Omit<InputLocation, 'street'> & {
  id: string;
  userId: string;
  street: Street;
};

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
