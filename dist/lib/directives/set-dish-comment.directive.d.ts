import { EventEmitter } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
export declare class SetDishCommentDirective {
    private cartService;
    comment: any;
    dish: any;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    onClick(): void;
    constructor(cartService: NgCartService);
    setComment(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SetDishCommentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SetDishCommentDirective, "[setDishComment]", never, { "comment": "comment"; "dish": "dish"; }, { "success": "success"; "error": "error"; }, never>;
}
