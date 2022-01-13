import { Image } from "../image/image";
import { Group } from "../group/group";

import { GroupModifier } from "../group-modifier/group-modifier";

export class Dish {
  id: string;
  name: string;
  description: string;
  groupId: string;
  price: number;
  oldPrice: number;
  weight: number;
  balance: number;
  tags?: DishTag[];
  additionalInfo?: string | number | { [key: string]: string | any } | null;
  images: Image[];
  discountAmount: number;
  discountType: string;
  parentGroup: {
    id: string;
    dishPlaceholder: Image
  };
  modifiers?: GroupModifier[];
  
  //
  seoDescription?: string;
  seoKeywords?: string;
  seoText?: string;
  seoTitle?: string;
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
  visible?: boolean;
  modifier?: boolean;
  promo?: boolean;
}

export class DishTag {
  name: string;
}
