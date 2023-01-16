import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from "../dish/dish.gql";
import { defaultImageFragments } from '../image/image.gql';

export interface OrderModifier<T extends Dish = Dish> {
	id: string;
	amount?: number;
	groupId: string;
	dish: Omit<Partial<T>, 'modifiers'>;
}

export interface Modifier<T extends Dish = Dish> {
	modifierId: string;
	groupId?: string;
	maxAmount: number;
	minAmount: number;
	amount?: number;
	defaultAmount: number;
	dish: Omit<Partial<T>, 'modifiers'>;
}

export const defaultModifierFragments: ValuesOrBoolean<Modifier<Dish>> = {
	modifierId: true,
	maxAmount: true,
	minAmount: true,
	defaultAmount: true,
	dish: {
		id: true,
		name: true,
		description: true,
		oldPrice: true,
		price: true,
		weight: true,
		balance: true,
		tags: true,
		groupId: true,
		parentGroup: {
			id: true,
			dishesPlaceholder: defaultImageFragments
		},
		images: defaultImageFragments
	}
};
