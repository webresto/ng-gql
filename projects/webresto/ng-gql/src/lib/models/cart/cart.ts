import { CartDish } from "../cart-dish/cart-dish";
import { Dish } from "../dish/dish";
import { PaymentMethod } from "../payment-method/payment-method";

export interface Cart {
  id: string;
  dishes: CartDish[];
  dishesCount: number;
  comment: string;
  personsCount: number;
  deliveryDescription: string;
  message: string;
  deliveryItem: Dish;
  deliveryCost: number;
  totalWeight: number;
  total: number;
  orderTotal: number;
  cartTotal: number;
  discountTotal: number;
  state: string;
  rmsDelivered?: boolean;
  rmsId?: string;
  rmsOrderNumber?: string;
  rmsOrderData?: any;
  rmsDeliveryDate?: string;
  rmsErrorMessage?: string;
  rmsErrorCode?: string;
  rmsStatusCode?: string;
  customer?: Customer;
  address?: Address;
  paid?: boolean;
  isPaymentPromise?: boolean;
  paymentMethod?: PaymentMethod;
  customData?: {
    [key: string]: string | any;
  };
}


export interface Customer {
  phone: string;
  mail?: string;
  name: string;
}

export interface Address {
  streetId?: string;
  home: string;
  comment?: string;
  city?: string;
  street: string;
  housing?: string;
  index?: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  doorphone?: string;
}