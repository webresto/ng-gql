import { Cart } from './cart';

export class CheckResponse {
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
