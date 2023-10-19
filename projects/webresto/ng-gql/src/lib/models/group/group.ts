import type {Dish} from '../dish/dish';
import {Image} from '../image/image';

export interface Group {
  id: string;
  description: string;
  name: string;
  slug?: string;
  icon?: string;
  visible: boolean;
  sortOrder: number;
  dishesIds: string[];
  dishes?: Array<Partial<Dish>>;
  discount?: string | null;
  parentGroup?: Partial<Pick<Group, 'id' | 'dishesPlaceholder'>>;
  childGroups: Array<Partial<Group>>;
  dishesPlaceholder: Partial<Image> | null;
}
export type PartialGroupNullable = Pick<Group, 'slug'> & {
  id: string | null;
};
