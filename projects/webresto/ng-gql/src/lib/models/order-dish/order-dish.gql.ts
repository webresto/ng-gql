import { defaultDishFragments } from '../dish/dish.gql';
import type { OrderModifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish, DiscountType } from '../dish/dish.gql';
import type { BehaviorSubject } from 'rxjs';

export interface OrderDish<T extends Dish = Dish> {
	id: number;
	amount: number;
	dish: Partial<T>,
	itemTotal: number;
	itemTotalBeforeDiscount?: number;
	discountTotal: number | null;
	discountType: DiscountType | null;
	discountMessage: string | null;
	discountAmount: number | null;
	comment: string | null;
	totalWeight: number;
	total?: number;
	modifiers: Partial<OrderModifier>[];
	isLoading?: BehaviorSubject<boolean>;

}

export const defaultOrderDishFragments: ValuesOrBoolean<OrderDish> = {
	id: true,
	amount: true,
	dish: defaultDishFragments,
	modifiers: {
		id: true,
		dish: defaultDishFragments,
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

