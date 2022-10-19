import { defaultModifierFragments } from '../modifier/modifier.gql';
import type { Modifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from '../dish/dish.gql';

export interface GroupModifier<T extends Dish = Dish> extends Exclude<Modifier, 'amount' | 'defaultAmount' | 'hideIfDefaultAmount' | 'groupId' | 'dish'> {
	required: boolean;
	childModifiers: Partial<Modifier<T>>[];
	group: Partial<{
		id: string;
		name: string;
	}>;
	totalAmount: number;
}

export const defaultGroupModifierFragments: ValuesOrBoolean<GroupModifier> = {
	modifierId: true,
	maxAmount: true,
	minAmount: true,
	required: true,
	childModifiers: defaultModifierFragments,
	group: {
		id: true,
		name: true,
	}
};


