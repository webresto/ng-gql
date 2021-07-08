import { gql } from 'apollo-angular';
import { CartDishFragments } from '../cart-dish/cart-dish.gql';
import { DishFragments } from '../dish/dish.gql';

export type AddToCartInput = {
	cartId?: string,
	dishId?: string,
	amount?: number,
	modifiers?: any,
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
	}
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
		}
	`
};

export const CartGql = {
	queries: {
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
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
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
					$cartDishId: String
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
						cartId: $cartId
						paymentMethodId: $paymentMethodId
						selfService: $selfService
						address: $address
						customer: $customer
					) {
						cart {
							...CartFragment
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
			`;
		},
		checkCart: () => {
			return gql`
				mutation checkCart(
					$cartId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!
				) {
					checkCart(
						cartId: $cartId
						paymentMethodId: $paymentMethodId
						selfService: $selfService
						address: $address
						customer: $customer
					) {
						cart {
							...CartFragment
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
			`;
		}
	}
}