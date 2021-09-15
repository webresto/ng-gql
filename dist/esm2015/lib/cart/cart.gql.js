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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhcnQvY2FydC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQTREakQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUJSO0lBQ0QsYUFBYSxFQUFFLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZWpCO0NBQ0QsQ0FBQztXQUlVLENBQUMsT0FBZSxFQUFFLEVBQUU7SUFDN0IsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRSxPQUFPLEdBQUcsQ0FBQTs7ZUFFRSxjQUFjOzs7Ozs7Ozs7Ozs7OztNQWN2QixhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxhQUFhO01BQzNCLHNCQUFzQixDQUFDLGFBQWE7SUFDdEMsQ0FBQztBQUNILENBQUMsT0FDUSxDQUFDLFNBQWlCLElBQUksRUFBRSxFQUFFO0lBQ2xDLElBQUcsTUFBTSxJQUFJLE1BQU07UUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ25DLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdELE9BQU8sR0FBRyxDQUFBOztXQUVGLGNBQWM7Ozs7Ozs7TUFPbkIsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtJQUM1QixDQUFDO0FBQ0gsQ0FBQyxPQUNTLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDM0IsT0FBTyxHQUFHLENBQUE7O3FCQUVRLEtBQUs7Ozs7Ozs7Ozs7SUFVdEIsQ0FBQztBQUNILENBQUMsT0FDVyxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQzdCLE9BQU8sR0FBRyxDQUFBOzswQkFFYSxLQUFLOzs7Ozs7OztJQVEzQixDQUFDO0FBQ0gsQ0FBQyxPQUdjLEdBQUcsRUFBRTtJQUNuQixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BOEJQLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDbUIsR0FBRyxFQUFFO0lBQ3hCLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLE9BQ2MsR0FBRyxFQUFFO0lBQ25CLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLE9BQ2UsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLE9BQ1UsR0FBRyxFQUFFO0lBQ2YsT0FBTyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUNQLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDVSxHQUFHLEVBQUU7SUFDZixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFtQ1AsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtNQUMxQixhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxRQUNlLEdBQUcsRUFBRTtJQUNwQixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztJQWdCVCxDQUFDO0FBQ0gsQ0FBQztBQTlSSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDdEIsT0FBTyxFQUFFO1FBQ1IsUUFBUSxJQXVCUDtRQUNELE9BQU8sSUFlTjtRQUNELFFBQVEsSUFjUDtRQUNELFVBQVUsSUFZVDtLQUNEO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsYUFBYSxJQW1DWjtRQUNELGtCQUFrQixJQXlCakI7UUFDRCxhQUFhLElBeUJaO1FBQ0QsY0FBYyxJQXlCYjtRQUNELFNBQVMsSUF3Q1I7UUFDRCxTQUFTLElBd0NSO1FBQ0QsY0FBYyxLQWtCYjtLQUNEO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IFBheW1lbnRNZXRob2RGcmFnbWVudHMgfSBmcm9tICcuLi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwnO1xuaW1wb3J0IHsgQ2FydERpc2hGcmFnbWVudHMgfSBmcm9tICcuLi9jYXJ0LWRpc2gvY2FydC1kaXNoLmdxbCc7XG5pbXBvcnQgeyBEaXNoRnJhZ21lbnRzIH0gZnJvbSAnLi4vZGlzaC9kaXNoLmdxbCc7XG5cbmV4cG9ydCB0eXBlIEFkZFRvQ2FydElucHV0ID0ge1xuXHRjYXJ0SWQ/OiBzdHJpbmcsXG5cdGRpc2hJZD86IHN0cmluZyxcblx0YW1vdW50PzogbnVtYmVyLFxuXHRtb2RpZmllcnM/OiBhbnksXG5cdGNvbW1lbnQ/OiBzdHJpbmcsXG5cdGZyb20/OiBzdHJpbmcsXG5cdHJlcGxhY2U/OiBib29sZWFuLFxuXHRjYXJ0RGlzaElkPzogc3RyaW5nXG59O1xuXG5leHBvcnQgdHlwZSBSZW1vdmVGcm9tQ2FydElucHV0ID0ge1xuXHRjYXJ0SWQ/OiBzdHJpbmcsXG5cdGNhcnREaXNoSWQ/OiBudW1iZXIsXG5cdGFtb3VudD86IG51bWJlclxufTtcblxuZXhwb3J0IHR5cGUgU2V0RGlzaEFtb3VudElucHV0ID0ge1xuXHRjYXJ0SWQ/OiBzdHJpbmcsXG5cdGNhcnREaXNoSWQ/OiBudW1iZXIsXG5cdGFtb3VudD86IG51bWJlclxufTtcblxuZXhwb3J0IHR5cGUgU2V0RGlzaENvbW1lbnRJbnB1dCA9IHtcblx0Y2FydElkPzogc3RyaW5nLFxuXHRjYXJ0RGlzaElkPzogbnVtYmVyLFxuXHRjb21tZW50Pzogc3RyaW5nXG59O1xuXG5leHBvcnQgdHlwZSBPcmRlckNhcnRJbnB1dCA9IHtcblx0Y2FydElkOiBzdHJpbmcsXG5cdHBheW1lbnRNZXRob2RJZD86IHN0cmluZyxcblx0c2VsZlNlcnZpY2U/OiBib29sZWFuLFxuXHRhZGRyZXNzPzoge1xuXHRcdHN0cmVldElkPzogc3RyaW5nLFxuXHRcdGhvbWU/OiBzdHJpbmcsXG5cdFx0Y29tbWVudD86IHN0cmluZyxcblx0XHRjaXR5Pzogc3RyaW5nLFxuXHRcdHN0cmVldD86IHN0cmluZyxcblx0XHRob3VzaW5nPzogc3RyaW5nLFxuXHRcdGluZGV4Pzogc3RyaW5nLFxuXHRcdGVudHJhbmNlPzogc3RyaW5nLFxuXHRcdGZsb29yPzogc3RyaW5nLFxuXHRcdGFwYXJ0bWVudD86IHN0cmluZyxcblx0XHRkb29ycGhvbmU/OiBzdHJpbmdcblx0fSxcblx0Y3VzdHVtZXI/OiB7XG5cdFx0cGhvbmU6IHN0cmluZyxcblx0XHRtYWlsPzogc3RyaW5nLFxuXHRcdG5hbWU6IHN0cmluZ1xuXHR9XG59O1xuXG5leHBvcnQgdHlwZSBDaGVja1Bob25lQ29kZUlucHV0ID0ge1xuXHRwaG9uZTogc3RyaW5nLFxuXHRjb2RlOiBzdHJpbmdcbn07XG5cbmV4cG9ydCBjb25zdCBDYXJ0RnJhZ21lbnRzID0ge1xuXHRjYXJ0OiBncWxgXG5cdFx0ZnJhZ21lbnQgQ2FydEZyYWdtZW50IG9uIENhcnQge1xuXHRcdFx0aWRcblx0XHRcdGRpc2hlc0NvdW50XG5cdFx0XHRjb21tZW50XG5cdFx0XHRwZXJzb25zQ291bnRcblx0XHRcdGRlbGl2ZXJ5RGVzY3JpcHRpb25cblx0XHRcdG1lc3NhZ2Vcblx0XHRcdGRlbGl2ZXJ5Q29zdFxuXHRcdFx0dG90YWxXZWlnaHRcblx0XHRcdHRvdGFsXG5cdFx0XHRvcmRlclRvdGFsXG5cdFx0XHRjYXJ0VG90YWxcblx0XHRcdGRpc2NvdW50VG90YWxcblx0XHRcdHN0YXRlXG5cdFx0XHRjdXN0b21EYXRhXG5cdFx0fVxuXHRgLFxuXHRjYXJ0T3JkZXJEYXRhOiBncWxgXG5cdFx0ZnJhZ21lbnQgQ2FydE9yZGVyRGF0YUZyYWdtZW50IG9uIENhcnQge1xuXHRcdFx0cm1zRGVsaXZlcmVkXG5cdFx0XHRybXNJZFxuXHRcdFx0cm1zT3JkZXJOdW1iZXJcblx0XHRcdHJtc09yZGVyRGF0YVxuXHRcdFx0cm1zRGVsaXZlcnlEYXRlXG5cdFx0XHRybXNFcnJvck1lc3NhZ2Vcblx0XHRcdHJtc0Vycm9yQ29kZVxuXHRcdFx0cm1zU3RhdHVzQ29kZVxuXHRcdFx0Y3VzdG9tZXJcblx0XHRcdGFkZHJlc3Ncblx0XHRcdHBhaWRcblx0XHRcdGlzUGF5bWVudFByb21pc2Vcblx0XHR9XG5cdGAsXG59O1xuXG5leHBvcnQgY29uc3QgQ2FydEdxbCA9IHtcblx0cXVlcmllczoge1xuXHRcdGdldE9yZGVyOiAob3JkZXJJZDogc3RyaW5nKSA9PiB7XG5cdFx0XHRjb25zdCBxdWVyeUFyZ3VtZW50cyA9IG9yZGVySWQgPyBgKG9yZGVyTnVtYmVyOiBcIiR7b3JkZXJJZH1cIilgIDogJyc7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBnZXRPcmRlciB7XG5cdFx0XHRcdFx0Z2V0T3JkZXIke3F1ZXJ5QXJndW1lbnRzfSB7XG5cdFx0XHRcdFx0XHRjYXJ0IHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnRPcmRlckRhdGFGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwYXltZW50TWV0aG9kIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5QYXltZW50TWV0aG9kRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnRPcmRlckRhdGF9XG5cdFx0XHRcdCR7UGF5bWVudE1ldGhvZEZyYWdtZW50cy5wYXltZW50TWV0aG9kfVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdGdldENhcnQ6IChjYXJ0SWQ6IHN0cmluZyA9IG51bGwpID0+IHtcblx0XHRcdGlmKGNhcnRJZCA9PSAnbnVsbCcpIGNhcnRJZCA9IG51bGw7XG5cdFx0XHRjb25zdCBxdWVyeUFyZ3VtZW50cyA9IGNhcnRJZCA/IGAoY2FydElkOiBcIiR7Y2FydElkfVwiKWAgOiAnJztcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdHF1ZXJ5IEdldENhcnQge1xuXHRcdFx0XHRcdGNhcnQke3F1ZXJ5QXJndW1lbnRzfSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Z2V0UGhvbmU6IChwaG9uZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBwaG9uZSB7XG5cdFx0XHRcdFx0cGhvbmUocGhvbmU6IFwiJHtwaG9uZX1cIikge1xuXHRcdFx0XHRcdFx0aWRcblx0XHRcdFx0XHRcdHBob25lXG5cdFx0XHRcdFx0XHRpc0ZpcnN0XG5cdFx0XHRcdFx0XHRpc0NvbmZpcm1cblx0XHRcdFx0XHRcdGNvZGVUaW1lXG5cdFx0XHRcdFx0XHRjb25maXJtQ29kZVxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdGNoZWNrUGhvbmU6IChwaG9uZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBjaGVja1Bob25lIHtcblx0XHRcdFx0XHRjaGVja1Bob25lKHBob25lOiBcIiR7cGhvbmV9XCIpIHtcblx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHRjb25maXJtZWRcblx0XHRcdFx0XHRcdGZpcnN0YnV5XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRgO1xuXHRcdH1cblx0fSxcblx0bXV0YXRpb25zOiB7XG5cdFx0YWRkRGlzaFRvQ2FydDogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gQWRkRGlzaFRvQ2FydChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmcsIFxuXHRcdFx0XHRcdCRkaXNoSWQ6IFN0cmluZywgXG5cdFx0XHRcdFx0JGFtb3VudDogSW50LCBcblx0XHRcdFx0XHQkbW9kaWZpZXJzOiBKc29uLCBcblx0XHRcdFx0XHQkY29tbWVudDogU3RyaW5nLFxuXHRcdFx0XHRcdCRmcm9tOiBTdHJpbmcsXG5cdFx0XHRcdFx0JHJlcGxhY2U6IEJvb2xlYW4sXG5cdFx0XHRcdFx0JGNhcnREaXNoSWQ6IEludFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjYXJ0QWRkRGlzaChcblx0XHRcdFx0XHRcdGNhcnRJZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdGRpc2hJZDogJGRpc2hJZCxcblx0XHRcdFx0XHRcdGFtb3VudDogJGFtb3VudCxcblx0XHRcdFx0XHRcdG1vZGlmaWVyczogJG1vZGlmaWVycyxcblx0XHRcdFx0XHRcdGNvbW1lbnQ6ICRjb21tZW50LFxuXHRcdFx0XHRcdFx0ZnJvbTogJGZyb20sXG5cdFx0XHRcdFx0XHRyZXBsYWNlOiAkcmVwbGFjZSxcblx0XHRcdFx0XHRcdGNhcnREaXNoSWQ6ICRjYXJ0RGlzaElkXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0cmVtb3ZlRGlzaEZyb21DYXJ0OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjYXJ0UmVtb3ZlRGlzaChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmchLCBcblx0XHRcdFx0XHQkY2FydERpc2hJZDogSW50ISwgXG5cdFx0XHRcdFx0JGFtb3VudDogSW50ISwgXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNhcnRSZW1vdmVEaXNoKFxuXHRcdFx0XHRcdFx0aWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRjYXJ0RGlzaElkOiAkY2FydERpc2hJZCxcblx0XHRcdFx0XHRcdGFtb3VudDogJGFtb3VudCxcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRzZXREaXNoQW1vdW50OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjYXJ0U2V0RGlzaEFtb3VudChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmcsXG5cdFx0XHRcdFx0JGNhcnREaXNoSWQ6IEludCxcblx0XHRcdFx0XHQkYW1vdW50OiBJbnRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2FydFNldERpc2hBbW91bnQoXG5cdFx0XHRcdFx0XHRpZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdGNhcnREaXNoSWQ6ICRjYXJ0RGlzaElkLFxuXHRcdFx0XHRcdFx0YW1vdW50OiAkYW1vdW50XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0c2V0RGlzaENvbW1lbnQ6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIGNhcnRTZXREaXNoQ29tbWVudChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmcsXG5cdFx0XHRcdFx0JGNhcnREaXNoSWQ6IEludCxcblx0XHRcdFx0XHQkY29tbWVudDogSW50XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNhcnRTZXREaXNoQ29tbWVudChcblx0XHRcdFx0XHRcdGlkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0Y2FydERpc2hJZDogJGNhcnREaXNoSWQsXG5cdFx0XHRcdFx0XHRjb21tZW50OiAkY29tbWVudFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRkaXNoZXMge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWxpdmVyeUl0ZW0ge1xuXHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRcdCR7Q2FydERpc2hGcmFnbWVudHMuY2FydERpc2h9XG5cdFx0XHRcdCR7RGlzaEZyYWdtZW50cy5kaXNofVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdG9yZGVyQ2FydDogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gb3JkZXJDYXJ0KFxuXHRcdFx0XHRcdCRjYXJ0SWQ6IFN0cmluZyEsIFxuXHRcdFx0XHRcdCRwYXltZW50TWV0aG9kSWQ6IFN0cmluZyEsXG5cdFx0XHRcdFx0JHNlbGZTZXJ2aWNlOiBCb29sZWFuLFxuXHRcdFx0XHRcdCRhZGRyZXNzOiBBZGRyZXNzLFxuXHRcdFx0XHRcdCRjdXN0b21lcjogQ3VzdG9tZXIhXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdG9yZGVyQ2FydChcblx0XHRcdFx0XHRcdGNhcnRJZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdHBheW1lbnRNZXRob2RJZDogJHBheW1lbnRNZXRob2RJZCxcblx0XHRcdFx0XHRcdHNlbGZTZXJ2aWNlOiAkc2VsZlNlcnZpY2UsXG5cdFx0XHRcdFx0XHRhZGRyZXNzOiAkYWRkcmVzcyxcblx0XHRcdFx0XHRcdGN1c3RvbWVyOiAkY3VzdG9tZXJcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGNhcnQge1xuXHRcdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5DYXJ0RGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0XHQuLi5EaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWVzc2FnZSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0bWVzc2FnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YWN0aW9uIHtcblx0XHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRjaGVja0NhcnQ6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIGNoZWNrQ2FydChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmchLCBcblx0XHRcdFx0XHQkcGF5bWVudE1ldGhvZElkOiBTdHJpbmchLFxuXHRcdFx0XHRcdCRzZWxmU2VydmljZTogQm9vbGVhbixcblx0XHRcdFx0XHQkYWRkcmVzczogQWRkcmVzcyxcblx0XHRcdFx0XHQkY3VzdG9tZXI6IEN1c3RvbWVyIVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjaGVja0NhcnQoXG5cdFx0XHRcdFx0XHRjYXJ0SWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRwYXltZW50TWV0aG9kSWQ6ICRwYXltZW50TWV0aG9kSWQsXG5cdFx0XHRcdFx0XHRzZWxmU2VydmljZTogJHNlbGZTZXJ2aWNlLFxuXHRcdFx0XHRcdFx0YWRkcmVzczogJGFkZHJlc3MsXG5cdFx0XHRcdFx0XHRjdXN0b21lcjogJGN1c3RvbWVyXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjYXJ0IHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1lc3NhZ2Uge1xuXHRcdFx0XHRcdFx0XHR0aXRsZVxuXHRcdFx0XHRcdFx0XHR0eXBlXG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2Vcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGFjdGlvbiB7XG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0ZGF0YVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Y2hlY2tQaG9uZUNvZGU6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIGNoZWNrUGhvbmVDb2RlKFxuXHRcdFx0XHRcdCRwaG9uZTogU3RyaW5nISxcblx0XHRcdFx0XHQkY29kZTogU3RyaW5nIVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRzZXRQaG9uZUNvZGUoXG5cdFx0XHRcdFx0XHRwaG9uZTogJHBob25lLFxuXHRcdFx0XHRcdFx0Y29kZTogJGNvZGVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHRjb25maXJtZWRcblx0XHRcdFx0XHRcdGZpcnN0YnV5XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdH1cbn0iXX0=