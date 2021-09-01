import { gql } from 'apollo-angular';
import { PaymentMethodFragments } from '../payment-method/payment-method.gql';
import { CartDishFragments } from '../cart-dish/cart-dish.gql';
import { DishFragments } from '../dish/dish.gql';
export const CartFragments = {
    cart: gql `
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
	`,
    cartOrderData: gql `
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
const ɵ0 = (orderId) => {
    const queryArguments = orderId ? `(orderNumber: "${orderId}")` : '';
    return gql `
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
}, ɵ1 = (cartId = null) => {
    if (cartId == 'null')
        cartId = null;
    const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
    return gql `
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
}, ɵ2 = (phone) => {
    return gql `
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
}, ɵ3 = (phone) => {
    return gql `
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
}, ɵ4 = () => {
    return gql `
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
}, ɵ5 = () => {
    return gql `
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
}, ɵ6 = () => {
    return gql `
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
}, ɵ7 = () => {
    return gql `
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
}, ɵ8 = () => {
    return gql `
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
}, ɵ9 = () => {
    return gql `
				mutation checkCart(
					$cartId: String!, 
					$paymentMethodId: String!,
					$selfService: Boolean,
					$address: Address,
					$customer: Customer!
				) {
					checkCart(
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
}, ɵ10 = () => {
    return gql `
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
};
export const CartGql = {
    queries: {
        getOrder: ɵ0,
        getCart: ɵ1,
        getPhone: ɵ2,
        checkPhone: ɵ3
    },
    mutations: {
        addDishToCart: ɵ4,
        removeDishFromCart: ɵ5,
        setDishAmount: ɵ6,
        setDishComment: ɵ7,
        orderCart: ɵ8,
        checkCart: ɵ9,
        checkPhoneCode: ɵ10,
    }
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhcnQvY2FydC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQTREakQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQlI7SUFDRCxhQUFhLEVBQUUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlakI7Q0FDRCxDQUFDO1dBSVUsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUM3QixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BFLE9BQU8sR0FBRyxDQUFBOztlQUVFLGNBQWM7Ozs7Ozs7Ozs7Ozs7O01BY3ZCLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLGFBQWE7TUFDM0Isc0JBQXNCLENBQUMsYUFBYTtJQUN0QyxDQUFDO0FBQ0gsQ0FBQyxPQUNRLENBQUMsU0FBaUIsSUFBSSxFQUFFLEVBQUU7SUFDbEMsSUFBRyxNQUFNLElBQUksTUFBTTtRQUFFLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbkMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0QsT0FBTyxHQUFHLENBQUE7O1dBRUYsY0FBYzs7Ozs7OztNQU9uQixhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO0lBQzVCLENBQUM7QUFDSCxDQUFDLE9BQ1MsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUMzQixPQUFPLEdBQUcsQ0FBQTs7cUJBRVEsS0FBSzs7Ozs7Ozs7OztJQVV0QixDQUFDO0FBQ0gsQ0FBQyxPQUNXLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDN0IsT0FBTyxHQUFHLENBQUE7OzBCQUVhLEtBQUs7Ozs7Ozs7O0lBUTNCLENBQUM7QUFDSCxDQUFDLE9BR2MsR0FBRyxFQUFFO0lBQ25CLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUE4QlAsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtNQUMxQixhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxPQUNtQixHQUFHLEVBQUU7SUFDeEIsT0FBTyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JQLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDYyxHQUFHLEVBQUU7SUFDbkIsT0FBTyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JQLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDZSxHQUFHLEVBQUU7SUFDcEIsT0FBTyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JQLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDVSxHQUFHLEVBQUU7SUFDZixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFtQ1AsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtNQUMxQixhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxPQUNVLEdBQUcsRUFBRTtJQUNmLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1DUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLFFBQ2UsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JULENBQUM7QUFDSCxDQUFDO0FBOVJILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUN0QixPQUFPLEVBQUU7UUFDUixRQUFRLElBdUJQO1FBQ0QsT0FBTyxJQWVOO1FBQ0QsUUFBUSxJQWNQO1FBQ0QsVUFBVSxJQVlUO0tBQ0Q7SUFDRCxTQUFTLEVBQUU7UUFDVixhQUFhLElBbUNaO1FBQ0Qsa0JBQWtCLElBeUJqQjtRQUNELGFBQWEsSUF5Qlo7UUFDRCxjQUFjLElBeUJiO1FBQ0QsU0FBUyxJQXdDUjtRQUNELFNBQVMsSUF3Q1I7UUFDRCxjQUFjLEtBa0JiO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZEZyYWdtZW50cyB9IGZyb20gJy4uL3BheW1lbnQtbWV0aG9kL3BheW1lbnQtbWV0aG9kLmdxbCc7XG5pbXBvcnQgeyBDYXJ0RGlzaEZyYWdtZW50cyB9IGZyb20gJy4uL2NhcnQtZGlzaC9jYXJ0LWRpc2guZ3FsJztcbmltcG9ydCB7IERpc2hGcmFnbWVudHMgfSBmcm9tICcuLi9kaXNoL2Rpc2guZ3FsJztcblxuZXhwb3J0IHR5cGUgQWRkVG9DYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0ZGlzaElkPzogc3RyaW5nLFxuXHRhbW91bnQ/OiBudW1iZXIsXG5cdG1vZGlmaWVycz86IGFueSxcblx0Y29tbWVudD86IHN0cmluZyxcblx0ZnJvbT86IHN0cmluZyxcblx0cmVwbGFjZT86IGJvb2xlYW4sXG5cdGNhcnREaXNoSWQ/OiBzdHJpbmdcbn07XG5cbmV4cG9ydCB0eXBlIFJlbW92ZUZyb21DYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0Y2FydERpc2hJZD86IG51bWJlcixcblx0YW1vdW50PzogbnVtYmVyXG59O1xuXG5leHBvcnQgdHlwZSBTZXREaXNoQW1vdW50SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0Y2FydERpc2hJZD86IG51bWJlcixcblx0YW1vdW50PzogbnVtYmVyXG59O1xuXG5leHBvcnQgdHlwZSBTZXREaXNoQ29tbWVudElucHV0ID0ge1xuXHRjYXJ0SWQ/OiBzdHJpbmcsXG5cdGNhcnREaXNoSWQ/OiBudW1iZXIsXG5cdGNvbW1lbnQ/OiBzdHJpbmdcbn07XG5cbmV4cG9ydCB0eXBlIE9yZGVyQ2FydElucHV0ID0ge1xuXHRjYXJ0SWQ6IHN0cmluZyxcblx0cGF5bWVudE1ldGhvZElkPzogc3RyaW5nLFxuXHRzZWxmU2VydmljZT86IGJvb2xlYW4sXG5cdGFkZHJlc3M/OiB7XG5cdFx0c3RyZWV0SWQ/OiBzdHJpbmcsXG5cdFx0aG9tZT86IHN0cmluZyxcblx0XHRjb21tZW50Pzogc3RyaW5nLFxuXHRcdGNpdHk/OiBzdHJpbmcsXG5cdFx0c3RyZWV0Pzogc3RyaW5nLFxuXHRcdGhvdXNpbmc/OiBzdHJpbmcsXG5cdFx0aW5kZXg/OiBzdHJpbmcsXG5cdFx0ZW50cmFuY2U/OiBzdHJpbmcsXG5cdFx0Zmxvb3I/OiBzdHJpbmcsXG5cdFx0YXBhcnRtZW50Pzogc3RyaW5nLFxuXHRcdGRvb3JwaG9uZT86IHN0cmluZ1xuXHR9LFxuXHRjdXN0dW1lcj86IHtcblx0XHRwaG9uZTogc3RyaW5nLFxuXHRcdG1haWw/OiBzdHJpbmcsXG5cdFx0bmFtZTogc3RyaW5nXG5cdH1cbn07XG5cbmV4cG9ydCB0eXBlIENoZWNrUGhvbmVDb2RlSW5wdXQgPSB7XG5cdHBob25lOiBzdHJpbmcsXG5cdGNvZGU6IHN0cmluZ1xufTtcblxuZXhwb3J0IGNvbnN0IENhcnRGcmFnbWVudHMgPSB7XG5cdGNhcnQ6IGdxbGBcblx0XHRmcmFnbWVudCBDYXJ0RnJhZ21lbnQgb24gQ2FydCB7XG5cdFx0XHRpZFxuXHRcdFx0ZGlzaGVzQ291bnRcblx0XHRcdGNvbW1lbnRcblx0XHRcdHBlcnNvbnNDb3VudFxuXHRcdFx0ZGVsaXZlcnlEZXNjcmlwdGlvblxuXHRcdFx0bWVzc2FnZVxuXHRcdFx0ZGVsaXZlcnlDb3N0XG5cdFx0XHR0b3RhbFdlaWdodFxuXHRcdFx0dG90YWxcblx0XHRcdG9yZGVyVG90YWxcblx0XHRcdGNhcnRUb3RhbFxuXHRcdFx0ZGlzY291bnRUb3RhbFxuXHRcdFx0c3RhdGVcblx0XHR9XG5cdGAsXG5cdGNhcnRPcmRlckRhdGE6IGdxbGBcblx0XHRmcmFnbWVudCBDYXJ0T3JkZXJEYXRhRnJhZ21lbnQgb24gQ2FydCB7XG5cdFx0XHRybXNEZWxpdmVyZWRcblx0XHRcdHJtc0lkXG5cdFx0XHRybXNPcmRlck51bWJlclxuXHRcdFx0cm1zT3JkZXJEYXRhXG5cdFx0XHRybXNEZWxpdmVyeURhdGVcblx0XHRcdHJtc0Vycm9yTWVzc2FnZVxuXHRcdFx0cm1zRXJyb3JDb2RlXG5cdFx0XHRybXNTdGF0dXNDb2RlXG5cdFx0XHRjdXN0b21lclxuXHRcdFx0YWRkcmVzc1xuXHRcdFx0cGFpZFxuXHRcdFx0aXNQYXltZW50UHJvbWlzZVxuXHRcdH1cblx0YCxcbn07XG5cbmV4cG9ydCBjb25zdCBDYXJ0R3FsID0ge1xuXHRxdWVyaWVzOiB7XG5cdFx0Z2V0T3JkZXI6IChvcmRlcklkOiBzdHJpbmcpID0+IHtcblx0XHRcdGNvbnN0IHF1ZXJ5QXJndW1lbnRzID0gb3JkZXJJZCA/IGAob3JkZXJOdW1iZXI6IFwiJHtvcmRlcklkfVwiKWAgOiAnJztcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdHF1ZXJ5IGdldE9yZGVyIHtcblx0XHRcdFx0XHRnZXRPcmRlciR7cXVlcnlBcmd1bWVudHN9IHtcblx0XHRcdFx0XHRcdGNhcnQge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0Li4uQ2FydE9yZGVyRGF0YUZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHBheW1lbnRNZXRob2Qge1xuXHRcdFx0XHRcdFx0XHRcdC4uLlBheW1lbnRNZXRob2RGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjdXN0b21EYXRhXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydE9yZGVyRGF0YX1cblx0XHRcdFx0JHtQYXltZW50TWV0aG9kRnJhZ21lbnRzLnBheW1lbnRNZXRob2R9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Z2V0Q2FydDogKGNhcnRJZDogc3RyaW5nID0gbnVsbCkgPT4ge1xuXHRcdFx0aWYoY2FydElkID09ICdudWxsJykgY2FydElkID0gbnVsbDtcblx0XHRcdGNvbnN0IHF1ZXJ5QXJndW1lbnRzID0gY2FydElkID8gYChjYXJ0SWQ6IFwiJHtjYXJ0SWR9XCIpYCA6ICcnO1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgR2V0Q2FydCB7XG5cdFx0XHRcdFx0Y2FydCR7cXVlcnlBcmd1bWVudHN9IHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRnZXRQaG9uZTogKHBob25lOiBzdHJpbmcpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdHF1ZXJ5IHBob25lIHtcblx0XHRcdFx0XHRwaG9uZShwaG9uZTogXCIke3Bob25lfVwiKSB7XG5cdFx0XHRcdFx0XHRpZFxuXHRcdFx0XHRcdFx0cGhvbmVcblx0XHRcdFx0XHRcdGlzRmlyc3Rcblx0XHRcdFx0XHRcdGlzQ29uZmlybVxuXHRcdFx0XHRcdFx0Y29kZVRpbWVcblx0XHRcdFx0XHRcdGNvbmZpcm1Db2RlXG5cdFx0XHRcdFx0XHRjdXN0b21EYXRhXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Y2hlY2tQaG9uZTogKHBob25lOiBzdHJpbmcpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdHF1ZXJ5IGNoZWNrUGhvbmUge1xuXHRcdFx0XHRcdGNoZWNrUGhvbmUocGhvbmU6IFwiJHtwaG9uZX1cIikge1xuXHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0dGl0bGVcblx0XHRcdFx0XHRcdG1lc3NhZ2Vcblx0XHRcdFx0XHRcdGNvbmZpcm1lZFxuXHRcdFx0XHRcdFx0Zmlyc3RidXlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGA7XG5cdFx0fVxuXHR9LFxuXHRtdXRhdGlvbnM6IHtcblx0XHRhZGREaXNoVG9DYXJ0OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBBZGREaXNoVG9DYXJ0KFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZywgXG5cdFx0XHRcdFx0JGRpc2hJZDogU3RyaW5nLCBcblx0XHRcdFx0XHQkYW1vdW50OiBJbnQsIFxuXHRcdFx0XHRcdCRtb2RpZmllcnM6IEpzb24sIFxuXHRcdFx0XHRcdCRjb21tZW50OiBTdHJpbmcsXG5cdFx0XHRcdFx0JGZyb206IFN0cmluZyxcblx0XHRcdFx0XHQkcmVwbGFjZTogQm9vbGVhbixcblx0XHRcdFx0XHQkY2FydERpc2hJZDogSW50XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNhcnRBZGREaXNoKFxuXHRcdFx0XHRcdFx0Y2FydElkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0ZGlzaElkOiAkZGlzaElkLFxuXHRcdFx0XHRcdFx0YW1vdW50OiAkYW1vdW50LFxuXHRcdFx0XHRcdFx0bW9kaWZpZXJzOiAkbW9kaWZpZXJzLFxuXHRcdFx0XHRcdFx0Y29tbWVudDogJGNvbW1lbnQsXG5cdFx0XHRcdFx0XHRmcm9tOiAkZnJvbSxcblx0XHRcdFx0XHRcdHJlcGxhY2U6ICRyZXBsYWNlLFxuXHRcdFx0XHRcdFx0Y2FydERpc2hJZDogJGNhcnREaXNoSWRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNoRnJvbUNhcnQ6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIGNhcnRSZW1vdmVEaXNoKFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZyEsIFxuXHRcdFx0XHRcdCRjYXJ0RGlzaElkOiBJbnQhLCBcblx0XHRcdFx0XHQkYW1vdW50OiBJbnQhLCBcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2FydFJlbW92ZURpc2goXG5cdFx0XHRcdFx0XHRpZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdGNhcnREaXNoSWQ6ICRjYXJ0RGlzaElkLFxuXHRcdFx0XHRcdFx0YW1vdW50OiAkYW1vdW50LFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWxpdmVyeUl0ZW0ge1xuXHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdHNldERpc2hBbW91bnQ6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIGNhcnRTZXREaXNoQW1vdW50KFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZyxcblx0XHRcdFx0XHQkY2FydERpc2hJZDogSW50LFxuXHRcdFx0XHRcdCRhbW91bnQ6IEludFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjYXJ0U2V0RGlzaEFtb3VudChcblx0XHRcdFx0XHRcdGlkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0Y2FydERpc2hJZDogJGNhcnREaXNoSWQsXG5cdFx0XHRcdFx0XHRhbW91bnQ6ICRhbW91bnRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRzZXREaXNoQ29tbWVudDogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2FydFNldERpc2hDb21tZW50KFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZyxcblx0XHRcdFx0XHQkY2FydERpc2hJZDogSW50LFxuXHRcdFx0XHRcdCRjb21tZW50OiBJbnRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2FydFNldERpc2hDb21tZW50KFxuXHRcdFx0XHRcdFx0aWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRjYXJ0RGlzaElkOiAkY2FydERpc2hJZCxcblx0XHRcdFx0XHRcdGNvbW1lbnQ6ICRjb21tZW50XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0b3JkZXJDYXJ0OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBvcmRlckNhcnQoXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nISwgXG5cdFx0XHRcdFx0JHBheW1lbnRNZXRob2RJZDogU3RyaW5nISxcblx0XHRcdFx0XHQkc2VsZlNlcnZpY2U6IEJvb2xlYW4sXG5cdFx0XHRcdFx0JGFkZHJlc3M6IEFkZHJlc3MsXG5cdFx0XHRcdFx0JGN1c3RvbWVyOiBDdXN0b21lciFcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0b3JkZXJDYXJ0KFxuXHRcdFx0XHRcdFx0Y2FydElkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0cGF5bWVudE1ldGhvZElkOiAkcGF5bWVudE1ldGhvZElkLFxuXHRcdFx0XHRcdFx0c2VsZlNlcnZpY2U6ICRzZWxmU2VydmljZSxcblx0XHRcdFx0XHRcdGFkZHJlc3M6ICRhZGRyZXNzLFxuXHRcdFx0XHRcdFx0Y3VzdG9tZXI6ICRjdXN0b21lclxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y2FydCB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkZWxpdmVyeUl0ZW0ge1xuXHRcdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtZXNzYWdlIHtcblx0XHRcdFx0XHRcdFx0dGl0bGVcblx0XHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhY3Rpb24ge1xuXHRcdFx0XHRcdFx0XHR0eXBlXG5cdFx0XHRcdFx0XHRcdGRhdGFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdGNoZWNrQ2FydDogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2hlY2tDYXJ0KFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZyEsIFxuXHRcdFx0XHRcdCRwYXltZW50TWV0aG9kSWQ6IFN0cmluZyEsXG5cdFx0XHRcdFx0JHNlbGZTZXJ2aWNlOiBCb29sZWFuLFxuXHRcdFx0XHRcdCRhZGRyZXNzOiBBZGRyZXNzLFxuXHRcdFx0XHRcdCRjdXN0b21lcjogQ3VzdG9tZXIhXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNoZWNrQ2FydChcblx0XHRcdFx0XHRcdGNhcnRJZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdHBheW1lbnRNZXRob2RJZDogJHBheW1lbnRNZXRob2RJZCxcblx0XHRcdFx0XHRcdHNlbGZTZXJ2aWNlOiAkc2VsZlNlcnZpY2UsXG5cdFx0XHRcdFx0XHRhZGRyZXNzOiAkYWRkcmVzcyxcblx0XHRcdFx0XHRcdGN1c3RvbWVyOiAkY3VzdG9tZXJcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGNhcnQge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWVzc2FnZSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0bWVzc2FnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YWN0aW9uIHtcblx0XHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRjaGVja1Bob25lQ29kZTogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2hlY2tQaG9uZUNvZGUoXG5cdFx0XHRcdFx0JHBob25lOiBTdHJpbmchLFxuXHRcdFx0XHRcdCRjb2RlOiBTdHJpbmchXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHNldFBob25lQ29kZShcblx0XHRcdFx0XHRcdHBob25lOiAkcGhvbmUsXG5cdFx0XHRcdFx0XHRjb2RlOiAkY29kZVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0dGl0bGVcblx0XHRcdFx0XHRcdG1lc3NhZ2Vcblx0XHRcdFx0XHRcdGNvbmZpcm1lZFxuXHRcdFx0XHRcdFx0Zmlyc3RidXlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGA7XG5cdFx0fSxcblx0fVxufSJdfQ==