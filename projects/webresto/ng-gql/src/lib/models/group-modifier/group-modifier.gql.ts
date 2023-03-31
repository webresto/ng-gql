import type { Modifier } from '../modifier/modifier.gql';
import type { Dish } from '../dish/dish.gql';

export interface GroupModifier<T extends Dish = Dish> extends Exclude<Modifier<T>, 'amount' | 'defaultAmount' | 'hideIfDefaultAmount' | 'groupId' | 'dish'> {
	required: boolean;
	childModifiers: Partial<Modifier<T>>[];
	group: Partial<{
		id: string;
		name: string;
	}>;
	totalAmount: number;
}

