import { Renderer2, ElementRef } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
export declare class AmountCartDirective {
    private cartService;
    private renderer;
    private el;
    cart: object;
    amount: string;
    constructor(cartService: NgCartService, renderer: Renderer2, el: ElementRef);
}
