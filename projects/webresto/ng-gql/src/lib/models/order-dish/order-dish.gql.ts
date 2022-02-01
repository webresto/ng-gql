import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';

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
	`
};