import type { Cart } from './cart';

export interface Order {
	cart: Cart;
	customData: any;
}
