import { Renderer2, ElementRef } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
export declare class AmountCartDirective {
    private cartService;
    private renderer;
    private el;
    cart: object;
    amount: string;
    constructor(cartService: NgCartService, renderer: Renderer2, el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AmountCartDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AmountCartDirective, "[amountCart]", never, {}, {}, never>;
}
