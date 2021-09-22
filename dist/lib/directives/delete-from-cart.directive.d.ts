import { NgCartService } from '../services/ng-cart.service';
export declare class DeleteFromCartDirective {
    private cartService;
    cart: any;
    constructor(cartService: NgCartService);
    dish: any;
    amountDish: any;
    onClick(): void;
}
