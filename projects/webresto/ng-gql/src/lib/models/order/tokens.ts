import {DOCUMENT} from '@angular/common';
import {InjectionToken, inject} from '@angular/core';
import {generateUUID} from '../get-uuid';
import {ORDER_DISH_FRAGMENTS} from '../order-dish';
import {ValuesOrBoolean} from '../values-or-boolean';
import {Order} from './order.gql';

/**
 * Метод для генерации orderId
 */
export const ORDERID_FACTORY_FN = new InjectionToken<() => string>('ORDERID_FACTORY_FN', {
  factory: (): (() => string) => {
    const win = inject(DOCUMENT).defaultView;
    return () => generateUUID(win);
  },
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Order>, используемым в запросе Order с сервера.
 */
export const ORDER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Order>>('ORDER_FRAGMENTS', {
  factory: (): ValuesOrBoolean<Order> => {
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
      selfService: true,
      date: true,
      promotionState: {
        type: true,
        message: true,
        state: true,
      },
      orderDate: true,
      deliveryStatus: true,
      personsCount: true,
      paymentMethod: {
        id: true,
        title: true,
      },
    };
  },
});
