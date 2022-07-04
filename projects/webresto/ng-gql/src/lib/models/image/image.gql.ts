import { InjectionToken } from '@angular/core';
import type { ValuesOrBoolean } from '../values-or-boolean';

export interface Image {
	id: string;
	uploadDate: string;
	images: Partial<ImageItem>;
}

export interface ImageItem {
	large: string | null;
	origin: string | null;
	small: string | null;
}

export const defaultImageFragments: ValuesOrBoolean<Image> = {
	id: true,
	uploadDate: true,
	images: true,
};

/**
 * InjectionToken с объектом ValuesOrBoolean<Image>, используемым в запросе Image с сервера.
 */
export const IMAGE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Image>>(
	'IMAGE_FRAGMENTS', {
	providedIn: 'root',
	factory: () => ({ ...defaultImageFragments })
});
