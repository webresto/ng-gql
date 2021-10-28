import { CartModifier } from '../modifier/cart-modifier';
export declare type AddToCartInput = {
    cartId?: string;
    dishId?: string;
    amount?: number;
    modifiers?: CartModifier[];
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
export declare type SetDishAmountInput = {
    cartId?: string;
    cartDishId?: number;
    amount?: number;
};
export declare type SetDishCommentInput = {
    cartId?: string;
    cartDishId?: number;
    comment?: string;
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
    comment?: string;
    customData?: any;
};
export declare type CheckPhoneCodeInput = {
    phone: string;
    code: string;
};
export declare const CartFragments: {
    cart: import("graphql").DocumentNode;
    cartOrderData: import("graphql").DocumentNode;
};
export declare const CartGql: {
    queries: {
        getOrder: (orderId: string, customFields: any) => import("graphql").DocumentNode;
        getCart: (cartId: string, customFields: any) => import("graphql").DocumentNode;
        getPhone: (phone: string, customFields: any) => import("graphql").DocumentNode;
        checkPhone: (phone: string, customFields: any) => import("graphql").DocumentNode;
    };
    mutations: {
        addDishToCart: (customFields: any) => import("graphql").DocumentNode;
        removeDishFromCart: (customFields: any) => import("graphql").DocumentNode;
        setDishAmount: (customFields: any) => import("graphql").DocumentNode;
        setDishComment: (customFields: any) => import("graphql").DocumentNode;
        orderCart: (customFields: any) => import("graphql").DocumentNode;
        checkCart: (customFields: any) => import("graphql").DocumentNode;
        checkPhoneCode: (customFields: any) => import("graphql").DocumentNode;
    };
};
