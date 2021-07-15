import { gql } from 'apollo-angular';
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
	`
};
const ɵ0 = (cartId = null) => {
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
						deliveryItem {
							...DishFragment
						}
					}
				}
				${CartFragments.cart}
				${CartDishFragments.cartDish}
				${DishFragments.dish}
			`;
}, ɵ1 = (phone) => {
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
}, ɵ2 = (phone) => {
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
}, ɵ3 = () => {
    return gql `
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
}, ɵ4 = () => {
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
}, ɵ5 = () => {
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
}, ɵ6 = () => {
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
}, ɵ7 = () => {
    return gql `
				mutation checkPhoneCode(
					$phone: String!,
					$code: String!
				) {
					checkPhoneCode(
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
        getCart: ɵ0,
        getPhone: ɵ1,
        checkPhone: ɵ2
    },
    mutations: {
        addDishToCart: ɵ3,
        removeDishFromCart: ɵ4,
        orderCart: ɵ5,
        checkCart: ɵ6,
        checkPhoneCode: ɵ7,
    }
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5ncWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhcnQvY2FydC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWdEakQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQlI7Q0FDRCxDQUFDO1dBSVMsQ0FBQyxTQUFpQixJQUFJLEVBQUUsRUFBRTtJQUNsQyxJQUFHLE1BQU0sSUFBSSxNQUFNO1FBQUUsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNuQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM3RCxPQUFPLEdBQUcsQ0FBQTs7V0FFRixjQUFjOzs7Ozs7Ozs7O01BVW5CLGFBQWEsQ0FBQyxJQUFJO01BQ2xCLGlCQUFpQixDQUFDLFFBQVE7TUFDMUIsYUFBYSxDQUFDLElBQUk7SUFDcEIsQ0FBQztBQUNILENBQUMsT0FDUyxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQzNCLE9BQU8sR0FBRyxDQUFBOztxQkFFUSxLQUFLOzs7Ozs7Ozs7O0lBVXRCLENBQUM7QUFDSCxDQUFDLE9BQ1csQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUM3QixPQUFPLEdBQUcsQ0FBQTs7MEJBRWEsS0FBSzs7Ozs7Ozs7SUFRM0IsQ0FBQztBQUNILENBQUMsT0FHYyxHQUFHLEVBQUU7SUFDbkIsT0FBTyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQThCUCxhQUFhLENBQUMsSUFBSTtNQUNsQixpQkFBaUIsQ0FBQyxRQUFRO01BQzFCLGFBQWEsQ0FBQyxJQUFJO0lBQ3BCLENBQUM7QUFDSCxDQUFDLE9BQ21CLEdBQUcsRUFBRTtJQUN4QixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFvQlAsYUFBYSxDQUFDLElBQUk7TUFDbEIsaUJBQWlCLENBQUMsUUFBUTtNQUMxQixhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxPQUNVLEdBQUcsRUFBRTtJQUNmLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQTZCUCxhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxPQUNVLEdBQUcsRUFBRTtJQUNmLE9BQU8sR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQTZCUCxhQUFhLENBQUMsSUFBSTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxPQUNlLEdBQUcsRUFBRTtJQUNwQixPQUFPLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztJQWdCVCxDQUFDO0FBQ0gsQ0FBQztBQXRNSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDdEIsT0FBTyxFQUFFO1FBQ1IsT0FBTyxJQW1CTjtRQUNELFFBQVEsSUFjUDtRQUNELFVBQVUsSUFZVDtLQUNEO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsYUFBYSxJQW1DWjtRQUNELGtCQUFrQixJQXlCakI7UUFDRCxTQUFTLElBZ0NSO1FBQ0QsU0FBUyxJQWdDUjtRQUNELGNBQWMsSUFrQmI7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5pbXBvcnQgeyBDYXJ0RGlzaEZyYWdtZW50cyB9IGZyb20gJy4uL2NhcnQtZGlzaC9jYXJ0LWRpc2guZ3FsJztcbmltcG9ydCB7IERpc2hGcmFnbWVudHMgfSBmcm9tICcuLi9kaXNoL2Rpc2guZ3FsJztcblxuZXhwb3J0IHR5cGUgQWRkVG9DYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0ZGlzaElkPzogc3RyaW5nLFxuXHRhbW91bnQ/OiBudW1iZXIsXG5cdG1vZGlmaWVycz86IGFueSxcblx0Y29tbWVudD86IHN0cmluZyxcblx0ZnJvbT86IHN0cmluZyxcblx0cmVwbGFjZT86IGJvb2xlYW4sXG5cdGNhcnREaXNoSWQ/OiBzdHJpbmdcbn07XG5cbmV4cG9ydCB0eXBlIFJlbW92ZUZyb21DYXJ0SW5wdXQgPSB7XG5cdGNhcnRJZD86IHN0cmluZyxcblx0Y2FydERpc2hJZD86IG51bWJlcixcblx0YW1vdW50PzogbnVtYmVyXG59O1xuXG5leHBvcnQgdHlwZSBPcmRlckNhcnRJbnB1dCA9IHtcblx0Y2FydElkOiBzdHJpbmcsXG5cdHBheW1lbnRNZXRob2RJZD86IHN0cmluZyxcblx0c2VsZlNlcnZpY2U/OiBib29sZWFuLFxuXHRhZGRyZXNzPzoge1xuXHRcdHN0cmVldElkPzogc3RyaW5nLFxuXHRcdGhvbWU/OiBzdHJpbmcsXG5cdFx0Y29tbWVudD86IHN0cmluZyxcblx0XHRjaXR5Pzogc3RyaW5nLFxuXHRcdHN0cmVldD86IHN0cmluZyxcblx0XHRob3VzaW5nPzogc3RyaW5nLFxuXHRcdGluZGV4Pzogc3RyaW5nLFxuXHRcdGVudHJhbmNlPzogc3RyaW5nLFxuXHRcdGZsb29yPzogc3RyaW5nLFxuXHRcdGFwYXJ0bWVudD86IHN0cmluZyxcblx0XHRkb29ycGhvbmU/OiBzdHJpbmdcblx0fSxcblx0Y3VzdHVtZXI/OiB7XG5cdFx0cGhvbmU6IHN0cmluZyxcblx0XHRtYWlsPzogc3RyaW5nLFxuXHRcdG5hbWU6IHN0cmluZ1xuXHR9XG59O1xuXG5leHBvcnQgdHlwZSBDaGVja1Bob25lQ29kZUlucHV0ID0ge1xuXHRwaG9uZTogc3RyaW5nLFxuXHRjb2RlOiBzdHJpbmdcbn07XG5cbmV4cG9ydCBjb25zdCBDYXJ0RnJhZ21lbnRzID0ge1xuXHRjYXJ0OiBncWxgXG5cdFx0ZnJhZ21lbnQgQ2FydEZyYWdtZW50IG9uIENhcnQge1xuXHRcdFx0aWRcblx0XHRcdGRpc2hlc0NvdW50XG5cdFx0XHRjb21tZW50XG5cdFx0XHRwZXJzb25zQ291bnRcblx0XHRcdGRlbGl2ZXJ5RGVzY3JpcHRpb25cblx0XHRcdG1lc3NhZ2Vcblx0XHRcdGRlbGl2ZXJ5Q29zdFxuXHRcdFx0dG90YWxXZWlnaHRcblx0XHRcdHRvdGFsXG5cdFx0XHRvcmRlclRvdGFsXG5cdFx0XHRjYXJ0VG90YWxcblx0XHRcdGRpc2NvdW50VG90YWxcblx0XHRcdHN0YXRlXG5cdFx0fVxuXHRgXG59O1xuXG5leHBvcnQgY29uc3QgQ2FydEdxbCA9IHtcblx0cXVlcmllczoge1xuXHRcdGdldENhcnQ6IChjYXJ0SWQ6IHN0cmluZyA9IG51bGwpID0+IHtcblx0XHRcdGlmKGNhcnRJZCA9PSAnbnVsbCcpIGNhcnRJZCA9IG51bGw7XG5cdFx0XHRjb25zdCBxdWVyeUFyZ3VtZW50cyA9IGNhcnRJZCA/IGAoY2FydElkOiBcIiR7Y2FydElkfVwiKWAgOiAnJztcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdHF1ZXJ5IEdldENhcnQge1xuXHRcdFx0XHRcdGNhcnQke3F1ZXJ5QXJndW1lbnRzfSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Z2V0UGhvbmU6IChwaG9uZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBwaG9uZSB7XG5cdFx0XHRcdFx0cGhvbmUocGhvbmU6IFwiJHtwaG9uZX1cIikge1xuXHRcdFx0XHRcdFx0aWRcblx0XHRcdFx0XHRcdHBob25lXG5cdFx0XHRcdFx0XHRpc0ZpcnN0XG5cdFx0XHRcdFx0XHRpc0NvbmZpcm1cblx0XHRcdFx0XHRcdGNvZGVUaW1lXG5cdFx0XHRcdFx0XHRjb25maXJtQ29kZVxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdGNoZWNrUGhvbmU6IChwaG9uZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBjaGVja1Bob25lIHtcblx0XHRcdFx0XHRjaGVja1Bob25lKHBob25lOiBcIiR7cGhvbmV9XCIpIHtcblx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHRjb25maXJtZWRcblx0XHRcdFx0XHRcdGZpcnN0YnV5XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRgO1xuXHRcdH1cblx0fSxcblx0bXV0YXRpb25zOiB7XG5cdFx0YWRkRGlzaFRvQ2FydDogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0bXV0YXRpb24gQWRkRGlzaFRvQ2FydChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmcsIFxuXHRcdFx0XHRcdCRkaXNoSWQ6IFN0cmluZywgXG5cdFx0XHRcdFx0JGFtb3VudDogSW50LCBcblx0XHRcdFx0XHQkbW9kaWZpZXJzOiBKc29uLCBcblx0XHRcdFx0XHQkY29tbWVudDogU3RyaW5nLFxuXHRcdFx0XHRcdCRmcm9tOiBTdHJpbmcsXG5cdFx0XHRcdFx0JHJlcGxhY2U6IEJvb2xlYW4sXG5cdFx0XHRcdFx0JGNhcnREaXNoSWQ6IFN0cmluZ1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjYXJ0QWRkRGlzaChcblx0XHRcdFx0XHRcdGNhcnRJZDogJGNhcnRJZCxcblx0XHRcdFx0XHRcdGRpc2hJZDogJGRpc2hJZCxcblx0XHRcdFx0XHRcdGFtb3VudDogJGFtb3VudCxcblx0XHRcdFx0XHRcdG1vZGlmaWVyczogJG1vZGlmaWVycyxcblx0XHRcdFx0XHRcdGNvbW1lbnQ6ICRjb21tZW50LFxuXHRcdFx0XHRcdFx0ZnJvbTogJGZyb20sXG5cdFx0XHRcdFx0XHRyZXBsYWNlOiAkcmVwbGFjZSxcblx0XHRcdFx0XHRcdGNhcnREaXNoSWQ6ICRjYXJ0RGlzaElkXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQuLi5DYXJ0RnJhZ21lbnRcblx0XHRcdFx0XHRcdGRpc2hlcyB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnREaXNoRnJhZ21lbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGl2ZXJ5SXRlbSB7XG5cdFx0XHRcdFx0XHRcdC4uLkRpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke0NhcnRGcmFnbWVudHMuY2FydH1cblx0XHRcdFx0JHtDYXJ0RGlzaEZyYWdtZW50cy5jYXJ0RGlzaH1cblx0XHRcdFx0JHtEaXNoRnJhZ21lbnRzLmRpc2h9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0cmVtb3ZlRGlzaEZyb21DYXJ0OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjYXJ0UmVtb3ZlRGlzaChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmchLCBcblx0XHRcdFx0XHQkY2FydERpc2hJZDogSW50ISwgXG5cdFx0XHRcdFx0JGFtb3VudDogSW50ISwgXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNhcnRSZW1vdmVEaXNoKFxuXHRcdFx0XHRcdFx0aWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRjYXJ0RGlzaElkOiAkY2FydERpc2hJZCxcblx0XHRcdFx0XHRcdGFtb3VudDogJGFtb3VudCxcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0ZGlzaGVzIHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydERpc2hGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsaXZlcnlJdGVtIHtcblx0XHRcdFx0XHRcdFx0Li4uRGlzaEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0XHQke0NhcnREaXNoRnJhZ21lbnRzLmNhcnREaXNofVxuXHRcdFx0XHQke0Rpc2hGcmFnbWVudHMuZGlzaH1cblx0XHRcdGA7XG5cdFx0fSxcblx0XHRvcmRlckNhcnQ6ICgpID0+IHtcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdG11dGF0aW9uIG9yZGVyQ2FydChcblx0XHRcdFx0XHQkY2FydElkOiBTdHJpbmchLCBcblx0XHRcdFx0XHQkcGF5bWVudE1ldGhvZElkOiBTdHJpbmchLFxuXHRcdFx0XHRcdCRzZWxmU2VydmljZTogQm9vbGVhbixcblx0XHRcdFx0XHQkYWRkcmVzczogQWRkcmVzcyxcblx0XHRcdFx0XHQkY3VzdG9tZXI6IEN1c3RvbWVyIVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRvcmRlckNhcnQoXG5cdFx0XHRcdFx0XHRjYXJ0SWQ6ICRjYXJ0SWQsXG5cdFx0XHRcdFx0XHRwYXltZW50TWV0aG9kSWQ6ICRwYXltZW50TWV0aG9kSWQsXG5cdFx0XHRcdFx0XHRzZWxmU2VydmljZTogJHNlbGZTZXJ2aWNlLFxuXHRcdFx0XHRcdFx0YWRkcmVzczogJGFkZHJlc3MsXG5cdFx0XHRcdFx0XHRjdXN0b21lcjogJGN1c3RvbWVyXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjYXJ0IHtcblx0XHRcdFx0XHRcdFx0Li4uQ2FydEZyYWdtZW50XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtZXNzYWdlIHtcblx0XHRcdFx0XHRcdFx0dGl0bGVcblx0XHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhY3Rpb24ge1xuXHRcdFx0XHRcdFx0XHR0eXBlXG5cdFx0XHRcdFx0XHRcdGRhdGFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtDYXJ0RnJhZ21lbnRzLmNhcnR9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdFx0Y2hlY2tDYXJ0OiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjaGVja0NhcnQoXG5cdFx0XHRcdFx0JGNhcnRJZDogU3RyaW5nISwgXG5cdFx0XHRcdFx0JHBheW1lbnRNZXRob2RJZDogU3RyaW5nISxcblx0XHRcdFx0XHQkc2VsZlNlcnZpY2U6IEJvb2xlYW4sXG5cdFx0XHRcdFx0JGFkZHJlc3M6IEFkZHJlc3MsXG5cdFx0XHRcdFx0JGN1c3RvbWVyOiBDdXN0b21lciFcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2hlY2tDYXJ0KFxuXHRcdFx0XHRcdFx0Y2FydElkOiAkY2FydElkLFxuXHRcdFx0XHRcdFx0cGF5bWVudE1ldGhvZElkOiAkcGF5bWVudE1ldGhvZElkLFxuXHRcdFx0XHRcdFx0c2VsZlNlcnZpY2U6ICRzZWxmU2VydmljZSxcblx0XHRcdFx0XHRcdGFkZHJlc3M6ICRhZGRyZXNzLFxuXHRcdFx0XHRcdFx0Y3VzdG9tZXI6ICRjdXN0b21lclxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y2FydCB7XG5cdFx0XHRcdFx0XHRcdC4uLkNhcnRGcmFnbWVudFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWVzc2FnZSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdFx0bWVzc2FnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YWN0aW9uIHtcblx0XHRcdFx0XHRcdFx0dHlwZVxuXHRcdFx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7Q2FydEZyYWdtZW50cy5jYXJ0fVxuXHRcdFx0YDtcblx0XHR9LFxuXHRcdGNoZWNrUGhvbmVDb2RlOiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRtdXRhdGlvbiBjaGVja1Bob25lQ29kZShcblx0XHRcdFx0XHQkcGhvbmU6IFN0cmluZyEsXG5cdFx0XHRcdFx0JGNvZGU6IFN0cmluZyFcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2hlY2tQaG9uZUNvZGUoXG5cdFx0XHRcdFx0XHRwaG9uZTogJHBob25lLFxuXHRcdFx0XHRcdFx0Y29kZTogJGNvZGVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHR5cGVcblx0XHRcdFx0XHRcdHRpdGxlXG5cdFx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHRjb25maXJtZWRcblx0XHRcdFx0XHRcdGZpcnN0YnV5XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRgO1xuXHRcdH0sXG5cdH1cbn0iXX0=