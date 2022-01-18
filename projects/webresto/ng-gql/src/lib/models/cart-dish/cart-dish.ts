import type { Dish } from '../dish/dish';
import type { CartModifier } from '../modifier/cart-modifier';

export interface CartDish {
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
	modifiers: CartModifier[];
}
