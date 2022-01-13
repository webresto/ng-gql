import { ModuleWithProviders } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import * as i0 from "@angular/core";
import * as i1 from "./directives/add-dish-to-cart.directive";
import * as i2 from "./directives/checkout.directive";
export interface NgGqlConfig {
    url: string;
}
export declare class NgGqlModule {
    constructor(apollo: Apollo, httpLink: HttpLink, config: NgGqlConfig);
    static forRoot(config: NgGqlConfig): ModuleWithProviders<NgGqlModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgGqlModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgGqlModule, [typeof i1.AddDishToCartDirective, typeof i2.CheckoutDirective], never, [typeof i1.AddDishToCartDirective, typeof i2.CheckoutDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgGqlModule>;
}
