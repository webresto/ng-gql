import type { ValuesOrBoolean } from '../values-or-boolean';

export interface Image {
	id: string;
	uploadDate: string;
	images: ImageItem;
}

export interface ImageItem {
	large: string | null;
	origin: string | null;
	small: string | null;
}

export const ImageFragments = {
	vOb: <ValuesOrBoolean<Image>> {
		id: true,
		uploadDate: true,
		images: true,
	}
};
