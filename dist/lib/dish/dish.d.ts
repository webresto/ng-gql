import { Image } from "../image/image";
import { GroupModifier } from "../group-modifier/group-modifier";
export declare class Dish {
    id: string;
    name: string;
    description: string;
    groupId: string;
    price: number;
    oldPrice: number;
    weight: number;
    balance: number;
    tags?: DishTag[];
    additionalInfo?: string | number | {
        [key: string]: string | any;
    } | null;
    images: Image[];
    discountAmount: number;
    discountType: string;
    parentGroup: {
        id: string;
    };
    modifiers?: GroupModifier[];
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
export declare class DishTag {
    name: string;
}
