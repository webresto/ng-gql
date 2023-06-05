import type { PaymentMethod } from '../payment-method/payment-method.gql';
import type { Modifier, OrderModifier } from '../modifier/modifier.gql';
import type { Message, Action } from '../event-message/event-message';
import type { BaseModelWithCustomData } from '../base/base-model-with-custom-data';
import type { Customer } from '../customer/customer';
import { OrderDish } from '../order-dish/order-dish.gql';
import type { Dish } from '../dish/dish.gql';

/**
 * @alias OrderState
 * Возможные состояния заказа.
 *  `CART` - начальное состояние заказа
 *  `CHECKOUT` - заказ проверен и готов к оформлению.
 * В заказе еще возможны изменения, но после любых изменений требуется повторно выполнять проверку.
 * @see 'NgOrderService.checkOrder'
 *  `PAYMENT` - заказ переходит в это состояние при выборе онлайн оплаты или через внутреннюю платежную систему (бонусами и т.п.),
		Состояние сохраняется, пока оплата не будет завершена, после чего заказ перейдет в состояние `ORDER`.
 *  `ORDER` - заказ успешно оформлен. Это финальный статус и он не подразумевает, что заказ также был доставлен.
		Данные о выполненной доставке могут быть получены от RMS (`Order.rmsDelivered`).
 */
export type OrderState = 'CART' | 'CHECKOUT' | 'PAYMENT' | 'ORDER';

export interface Order<T extends Dish = Dish> extends BaseModelWithCustomData {
  id: string;
  shortId: string;
  dishes: Partial<OrderDish<T>>[];
  dishesCount: number;
  comment: string;
  deliveryDescription: string;
  message: string | null;
  deliveryCost: number;
  totalWeight: number;
  trifleFrom: number;
  total: number;
  orderTotal: number;
  discountTotal: number;
  state: OrderState;
  rmsId?: string;
  rmsOrderNumber?: string;
  rmsDeliveryDate?: string;
  rmsDelivered?: boolean;
  customer: Partial<Customer> | null;
  address: Partial<Address> | null;
  paid?: boolean;
  paymentMethod: Partial<PaymentMethod> | null;
  selfService: boolean;
  date: string | null;
}

export interface Address {
  streetId: string | null;
  home: string | null;
  comment?: string | null;
  city?: string | null;
  street: string | null;
  housing?: string | null;
  index?: string | null;
  entrance?: string | null;
  floor?: string | null;
  apartment?: string | null;
  doorphone?: string | null;
}

export interface AddToOrderInput {
  orderId: string;
  dishId: string;
  amount?: number;
  modifiers?: Partial<OrderModifier>[] | Partial<Modifier>[];
  comment?: string;
  replace?: boolean;
  orderDishId?: number;
}

export interface RemoveOrSetAmountToDish {
  orderDishId?: number;
  amount?: number;
  id: string;
}

export interface SetDishCommentInput {
  id?: string;
  comment?: string;
  orderDishId: number;
}

export interface CheckOrderInput extends Partial<BaseModelWithCustomData> {
  orderId: string;
  paymentMethodId?: string;
  selfService: boolean;
  pickupAddressId?: string;
  locationId?: string;
  date?: string;
  address: Partial<Address> | null;
  customer: Partial<Customer> | null;
  comment?: string;
  notifyMethodId?: string;
}

export interface CheckResponse {
  order: Partial<Order>;
  message: Partial<Message> | null;
  action: Partial<Action> | null;
}

export interface OrderAdditionalFields {
  pickupAddressId?: string | undefined;
  locationId?: string | undefined;
  promocode?: string | undefined;
}

export type OrderForm = Order & OrderAdditionalFields;
