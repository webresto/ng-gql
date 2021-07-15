import { NgCartService } from '../services/ng-cart.service';
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
}
