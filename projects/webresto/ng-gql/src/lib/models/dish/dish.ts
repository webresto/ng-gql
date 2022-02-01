import type { Image } from "../image/image";
import type { GroupModifier } from "../group-modifier/group-modifier";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  balance: number;
  tags?: DishTag[];
  additionalInfo?: string | number | { [key: string]: string | any } | null;
  images: Image[];
  groupId:string;
  parentGroup: {
    id: string;
    dishesPlaceholder: Image | null
  };
  modifiers?: GroupModifier[];
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoText?: string | null;
  seoTitle?: string | null;
  carbohydrateAmount?: number;
  carbohydrateFullAmount?: number;
  energyAmount?: number;
  energyFullAmount?: number;
  fatAmount?: number;
  fatFullAmount?: number;
  fiberAmount?: number;
  fiberFullAmount?: number;
  measureUnit?: string;
  type?: string;
  order?: number;
  isDeleted?: boolean;
  isModificable?: boolean;
  composition?: string;
  visible?: boolean | null;
  modifier?: boolean;
  promo?: boolean | null;
}

export interface DishTag {
  name: string;
}
