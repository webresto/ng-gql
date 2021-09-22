import { Image } from "../image/image";
import { GroupModifier } from "../group-modifier/group-modifier";
export declare class Dish {
    id: string;
    name: string;
    description: string;
    groupId: string;
    price: number;
    weight: number;
    balance: number;
    tags: DishTag[];
    additionalInfo: string | number | {
        [key: string]: string | any;
    } | null;
    images: Image[];
    parentGroup: {
        id: string;
    };
    modifiers: GroupModifier[];
}
export declare class DishTag {
    name: string;
}
//# sourceMappingURL=dish.d.ts.map