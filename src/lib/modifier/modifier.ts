import { Image } from '../image/image';
import { Dish } from '../dish/dish';

export class Modifier {
	modifierId: string;
	maxAmount: number;
	minAmount: number;
	amount?: number;
	defaultAmount: number;
	hideIfDefaultAmount: boolean;
	dish: Dish;
}
