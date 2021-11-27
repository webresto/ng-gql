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
			customData
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
const ɵ0 = (orderId, customFields) => {
    const queryArguments = orderId ? `(orderNumber: "${orderId}")` : '';
    return gql `
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
}, ɵ1 = (cartId = null, customFields) => {
    if (cartId == 'null')
        cartId = null;
    const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
    return gql `
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
}, ɵ2 = (phone, customFields) => {
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
						${(customFields['Phone'] || []).join('\n')}
					}
				}
			`;
}, ɵ3 = (phone, customFields) => {
    return gql `
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
}, ɵ4 = (customFields) => {
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
}, ɵ5 = (customFields) => {
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
}, ɵ6 = (customFields) => {
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
}, ɵ7 = (customFields) => {
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
}, ɵ8 = (customFields) => {
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
}, ɵ9 = (customFields) => {
    return gql `
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
}, ɵ10 = (customFields) => {
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
						${(customFields['PhoneCode'] || []).join('\n')}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhcnQvY2FydC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQStEakQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUJSO0lBQ0QsYUFBYSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZWpCO0NBQ0QsQ0FBQztXQUlVLENBQUMsT0FBZSxFQUFFLFlBQVksRUFBRSxFQUFFO0lBQzNDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDcEUsT0FBTyxHQUFHLENBQUE7O2VBRUUsY0FBYzs7Ozs7O1VBTW5CLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJM0MsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O01BTXBELGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLGFBQWE7TUFDM0Isc0JBQXNCLENBQUMsYUFBYTtJQUN0QyxDQUFDO0FBQ0gsQ0FBQyxPQUNRLENBQUMsU0FBaUIsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFO0lBQ2hELElBQUcs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WSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJM0MsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7TUFjM0MsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtNQUMxQixhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxRQUNlLENBQUMsWUFBWSxFQUFFLEVBQUU7SUFDaEMsT0FBTyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7O1FBY0wsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7O0lBR2hELENBQUM7QUFDSCxDQUFDO0FBN1RILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUN0QixPQUFPLEVBQUU7UUFDUixRQUFRLElBeUJQO1FBQ0QsT0FBTyxJQWlCTjtRQUNELFFBQVEsSUFlUDtRQUNELFVBQVUsSUFhVDtLQUNEO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsYUFBYSxJQXNDWjtRQUNELGtCQUFrQixJQTRCakI7UUFDRCxhQUFhLElBNEJaO1FBQ0QsY0FBYyxJQTRCYjtRQUNELFNBQVMsSUEyQ1I7UUFDRCxTQUFTLElBaURSO1FBQ0QsY0FBYyxLQW1CYjtLQUNEO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IFBheW1lbnRNZXRob2RGcmFnbWVudHMgfSBmcm9tICcuLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwnO1xuaW1wb3J0IHsgQ2FydERpc2hGcmFnbWVudHMgfSBmcm9tICcuLi9jYXJ0LWRpc2gvY2FydC1kaXNoLmdxbCc7XG5pbXBvcnQgeyBEaXNoRnJhZ21lbnRzIH0gZnJvbSAnLi4vZGlzaC9kaXNoLmdxbCc7XG5pbXBvcnQgeyBDYXJ0TW9kaWZpZXIgfSBmcm9tICcuLi9tb2RpZmllci9jYXJ0LW1vZGlmaWVyJztcblxuZXhwb3J0IHR5cGUgQWRkVG9DYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0ZGlzaElkPzogc3RyaW5nLFxuXHRhbW91bnQ/OiBudW1iZXIsXG5cdG1vZGlmaWVycz86IENhcnRNb2RpZmllcltdLFxuXHRjb21tZW50Pzogc3RyaW5nLFxuXHRmcm9tPzogc3RyaW5nLFxuXHRyZXBsYWNlPzogYm9vbGVhbixcblx0Y2FydERpc2hJZD86IHN0cmluZ1xufTtcblxuZXhwb3J0IHR5cGUgUmVtb3ZlRnJvbUNhcnRJbnB1dCA9IHtcblx0Y2FydElkPzogc3RyaW5nLFxuXHRjYXJ0RGlzaElkPzogbnVtYmVyLFxuXHRhbW91bnQ/OiBudW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIFNldERpc2hBbW91bnRJbnB1dCA9IHtcblx0Y2FydElkPzogc3RyaW5nLFxuXHRjYXJ0RGlzaElkPzogbnVtYmVyLFxuXHRhbW91bnQ/OiBudW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIFNldERpc2hDb21tZW50SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0Y2FydERpc2hJZD86IG51bWJlcixcblx0Y29tbWVudD86IHN0cmluZ1xufTtcblxuZXhwb3J0IHR5cGUgT3JkZXJDYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZDogc3RyaW5nLFxuXHRwYXltZW50TWV0aG9kSWQ/OiBzdHJpbmcsXG5cdHNlbGZTZXJ2aWNlPzogYm9vbGVhbixcblx0YWRkcmVzcz86IHtcblx0XHRzdHJlZXRJZD86IHN0cmluZyxcblx0XHRob21lPzogc3RyaW5nLFxuXHRcdGNvbW1lbnQ/OiBzdHJpbmcsXG5cdFx0Y2l0eT86IHN0cmluZyxcblx0XHRzdHJlZXQ/OiBzdHJpbmcsXG5cdFx0aG91c2luZz86IHN0cmluZyxcblx0XHRpbmRleD86IHN0cmluZyxcblx0XHRlbnRyYW5jZT86IHN0cmluZyxcblx0XHRmbG9vcj86IHN0cmluZyxcblx0XHRhcGFydG1lbnQ/OiBzdHJpbmcsXG5cdFx0ZG9vcnBob25lPzogc3RyaW5nXG5cdH0sXG5cdGN1c3R1bWVyPzoge1xuXHRcdHBob25lOiBzdHJpbmcsXG5cdFx0bWFpbD86IHN0cmluZyxcblx0XHRuYW1lOiBzdHJpbmdcblx0fSxcblx0Y29tbWVudD86IHN0cmluZyxcblx0Y3VzdG9tRGF0YT86IGFueVxufTtcblxuZXhwb3J0IHR5cGUgQ2hlY2tQaG9uZUNvZGVJbnB1dCA9IHtcblx0cGhvbmU6IHN0cmluZyxcblx0Y29kZTogc3RyaW5nXG59O1xuXG5leHBvcnQgY29uc3QgQ2FydEZyYWdtZW50cyA9IHtcblx0Y2FydDogZ3FsYFxuXHRcdGZyYWdtZW50IENhcnRGcmFnbWVudCBvbiBDYXJ0IHtcblx0XHRcdGlkXG5cdFx0XHRkaXNoZXNDb3VudFxuXHRcdFx0Y29tbWVudFxuXHRcdFx0cGVyc29uc0NvdW50XG5cdFx0XHRkZWxpdmVyeURlc2NyaXB0aW9uXG5cdFx0XHRtZXNzYWdlXG5cdFx0XHRkZWxpdmVyeUNvc3Rcblx0XHRcdHRvdGFsV2VpZ2h0XG5cdFx0XHR0b3RhbFxuXHRcdFx0b3JkZXJUb3RhbFxuXHRcdFx0Y2FydFRvdGFsXG5cdFx0XHRkaXNjb3VudFRvdGFsXG5cdFx0XHRzdGF0ZVxuXHRcdFx0Y3VzdG9tRGF0YVxuXHRcdH1cblx0YCxcblx0Y2FydE9yZGVyRGF0YTogZ3FsYFxuXHRcdGZyYWdtZW50IENhcnRPcmRlckRhdGFGcmFnbWVudCBvbiBDYXJ0IHtcblx0XHRcdHJtc0RlbGl2ZXJlZFxuXHRcdFx0cm1zSWRcblx0XHRcdHJtc09yZGVyTnVtYmVyXG5cdFx0XHRybXNPcmRlckRhdGFcblx0XHRcdHJtc0RlbGl2ZXJ5RGF0ZVxuXHRcdFx0cm1zRXJyb3JNZXNzYWdlXG5cdFx0XHRybXNFcnJvckNvZGVcblx0XHRcdHJtc1N0YXR1c0NvZGVcblx0XHRcdGN1c3RvbWVyXG5cdFx0XHRhZGRyZXNzXG5cdFx0XHRwYWlkXG5cdFx0XHRpc1BheW1lbnRQcm9taXNlXG5cdFx0fVxuXHRgLFxufTtcblxuZXhwb3J0IGNvbnN0IENhcnRHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXRPcmRlcjogKG9yZGVySWQ6IHN0cmluZywgY3VzdG9tRmllbGRzKSA9PiB7XG5cdFx0XHRjb25zdCBxdWVyeUFyZ3VtZW50cyA9IG9yZGVySWQgPyBgKG9yZGVyTnVtYmVyOiBcIiR7b3JkZXJJZH1cIilgIDogJyc7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBnZXRPcmRlciB7XG5cdFx0XHRcdFx0Z2V0T3JkZXIke3F1ZXJ5QXJndW1lbnRzfSB7XG5cdFx0XHRcdFx0XHRjYXJ0IHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnRPcmRlckRhdGFGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0NhcnREaXNoJ10gfHwgW10pLmpvaW4oJ1xcbicpfVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHBheW1lbnRNZXRob2Qge1xuXHRcdFx0XHRcdFx0XHRcdC4uLlBheW1lbnRNZXRob2RGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snUGF5bWVudE1ldGhvZCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnRPcmRlckRhdGF9XG5cdFx0XHRcdCR7UGF5bWVudE1ldGhvZEZyYWdtZW50cy5wYXltZW50TWV0aG9kfVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdGdldENhcnQ6IChjYXJ0SWQ6IHN0cmluZyA9IG51bGwsIGN1c3RvbUZpZWxkcykgPT4ge1xuXHRcdFx0aWYoY2FydElkID09ICdudWxsJykgY2FydElkID0gbnVsbDtcblx0XHRcdGNvbnN0IHF1ZXJ5QXJndW1lbnRzID0gY2FydElkID8gYChjYXJ0SWQ6IFwiJHtjYXJ0SWR9XCIpYCA6ICcnO1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgR2V0Q2FydCB7XG5cdFx0XHRcdFx0Y2FydCR7cXVlcnlBcmd1bWVudHN9IHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydDYXJ0J10gfHwgW10pLmpvaW4oJ1xcbicpfVxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0NhcnREaXNoJ10gfHwgW10pLmpvaW4oJ1xcbicpfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRnZXRQaG9uZTogKHBob25lOiBzdHJpbmcsIGN1c3RvbUZpZWxkcykgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgcGhvbmUge1xuXHRcdFx0XHRcdHBob25lKHBob25lOiBcIiR7cGhvbmV9XCIpIHtcblx0XHRcdFx0XHRcdGlkXG5cdFx0XHRcdFx0XHRwaG9uZVxuXHRcdFx0XHRcdFx0aXNGaXJzdFxuXHRcdFx0XHRcdFx0aXNDb25maXJtXG5cdFx0XHRcdFx0XHRjb2RlVGltZVxuXHRcdFx0XHRcdFx0Y29uZmlybUNvZGVcblx0XHRcdFx0XHRcdGN1c3RvbURhdGFcblx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snUGhvbmUnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Y2hlY2tQaG9uZTogKHBob25lOiBzdHJpbmcsIGN1c3RvbUZpZWxkcykgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgY2hlY2tQaG9uZSB7XG5cdFx0XHRcdFx0Y2hlY2tQaG9uZShwaG9uZTogXCIke3Bob25lfVwiKSB7XG5cdFx0XHRcdFx0XHR0eXBlXG5cdFx0XHRcdFx0XHR0aXRsZVxuXHRcdFx0XHRcdFx0bWVzc2FnZVxuXHRcdFx0XHRcdFx0Y29uZmlybWVkXG5cdFx0XHRcdFx0XHRmaXJzdGJ1eVxuXHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydQaG9uZSddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGA7XG5cdFx0fVxuXHR9LFxuXHRtdXRhdGlvbnM6IHtcblx0XHRhZGREaXNoVG9DYXJ0OiAoY3VzdG9tRmllbGRzKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBBZGREaXNoVG9DYXJ0KFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZywgXG5cdFx0XHRcdFx0JGRpc2hJZDogU3RyaW5nLCBcblx0XHRcdFx0XHQkYW1vdW50OiBJbnQsIFxuXHRcdFx0XHRcdCRtb2RpZmllcnM6IEpzb24sIFxuXHRcdFx0XHRcdCRjb21tZW50OiBTdHJpbmcsXG5cdFx0XHRcdFx0JGZyb206IFN0cmluZyxcblx0XHRcdFx0XHQkcmVwbGFjZTogQm9vbGVhbixcblx0XHRcdFx0XHQkY2FydERpc2hJZDogSW50XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNhcnRBZGREaXNoKFxuXHRcdFx0XHRcdFx0Y2FydElkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0ZGlzaElkOiAkZGlzaElkLFxuXHRcdFx0XHRcdFx0YW1vdW50OiAkYW1vdW50LFxuXHRcdFx0XHRcdFx0bW9kaWZpZXJzOiAkbW9kaWZpZXJzLFxuXHRcdFx0XHRcdFx0Y29tbWVudDogJGNvbW1lbnQsXG5cdFx0XHRcdFx0XHRmcm9tOiAkZnJvbSxcblx0XHRcdFx0XHRcdHJlcGxhY2U6ICRyZXBsYWNlLFxuXHRcdFx0XHRcdFx0Y2FydERpc2hJZDogJGNhcnREaXNoSWRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydDYXJ0J10gfHwgW10pLmpvaW4oJ1xcbicpfVxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0NhcnREaXNoJ10gfHwgW10pLmpvaW4oJ1xcbicpfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snRGlzaCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdHJlbW92ZURpc2hGcm9tQ2FydDogKGN1c3RvbUZpZWxkcykgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2FydFJlbW92ZURpc2goXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nISwgXG5cdFx0XHRcdFx0JGNhcnREaXNoSWQ6IEludCEsIFxuXHRcdFx0XHRcdCRhbW91bnQ6IEludCEsIFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjYXJ0UmVtb3ZlRGlzaChcblx0XHRcdFx0XHRcdGlkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0Y2FydERpc2hJZDogJGNhcnREaXNoSWQsXG5cdFx0XHRcdFx0XHRhbW91bnQ6ICRhbW91bnQsXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snQ2FydCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydDYXJ0RGlzaCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0Rpc2gnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRzZXREaXNoQW1vdW50OiAoY3VzdG9tRmllbGRzKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjYXJ0U2V0RGlzaEFtb3VudChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmcsXG5cdFx0XHRcdFx0JGNhcnREaXNoSWQ6IEludCxcblx0XHRcdFx0XHQkYW1vdW50OiBJbnRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2FydFNldERpc2hBbW91bnQoXG5cdFx0XHRcdFx0XHRpZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdGNhcnREaXNoSWQ6ICRjYXJ0RGlzaElkLFxuXHRcdFx0XHRcdFx0YW1vdW50OiAkYW1vdW50XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snQ2FydCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydDYXJ0RGlzaCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0Rpc2gnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRzZXREaXNoQ29tbWVudDogKGN1c3RvbUZpZWxkcykgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2FydFNldERpc2hDb21tZW50KFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZyxcblx0XHRcdFx0XHQkY2FydERpc2hJZDogSW50LFxuXHRcdFx0XHRcdCRjb21tZW50OiBJbnRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2FydFNldERpc2hDb21tZW50KFxuXHRcdFx0XHRcdFx0aWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRjYXJ0RGlzaElkOiAkY2FydERpc2hJZCxcblx0XHRcdFx0XHRcdGNvbW1lbnQ6ICRjb21tZW50XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snQ2FydCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydDYXJ0RGlzaCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0Rpc2gnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRvcmRlckNhcnQ6IChjdXN0b21GaWVsZHMpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIG9yZGVyQ2FydChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmchLCBcblx0XHRcdFx0XHQkcGF5bWVudE1ldGhvZElkOiBTdHJpbmchLFxuXHRcdFx0XHRcdCRzZWxmU2VydmljZTogQm9vbGVhbixcblx0XHRcdFx0XHQkYWRkcmVzczogQWRkcmVzcyxcblx0XHRcdFx0XHQkY3VzdG9tZXI6IEN1c3RvbWVyIVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRvcmRlckNhcnQoXG5cdFx0XHRcdFx0XHRjYXJ0SWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRwYXltZW50TWV0aG9kSWQ6ICRwYXltZW50TWV0aG9kSWQsXG5cdFx0XHRcdFx0XHRzZWxmU2VydmljZTogJHNlbGZTZXJ2aWNlLFxuXHRcdFx0XHRcdFx0YWRkcmVzczogJGFkZHJlc3MsXG5cdFx0XHRcdFx0XHRjdXN0b21lcjogJGN1c3RvbWVyXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjYXJ0IHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snQ2FydCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydDYXJ0RGlzaCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkZWxpdmVyeUl0ZW0ge1xuXHRcdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snRGlzaCddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWVzc2FnZSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0bWVzc2FnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YWN0aW9uIHtcblx0XHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRjaGVja0NhcnQ6IChjdXN0b21GaWVsZHMpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIGNoZWNrQ2FydChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmchLCBcblx0XHRcdFx0XHQkcGF5bWVudE1ldGhvZElkOiBTdHJpbmchLFxuXHRcdFx0XHRcdCRzZWxmU2VydmljZTogQm9vbGVhbixcblx0XHRcdFx0XHQkYWRkcmVzczogQWRkcmVzcyxcblx0XHRcdFx0XHQkY3VzdG9tZXI6IEN1c3RvbWVyISxcblx0XHRcdFx0XHQkY29tbWVudDogU3RyaW5nLFxuXHRcdFx0XHRcdCRkYXRlOiBTdHJpbmcsXG5cdFx0XHRcdFx0JGN1c3RvbURhdGE6IEpzb25cblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2hlY2tDYXJ0KFxuXHRcdFx0XHRcdFx0Y2FydElkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0cGF5bWVudE1ldGhvZElkOiAkcGF5bWVudE1ldGhvZElkLFxuXHRcdFx0XHRcdFx0c2VsZlNlcnZpY2U6ICRzZWxmU2VydmljZSxcblx0XHRcdFx0XHRcdGFkZHJlc3M6ICRhZGRyZXNzLFxuXHRcdFx0XHRcdFx0Y3VzdG9tZXI6ICRjdXN0b21lcixcblx0XHRcdFx0XHRcdGNvbW1lbnQ6ICRjb21tZW50LFxuXHRcdFx0XHRcdFx0ZGF0ZTogJGRhdGUsXG5cdFx0XHRcdFx0XHRjdXN0b21EYXRhOiAkY3VzdG9tRGF0YVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y2FydCB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0NhcnQnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHRcdCR7KGN1c3RvbUZpZWxkc1snQ2FydERpc2gnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ0Rpc2gnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1lc3NhZ2Uge1xuXHRcdFx0XHRcdFx0XHR0aXRsZVxuXHRcdFx0XHRcdFx0XHR0eXBlXG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2Vcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGFjdGlvbiB7XG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0ZGF0YVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Y2hlY2tQaG9uZUNvZGU6IChjdXN0b21GaWVsZHMpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIGNoZWNrUGhvbmVDb2RlKFxuXHRcdFx0XHRcdCRwaG9uZTogU3RyaW5nISxcblx0XHRcdFx0XHQkY29kZTogU3RyaW5nIVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRzZXRQaG9uZUNvZGUoXG5cdFx0XHRcdFx0XHRwaG9uZTogJHBob25lLFxuXHRcdFx0XHRcdFx0Y29kZTogJGNvZGVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHRjb25maXJtZWRcblx0XHRcdFx0XHRcdGZpcnN0YnV5XG5cdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ1Bob25lQ29kZSddIHx8IFtdKS5qb2luKCdcXG4nKX1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGA7XG5cdFx0fSxcblx0fVxufSJdfQ==