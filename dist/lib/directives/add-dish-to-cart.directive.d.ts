import { EventEmitter } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
export declare class AddDishToCartDirective {
    private cartService;
    cart: any;
    modifiers: any;
    constructor(cartService: NgCartService);
    dish: any;
    amountDish: any;
    comment: string;
    replaceCartDishId: boolean;
    loading: EventEmitter<boolean>;
    success: EventEmitter<boolean>;
    error: EventEmitter<any>;
    onClick(): void;
    private addDishToCart;
}
