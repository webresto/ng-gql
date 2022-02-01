import type { Dish } from '../dish/dish';
import type { OrderModifier } from '../modifier/order-modifier';

export interface OrderDish {
	id: number;
	amount: number;
	dish: Dish;
	itemTotal: number;
	itemTotalBeforeDiscount: number;
	discountTotal: number | null;
	discountType: string | null;
	comment: string | null;
	totalWeight: number;
	total: number;
	modifiers: OrderModifier[];
}
