import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';

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
		`,
		getGroupsAndDishes: () => gql`
			query GetGroupsAndDishes {
				groups {
					parentGroup {
						id
					}
					...GroupFragment
				}
				dishes {
					...DishFragment
				}
			}
			${GroupFragments.group}
			${DishFragments.dish}
		`
	}
}