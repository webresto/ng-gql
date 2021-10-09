import { Dish } from '../dish/dish';
export declare class Modifier {
    modifierId: string;
    maxAmount: number;
    minAmount: number;
    amount?: number;
    defaultAmount: number;
    hideIfDefaultAmount: boolean;
    dish: Dish;
}
