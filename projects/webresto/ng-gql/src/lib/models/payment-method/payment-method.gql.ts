import { InjectionToken } from '@angular/core';
import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';
import type { ValuesOrBoolean } from '../values-or-boolean';

export interface PaymentMethod extends BaseModelWithCustomData {
	id: string;
	type: string;
	title: string;
	description: string;
	isCash: boolean;
	adapter: string;
	order: number;
	enable: boolean;
}

export const defaultPaymentMethodFragments: ValuesOrBoolean<PaymentMethod> = {
	id: true,
	type: true,
	title: true,
	description: true,
	isCash: true,
	adapter: true,
	order: true,
	enable: true,
	customData: true,
};

/**
 * InjectionToken с объектом ValuesOrBoolean<PaymentMethod>, используемым в запросе PaymentMethod с сервера.
 */
export const PAYMENT_METHOD_FRAGMENTS = new InjectionToken<ValuesOrBoolean<PaymentMethod>>(
	'PAYMENT_METHOD_FRAGMENTS', {
	providedIn: 'root',
	factory: () => ({ ...defaultPaymentMethodFragments })
});