import { ImageFragments } from '../image/image.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from "../dish/dish.gql";

export interface OrderModifier {
	id: string;
	amount?: number;
	groupId: string;
	dish: Dish;
}

export interface Modifier {
	modifierId: string;
	groupId?: string;
	maxAmount: number;
	minAmount: number;
	amount?: number;
	defaultAmount: number;
	dish: Dish;
}

export const ModifierFragments = {
	vOb: <ValuesOrBoolean<Modifier>> {
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
				dishesPlaceholder: ImageFragments.vOb
			},
			images: ImageFragments.vOb
		}
	}
};
