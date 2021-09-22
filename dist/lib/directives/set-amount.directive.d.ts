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
    static ɵfac: i0.ɵɵFactoryDef<SetAmountDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SetAmountDirective, "[setDishAmount]", never, { "action": "action"; "dish": "dish"; }, {}, never>;
}
//# sourceMappingURL=set-amount.directive.d.ts.map