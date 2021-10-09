import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';
import { GroupModifierFragments } from '../group-modifier/group-modifier.gql';

export const DishFragments = {
	dish: gql`
		fragment DishFragment on Dish {
			id
			name
			description
			groupId
			price
			oldPrice
			weight
			balance
			tags
			additionalInfo
			discountAmount
			discountType
			seoDescription
			seoKeywords
			seoText
			seoTitle
			carbohydrateAmount
			carbohydrateFullAmount
			energyAmount
			energyFullAmount
			fatAmount
			fatFullAmount
			fiberAmount
			fiberFullAmount
			measureUnit
			type
			order
			isDeleted
			isModificable
			composition
			visible
			modifier
			promo
			images {
				...ImageFragment
			}
			modifiers {
				...GroupModifierFragment
			}
			parentGroup {
				id
			}
		}
		${ImageFragments.image}
		${GroupModifierFragments.groupModifier}
	`
};

export const DishGql = {
	queries: {
		getDishes: () => gql`
			query GetDishes {
				dishes {
					...DishFragment
				}
			}
			${DishFragments.dish}
		`
	}
}