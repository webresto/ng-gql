import { gql } from 'apollo-angular';
import { PaymentMethodFragments } from '../payment-method/payment-method.gql';
import { CartDishFragments } from '../cart-dish/cart-dish.gql';
import { DishFragments } from '../dish/dish.gql';
import { CartModifier } from '../modifier/cart-modifier';

export type AddToCartInput = {
	cartId?: string,
	dishId?: string,
	amount?: number,
	modifiers?: CartModifier[],
	comment?: string,
	from?: string,
	replace?: boolean,
	cartDishId?: string
};

export type RemoveFromCartInput = {
	cartId?: string,
	cartDishId?: number,
	amount?: number
};

export type SetDishAmountInput = {
	cartId?: string,
	cartDishId?: number,
	amount?: number
};

export type SetDishCommentInput = {
	cartId?: string,
	cartDishId?: number,
	comment?: string
};

export type OrderCartInput = {
	cartId: string,
	paymentMethodId?: string,
	selfService?: boolean,
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
	custumer?: {
		phone: string,
		mail?: string,
		name: string
	},
	comment?: string,
	customData?: any
};

export type CheckPhoneCodeInput = {
	phone: string,
	code: string
};

export const CartFragments = {
	cart: gql`
		fragment CartFragment on Cart {
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
			cartTotal
			discountTotal
			state
			customData
		}
	`,
	cartOrderData: gql`
		fragment CartOrderDataFragment on Cart {
			rmsDelivered
			rmsId
			rmsOrderNumber
			rmsOrderData
			rmsDeliveryDate
			rmsErrorMessage
			rmsErrorCode
			rmsStatusCode
			customer
			address
			paid
			isPaymentPromise
		}
	`,
};

export const CartGql = {
	queries: {
		getOrder: (orderId: string) => {
			const queryArguments = orderId ? `(orderNumber: "${orderId}")` : '';
			return gql`
				query getOrder {
					getOrder${queryArguments} {
						cart {
							...CartFragment
							...CartOrderDataFragment
							dishes {
								...CartDishFragment
							}
							paymentMethod {
								...PaymentMethodFragment
							}
						}
						customData
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${CartFragments.cartOrderData}
				${PaymentMethodFragments.paymentMethod}
			`;
		},
		getCart: (cartId: string = null) => {
			if(cartId == 'null') cartId = null;
			const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
			return gql`
				query GetCart {
					cart${queryArguments} {
						...CartFragment
						dishes {
							...CartDishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
			`;
		},
		getPhone: (phone: string) => {
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
					}
				}
			`;
		},
		checkPhone: (phone: string) => {
			return gql`
				query checkPhone {
					checkPhone(phone: "${phone}") {
						type
						title
						message
						confirmed
						firstbuy
					}
				}
			`;
		}
	},
	mutations: {
		addDishToCart: () => {
			return gql`
				mutation AddDishToCart(
					$cartId: String, 
					$dishId: String, 
					$amount: Int, 
					$modifiers: Json, 
					$comment: String,
					$from: String,
					$replace: Boolean,
					$cartDishId: Int
				) {
					cartAddDish(
						cartId: $cartId,
						dishId: $dishId,
						amount: $amount,
						modifiers: $modifiers,
						comment: $comment,
						from: $from,
						replace: $replace,
						cartDishId: $cartDishId
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		removeDishFromCart: () => {
			return gql`
				mutation cartRemoveDish(
					$cartId: String!, 
					$cartDishId: Int!, 
					$amount: Int!, 
				) {
					cartRemoveDish(
						id: $cartId,
						cartDishId: $cartDishId,
						amount: $amount,
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		setDishAmount: () => {
			return gql`
				mutation cartSetDishAmount(
					$cartId: String,
					$cartDishId: Int,
					$amount: Int
				) {
					cartSetDishAmount(
						id: $cartId,
						cartDishId: $cartDishId,
						amount: $amount
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		setDishComment: () => {
			return gql`
				mutation cartSetDishComment(
					$cartId: String,
					$cartDishId: Int,
					$comment: Int
				) {
					cartSetDishComment(
						id: $cartId,
						cartDishId: $cartDishId,
						comment: $comment
					) {
						...CartFragment
						dishes {
							...CartDishFragment
						}
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		orderCart: () => {
			return gql`
				mutation orderCart(
					$cartId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!
				) {
					orderCart(
						cartId: $cartId,
						paymentMethodId: $paymentMethodId,
						selfService: $selfService,
						address: $address,
						customer: $customer
					) {
						cart {
							...CartFragment
							dishes {
								...CartDishFragment
							}
							deliveryItem {
								...DishFragment
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
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		checkCart: () => {
			return gql`
				mutation checkCart(
					$cartId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!,
					$comment: String,
					$date: String,
					$customData: Json
				) {
					checkCart(
						cartId: $cartId,
						paymentMethodId: $paymentMethodId,
						selfService: $selfService,
						address: $address,
						customer: $customer,
						comment: $comment,
						date: $date,
						customData: $customData
					) {
						cart {
							...CartFragment
							dishes {
								...CartDishFragment
							}
							deliveryItem {
								...DishFragment
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
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		checkPhoneCode: () => {
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
					}
				}
			`;
		},
	}
}