import { EventEmitter } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<AddDishToCartDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AddDishToCartDirective, "[addToCart]", never, { "dish": "dish"; "amountDish": "amountDish"; "comment": "comment"; "replaceCartDishId": "replaceCartDishId"; }, { "loading": "loading"; "success": "success"; "error": "error"; }, never>;
}
//# sourceMappingURL=add-dish-to-cart.directive.d.ts.map