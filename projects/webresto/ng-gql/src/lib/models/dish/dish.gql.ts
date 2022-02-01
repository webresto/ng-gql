import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';
import { GroupModifierFragments } from '../group-modifier/group-modifier.gql';
import type { CustomfFields } from '../custom-fields/custom-fields';

export const DishFragments = {
	dish: gql`
		fragment DishFragment on Dish {
			id
			name
			description
			price
			weight
			balance
			tags
			additionalInfo
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
			visible
			promo
			images {
				...ImageFragment
			}
			modifiers {
				...GroupModifierFragment
			}
			parentGroup {
				id
				dishesPlaceholder {
					...ImageFragment
				}
			}
		}
		${ImageFragments.image}
		${GroupModifierFragments.groupModifier}
	`
};

export const DishGql = {
	queries: {
		getDishes: (customFields: CustomfFields) => gql`
			query GetDishes {
				dishes {
					...DishFragment
					${(customFields['Dish'] || []).join('\n')}
				}
			}
			${DishFragments.dish}
		`
	}
}