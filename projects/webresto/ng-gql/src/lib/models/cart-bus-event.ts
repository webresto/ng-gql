import type { BehaviorSubject } from 'rxjs';
import type { Order, OrderForm, AddToOrderInput, RemoveOrSetAmountToDish, SetDishCommentInput, CheckResponse } from './order/order.gql';

/**
 * @alias CartBusEvent
 * @event
 * Тип, описывающий события, которые отслеживаются в потоке NgGqlService.orderBus$.
 */
export type CartBusEvent = CartBusEventAdd | CartBusEventRemove | CartBusEventSetAmountToDish | CartBusEventSetCommentToDish | CartBusEventCheckSend;

/**
 * @event CartBusEventBase Базовый интерфейс событий в шине событий
 */
export type CartBusEventBase<T extends (Order | OrderForm) = Order> = {
  /** Заказ, с которым выполнется операция */
  order: T;
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (result: T extends OrderForm ? CheckResponse : Order) => void;
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;
};

/**
 *  @event CartBusEventAdd
 * Добавление в заказ (корзину). */
export type CartBusEventAdd = {
  event: 'add';
  /** Данные для операции */
  data: AddToOrderInput;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;

} & CartBusEventBase;

/**
 * @event CartBusEventRemove
 * Удаление блюда из заказа (корзины). */
export type CartBusEventRemove = {
  event: 'remove';
  /** Данные для операции */
  data: RemoveOrSetAmountToDish;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;
} & CartBusEventBase;

/**
 * @event CartBusEventSetToDish
 * Установить количество порций или комментарий для блюда
 * Данные необходимого блюда и требуемое количество указываются в @field data */
export type CartBusEventSetAmountToDish = {
  event: 'setDishAmount';
  /** Данные для операции */
  data: RemoveOrSetAmountToDish;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;
  /** Заказ, с которым выполнется операция */
} & CartBusEventBase;

/**
 * @event CartBusEventSetToDish
 * Установить количество порций или комментарий для блюда
 * Данные необходимого блюда и требуемое количество указываются в @field data */
export type CartBusEventSetCommentToDish = {
  event: 'setCommentToDish';
  /** Данные для операции */
  data: SetDishCommentInput;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;
  /** Заказ, с которым выполнется операция */
} & CartBusEventBase;

/**
 * @event CartBusEventCheckSend
 * Отправка заказа на проверку перед оформлением или непосредственно оформление. */
export type CartBusEventCheckSend = {
  event: 'check' | 'order';
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  ordered?: BehaviorSubject<boolean>;
} & CartBusEventBase<OrderForm>;
