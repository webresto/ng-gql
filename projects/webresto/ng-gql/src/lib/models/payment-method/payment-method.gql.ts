import { gql } from 'apollo-angular';
import type { CustomfFields } from '../custom-fields/custom-fields';
import type { ValuesOrBoolean } from '../values-or-boolean';

export interface PaymentMethod {
	id: string;
	type: string;
	title: string;
	description: string;
	adapter: string;
	order: number;
	enable: boolean;
	customData: any;
}

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
	`,
	vOb: <ValuesOrBoolean<PaymentMethod>>{
		id: true,
		type: true,
		title: true,
		description: true,
		adapter: true,
		order: true,
		enable: true,
		customData: true,
	}
};

export const PaymentMethodGql = {
	queries: {
		getPaymentMethod: (orderId: string | null = null, customFields: CustomfFields) => {
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