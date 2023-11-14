import {inject, InjectionToken} from '@angular/core';
import {PHONE_FRAGMENT} from '../customer';
import {DISH_FRAGMENTS} from '../dish';
import {ACTION_FRAGMENTS, MESSAGE_FRAGMENTS} from '../event-message';
import {ValuesOrBoolean} from '../values-or-boolean';
import {OTPResponse} from './methods';
import {
  BonusProgram,
  User,
  UserBonusProgram,
  UserDevice,
  UserLocation,
  UserOrderHystory,
} from './user';
/**
 * InjectionToken с объектом ValuesOrBoolean<OTPResponse>.
 */
export const OTP_RESPONSE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<OTPResponse>>(
  'OTP_RESPONSE_FRAGMENT',
  {
    factory: (): ValuesOrBoolean<OTPResponse> => {
      const defaultMessageFragments = inject(MESSAGE_FRAGMENTS);
      const defaultActionFragments = inject(ACTION_FRAGMENTS);
      return {
        id: true,
        nextOTPAfterSeconds: true,
        message: defaultMessageFragments,
        action: defaultActionFragments,
      };
    },
  },
);

/**
 * InjectionToken с объектом ValuesOrBoolean<UserDevice>.
 */
export const USER_DEVICES_FRAGMENTS = new InjectionToken<ValuesOrBoolean<UserDevice>>(
  'USER_DEVICES_FRAGMENT',
  {
    factory: (): ValuesOrBoolean<UserDevice> => ({
      id: true,
      name: true,
      userAgent: true,
      isLogined: true,
      userId: true,
      lastIP: true,
      loginTime: true,
      lastActivity: true,
      sessionId: true,
    }),
  },
);

/**
 * InjectionToken с объектом ValuesOrBoolean<UserLocation>.
 */
export const USER_LOCATION_FRAGMENTS = new InjectionToken<ValuesOrBoolean<UserLocation>>(
  'USER_LOCATION_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<UserLocation> => ({
      id: true,
      isDefault: true,
      name: true,
      city: true,
      home: true,
      housing: true,
      index: true,
      entrance: true,
      floor: true,
      apartment: true,
      doorphone: true,
      streetId: true,
      street: {
        name: true,
        externalId: true,
        id: true,
      },
      userId: true,
      comment: true,
    }),
  },
);

/**
 * InjectionToken с объектом ValuesOrBoolean<BonusProgram>.
 */
export const BONUS_PROGRAM_FRAGMENTS = new InjectionToken<ValuesOrBoolean<BonusProgram>>(
  'BONUS_PROGRAM_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<BonusProgram> => ({
      id: true,
      name: true,
      coveragePercentage: true,
      detailInfoLink: true,
      adapter: true,
      sortOrder: true,
      description: true,
      enable: true,
    }),
  },
);

/**
 * InjectionToken с объектом ValuesOrBoolean<UserBonusProgram>.
 */
export const USER_BONUS_PROGRAM_FRAGMENTS = new InjectionToken<ValuesOrBoolean<UserBonusProgram>>(
  'USER_BONUS_PROGRAM_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<UserBonusProgram> => {
      const bonusProgramFragments = inject(BONUS_PROGRAM_FRAGMENTS);
      return {
        id: true,
        isActive: true,
        balance: true,
        userId: true,
        bonusProgram: bonusProgramFragments,
        bonusProgramId: true,
        syncedToTime: true,
      };
    },
  },
);

/**
 * InjectionToken с объектом ValuesOrBoolean<User>.
 */
export const USER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<User>>('USER_FRAGMENTS', {
  factory: (): ValuesOrBoolean<User> => {
    const dishFragments = inject(DISH_FRAGMENTS);
    const phoneFragments = inject(PHONE_FRAGMENT);
    const ueserDevicesFragments = inject(USER_DEVICES_FRAGMENTS);
    const userBonusProgramFragments = inject(USER_BONUS_PROGRAM_FRAGMENTS);
    const fragments: ValuesOrBoolean<User> = {
      id: true,
      login: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: phoneFragments,
      birthday: true,
      favorites: dishFragments,
      bonusProgram: userBonusProgramFragments,
      orderCount: true,
      devices: ueserDevicesFragments,
      lastPasswordChange: true,
      temporaryCode: true,
    };
    return fragments;
  },
});

/**
 * InjectionToken с объектом ValuesOrBoolean<UserOrderHystory>.
 */
export const USER_ORDER_HYSTORY_FRAGMENTS = new InjectionToken<ValuesOrBoolean<UserOrderHystory>>(
  'USER_ORDER_HYSTORY_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<UserOrderHystory> => {
      const fragments: ValuesOrBoolean<UserOrderHystory> = {
        id: true,
        uniqueItems: true,
        orderTotal: true,
        total: true,
        order: true,
        discountTotal: true,
        comment: true,
        totalWeight: true,
        userId: true,
      };
      return fragments;
    },
  },
);
