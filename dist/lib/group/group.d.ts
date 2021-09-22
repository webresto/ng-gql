import { Dish } from '../dish/dish';
export declare class Group {
    id: string;
    description: string;
    name: string;
    visible: string;
    order: number;
    dishes?: Dish[];
    parentGroup?: Group;
    slug?: string;
}
//# sourceMappingURL=group.d.ts.map