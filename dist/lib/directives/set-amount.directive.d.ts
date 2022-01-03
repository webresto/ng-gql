import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
export declare class SetAmountDirective {
    private cartService;
    action: any;
    dish: any;
    onClick(): void;
    private cart;
    constructor(cartService: NgCartService);
    changeAmount(action: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SetAmountDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SetAmountDirective, "[setDishAmount]", never, { "action": "action"; "dish": "dish"; }, {}, never>;
}
