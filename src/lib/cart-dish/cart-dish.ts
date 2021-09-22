import { Dish } from '../dish/dish';
import { CartModifier } from '../modifier/cart-modifier';

export class CartDish {
	id: number;
	amount: number;
	dish: Dish;
	discountTotal: number;
	comment: string;
	weight: number;
	totalWeight: number;
	total: number;
	modifiers: CartModifier[];
	uniqueItems: number;
}
