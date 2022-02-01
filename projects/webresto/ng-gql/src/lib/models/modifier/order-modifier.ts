import type { Dish } from '../dish/dish';

export interface OrderModifier {
	id: string;
	amount?: number;
	groupId: string;
	dish: Dish;
}
