import { ImageFragments } from '../image/image.gql';
import type { Dish } from '../dish/dish.gql';
import type { Image } from '../image/image.gql';
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
	parentGroup?: Pick<Group, 'id' | 'dishesPlaceholder'>;
	childGroups: Group[];
	dishesPlaceholder: Image | null;
}

export const GroupFragments = {
	vOb: <ValuesOrBoolean<Group>> {
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