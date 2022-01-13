import type { Dish } from '../dish/dish';

export interface Modifier {
	modifierId: string;
	groupId?: string;
	maxAmount: number;
	minAmount: number;
	amount?: number;
	defaultAmount: number;
	hideIfDefaultAmount: boolean;
	dish: Dish;
}
