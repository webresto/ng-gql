import { gql } from 'apollo-angular';
import type { CustomfFields } from '../custom-fields/custom-fields';

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
		getPaymentMethod: (cartId: string | null = null, customFields:CustomfFields) => {
			if (cartId == 'null') {
				cartId = null;
			};
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