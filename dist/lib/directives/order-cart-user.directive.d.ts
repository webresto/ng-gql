import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
export declare class OrderCartUserDirective {
    private cartService;
    orderCart: any;
    cart: any;
    onClick(): void;
    private requiredFields;
    private checkerFields;
    constructor(cartService: NgCartService);
    ngAfterViewInit(): void;
    checkForFields(formDirectives: Array<any>, requiredFields: Array<string>): boolean;
    order(dataToSend: any): void;
    checkStreet(dataToSend: any): void;
    stringToNumber(str: number | any): number;
    static ɵfac: i0.ɵɵFactoryDef<OrderCartUserDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<OrderCartUserDirective, "[orderCart]", never, { "orderCart": "orderCart"; }, {}, never>;
}
//# sourceMappingURL=order-cart-user.directive.d.ts.map