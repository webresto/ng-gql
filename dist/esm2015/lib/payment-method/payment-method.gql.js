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
const ɵ0 = (cartId = null, customFields) => {
    if (cartId == 'null')
        cartId = null;
    const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
    return gql `
				query GetPaymentMethods {
					paymentMethods:paymentMethod${queryArguments} {
						...PaymentMethodFragment
						${(customFields['PaymentMethod'] || []).join('\n')}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1tZXRob2QuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ3JDLGFBQWEsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0VBV2pCO0NBQ0QsQ0FBQztXQUlrQixDQUFDLFNBQWlCLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRTtJQUN6RCxJQUFHLE1BQU0sSUFBSSxNQUFNO1FBQUUsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNuQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM3RCxPQUFPLEdBQUcsQ0FBQTs7bUNBRXNCLGNBQWM7O1FBRXpDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztNQUdsRCxzQkFBc0IsQ0FBQyxhQUFhO0lBQ3RDLENBQUM7QUFDSCxDQUFDO0FBZEgsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUc7SUFDL0IsT0FBTyxFQUFFO1FBQ1IsZ0JBQWdCLElBWWY7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBQYXltZW50TWV0aG9kRnJhZ21lbnRzID0ge1xuXHRwYXltZW50TWV0aG9kOiBncWxgXG5cdFx0ZnJhZ21lbnQgUGF5bWVudE1ldGhvZEZyYWdtZW50IG9uIFBheW1lbnRNZXRob2Qge1xuXHRcdFx0aWRcblx0XHRcdHR5cGVcblx0XHRcdHRpdGxlXG5cdFx0XHRkZXNjcmlwdGlvblxuXHRcdFx0YWRhcHRlclxuXHRcdFx0b3JkZXJcblx0XHRcdGVuYWJsZVxuXHRcdFx0Y3VzdG9tRGF0YVxuXHRcdH1cblx0YFxufTtcblxuZXhwb3J0IGNvbnN0IFBheW1lbnRNZXRob2RHcWwgPSB7XG5cdHF1ZXJpZXM6IHtcblx0XHRnZXRQYXltZW50TWV0aG9kOiAoY2FydElkOiBzdHJpbmcgPSBudWxsLCBjdXN0b21GaWVsZHMpID0+IHtcblx0XHRcdGlmKGNhcnRJZCA9PSAnbnVsbCcpIGNhcnRJZCA9IG51bGw7XG5cdFx0XHRjb25zdCBxdWVyeUFyZ3VtZW50cyA9IGNhcnRJZCA/IGAoY2FydElkOiBcIiR7Y2FydElkfVwiKWAgOiAnJztcblx0XHRcdHJldHVybiBncWxgXG5cdFx0XHRcdHF1ZXJ5IEdldFBheW1lbnRNZXRob2RzIHtcblx0XHRcdFx0XHRwYXltZW50TWV0aG9kczpwYXltZW50TWV0aG9kJHtxdWVyeUFyZ3VtZW50c30ge1xuXHRcdFx0XHRcdFx0Li4uUGF5bWVudE1ldGhvZEZyYWdtZW50XG5cdFx0XHRcdFx0XHQkeyhjdXN0b21GaWVsZHNbJ1BheW1lbnRNZXRob2QnXSB8fCBbXSkuam9pbignXFxuJyl9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR7UGF5bWVudE1ldGhvZEZyYWdtZW50cy5wYXltZW50TWV0aG9kfVxuXHRcdFx0YDtcblx0XHR9XG5cdH1cbn0iXX0=