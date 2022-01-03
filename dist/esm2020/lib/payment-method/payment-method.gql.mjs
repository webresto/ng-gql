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
export const PaymentMethodGql = {
    queries: {
        getPaymentMethod: (cartId = null, customFields) => {
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
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1tZXRob2QuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ3JDLGFBQWEsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0VBV2pCO0NBQ0QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQy9CLE9BQU8sRUFBRTtRQUNSLGdCQUFnQixFQUFFLENBQUMsU0FBaUIsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFO1lBQ3pELElBQUcsTUFBTSxJQUFJLE1BQU07Z0JBQUUsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM3RCxPQUFPLEdBQUcsQ0FBQTs7bUNBRXNCLGNBQWM7O1FBRXpDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztNQUdsRCxzQkFBc0IsQ0FBQyxhQUFhO0lBQ3RDLENBQUM7UUFDSCxDQUFDO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5leHBvcnQgY29uc3QgUGF5bWVudE1ldGhvZEZyYWdtZW50cyA9IHtcblx0cGF5bWVudE1ldGhvZDogZ3FsYFxuXHRcdGZyYWdtZW50IFBheW1lbnRNZXRob2RGcmFnbWVudCBvbiBQYXltZW50TWV0aG9kIHtcblx0XHRcdGlkXG5cdFx0XHR0eXBlXG5cdFx0XHR0aXRsZVxuXHRcdFx0ZGVzY3JpcHRpb25cblx0XHRcdGFkYXB0ZXJcblx0XHRcdG9yZGVyXG5cdFx0XHRlbmFibGVcblx0XHRcdGN1c3RvbURhdGFcblx0XHR9XG5cdGBcbn07XG5cbmV4cG9ydCBjb25zdCBQYXltZW50TWV0aG9kR3FsID0ge1xuXHRxdWVyaWVzOiB7XG5cdFx0Z2V0UGF5bWVudE1ldGhvZDogKGNhcnRJZDogc3RyaW5nID0gbnVsbCwgY3VzdG9tRmllbGRzKSA9PiB7XG5cdFx0XHRpZihjYXJ0SWQgPT0gJ251bGwnKSBjYXJ0SWQgPSBudWxsO1xuXHRcdFx0Y29uc3QgcXVlcnlBcmd1bWVudHMgPSBjYXJ0SWQgPyBgKGNhcnRJZDogXCIke2NhcnRJZH1cIilgIDogJyc7XG5cdFx0XHRyZXR1cm4gZ3FsYFxuXHRcdFx0XHRxdWVyeSBHZXRQYXltZW50TWV0aG9kcyB7XG5cdFx0XHRcdFx0cGF5bWVudE1ldGhvZHM6cGF5bWVudE1ldGhvZCR7cXVlcnlBcmd1bWVudHN9IHtcblx0XHRcdFx0XHRcdC4uLlBheW1lbnRNZXRob2RGcmFnbWVudFxuXHRcdFx0XHRcdFx0JHsoY3VzdG9tRmllbGRzWydQYXltZW50TWV0aG9kJ10gfHwgW10pLmpvaW4oJ1xcbicpfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQke1BheW1lbnRNZXRob2RGcmFnbWVudHMucGF5bWVudE1ldGhvZH1cblx0XHRcdGA7XG5cdFx0fVxuXHR9XG59Il19