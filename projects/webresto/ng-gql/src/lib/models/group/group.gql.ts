import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from '../dish/dish.gql';
import type { Image } from '../image/image.gql';
import { imageFragments } from '../image/image.gql';
import { InjectionToken } from '@angular/core';

export interface Group {
	id: string;
	description: string;
	name: string;
	slug?: string;
	visible: boolean;
	order: number;
	dishes?: Dish[];
	discount?: string | null;
	parentGroup?: Pick<Group, 'id' | 'dishesPlaceholder'>;
	childGroups: Group[];
	dishesPlaceholder: Image | null;
}

export const groupFragment: ValuesOrBoolean<Group> = {
	id: true,
	description: true,
	name: true,
	order: true,
	visible: true,
	slug: true,
	discount: true,
	dishesPlaceholder: imageFragments,
	parentGroup: {
		id: true,
		dishesPlaceholder: imageFragments
	}
};

/**
 * InjectionToken с объектом ValuesOrBoolean<Group>, используемым в запросе Group с сервера.
 */
export const GROUP_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Group>>(
	'GROUP_FRAGMENTS', {
	providedIn: 'root',
		factory: () => ({ ...groupFragment })
});