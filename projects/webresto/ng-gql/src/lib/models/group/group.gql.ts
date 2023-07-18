import type { Dish } from '../dish/dish.gql';
import { Image } from '../image/image.gql';

export interface Group {
  id: string;
  description: string;
  name: string;
  slug?: string;
  icon?: string;
  visible: boolean;
  sortOrder: number;
  dishesIds: string[];
  dishes?: Partial<Dish>[];
  discount?: string | null;
  parentGroup?: Partial<Pick<Group, 'id' | 'dishesPlaceholder'>>;
  childGroups: Partial<Group>[];
  dishesPlaceholder: Partial<Image> | null;
}
export type PartialGroupNullable = Pick<Group, 'slug'> & {
  id: string | null;
};
