import type { GroupModifier } from '../group-modifier/group-modifier.gql';
import type { Image } from "../image/image.gql";
import type { Group } from '../group/group.gql';
import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';
import type { BehaviorSubject } from 'rxjs';

export type DiscountType = 'FIXED' | 'PERCENT';

export interface Dish extends BaseModelWithCustomData {
	id: string;
	name: string;
	description: string;
	price: number;
	oldPrice: number | null;
	weight: number;
	balance: number;
	sortOrder:number;
	tags?: Partial<DishTag>[];
	additionalInfo?: string | number | { [key: string]: string | any; } | null;
	images: Partial<Image>[];
	groupId?: string;
	parentGroup: Partial<Pick<Group, 'id' | 'dishesPlaceholder'>>;
	modifiers?: Partial<GroupModifier<Dish>>[] | undefined;
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
	isLoading?: BehaviorSubject<boolean>;
}

export interface DishTag {
	name: string;
}
