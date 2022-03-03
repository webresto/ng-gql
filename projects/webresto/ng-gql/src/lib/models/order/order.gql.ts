import type { PaymentMethod } from '../payment-method/payment-method.gql';
import type { OrderDish } from '../order-dish/order-dish.gql';
import { OrderDishFragments } from '../order-dish/order-dish.gql';
import type { OrderModifier } from '../modifier/modifier.gql';
import type { Message, Action } from '../event-message/event-message';
import type { ValuesOrBoolean } from '../values-or-boolean';
import type { Dish } from '../dish/dish.gql';

/**
 * @alias OrderState
 * Возможные состояния заказа.
 *  `CART` - начальное состояние заказа
 *  `CHECKOUT` - заказ проверен и готов к оформлению.
 * В заказе еще возможны изменения, но после любых изменений требуется повторно выполнять проверку.
 * @see 'NgOrderService.checkOrder'
 *  `PAYMENT` - заказ переходит в это состояние при выборе онлайн оплаты или через внутреннюю платежную систему (бонусами и т.п.),
		Состояние сохраняется, пока оплата не будет завершена, после чего заказ перейдет в состояние `ORDER`.
 *  `ORDER` - заказ успешно оформлен. Это финальный статус и он не подразумевает, что заказ также был доставлен.
		Данные о выполненной доставке могут быть получены от RMS (`Order.rmsDelivered`).
 */
export type OrderState = 'CART' | 'CHECKOUT' | 'PAYMENT' | 'ORDER';

export interface Order {
	id: string;
	shortId: string;
	dishes: OrderDish[];
	dishesCount: number;
	comment: string;
	deliveryDescription: string;
	message: string | null;
	deliveryCost: number;
	totalWeight: number;
	total: number;
	orderTotal: number;
	discountTotal: number;
	state: OrderState;
	rmsId?: string;
	rmsOrderNumber?: string;
	rmsDeliveryDate?: string;
	rmsDelivered?: boolean;
	customer: Customer | null;
	address: Address | null;
	paid?: boolean;
	paymentMethod: Pick<PaymentMethod, 'id' | 'title'> & Partial<Omit<PaymentMethod, 'id' | 'title'>> | null;
	customData: {
		[ key: string ]: string | any;
	} | null;
}

export interface Customer {
	phone: string | null;
	mail?: string;
	name: string | null;
}

export interface Address {
	streetId: string | null;
	home: string | null;
	comment?: string;
	city?: string;
	street: string | null;
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
	orderId: string,
	dishId?: string,
	amount?: number,
	modifiers?: OrderModifier[],
	comment?: string,
	from?: string,
	replace?: boolean,
};

export type RemoveOrSetAmountToDish<T extends (Dish | number)> = T extends Dish ? {
	dish: Dish;
	amount?: number;
	id: string;
} : {
	orderDishId?: number;
	amount?: number;
	id: string;
};

export type SetDishCommentInput<T extends (Dish | number)> = T extends Dish ? {
	id?: string,
	comment?: string;
	dish: Dish;
} : {
	id?: string,
	comment?: string;
	orderDishId?: number;
};

export type OrderInput = {
	orderId: string,
	paymentMethodId?: string,
	selfService: boolean,
	pickupAddressId?: string,
	locationId?: string,
	date?: string,
	address: Address | null,
	customer: Customer | null,
	comment?: string,
	notifyMethodId?: string,
	customData: any | null;
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
		dishes: OrderDishFragments.vOb,
		rmsDelivered: true,
		paymentMethod: {
			id: true,
			title: true
		}
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
