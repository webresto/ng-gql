import type { Cart } from './cart';

export interface CheckResponse {
	cart: Cart;
	message: {
		title: string,
		type: string,
		message: string
	};
	action: {
		type: string,
		data: any
	}
}
