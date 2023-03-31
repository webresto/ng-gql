import type { OrderModifier } from '../modifier/modifier.gql';
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
	modifiers: Partial<OrderModifier<T>>[];
	isLoading?: BehaviorSubject<boolean>;
}
