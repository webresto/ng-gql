export interface Image {
  id: string;
  uploadDate: string;
  variant: Partial<ImageItem>;
}

export interface ImageItem {
  large: string | null;
  origin: string | null;
  small: string | null;
}
