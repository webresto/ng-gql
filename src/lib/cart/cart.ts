import { CartDish } from '../cart-dish/cart-dish';
import { Dish } from '../dish/dish';

export class Cart {
	id: string;
	dishes: CartDish[];
	dishesCount: number;
	comment: string;
	personsCount: number;
	deliveryDescription: string;
	message: string;
	deliveryItem: Dish;
	deliveryCost: number;
	totalWeight: number;
	total: number;
	orderTotal: number;
	cartTotal: number;
	discountTotal: number;
	state: string;
}
