import { FetchResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from './cart/cart';
import { AddToCartInput, RemoveFromCartInput, OrderCartInput, CheckPhoneCodeInput, SetDishAmountInput, SetDishCommentInput } from './cart/cart.gql';
import { CheckPhoneResponse } from './cart/check-phone-response';
import { CheckResponse } from './cart/check-response';
import { Order } from './cart/order';
import { Phone } from './cart/phone';
import { Dish } from './dish/dish';
import { Group } from './group/group';
import { Navigation } from './navigation/navigation';
import { PaymentMethod } from './payment-method/payment-method';
import * as i0 from "@angular/core";
export declare type NavigationData = {
    [key: string]: Navigation;
};
export declare class NgGqlService {
    private apollo;
    menu$: BehaviorSubject<Group[] | null>;
    menuLoading: boolean | undefined;
    dishes$: BehaviorSubject<Dish[] | null>;
    dishesLoading: boolean | undefined;
    cart$: BehaviorSubject<Cart | null>;
    cartLoading: boolean | undefined;
    navigationData$: BehaviorSubject<NavigationData | null>;
    navigationDataLoading: boolean | undefined;
    paymentMethodLoading: boolean | undefined;
    getPhoneLoading: boolean | undefined;
    checkPhoneLoading: boolean | undefined;
    customQueryiesDataByName: {
        [key: string]: BehaviorSubject<any>;
    };
    customQueriesDataLoadingByName: {
        [key: string]: boolean;
    };
    customFields: {
        [key: string]: string[];
    };
    constructor(apollo: Apollo);
    addCustomField(modelName: string, field: string): void;
    getNavigation$(): BehaviorSubject<NavigationData | null>;
    getMenu$(slug: string | string[] | undefined): BehaviorSubject<Group[] | null>;
    getDishes$(): BehaviorSubject<Dish[] | null>;
    getOrder$(orderId: string): Observable<Order>;
    getCart$(cartId: string | undefined): BehaviorSubject<Cart | null>;
    getPhone$(phone: string): Observable<Phone>;
    checkPhone$(phone: string): Observable<CheckPhoneResponse>;
    getPaymentMethods$(cartId: string): Observable<PaymentMethod[]>;
    addDishToCart$(data: AddToCartInput): Observable<Cart>;
    orderCart$(data: OrderCartInput): Observable<CheckResponse>;
    checkCart$(data: OrderCartInput): Observable<CheckResponse>;
    checkPhoneCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse>;
    removeDishFromCart$(data: RemoveFromCartInput): Observable<Cart>;
    setDishAmount$(data: SetDishAmountInput): Observable<Cart>;
    setDishComment$(data: SetDishCommentInput): Observable<Cart>;
    customQuery$<T, N extends string = `${string}`>(name: N, queryObject: Record<N, Record<Extract<T, keyof T>, boolean>>, variables?: any): Observable<Record<N, T | T[]>>;
    customMutation$<T, N extends string = `${string}`>(name: N, queryObject: Record<N, Record<Extract<T, keyof T>, boolean>>, variables: T): Observable<FetchResult<T>>;
    customMutation$<T extends any>(name: string, queryObject: any, variables: any | undefined): Observable<FetchResult<T>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgGqlService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgGqlService>;
}
