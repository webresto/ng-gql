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
	`,
	vOb: {
		id: true,
		name: true,
		description: true,
		price: true,
		weight: true,
		balance: true,
		tags: true,
		additionalInfo: true,
		carbohydrateAmount: true,
		carbohydrateFullAmount: true,
		energyAmount: true,
		energyFullAmount: true,
		fatAmount: true,
		fatFullAmount: true,
		fiberAmount: true,
		fiberFullAmount: true,
		measureUnit: true,
		images: ImageFragments.vOb,
		modifiers: GroupModifierFragments.vOb,
		parentGroup: {
			id: true,
			dishesPlaceholder: ImageFragments.vOb
		}
	}
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