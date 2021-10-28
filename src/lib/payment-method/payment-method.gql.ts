import { gql } from 'apollo-angular';

export const PaymentMethodFragments = {
	paymentMethod: gql`
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
		getPaymentMethod: (cartId: string = null, customFields) => {
			if(cartId == 'null') cartId = null;
			const queryArguments = cartId ? `(cartId: "${cartId}")` : '';
			return gql`
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
}