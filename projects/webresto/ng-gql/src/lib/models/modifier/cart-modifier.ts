import type { Dish } from '../dish/dish';

export interface CartModifier {
	id: string;
	amount?: number;
	groupId: string;
	dish: Dish;
}
