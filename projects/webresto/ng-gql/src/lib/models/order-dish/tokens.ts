import { inject, InjectionToken } from '@angular/core';
import { ValuesOrBoolean } from '../values-or-boolean';
import { OrderDish } from './order-dish.gql';
import { DISH_FRAGMENTS } from '../dish';

/**
 * InjectionToken с объектом ValuesOrBoolean<OrderDish>, используемым в запросе OrderDish с сервера.
 */

export const ORDER_DISH_FRAGMENTS = new InjectionToken<
  ValuesOrBoolean<OrderDish>
>('ORDER_DISH_FRAGMENTS', {
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
  },
});
