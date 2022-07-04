import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from '../dish/dish.gql';
import type { Image } from '../image/image.gql';
import { defaultImageFragments } from '../image/image.gql';
import { InjectionToken } from '@angular/core';

export interface Group {
	id: string;
	description: string;
	name: string;
	slug?: string;
	visible: boolean;
	order: number;
	dishes?: Partial<Dish>[];
	discount?: string | null;
	parentGroup?: Partial<Pick<Group, 'id' | 'dishesPlaceholder'>>;
	childGroups: Partial<Group>[];
	dishesPlaceholder: Partial<Image> | null;
}

export const defaultGroupFragments: ValuesOrBoolean<Group> = {
	id: true,
	description: true,
	name: true,
	order: true,
	visible: true,
	slug: true,
	discount: true,
	dishesPlaceholder: defaultImageFragments,
	parentGroup: {
		id: true,
		dishesPlaceholder: defaultImageFragments
	}
};

/**
 * InjectionToken с объектом ValuesOrBoolean<Group>, используемым в запросе Group с сервера.
 */
export const GROUP_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Group>>(
	'GROUP_FRAGMENTS', {
	providedIn: 'root',
		factory: () => ({ ...defaultGroupFragments })
});