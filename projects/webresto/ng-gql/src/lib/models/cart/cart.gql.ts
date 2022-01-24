import { gql } from 'apollo-angular';
import { PaymentMethodFragments } from '../payment-method/payment-method.gql';
import { CartDishFragments } from '../cart-dish/cart-dish.gql';
import { DishFragments } from '../dish/dish.gql';
import type { CartModifier } from '../modifier/cart-modifier';
import type { CustomfFields } from '../custom-fields/custom-fields';
import { DocumentNode } from 'graphql';

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
			customer
			address
		}
	`,
	cartOrderData: gql`
		fragment CartOrderDataFragment on Cart {
			rmsId
			rmsOrderNumber
			rmsDeliveryDate
		}
	`,
};

export const CartGql = {
	queries: {
		getOrder: (orderId: string, customFields: CustomfFields) => {
			const queryArguments = orderId ? `(orderNumber: "${orderId}")` : '';
			return gql`
				query getOrder {
					getOrder${queryArguments} {
						cart {
							...CartFragment
							...CartOrderDataFragment
							dishes {
								...CartDishFragment
								${(customFields['CartDish'] || []).join('\n')}
							}
							paymentMethod {
								...PaymentMethodFragment
								${(customFields['PaymentMethod'] || []).join('\n')}
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
		getCart: (cartId: string | null = null, customFields: CustomfFields) => {
			if (cartId == 'null') cartId = null;
			const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
			return gql`
				query GetCart {
					cart${queryArguments} {
						...CartFragment
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
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
		addDishToCart: (customFields: CustomfFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		removeDishFromCart: (customFields: CustomfFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		setDishAmount: (customFields: CustomfFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		setDishComment: (customFields: CustomfFields) => {
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
						${(customFields['Cart'] || []).join('\n')}
						dishes {
							...CartDishFragment
							${(customFields['CartDish'] || []).join('\n')}
						}
						deliveryItem {
							...DishFragment
							${(customFields['Dish'] || []).join('\n')}
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		orderCart: (customFields: CustomfFields) => {
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
							${(customFields['Cart'] || []).join('\n')}
							dishes {
								...CartDishFragment
								${(customFields['CartDish'] || []).join('\n')}
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
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
		},
		checkCart: (customFields: CustomfFields) => {
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
							${(customFields['Cart'] || []).join('\n')}
							dishes {
								...CartDishFragment
								${(customFields['CartDish'] || []).join('\n')}
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
				${CartFragments.cart}
				${CartDishFragments.cartDish}
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
		getCart: (cartId: string | null = null) => {
			if (cartId == 'null') cartId = null;
			const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
			return gql`
				GetCart {
					cart${queryArguments} {
						id
						dishesCount
						deliveryDescription
						message
						total
						orderTotal
						cartTotal
						discountTotal
					}
				}
				${CartFragments.cart}
			`;
		}
	}
}