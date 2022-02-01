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
		getPaymentMethod: (orderId: string | null = null, customFields:CustomfFields) => {
			if (orderId == 'null') {
				orderId = null;
			};
			const queryArguments = orderId ? `(orderId: "${orderId}")` : '';
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