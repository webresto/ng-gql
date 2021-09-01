import { Image } from '../image/image';
import { GroupModifier } from '../group-modifier/group-modifier';
export declare class Dish {
    id: string;
    name: string;
    description: string;
    groupId: string;
    price: number;
    weight: number;
    balance: number;
    tags: any[];
    additionalInfo: any;
    images: Image[];
    parentGroup: {
        id: string;
    };
    modifiers: [GroupModifier];
}
//# sourceMappingURL=dish.d.ts.map