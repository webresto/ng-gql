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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhcnQvY2FydC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQStEakQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUJSO0lBQ0QsYUFBYSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZWpCO0NBQ0QsQ0FBQztXQUlVLENBQUMsT0FBZSxFQUFFLEVBQUU7SUFDN0IsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRSxPQUFPLEdBQUcsQ0FBQTs7ZUFFRSxjQUFjOzs7Ozs7Ozs7Ozs7OztNQWN2QixhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxhQUFhO01BQzNCLHNCQUFzQixDQUFDLGFBQWE7SUFDdEMsQ0FBQztBQUNILENBQUMsT0FDUSxDQUFDLFNBQWlCLElBQUksRUFBRSxFQUFFO0lBQ2xDLElBQUcsTUFBTSxJQUFJLE1BQU07UUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ25DLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdELE9BQU8sR0FBRyxDQUFBOztXQUVGLGNBQWM7Ozs7Ozs7TUFPbkIsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtJQUM1QixDQUFDO0FBQ0gsQ0FBQyxPQUNTLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDM0IsT0FBTyxHQUFHLENBQUE7O3FCQUVRLEtBQUs7Ozs7Ozs7Ozs7SUFVdEIsQ0FBQztBQUNILENBQUMsT0FDVyxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQzdCLE9BQU8sR0FBRyxDQUFBOzswQkFFYSxLQUFLOzs7Ozs7OztJQVEzQixDQUFDO0FBQ0gsQ0FBQyxPQUdjLEdBQUcsRUFBRTtJQUNuQixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BOEJQLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDbUIsR0FBRyxFQUFFO0lBQ3hCLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLE9BQ2MsR0FBRyxFQUFFO0lBQ25CLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLE9BQ2UsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLE9BQ1UsR0FBRyxFQUFFO0lBQ2YsT0FBTyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUNQLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDVSxHQUFHLEVBQUU7SUFDZixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUF5Q1AsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtNQUMxQixhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxRQUNlLEdBQUcsRUFBRTtJQUNwQixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztJQWdCVCxDQUFDO0FBQ0gsQ0FBQztBQXBTSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDdEIsT0FBTyxFQUFFO1FBQ1IsUUFBUSxJQXVCUDtRQUNELE9BQU8sSUFlTjtRQUNELFFBQVEsSUFjUDtRQUNELFVBQVUsSUFZVDtLQUNEO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsYUFBYSxJQW1DWjtRQUNELGtCQUFrQixJQXlCakI7UUFDRCxhQUFhLElBeUJaO1FBQ0QsY0FBYyxJQXlCYjtRQUNELFNBQVMsSUF3Q1I7UUFDRCxTQUFTLElBOENSO1FBQ0QsY0FBYyxLQWtCYjtLQUNEO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IFBheW1lbnRNZXRob2RGcmFnbWVudHMgfSBmcm9tICcuLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwnO1xuaW1wb3J0IHsgQ2FydERpc2hGcmFnbWVudHMgfSBmcm9tICcuLi9jYXJ0LWRpc2gvY2FydC1kaXNoLmdxbCc7XG5pbXBvcnQgeyBEaXNoRnJhZ21lbnRzIH0gZnJvbSAnLi4vZGlzaC9kaXNoLmdxbCc7XG5pbXBvcnQgeyBDYXJ0TW9kaWZpZXIgfSBmcm9tICcuLi9tb2RpZmllci9jYXJ0LW1vZGlmaWVyJztcblxuZXhwb3J0IHR5cGUgQWRkVG9DYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0ZGlzaElkPzogc3RyaW5nLFxuXHRhbW91bnQ/OiBudW1iZXIsXG5cdG1vZGlmaWVycz86IENhcnRNb2RpZmllcltdLFxuXHRjb21tZW50Pzogc3RyaW5nLFxuXHRmcm9tPzogc3RyaW5nLFxuXHRyZXBsYWNlPzogYm9vbGVhbixcblx0Y2FydERpc2hJZD86IHN0cmluZ1xufTtcblxuZXhwb3J0IHR5cGUgUmVtb3ZlRnJvbUNhcnRJbnB1dCA9IHtcblx0Y2FydElkPzogc3RyaW5nLFxuXHRjYXJ0RGlzaElkPzogbnVtYmVyLFxuXHRhbW91bnQ/OiBudW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIFNldERpc2hBbW91bnRJbnB1dCA9IHtcblx0Y2FydElkPzogc3RyaW5nLFxuXHRjYXJ0RGlzaElkPzogbnVtYmVyLFxuXHRhbW91bnQ/OiBudW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIFNldERpc2hDb21tZW50SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0Y2FydERpc2hJZD86IG51bWJlcixcblx0Y29tbWVudD86IHN0cmluZ1xufTtcblxuZXhwb3J0IHR5cGUgT3JkZXJDYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZDogc3RyaW5nLFxuXHRwYXltZW50TWV0aG9kSWQ/OiBzdHJpbmcsXG5cdHNlbGZTZXJ2aWNlPzogYm9vbGVhbixcblx0YWRkcmVzcz86IHtcblx0XHRzdHJlZXRJZD86IHN0cmluZyxcblx0XHRob21lPzogc3RyaW5nLFxuXHRcdGNvbW1lbnQ/OiBzdHJpbmcsXG5cdFx0Y2l0eT86IHN0cmluZyxcblx0XHRzdHJlZXQ/OiBzdHJpbmcsXG5cdFx0aG91c2luZz86IHN0cmluZyxcblx0XHRpbmRleD86IHN0cmluZyxcblx0XHRlbnRyYW5jZT86IHN0cmluZyxcblx0XHRmbG9vcj86IHN0cmluZyxcblx0XHRhcGFydG1lbnQ/OiBzdHJpbmcsXG5cdFx0ZG9vcnBob25lPzogc3RyaW5nXG5cdH0sXG5cdGN1c3R1bWVyPzoge1xuXHRcdHBob25lOiBzdHJpbmcsXG5cdFx0bWFpbD86IHN0cmluZyxcblx0XHRuYW1lOiBzdHJpbmdcblx0fSxcblx0Y29tbWVudD86IHN0cmluZyxcblx0Y3VzdG9tRGF0YT86IGFueVxufTtcblxuZXhwb3J0IHR5cGUgQ2hlY2tQaG9uZUNvZGVJbnB1dCA9IHtcblx0cGhvbmU6IHN0cmluZyxcblx0Y29kZTogc3RyaW5nXG59O1xuXG5leHBvcnQgY29uc3QgQ2FydEZyYWdtZW50cyA9IHtcblx0Y2FydDogZ3FsYFxuXHRcdGZyYWdtZW50IENhcnRGcmFnbWVudCBvbiBDYXJ0IHtcblx0XHRcdGlkXG5cdFx0XHRkaXNoZXNDb3VudFxuXHRcdFx0Y29tbWVudFxuXHRcdFx0cGVyc29uc0NvdW50XG5cdFx0XHRkZWxpdmVyeURlc2NyaXB0aW9uXG5cdFx0XHRtZXNzYWdlXG5cdFx0XHRkZWxpdmVyeUNvc3Rcblx0XHRcdHRvdGFsV2VpZ2h0XG5cdFx0XHR0b3RhbFxuXHRcdFx0b3JkZXJUb3RhbFxuXHRcdFx0Y2FydFRvdGFsXG5cdFx0XHRkaXNjb3VudFRvdGFsXG5cdFx0XHRzdGF0ZVxuXHRcdFx0Y3VzdG9tRGF0YVxuXHRcdH1cblx0YCxcblx0Y2FydE9yZGVyRGF0YTogZ3FsYFxuXHRcdGZyYWdtZW50IENhcnRPcmRlckRhdGFGcmFnbWVudCBvbiBDYXJ0IHtcblx0XHRcdHJtc0RlbGl2ZXJlZFxuXHRcdFx0cm1zSWRcblx0XHRcdHJtc09yZGVyTnVtYmVyXG5cdFx0XHRybXNPcmRlckRhdGFcblx0XHRcdHJtc0RlbGl2ZXJ5RGF0ZVxuXHRcdFx0cm1zRXJyb3JNZXNzYWdlXG5cdFx0XHRybXNFcnJvckNvZGVcblx0XHRcdHJtc1N0YXR1c0NvZGVcblx0XHRcdGN1c3RvbWVyXG5cdFx0XHRhZGRyZXNzXG5cdFx0XHRwYWlkXG5cdFx0XHRpc1BheW1lbnRQcm9taXNlXG5cdFx0fVxuXHRgLFxufTtcblxuZXhwb3J0IGNvbnN0IENhcnRHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXRPcmRlcjogKG9yZGVySWQ6IHN0cmluZykgPT4ge1xuXHRcdFx0Y29uc3QgcXVlcnlBcmd1bWVudHMgPSBvcmRlcklkID8gYChvcmRlck51bWJlcjogXCIke29yZGVySWR9XCIpYCA6ICcnO1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgZ2V0T3JkZXIge1xuXHRcdFx0XHRcdGdldE9yZGVyJHtxdWVyeUFyZ3VtZW50c30ge1xuXHRcdFx0XHRcdFx0Y2FydCB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0T3JkZXJEYXRhRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cGF5bWVudE1ldGhvZCB7XG5cdFx0XHRcdFx0XHRcdFx0Li4uUGF5bWVudE1ldGhvZEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1c3RvbURhdGFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0T3JkZXJEYXRhfVxuXHRcdFx0XHQke1BheW1lbnRNZXRob2RGcmFnbWVudHMucGF5bWVudE1ldGhvZH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRnZXRDYXJ0OiAoY2FydElkOiBzdHJpbmcgPSBudWxsKSA9PiB7XG5cdFx0XHRpZihjYXJ0SWQgPT0gJ251bGwnKSBjYXJ0SWQgPSBudWxsO1xuXHRcdFx0Y29uc3QgcXVlcnlBcmd1bWVudHMgPSBjYXJ0SWQgPyBgKGNhcnRJZDogXCIke2NhcnRJZH1cIilgIDogJyc7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBHZXRDYXJ0IHtcblx0XHRcdFx0XHRjYXJ0JHtxdWVyeUFyZ3VtZW50c30ge1xuXHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdGdldFBob25lOiAocGhvbmU6IHN0cmluZykgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgcGhvbmUge1xuXHRcdFx0XHRcdHBob25lKHBob25lOiBcIiR7cGhvbmV9XCIpIHtcblx0XHRcdFx0XHRcdGlkXG5cdFx0XHRcdFx0XHRwaG9uZVxuXHRcdFx0XHRcdFx0aXNGaXJzdFxuXHRcdFx0XHRcdFx0aXNDb25maXJtXG5cdFx0XHRcdFx0XHRjb2RlVGltZVxuXHRcdFx0XHRcdFx0Y29uZmlybUNvZGVcblx0XHRcdFx0XHRcdGN1c3RvbURhdGFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRjaGVja1Bob25lOiAocGhvbmU6IHN0cmluZykgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgY2hlY2tQaG9uZSB7XG5cdFx0XHRcdFx0Y2hlY2tQaG9uZShwaG9uZTogXCIke3Bob25lfVwiKSB7XG5cdFx0XHRcdFx0XHR0eXBlXG5cdFx0XHRcdFx0XHR0aXRsZVxuXHRcdFx0XHRcdFx0bWVzc2FnZVxuXHRcdFx0XHRcdFx0Y29uZmlybWVkXG5cdFx0XHRcdFx0XHRmaXJzdGJ1eVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0YDtcblx0XHR9XG5cdH0sXG5cdG11dGF0aW9uczoge1xuXHRcdGFkZERpc2hUb0NhcnQ6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIEFkZERpc2hUb0NhcnQoXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nLCBcblx0XHRcdFx0XHQkZGlzaElkOiBTdHJpbmcsIFxuXHRcdFx0XHRcdCRhbW91bnQ6IEludCwgXG5cdFx0XHRcdFx0JG1vZGlmaWVyczogSnNvbiwgXG5cdFx0XHRcdFx0JGNvbW1lbnQ6IFN0cmluZyxcblx0XHRcdFx0XHQkZnJvbTogU3RyaW5nLFxuXHRcdFx0XHRcdCRyZXBsYWNlOiBCb29sZWFuLFxuXHRcdFx0XHRcdCRjYXJ0RGlzaElkOiBJbnRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2FydEFkZERpc2goXG5cdFx0XHRcdFx0XHRjYXJ0SWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRkaXNoSWQ6ICRkaXNoSWQsXG5cdFx0XHRcdFx0XHRhbW91bnQ6ICRhbW91bnQsXG5cdFx0XHRcdFx0XHRtb2RpZmllcnM6ICRtb2RpZmllcnMsXG5cdFx0XHRcdFx0XHRjb21tZW50OiAkY29tbWVudCxcblx0XHRcdFx0XHRcdGZyb206ICRmcm9tLFxuXHRcdFx0XHRcdFx0cmVwbGFjZTogJHJlcGxhY2UsXG5cdFx0XHRcdFx0XHRjYXJ0RGlzaElkOiAkY2FydERpc2hJZFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWxpdmVyeUl0ZW0ge1xuXHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdHJlbW92ZURpc2hGcm9tQ2FydDogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2FydFJlbW92ZURpc2goXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nISwgXG5cdFx0XHRcdFx0JGNhcnREaXNoSWQ6IEludCEsIFxuXHRcdFx0XHRcdCRhbW91bnQ6IEludCEsIFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjYXJ0UmVtb3ZlRGlzaChcblx0XHRcdFx0XHRcdGlkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0Y2FydERpc2hJZDogJGNhcnREaXNoSWQsXG5cdFx0XHRcdFx0XHRhbW91bnQ6ICRhbW91bnQsXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0c2V0RGlzaEFtb3VudDogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2FydFNldERpc2hBbW91bnQoXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nLFxuXHRcdFx0XHRcdCRjYXJ0RGlzaElkOiBJbnQsXG5cdFx0XHRcdFx0JGFtb3VudDogSW50XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNhcnRTZXREaXNoQW1vdW50KFxuXHRcdFx0XHRcdFx0aWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRjYXJ0RGlzaElkOiAkY2FydERpc2hJZCxcblx0XHRcdFx0XHRcdGFtb3VudDogJGFtb3VudFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWxpdmVyeUl0ZW0ge1xuXHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdHNldERpc2hDb21tZW50OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjYXJ0U2V0RGlzaENvbW1lbnQoXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nLFxuXHRcdFx0XHRcdCRjYXJ0RGlzaElkOiBJbnQsXG5cdFx0XHRcdFx0JGNvbW1lbnQ6IEludFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjYXJ0U2V0RGlzaENvbW1lbnQoXG5cdFx0XHRcdFx0XHRpZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdGNhcnREaXNoSWQ6ICRjYXJ0RGlzaElkLFxuXHRcdFx0XHRcdFx0Y29tbWVudDogJGNvbW1lbnRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRvcmRlckNhcnQ6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIG9yZGVyQ2FydChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmchLCBcblx0XHRcdFx0XHQkcGF5bWVudE1ldGhvZElkOiBTdHJpbmchLFxuXHRcdFx0XHRcdCRzZWxmU2VydmljZTogQm9vbGVhbixcblx0XHRcdFx0XHQkYWRkcmVzczogQWRkcmVzcyxcblx0XHRcdFx0XHQkY3VzdG9tZXI6IEN1c3RvbWVyIVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRvcmRlckNhcnQoXG5cdFx0XHRcdFx0XHRjYXJ0SWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRwYXltZW50TWV0aG9kSWQ6ICRwYXltZW50TWV0aG9kSWQsXG5cdFx0XHRcdFx0XHRzZWxmU2VydmljZTogJHNlbGZTZXJ2aWNlLFxuXHRcdFx0XHRcdFx0YWRkcmVzczogJGFkZHJlc3MsXG5cdFx0XHRcdFx0XHRjdXN0b21lcjogJGN1c3RvbWVyXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjYXJ0IHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1lc3NhZ2Uge1xuXHRcdFx0XHRcdFx0XHR0aXRsZVxuXHRcdFx0XHRcdFx0XHR0eXBlXG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2Vcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGFjdGlvbiB7XG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0ZGF0YVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Y2hlY2tDYXJ0OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjaGVja0NhcnQoXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nISwgXG5cdFx0XHRcdFx0JHBheW1lbnRNZXRob2RJZDogU3RyaW5nISxcblx0XHRcdFx0XHQkc2VsZlNlcnZpY2U6IEJvb2xlYW4sXG5cdFx0XHRcdFx0JGFkZHJlc3M6IEFkZHJlc3MsXG5cdFx0XHRcdFx0JGN1c3RvbWVyOiBDdXN0b21lciEsXG5cdFx0XHRcdFx0JGNvbW1lbnQ6IFN0cmluZyxcblx0XHRcdFx0XHQkZGF0ZTogU3RyaW5nLFxuXHRcdFx0XHRcdCRjdXN0b21EYXRhOiBKc29uXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNoZWNrQ2FydChcblx0XHRcdFx0XHRcdGNhcnRJZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdHBheW1lbnRNZXRob2RJZDogJHBheW1lbnRNZXRob2RJZCxcblx0XHRcdFx0XHRcdHNlbGZTZXJ2aWNlOiAkc2VsZlNlcnZpY2UsXG5cdFx0XHRcdFx0XHRhZGRyZXNzOiAkYWRkcmVzcyxcblx0XHRcdFx0XHRcdGN1c3RvbWVyOiAkY3VzdG9tZXIsXG5cdFx0XHRcdFx0XHRjb21tZW50OiAkY29tbWVudCxcblx0XHRcdFx0XHRcdGRhdGU6ICRkYXRlLFxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YTogJGN1c3RvbURhdGFcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGNhcnQge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWVzc2FnZSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0bWVzc2FnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YWN0aW9uIHtcblx0XHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRjaGVja1Bob25lQ29kZTogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gY2hlY2tQaG9uZUNvZGUoXG5cdFx0XHRcdFx0JHBob25lOiBTdHJpbmchLFxuXHRcdFx0XHRcdCRjb2RlOiBTdHJpbmchXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHNldFBob25lQ29kZShcblx0XHRcdFx0XHRcdHBob25lOiAkcGhvbmUsXG5cdFx0XHRcdFx0XHRjb2RlOiAkY29kZVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0dGl0bGVcblx0XHRcdFx0XHRcdG1lc3NhZ2Vcblx0XHRcdFx0XHRcdGNvbmZpcm1lZFxuXHRcdFx0XHRcdFx0Zmlyc3RidXlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGA7XG5cdFx0fSxcblx0fVxufSJdfQ==