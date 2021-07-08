import { Dish } from '../dish/dish';

export class CartDish {
	id: string;
	amount: number;
	dish: Dish;
	discountTotal: number;
	comment: string;
	weight: number;
	totalWeight: number;
}
