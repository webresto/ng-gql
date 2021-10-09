import { Dish } from '../dish/dish';
export declare class Group {
    id: string;
    description: string;
    name: string;
    visible: string;
    order: number;
    dishes?: Dish[];
    discount?: number;
    parentGroup?: Group;
    slug?: string;
}
