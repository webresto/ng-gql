import { gql } from 'apollo-angular';
import { ImageFragments } from '../image/image.gql';
import { GroupModifier, GroupModifierFragments } from '../group-modifier/group-modifier.gql';
import type { CustomfFields } from '../custom-fields/custom-fields';
import { ValuesOrBoolean } from '../values-or-boolean';
import type { Image } from "../image/image.gql";
import type { Group } from '../group/group.gql';

export interface Dish {
	id: string;
	name: string;
	description: string;
	price: number;
	weight: number;
	balance: number;
	tags?: DishTag[];
	additionalInfo?: string | number | { [key: string]: string | any } | null;
	images: Image[];
	groupId?: string;
	parentGroup: Pick<Group, 'id' | 'dishesPlaceholder'>;
	modifiers?: GroupModifier[] | undefined ;
	carbohydrateAmount?: number;
	carbohydrateFullAmount?: number;
	energyAmount?: number;
	energyFullAmount?: number;
	fatAmount?: number;
	fatFullAmount?: number;
	fiberAmount?: number;
	fiberFullAmount?: number;
	measureUnit?: string;
}

export interface DishTag {
	name: string;
}


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
	vOb: <ValuesOrBoolean<Dish>>{
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