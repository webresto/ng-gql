import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { OrderCartInput } from '../cart/cart.gql';
import { CheckResponse } from '../cart/check-response';
import { EventMessage } from '../event-message/event-message';
import { NgGqlService } from '../ng-gql.service';
import { EventerService } from './eventer.service';
import * as i0 from "@angular/core";
export declare class NgCartService {
    private ngGqlService;
    private eventer;
    cartId: string;
    cart: BehaviorSubject<any>;
    modifiers$: BehaviorSubject<any>;
    modifiersMessage$: BehaviorSubject<any>;
    messages: EventMessage[];
    OrderFormChange: BehaviorSubject<any>;
    cartSubscription: Subscription;
    constructor(ngGqlService: NgGqlService, eventer: EventerService);
    getCartId(): string;
    setCartId(cartId: any): any;
    removeCartId(): void;
    userCart$(): BehaviorSubject<any> | Observable<any>;
    setModifiers(modifiers: any, messages?: EventMessage[]): void;
    getModifiers(): Observable<any>;
    initialStorage(): void;
    addDishToCart$(data: any): Observable<import("@webresto/ng-gql").Cart>;
    removeDishFromCart$(dishId: any, amount: any): Observable<import("@webresto/ng-gql").Cart>;
    orderCart$(data: OrderCartInput): Observable<CheckResponse>;
    checkCart$(data: OrderCartInput): Observable<CheckResponse>;
    setDishCountToCart$(dishId: any, amount: any): Observable<import("@webresto/ng-gql").Cart>;
    setDishComment$(dishId: any, comment: any): Observable<import("@webresto/ng-gql").Cart>;
    static ɵfac: i0.ɵɵFactoryDef<NgCartService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NgCartService>;
}
//# sourceMappingURL=ng-cart.service.d.ts.map