import { EventEmitter } from '@angular/core';
import type { Cart, Dish, CartModifier } from '../models';
import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
export declare class AddDishToCartDirective {
    private cartService;
    cart: Cart | undefined;
    modifiers: CartModifier[];
    constructor(cartService: NgCartService);
    dish: Dish | undefined;
    amountDish: number;
    comment: string | undefined;
    replaceCartDishId: boolean;
    loading: EventEmitter<boolean>;
    success: EventEmitter<boolean>;
    error: EventEmitter<any>;
    onClick(): void;
    private addDishToCart;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddDishToCartDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AddDishToCartDirective, "[addToCart]", never, { "dish": "dish"; "amountDish": "amountDish"; "comment": "comment"; "replaceCartDishId": "replaceCartDishId"; }, { "loading": "loading"; "success": "success"; "error": "error"; }, never>;
}
