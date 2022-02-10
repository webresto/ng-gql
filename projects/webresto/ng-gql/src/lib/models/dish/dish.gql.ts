import { ImageFragments } from '../image/image.gql';
import { GroupModifier, GroupModifierFragments } from '../group-modifier/group-modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
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
	additionalInfo?: string | number | { [ key: string ]: string | any; } | null;
	images: Image[];
	groupId?: string;
	parentGroup: Pick<Group, 'id' | 'dishesPlaceholder'>;
	modifiers?: GroupModifier[] | undefined;
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
	vOb: <ValuesOrBoolean<Dish>> {
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
		groupId: true,
		parentGroup: {
			id: true,
			dishesPlaceholder: ImageFragments.vOb
		}
	}
};