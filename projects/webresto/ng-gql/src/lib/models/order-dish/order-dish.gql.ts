import { DishFragments } from '../dish/dish.gql';
import type { OrderModifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish, DiscountType } from '../dish/dish.gql';

export interface OrderDish {
	id: number;
	amount: number;
	dishId: string;
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

export const OrderDishFragments = {
	vOb: <ValuesOrBoolean<OrderDish>> {
		id: true,
		amount: true,
		dishId: true,
		dish: DishFragments.vOb,
		modifiers: {
			id: true,
			dish: DishFragments.vOb,
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
	}
};