export declare type AddToCartInput = {
    cartId?: string;
    dishId?: string;
    amount?: number;
    modifiers?: any;
    comment?: string;
    from?: string;
    replace?: boolean;
    cartDishId?: string;
};
export declare type RemoveFromCartInput = {
    cartId?: string;
    cartDishId?: number;
    amount?: number;
};
export declare type OrderCartInput = {
    cartId: string;
    paymentMethodId?: string;
    selfService?: boolean;
    address?: {
        streetId?: string;
        home?: string;
        comment?: string;
        city?: string;
        street?: string;
        housing?: string;
        index?: string;
        entrance?: string;
        floor?: string;
        apartment?: string;
        doorphone?: string;
    };
    custumer?: {
        phone: string;
        mail?: string;
        name: string;
    };
};
export declare type CheckPhoneCodeInput = {
    phone: string;
    code: string;
};
export declare const CartFragments: {
    cart: import("graphql").DocumentNode;
};
export declare const CartGql: {
    queries: {
        getCart: (cartId?: string) => import("graphql").DocumentNode;
        getPhone: (phone: string) => import("graphql").DocumentNode;
        checkPhone: (phone: string) => import("graphql").DocumentNode;
    };
    mutations: {
        addDishToCart: () => import("graphql").DocumentNode;
        removeDishFromCart: () => import("graphql").DocumentNode;
        orderCart: () => import("graphql").DocumentNode;
        checkCart: () => import("graphql").DocumentNode;
        checkPhoneCode: () => import("graphql").DocumentNode;
    };
};
