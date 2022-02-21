import type { BehaviorSubject } from 'rxjs';
import type { Dish } from './dish/dish.gql';
import type { AddToOrderInput, Order, RemoveFromOrderInput, OrderForm, CheckResponse } from './order/order.gql';

/**
 * @alias CartBusEvent
 * Тип, описывающий события, которые отслеживаются в потоке NgGqlService.orderBus$.
 */
export type CartBusEvent = CartBusEventAdd | CartBusEventRemove | CartBusEventCheckSend;

/** 
 *  Добавление в заказ (корзину). */
export type CartBusEventAdd = {
  event: 'add';
  /** Данные для операции */
  data: AddToOrderInput;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;
  /** Заказ, с которым выполнется операция */
  order: Order;
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (order: Order) => void;
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;
}

/** 
 * Удаление блюда из заказа (корзины). */
export type CartBusEventRemove = {
  event: 'remove';
  /** Данные для операции */
  data: RemoveFromOrderInput & { dish: Dish; };
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;
  /** Заказ, с которым выполнется операция */
  order: Order;
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (order: Order) => void;
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;
}

/** 
 * Отправка заказа на проверку перед оформлением или непосредственно оформление. */
export type CartBusEventCheckSend = {
  event: 'check' | 'order';
  /** Данные формы чекаута */
  order: OrderForm;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  ordered?: BehaviorSubject<boolean>;
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (order: CheckResponse) => void;
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;
}
