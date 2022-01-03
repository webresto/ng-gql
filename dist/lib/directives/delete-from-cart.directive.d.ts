import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
export declare class DeleteFromCartDirective {
    private cartService;
    cart: any;
    constructor(cartService: NgCartService);
    dish: any;
    amountDish: any;
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteFromCartDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DeleteFromCartDirective, "[deleteFromCart]", never, { "dish": "dish"; "amountDish": "amountDish"; }, {}, never>;
}
