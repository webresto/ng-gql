import { DishFragments } from '../dish/dish.gql';
import type { OrderModifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from '../dish/dish.gql';
import { ImageFragments } from '../image/image.gql';
import { GroupModifierFragments } from '../group-modifier/group-modifier.gql';

export interface OrderDish {
	id: number;
	amount: number;
	dishId: string;
	dish: Dish,
	itemTotal: number;
	itemTotalBeforeDiscount?: number;
	discountTotal: number | null;
	discountType: string | null;
	comment: string | null;
	totalWeight: number;
	total?: number;
	modifiers: OrderModifier[];
}

export const OrderDishFragments = {
	vOb: <ValuesOrBoolean<OrderDish>> {
		id: true,
		amount: true,
		dishId: true,
		dish: {
			id: true,
			balance: true,
			description: true,
			modifiers: GroupModifierFragments.vOb,
			name: true,
			price: true,
			weight: true,
			carbohydrateAmount: true,
			carbohydrateFullAmount: true,
			energyAmount: true,
			energyFullAmount: true,
			fatAmount: true,
			fatFullAmount: true,
			fiberAmount: true,
			fiberFullAmount: true,
			images: ImageFragments.vOb,
			parentGroup: {
				id: true,
				dishesPlaceholder: ImageFragments.vOb
			}
		},
		modifiers: {
			id: true,
			dish: DishFragments.vOb,
			amount: true,
			groupId: true,
		},
		discountTotal: true,
		discountType: true,
		comment: true,
		totalWeight: true,
		itemTotal: true,
	}
};