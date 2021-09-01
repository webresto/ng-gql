import { EventEmitter } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
export declare class SetDishCommentDirective {
    private cartService;
    comment: any;
    dish: any;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    onClick(): void;
    constructor(cartService: NgCartService);
    setComment(): void;
}
