import { OrderDish } from "../order-dish/order-dish";
import { PaymentMethod } from "../payment-method/payment-method";

export interface Order {
  id: string;
  dishes: OrderDish[];
  dishesCount: number;
  comment: string | null;
  personsCount: number | null;
  deliveryDescription: string;
  message: string | null;
  deliveryCost: number;
  totalWeight: number;
  total: number;
  cartTotal: number;
  orderTotal: number;
  discountTotal: number;
  state: string;
  rmsId?: string;
  rmsOrderNumber?: string;
  rmsDeliveryDate?: string;
  customer?: Customer;
  address?: Address;
  paid?: boolean;
  paymentMethod?: PaymentMethod;
  customData?: {
    [key: string]: string | any;
  } | null;
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

export interface OrderData {
	order: Order;
	customData: any;
}
