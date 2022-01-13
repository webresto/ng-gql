import { Dish } from '../dish/dish';
import { CartModifier } from '../modifier/cart-modifier';

export class CartDish {
	id: number;
	amount: number;
	dish: Dish;
	itemTotal: number;
	itemTotalBeforeDiscount: number;
	discountTotal: number;
	discountType: string;
	comment: string;
	weight: number;
	totalWeight: number;
	total: number;
	modifiers: CartModifier[];
	uniqueItems: number;
}
