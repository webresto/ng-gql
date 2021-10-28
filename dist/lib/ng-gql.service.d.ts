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
export declare type NavigationData = {
    [key: string]: Navigation;
};
export declare class NgGqlService {
    private apollo;
    menu$: BehaviorSubject<Group[]>;
    menuLoading: boolean;
    dishes$: BehaviorSubject<Dish[]>;
    dishesLoading: boolean;
    cart$: BehaviorSubject<Cart>;
    cartLoading: boolean;
    navigationData$: BehaviorSubject<NavigationData>;
    navigationDataLoading: boolean;
    paymentMethodLoading: boolean;
    getPhoneLoading: boolean;
    checkPhoneLoading: boolean;
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
    getNavigation$(): BehaviorSubject<NavigationData>;
    getMenu$(slug?: string | string[]): BehaviorSubject<Group[]>;
    getDishes$(): BehaviorSubject<Dish[]>;
    getOrder$(orderId?: string): Observable<Order>;
    getCart$(cartId?: string): BehaviorSubject<Cart>;
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
    customQuery$<T = any>(name: string, queryObject: any, variables?: any): Observable<T>;
    customMutation$<T = any>(name: string, queryObject: any, variables?: {}): Observable<FetchResult<T>>;
}
