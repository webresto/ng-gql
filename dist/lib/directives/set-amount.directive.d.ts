import { NgCartService } from '../services/ng-cart.service';
export declare class SetAmountDirective {
    private cartService;
    action: any;
    dish: any;
    onClick(): void;
    private cart;
    constructor(cartService: NgCartService);
    changeAmount(action: any): void;
}
