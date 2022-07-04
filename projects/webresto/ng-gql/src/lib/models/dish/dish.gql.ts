import { defaultImageFragments } from '../image/image.gql';
import { defaultGroupModifierFragments } from '../group-modifier/group-modifier.gql';
import type { GroupModifier } from '../group-modifier/group-modifier.gql';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Image } from "../image/image.gql";
import type { Group } from '../group/group.gql';
import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';
import { InjectionToken } from '@angular/core';

export type DiscountType = 'FIXED' | 'PERCENT';

export interface Dish extends BaseModelWithCustomData {
	id: string;
	name: string;
	description: string;
	price: number;
	weight: number;
	balance: number;
	tags?: Partial<DishTag>[];
	additionalInfo?: string | number | { [ key: string ]: string | any; } | null;
	images: Partial<Image>[];
	groupId?: string;
	parentGroup: Partial<Pick<Group, 'id' | 'dishesPlaceholder'>>;
	modifiers?: Partial<GroupModifier>[] | undefined;
	carbohydrateAmount?: number;
	carbohydrateFullAmount?: number;
	energyAmount?: number;
	energyFullAmount?: number;
	fatAmount?: number;
	fatFullAmount?: number;
	fiberAmount?: number;
	fiberFullAmount?: number;
	measureUnit?: string;
	discountAmount: number | null;
	discountType: DiscountType | null;
}

export interface DishTag {
	name: string;
}

export const defaultDishFragments: ValuesOrBoolean<Dish> = {
	customData: true,
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
	discountAmount: true,
	discountType: true,
	energyFullAmount: true,
	fatAmount: true,
	fatFullAmount: true,
	fiberAmount: true,
	fiberFullAmount: true,
	measureUnit: true,
	images: defaultImageFragments,
	modifiers: defaultGroupModifierFragments,
	groupId: true,
	parentGroup: {
		id: true,
		dishesPlaceholder: defaultImageFragments
	}
};

/**
 * InjectionToken с объектом ValuesOrBoolean<Dish>, используемым в запросе блюд.
 */
export const DISH_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Dish>>(
	'DISH_FRAGMENTS', {
	providedIn: 'root',
	factory: () => ({ ...defaultDishFragments })
});