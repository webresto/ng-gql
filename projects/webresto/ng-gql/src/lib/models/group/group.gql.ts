import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';
import type { CustomfFields } from '../custom-fields/custom-fields';

export const GroupFragments = {
	group: gql`
		fragment GroupFragment on Group {
			id
			description
			name
			order
			visible
			slug
		}
	`,
	vOb: {
		id: true,
		description: true,
		name: true,
		order: true,
		visible: true,
		slug: true,
	}
};

export const GroupGql = {
	queries: {
		getGroups: () => gql`
			query GetMenu {
				groups {
					...GroupFragment
					dishes {
						...DishFragment
					}
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`,
		getGroupsAndDishes: (customFields: CustomfFields) => gql`
			query GetGroupsAndDishes {
				groups {
					parentGroup {
						id
					}
					...GroupFragment
					${(customFields['Group'] || []).join('\n')}
				}
				dishes {
					...DishFragment
					${(customFields['Dish'] || []).join('\n')}
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`
	}
}