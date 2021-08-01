import { CartDish } from '../cart-dish/cart-dish';
import { Dish } from '../dish/dish';
import { PaymentMethod } from '../payment-method/payment-method';

export class Cart {
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
	customer?: any;
	address?: any;
	paid?: boolean;
	isPaymentPromise?: boolean;
	paymentMethod?: PaymentMethod;
}
