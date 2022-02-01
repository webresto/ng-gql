import type { Order } from './order';

export interface CheckResponse {
	order: Order;
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
