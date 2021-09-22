import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';

export const CartDishFragments = {
	cartDish: gql`
		fragment CartDishFragment on CartDish {
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
			comment
			weight
			totalWeight
			itemTotal
			uniqueItems
		}
		${DishFragments.dish}
	`
};