import { inject, InjectionToken } from '@angular/core';
import type {
  ValuesOrBoolean, Dish, Image, Action, Group, GroupModifier, Maintenance, Message, Modifier, Navigation, Order, OrderDish, PaymentMethod
} from './models';
import {
  defaultActionFragments, defaultImageFragments, defaultMaintenanceFragments, defaultMessageFragments,
  defaultNavigationFragments, defaultPaymentMethodFragments,
} from './models';
import { NgGqlModule } from './ng-gql.module';

/**
 * InjectionToken с объектом ValuesOrBoolean<Image>, используемым в запросе Image с сервера.
 */
export const IMAGE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Image>>(
  'IMAGE_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => ({ ...defaultImageFragments })
});


/**
 * InjectionToken с объектом ValuesOrBoolean<Message>, используемым в запросе Message с сервера.
 */
export const MESSAGE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Message>>(
  'MESSAGE_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => ({ ...defaultMessageFragments })
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Action>, используемым в запросе Action с сервера.
 */
export const ACTION_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Action>>(
  'ACTION_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => ({ ...defaultActionFragments })
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Maintenance>, используемым в запросе Maintenance с сервера.
 */
export const MAINTENANCE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Maintenance>>(
  'MAINTENANCE_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => ({ ...defaultMaintenanceFragments })
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Modifier>, используемым в запросе Modifier с сервера.
 */
export const MODIFIER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Modifier>>(
  'MODIFIER_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => {
    const imageFragments = inject(IMAGE_FRAGMENTS);
    return {
      modifierId: true,
      maxAmount: true,
      minAmount: true,
      defaultAmount: true,
      dish: {
        id: true,
        name: true,
        description: true,
        price: true,
        weight: true,
        balance: true,
        tags: true,
        groupId: true,
        parentGroup: {
          id: true,
          dishesPlaceholder: imageFragments
        },
        images: imageFragments
      }
    };
  }
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Dish>, используемым в запросе блюд.
 */
export const DISH_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Dish>>(
  'DISH_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => {
    const imageFragments = inject(IMAGE_FRAGMENTS);
    const groupModifierFragments = inject(GROUP_MODIFIER_FRAGMENTS);
    return {
      customData: true,
      id: true,
      name: true,
      description: true,
      price: true,
      weight: true,
      balance: true,
      tags: true,
      additionalInfo: true,
      carbohydrateAmount: true,
      carbohydrateFullAmount: true,
      energyAmount: true,
      discountAmount: true,
      discountType: true,
      energyFullAmount: true,
      fatAmount: true,
      fatFullAmount: true,
      fiberAmount: true,
      fiberFullAmount: true,
      measureUnit: true,
      images: imageFragments,
      modifiers: groupModifierFragments,
      groupId: true,
      parentGroup: {
        id: true,
        dishesPlaceholder: imageFragments
      }
    };
  }
});


/**
 * InjectionToken с объектом ValuesOrBoolean<Group>, используемым в запросе Group с сервера.
 */
export const GROUP_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Group>>(
  'GROUP_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => {
    const imageFragments = inject(IMAGE_FRAGMENTS);
    return {
      id: true,
      description: true,
      name: true,
      order: true,
      visible: true,
      slug: true,
      discount: true,
      dishesPlaceholder: imageFragments,
      parentGroup: {
        id: true,
        dishesPlaceholder: imageFragments
      }
    };
  }
});


/**
 * InjectionToken с объектом ValuesOrBoolean<GroupModifier>, используемым в запросе GroupModifier с сервера.
 */
export const GROUP_MODIFIER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<GroupModifier>>(
  'GROUP_MODIFIER_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => {
    const modifierFragments = inject(MODIFIER_FRAGMENTS);
    return {
      modifierId: true,
      maxAmount: true,
      minAmount: true,
      required: true,
      childModifiers: modifierFragments,
      group: {
        id: true,
        name: true,
      }
    };
  }
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Order>, используемым в запросе Order с сервера.
 */
export const ORDER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Order>>(
  'ORDER_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => {
    const orderDishFragments = inject(ORDER_DISH_FRAGMENTS);
    return {
      id: true,
      shortId: true,
      dishesCount: true,
      comment: true,
      deliveryDescription: true,
      message: true,
      deliveryCost: true,
      totalWeight: true,
      total: true,
      orderTotal: true,
      discountTotal: true,
      state: true,
      trifleFrom: true,
      customData: true,
      customer: true,
      address: true,
      rmsId: true,
      rmsOrderNumber: true,
      rmsDeliveryDate: true,
      dishes: orderDishFragments,
      rmsDelivered: true,
      paymentMethod: {
        id: true,
        title: true
      }
    };
  }
});

/**
 * InjectionToken с объектом ValuesOrBoolean<OrderDish>, используемым в запросе OrderDish с сервера.
 */
export const ORDER_DISH_FRAGMENTS = new InjectionToken<ValuesOrBoolean<OrderDish>>(
  'ORDER_DISH_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => {
    const dishFragments = inject(DISH_FRAGMENTS);
    return {
      id: true,
      amount: true,
      dish: dishFragments,
      modifiers: {
        id: true,
        dish: dishFragments,
        amount: true,
        groupId: true,
      },
      discountTotal: true,
      discountType: true,
      discountAmount: true,
      discountMessage: true,
      comment: true,
      totalWeight: true,
      itemTotal: true,
    };
  }
});

/**
 * InjectionToken с объектом ValuesOrBoolean<PaymentMethod>, используемым в запросе PaymentMethod с сервера.
 */
export const PAYMENT_METHOD_FRAGMENTS = new InjectionToken<ValuesOrBoolean<PaymentMethod>>(
  'PAYMENT_METHOD_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => ({ ...defaultPaymentMethodFragments })
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Navigation>, используемым в запросе Navigation с сервера.
 */
export const NAVIGATION_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Navigation>>(
  'NAVIGATION_FRAGMENTS', {
  providedIn: NgGqlModule,
  factory: () => ({ ...defaultNavigationFragments })
});