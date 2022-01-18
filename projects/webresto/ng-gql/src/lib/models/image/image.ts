export interface Image {
	id: string;
	uploadDate: string;
	images: ImageItem[];
}

export interface ImageItem {
	large: string | null;
	origin: string | null;
	small: string | null;
}