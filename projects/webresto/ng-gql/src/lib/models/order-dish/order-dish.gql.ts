import { dishFragments } from '../dish/dish.gql';
import type { OrderModifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish, DiscountType } from '../dish/dish.gql';
import { InjectionToken } from '@angular/core';

export interface OrderDish {
	id: number;
	amount: number;
	dish: Dish,
	itemTotal: number;
	itemTotalBeforeDiscount?: number;
	discountTotal: number | null;
	discountType: DiscountType | null;
	discountMessage: string | null;
	discountAmount: number | null;
	comment: string | null;
	totalWeight: number;
	total?: number;
	modifiers: OrderModifier[];
}

export const orderDishFragments: ValuesOrBoolean<OrderDish> = {
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

/**
 * InjectionToken с объектом ValuesOrBoolean<OrderDish>, используемым в запросе OrderDish с сервера.
 */
export const ORDER_DISH_FRAGMENTS = new InjectionToken<ValuesOrBoolean<OrderDish>>(
	'ORDER_DISH_FRAGMENTS', {
	providedIn: 'root',
	factory: () => ({ ...orderDishFragments })
});