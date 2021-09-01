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
        getPaymentMethod: (cartId = null) => {
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
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1tZXRob2QuZ3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wYXltZW50LW1ldGhvZC9wYXltZW50LW1ldGhvZC5ncWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ3JDLGFBQWEsRUFBRSxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0VBV2pCO0NBQ0QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQy9CLE9BQU8sRUFBRTtRQUNSLGdCQUFnQixFQUFFLENBQUMsU0FBaUIsSUFBSSxFQUFFLEVBQUU7WUFDM0MsSUFBRyxNQUFNLElBQUksTUFBTTtnQkFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25DLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdELE9BQU8sR0FBRyxDQUFBOzttQ0FFc0IsY0FBYzs7OztNQUkzQyxzQkFBc0IsQ0FBQyxhQUFhO0lBQ3RDLENBQUM7UUFDSCxDQUFDO0tBQ0Q7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5leHBvcnQgY29uc3QgUGF5bWVudE1ldGhvZEZyYWdtZW50cyA9IHtcblx0cGF5bWVudE1ldGhvZDogZ3FsYFxuXHRcdGZyYWdtZW50IFBheW1lbnRNZXRob2RGcmFnbWVudCBvbiBQYXltZW50TWV0aG9kIHtcblx0XHRcdGlkXG5cdFx0XHR0eXBlXG5cdFx0XHR0aXRsZVxuXHRcdFx0ZGVzY3JpcHRpb25cblx0XHRcdGFkYXB0ZXJcblx0XHRcdG9yZGVyXG5cdFx0XHRlbmFibGVcblx0XHRcdGN1c3RvbURhdGFcblx0XHR9XG5cdGBcbn07XG5cbmV4cG9ydCBjb25zdCBQYXltZW50TWV0aG9kR3FsID0ge1xuXHRxdWVyaWVzOiB7XG5cdFx0Z2V0UGF5bWVudE1ldGhvZDogKGNhcnRJZDogc3RyaW5nID0gbnVsbCkgPT4ge1xuXHRcdFx0aWYoY2FydElkID09ICdudWxsJykgY2FydElkID0gbnVsbDtcblx0XHRcdGNvbnN0IHF1ZXJ5QXJndW1lbnRzID0gY2FydElkID8gYChjYXJ0SWQ6IFwiJHtjYXJ0SWR9XCIpYCA6ICcnO1xuXHRcdFx0cmV0dXJuIGdxbGBcblx0XHRcdFx0cXVlcnkgR2V0UGF5bWVudE1ldGhvZHMge1xuXHRcdFx0XHRcdHBheW1lbnRNZXRob2RzOnBheW1lbnRNZXRob2Qke3F1ZXJ5QXJndW1lbnRzfSB7XG5cdFx0XHRcdFx0XHQuLi5QYXltZW50TWV0aG9kRnJhZ21lbnRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHtQYXltZW50TWV0aG9kRnJhZ21lbnRzLnBheW1lbnRNZXRob2R9XG5cdFx0XHRgO1xuXHRcdH1cblx0fVxufSJdfQ==