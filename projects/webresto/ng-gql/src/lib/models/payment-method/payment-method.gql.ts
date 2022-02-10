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