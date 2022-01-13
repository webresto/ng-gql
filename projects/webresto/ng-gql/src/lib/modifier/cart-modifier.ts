import { Dish } from '../dish/dish';

export class CartModifier {
	id: string;
	amount?: number;
	groupId: string;
	dish: Dish;
}
