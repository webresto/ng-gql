import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from './cart/cart';
import { AddToCartInput, RemoveFromCartInput, OrderCartInput, CheckPhoneCodeInput } from './cart/cart.gql';
import { CheckPhoneResponse } from './cart/check-phone-response';
import { CheckResponse } from './cart/check-response';
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
    constructor(apollo: Apollo);
    getNavigation$(): BehaviorSubject<NavigationData>;
    getMenu$(slug?: string): BehaviorSubject<Group[]>;
    getDishes$(): BehaviorSubject<Dish[]>;
    getCart$(cartId?: string): BehaviorSubject<Cart>;
    getPhone$(phone: string): Observable<Phone>;
    checkPhone$(phone: string): Observable<CheckPhoneResponse>;
    getPaymentMethods$(cartId: string): Observable<PaymentMethod[]>;
    addDishToCart$(data: AddToCartInput): Observable<Cart>;
    orderCart$(data: OrderCartInput): Observable<CheckResponse>;
    checkCart$(data: OrderCartInput): Observable<CheckResponse>;
    checkPhoneCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse>;
    removeDishFromCart$(data: RemoveFromCartInput): Observable<Cart>;
    customQuery$(name: string, queryObject: any, data?: any): Observable<any>;
    customMutation$(name: string, queryObject: any, data?: any): Observable<import("@apollo/client/core").FetchResult<unknown, Record<string, any>, Record<string, any>>>;
}
