import { gql } from 'apollo-angular';
export const PaymentMethodFragments = {
    paymentMethod: gql `
		fragment PaymentMethodFragment on PaymentMethod {
			id
			type
			title
			description
			adapter
			order
			enable
			customData
		}
	`
};
const ɵ0 = (cartId = null) => {
    if (cartId == 'null')
        cartId = null;
    const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
    return gql `
				query GetPaymentMethods {
					paymentMethods:paymentMethod${queryArguments} {
						...PaymentMethodFragment
					}
				}
				${PaymentMethodFragments.paymentMethod}
			`;
};
export const PaymentMethodGql = {
    queries: {
        getPaymentMethod: ɵ0
    }
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1tZXRob2QuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ3JDLGFBQWEsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0VBV2pCO0NBQ0QsQ0FBQztXQUlrQixDQUFDLFNBQWlCLElBQUksRUFBRSxFQUFFO0lBQzNDLElBQUcsTUFBTSxJQUFJLE1BQU07UUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ25DLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdELE9BQU8sR0FBRyxDQUFBOzttQ0FFc0IsY0FBYzs7OztNQUkzQyxzQkFBc0IsQ0FBQyxhQUFhO0lBQ3RDLENBQUM7QUFDSCxDQUFDO0FBYkgsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUc7SUFDL0IsT0FBTyxFQUFFO1FBQ1IsZ0JBQWdCLElBV2Y7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBQYXltZW50TWV0aG9kRnJhZ21lbnRzID0ge1xuXHRwYXltZW50TWV0aG9kOiBncWxgXG5cdFx0ZnJhZ21lbnQgUGF5bWVudE1ldGhvZEZyYWdtZW50IG9uIFBheW1lbnRNZXRob2Qge1xuXHRcdFx0aWRcblx0XHRcdHR5cGVcblx0XHRcdHRpdGxlXG5cdFx0XHRkZXNjcmlwdGlvblxuXHRcdFx0YWRhcHRlclxuXHRcdFx0b3JkZXJcblx0XHRcdGVuYWJsZVxuXHRcdFx0Y3VzdG9tRGF0YVxuXHRcdH1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IFBheW1lbnRNZXRob2RHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXRQYXltZW50TWV0aG9kOiAoY2FydElkOiBzdHJpbmcgPSBudWxsKSA9PiB7XG5cdFx0XHRpZihjYXJ0SWQgPT0gJ251bGwnKSBjYXJ0SWQgPSBudWxsO1xuXHRcdFx0Y29uc3QgcXVlcnlBcmd1bWVudHMgPSBjYXJ0SWQgPyBgKGNhcnRJZDogXCIke2NhcnRJZH1cIilgIDogJyc7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBHZXRQYXltZW50TWV0aG9kcyB7XG5cdFx0XHRcdFx0cGF5bWVudE1ldGhvZHM6cGF5bWVudE1ldGhvZCR7cXVlcnlBcmd1bWVudHN9IHtcblx0XHRcdFx0XHRcdC4uLlBheW1lbnRNZXRob2RGcmFnbWVudFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke1BheW1lbnRNZXRob2RGcmFnbWVudHMucGF5bWVudE1ldGhvZH1cblx0XHRcdGA7XG5cdFx0fVxuXHR9XG59Il19