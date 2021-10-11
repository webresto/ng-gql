import { Dish } from '../dish/dish';
import { CartModifier } from '../modifier/cart-modifier';
export declare class CartDish {
    id: number;
    amount: number;
    dish: Dish;
    discountType: string;
    discountTotal: number;
    comment: string;
    weight: number;
    totalWeight: number;
    total: number;
    itemTotalBeforeDiscount: number;
    modifiers: CartModifier[];
    uniqueItems: number;
}
