Documentation

export declare type CartBusEvent = {
    event: 'add';
    data: AddToOrderInput;
    loading: BehaviorSubject<boolean>;
    order: Order;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
} | {
    event: 'remove';
    data: RemoveFromOrderInput & {
        dish: Dish;
    };
    loading: BehaviorSubject<boolean>;
    order: Order;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
} | {
    event: 'check' | 'order';
    order: OrderInput;
    ordered?: BehaviorSubject<boolean>;
    successCb?: (check: CheckResponse) => void;
    errorCb?: (err: unknown) => void;
} | {
    event: 'load';
    orderId: string | undefined;
};


export declare class NgGqlService {
    private apollo;
    private config;
    customFields: {
        [modelName: string]: string[];
    };
    constructor(apollo: ApolloService, config: NgGqlConfig);
    addCustomField(modelName: string, field: string): void;
    private _navigationData$;
    getNavigation$(): Observable<Navigation[]>;
    rootGroupsSlugs$: Observable<string[]>;
    private _orderLoader$;
    private orderLoader$;
    order$: Observable<Order>;
    actions$: Observable<Action>;
    messages$: Observable<Message>;
    private dishes$;
    private loadedMenu$;
    getMenu$(slug: string | string[] | undefined): Observable<Group[] | null>;
    getDishes$(id?: string | string[]): Observable<Dish[]>;
    private _getOrder$;
    getOrder(orderId: string | undefined): Observable<Order>;
    loadOrderAsCart$(orderId: string | undefined): void;
    private _cartBus$;
    cartBus$: Subscription;
    getPhone$(phone: string): Observable<Phone | Phone[]>;
    checkPhone$(phone: string): Observable<CheckPhoneResponse | CheckPhoneResponse[]>;
    getPaymentMethods$(orderId: string): Observable<PaymentMethod[]>;
    addDishToOrder$(data: AddToOrderInput): Observable<Order>;
    sendOrder$(data: OrderInput): Observable<CheckResponse>;
    checkOrder$(data: OrderInput): Observable<CheckResponse>;
    checkPhoneCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse>;
    removeDishFromOrder$(data: RemoveFromOrderInput): Observable<Order>;
    setDishAmount$(data: SetDishAmountInput): Observable<Order>;
    setDishComment$(data: SetDishCommentInput): Observable<Order>;
    customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, optionalFields?: string[]): Observable<Record<N, T | T[]>>;
    customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, optionalFields?: string[]): Observable<Record<N, T | T[]>>;
    customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables: V, optionalFields?: string[]): Observable<Record<N, T>>;
    customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables: V, optionalFields?: string[]): Observable<Record<N, T>>;
    customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, optionalFields?: string[], extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>;
    customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, optionalFields?: string[], extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>;
    queryAndSubscribe<T, NQuery extends `${string}`, NSubscribe extends `${string}`, V = unknown>(nameQuery: NQuery, nameSubscribe: NSubscribe, queryObject: ValuesOrBoolean<T>, uniqueKeyForCompareItem: keyof T, variables?: V): Observable<T[]>;
    destroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgGqlService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgGqlService>;
}
