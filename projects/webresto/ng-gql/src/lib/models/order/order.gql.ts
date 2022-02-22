import type { PaymentMethod } from '../payment-method/payment-method.gql';
import type { OrderDish } from '../order-dish/order-dish.gql';
import { OrderDishFragments } from '../order-dish/order-dish.gql';
import type { OrderModifier } from '../modifier/modifier.gql';
import type { Message, Action } from '../event-message/event-message';
import { ValuesOrBoolean } from '../values-or-boolean';

export interface Order {
	id: string;
	shortId: string;
	dishes: OrderDish[];
	dishesCount: number;
	comment: string | null;
	deliveryDescription: string;
	message: string | null;
	deliveryCost: number;
	totalWeight: number;
	total: number;
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
		[ key: string ]: string | any;
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

export type AddToOrderInput = {
	orderId?: string,
	dishId?: string,
	amount?: number,
	modifiers?: OrderModifier[],
	comment?: string,
	from?: string,
	replace?: boolean,
	orderDishId?: string;
};

export type RemoveOrSetAmountToDish = {
	id?: string,
	orderDishId?: number,
	amount?: number;
};

export type SetDishCommentInput = {
	id?: string,
	orderDishId?: number,
	comment?: string;
};
export type OrderInput = {
	orderId: string,
	paymentMethodId?: string,
	selfService: boolean,
	pickupAddressId?: string,
	locationId?: string,
	date?: string,
	address?: Address,
	customer?: Customer,
	comment?: string | null,
	notifyMethodId?: string,
	customData?: any;
};

export interface Phone {
	id: number;
	phone: string;
	isFirst: boolean;
	isConfirm: boolean;
	codeTime: string;
	confirmCode: string;
	customData: any;
}

export interface CheckPhoneCodeInput {
	phone: string;
	code: string;
};

export interface CheckPhoneResponse {
	type: string;
	title: string;
	message: string;
	confirmed: boolean;
	firstbuy: boolean;
}

export interface CheckResponse {
	order: Order;
	message: Message | null;
	action: Action | null;
}

export const OrderFragments = {
	vOb: <ValuesOrBoolean<Order>> {
		id: true,
		shortId: true,
		dishesCount: true,
		comment: true,
		deliveryDescription: true,
		message: true,
		deliveryCost: true,
		totalWeight: true,
		total: true,
		orderTotal: true,
		discountTotal: true,
		state: true,
		customData: true,
		customer: true,
		address: true,
		rmsId: true,
		rmsOrderNumber: true,
		rmsDeliveryDate: true,
		dishesIds: true,
		dishes: OrderDishFragments.vOb
	}
};

export type OrderAdditionalFields = {
	selfService: boolean,
	pickupAddressId?: string | undefined,
	locationId?: string | undefined,
	promocode?: string | undefined;
	deliveryTimeInfo?: {
		deliveryType: 'fast' | 'date-time' | undefined,
		deliveryDate: string | undefined,
		deliveryTime: string | undefined;
	};
};

export type OrderForm = Order & OrderAdditionalFields;
