import { Dish } from '../dish/dish';
import { CartModifier } from '../modifier/cart-modifier';
export declare class CartDish {
    id: number;
    amount: number;
    dish: Dish;
    discountTotal: number;
    comment: string;
    weight: number;
    totalWeight: number;
    modifiers: [CartModifier];
}
