import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';
import type { Dish } from "../dish/dish.gql";
import type { OrderModifier } from '../modifier/modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';

export interface OrderDish {
	id: number;
	amount: number;
	dish: Dish;
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
	orderDish: gql`
		fragment OrderDishFragment on OrderDish {
			id
			amount
			dish {
				...DishFragment
			}
			modifiers {
				id
				dish {
					...DishFragment
				}
				amount
				groupId
			}
			discountTotal
			discountType
			comment
			totalWeight
			itemTotal
		}
		${DishFragments.dish}
	`,
	vOb: <ValuesOrBoolean<OrderDish>>{
		id: true,
		amount: true,
		dish: DishFragments.vOb,
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