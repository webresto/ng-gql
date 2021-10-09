import { Image } from "../image/image";
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
  tags: DishTag[];
  additionalInfo: string | number | { [key: string]: string | any } | null;
  images: Image[];
  discountAmount: number;
  discountType: string;
  parentGroup: {
    id: string;
  };
  modifiers: GroupModifier[];
}

export class DishTag {
  name: string;
}
