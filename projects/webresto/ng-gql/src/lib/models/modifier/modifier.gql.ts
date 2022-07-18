import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from "../dish/dish.gql";
import { defaultImageFragments } from '../image/image.gql';
import { InjectionToken } from '@angular/core';

export interface OrderModifier {
	id: string;
	amount?: number;
	groupId: string;
	dish: Omit<Partial<Dish>, 'modifiers'>;
}

export interface Modifier {
	modifierId: string;
	groupId?: string;
	maxAmount: number;
	minAmount: number;
	amount?: number;
	defaultAmount: number;
	dish: Omit<Partial<Dish>, 'modifiers'>;
}

export const defaultModifierFragments: ValuesOrBoolean<Modifier> = {
	modifierId: true,
	maxAmount: true,
	minAmount: true,
	defaultAmount: true,
	dish: {
		id: true,
		name: true,
		description: true,
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


/**
 * InjectionToken с объектом ValuesOrBoolean<Modifier>, используемым в запросе Modifier с сервера.
 */
export const MODIFIER_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Modifier>>(
	'MODIFIER_FRAGMENTS', {
	providedIn: 'root',
	factory: () => ({ ...defaultModifierFragments })
});

