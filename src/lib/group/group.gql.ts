import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';
import { ImageFragments } from '../image/image.gql';

export const GroupFragments = {
	group: gql`
		fragment GroupFragment on Group {
			id
			description
			name
			order
			visible
			slug
			dishPlaceholder {
				...ImageFragment
			}
		}
	`
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
			${ImageFragments.image}
		`,
		getGroupsAndDishes: (customFields) => gql`
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
			${ImageFragments.image}
		`
	}
}