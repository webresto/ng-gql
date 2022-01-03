import { ModuleWithProviders } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import * as i0 from "@angular/core";
import * as i1 from "./directives/add-dish-to-cart.directive";
import * as i2 from "./directives/amount-cart.directive";
import * as i3 from "./directives/delete-from-cart.directive";
import * as i4 from "./directives/order-cart-user.directive";
import * as i5 from "./directives/dish-calc.directive";
import * as i6 from "./directives/set-dish-comment.directive";
import * as i7 from "./directives/set-amount.directive";
import * as i8 from "./directives/checkout.directive";
export interface NgGqlConfig {
    url: string;
}
export declare class NgGqlModule {
    constructor(apollo: Apollo, httpLink: HttpLink, config: NgGqlConfig);
    static forRoot(config: NgGqlConfig): ModuleWithProviders<NgGqlModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgGqlModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgGqlModule, [typeof i1.AddDishToCartDirective, typeof i2.AmountCartDirective, typeof i3.DeleteFromCartDirective, typeof i4.OrderCartUserDirective, typeof i5.DishCalcDirective, typeof i6.SetDishCommentDirective, typeof i7.SetAmountDirective, typeof i8.CheckoutDirective], never, [typeof i1.AddDishToCartDirective, typeof i2.AmountCartDirective, typeof i3.DeleteFromCartDirective, typeof i4.OrderCartUserDirective, typeof i5.DishCalcDirective, typeof i6.SetDishCommentDirective, typeof i7.SetAmountDirective, typeof i8.CheckoutDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgGqlModule>;
}
