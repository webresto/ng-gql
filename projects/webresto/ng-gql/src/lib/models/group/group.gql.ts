import { gql } from 'apollo-angular';
import { DishFragments } from '../dish/dish.gql';
import type { CustomfFields } from '../custom-fields/custom-fields';
import type { Dish } from '../dish/dish.gql';
import { Image, ImageFragments } from '../image/image.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';

export interface Group {
	id: string;
	description: string;
	name: string;
	slug?: string;
	visible: boolean;
	order: number;
	dishes?: Dish[];
	discount?: number;
	parentGroup?: Group;
	childGroups: Group[];
	dishesPlaceholder: Image | null;
}

export const GroupFragments = {
	group: gql`
		fragment GroupFragment on Group {
			id
			description
			name
			order
			visible
			slug
			parentGroup {
				id
				dishesPlaceholder {
					...ImageFragment
				}
			}
		}
	`,
	vOb: <ValuesOrBoolean<Group>>{
		id: true,
		description: true,
		name: true,
		order: true,
		visible: true,
		slug: true,
		dishesPlaceholder: ImageFragments.vOb,
		parentGroup: {
			id: true,
			dishesPlaceholder: ImageFragments.vOb
		}
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