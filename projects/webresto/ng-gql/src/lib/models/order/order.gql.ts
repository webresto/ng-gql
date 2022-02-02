import { gql } from 'apollo-angular';
import type { PaymentMethod } from '../payment-method/payment-method.gql';
import type { OrderDish } from '../order-dish/order-dish.gql';
import { PaymentMethodFragments } from '../payment-method/payment-method.gql';
import { OrderDishFragments } from '../order-dish/order-dish.gql';
import { DishFragments } from '../dish/dish.gql';
import type { OrderModifier } from '../modifier/modifier.gql';
import type { CustomfFields } from '../custom-fields/custom-fields';

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


export type AddToOrderInput = {
	orderId?: string,
	dishId?: string,
	amount?: number,
	modifiers?: OrderModifier[],
	comment?: string,
	from?: string,
	replace?: boolean,
	orderDishId?: string
};

export type RemoveFromOrderInput = {
	orderId?: string,
	orderDishId?: number,
	amount?: number
};

export type SetDishAmountInput = {
	orderId?: string,
	orderDishId?: number,
	amount?: number
};

export type SetDishCommentInput = {
	orderId?: string,
	orderDishId?: number,
	comment?: string
};

export type OrderInput = {
	orderId: string,
	paymentMethodId?: string,
	selfService?: boolean,
	pickupAddressId?: string,
	locationId?: string,
	date?: string,
	address?: {
		streetId?: string,
		home?: string,
		comment?: string,
		city?: string,
		street?: string,
		housing?: string,
		index?: string,
		entrance?: string,
		floor?: string,
		apartment?: string,
		doorphone?: string
	},
	customer?: {
		phone?: string,
		mail?: string,
		name?: string
	},
	comment?: string,
	notifyMethodId?: string,
	customData?: any
};

export type CheckPhoneCodeInput = {
	phone: string,
	code: string
};

export const OrderFragments = {
	order: gql`
		fragment OrderFragment on Order {
			id
			dishesCount
			comment
			personsCount
			deliveryDescription
			message
			deliveryCost
			totalWeight
			total
			orderTotal
			discountTotal
			state
			customData
			customer
			address
		}
	`,
	vOb: {
		id: true,
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
		dishes: OrderDishFragments.vOb
	}
};

export const OrderGql = {
	queries: {
		getOrder: (orderId: string, customFields: CustomfFields) => {
			const queryArguments = orderId ? `(orderNumber: "${orderId}")` : '';
			return gql`
				query getOrder {
					getOrder${queryArguments} {
						order {
							...OrderFragment
							...OrderOrderDataFragment
							dishes {
								...OrderDishFragment
								${(customFields['OrderDish'] || []).join('\n')}
							}
							paymentMethod {
								...PaymentMethodFragment
								${(customFields['PaymentMethod'] || []).join('\n')}
							}
						}
						customData
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
				${PaymentMethodFragments.paymentMethod}
			`;
		},
		getOrderAsCart: (orderId: string | null = null, customFields: CustomfFields) => {
			if (orderId == 'null') orderId = null;
			const queryArguments = orderId ? `(orderId: "${orderId}")` : '';
			return gql`
				query GetOrder {
					order${queryArguments} {
						...OrderFragment
						${(customFields['Order'] || []).join('\n')}
						dishes {
							...OrderDishFragment
							${(customFields['OrderDish'] || []).join('\n')}
						}
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
			`;
		},
		getPhone: (phone: string, customFields: CustomfFields) => {
			return gql`
				query phone {
					phone(phone: "${phone}") {
						id
						phone
						isFirst
						isConfirm
						codeTime
						confirmCode
						customData
						${(customFields['Phone'] || []).join('\n')}
					}
				}
			`;
		},
		checkPhone: (phone: string, customFields: CustomfFields) => {
			return gql`
				query checkPhone {
					checkPhone(phone: "${phone}") {
						type
						title
						message
						confirmed
						firstbuy
						${(customFields['Phone'] || []).join('\n')}
					}
				}
			`;
		}
	},
	mutations: {
		addDishToOrder: (customFields: CustomfFields) => {
			return gql`
				mutation AddDishToOrder(
					$orderId: String, 
					$dishId: String, 
					$amount: Int, 
					$modifiers: Json, 
					$comment: String,
					$from: String,
					$replace: Boolean,
					$orderDishId: Int
				) {
					orderAddDish(
						orderId: $orderId,
						dishId: $dishId,
						amount: $amount,
						modifiers: $modifiers,
						comment: $comment,
						from: $from,
						replace: $replace,
						orderDishId: $orderDishId
					) {
						...OrderFragment
						${(customFields['Order'] || []).join('\n')}
						dishes {
							...OrderDishFragment
							${(customFields['OrderDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
				${DishFragments.dish}
			`;
		},
		removeDishFromOrder: (customFields: CustomfFields) => {
			return gql`
				mutation orderRemoveDish(
					$orderId: String!, 
					$orderDishId: Int!, 
					$amount: Int!, 
				) {
					orderRemoveDish(
						id: $orderId,
						orderDishId: $orderDishId,
						amount: $amount,
					) {
						...OrderFragment
						${(customFields['Order'] || []).join('\n')}
						dishes {
							...OrderDishFragment
							${(customFields['OrderDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
				${DishFragments.dish}
			`;
		},
		setDishAmount: (customFields: CustomfFields) => {
			return gql`
				mutation orderSetDishAmount(
					$orderId: String,
					$orderDishId: Int,
					$amount: Int
				) {
					orderSetDishAmount(
						id: $orderId,
						orderDishId: $orderDishId,
						amount: $amount
					) {
						...OrderFragment
						${(customFields['Order'] || []).join('\n')}
						dishes {
							...OrderDishFragment
							${(customFields['OrderDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
				${DishFragments.dish}
			`;
		},
		setDishComment: (customFields: CustomfFields) => {
			return gql`
				mutation orderSetDishComment(
					$orderId: String,
					$orderDishId: Int,
					$comment: Int
				) {
					orderSetDishComment(
						id: $orderId,
						orderDishId: $orderDishId,
						comment: $comment
					) {
						...OrderFragment
						${(customFields['Order'] || []).join('\n')}
						dishes {
							...OrderDishFragment
							${(customFields['OrderDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
				${DishFragments.dish}
			`;
		},
		sendOrder: (customFields: CustomfFields) => {
			return gql`
				mutation SendOrder(
					$orderId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!
				) {
					sendOrder(
						orderId: $orderId,
						paymentMethodId: $paymentMethodId,
						selfService: $selfService,
						address: $address,
						customer: $customer
					) {
						order {
							...OrderFragment
							${(customFields['Order'] || []).join('\n')}
							dishes {
								...OrderDishFragment
								${(customFields['OrderDish'] || []).join('\n')}
							}
							deliveryItem {
								...DishFragment
								${(customFields['Dish'] || []).join('\n')}
							}
						}
						message {
							title
							type
							message
						}
						action {
							type
							data
						}
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
				${DishFragments.dish}
			`;
		},
		checkOrder: (customFields: CustomfFields) => {
			return gql`
				mutation checkOrder(
					$orderId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!,
					$comment: String,
					$date: String,
					$customData: Json
				) {
					checkOrder(
						orderId: $orderId,
						paymentMethodId: $paymentMethodId,
						selfService: $selfService,
						address: $address,
						customer: $customer,
						comment: $comment,
						date: $date,
						customData: $customData
					) {
						order {
							...OrderFragment
							${(customFields['Order'] || []).join('\n')}
							dishes {
								...OrderDishFragment
								${(customFields['OrderDish'] || []).join('\n')}
							}
							deliveryItem {
								...DishFragment
								${(customFields['Dish'] || []).join('\n')}
							}
						}
						message {
							title
							type
							message
						}
						action {
							type
							data
						}
					}
				}
				${OrderFragments.order}
				${OrderDishFragments.orderDish}
				${DishFragments.dish}
			`;
		},
		checkPhoneCode: (customFields: CustomfFields) => {
			return gql`
				mutation checkPhoneCode(
					$phone: String!,
					$code: String!
				) {
					setPhoneCode(
						phone: $phone,
						code: $code
					) {
						type
						title
						message
						confirmed
						firstbuy
						${(customFields['PhoneCode'] || []).join('\n')}
					}
				}
			`;
		},
	},
	subscriptions: {
		getOrder: (orderId: string | null = null) => {
			if (orderId == 'null') orderId = null;
			const queryArguments = orderId ? `(orderId: "${orderId}")` : '';
			return gql`
				GetOrder {
					order${queryArguments} {
						id
						dishesCount
						deliveryDescription
						message
						total
						orderTotal
						orderTotal
						discountTotal
					}
				}
				${OrderFragments.order}
			`;
		}
	}
}