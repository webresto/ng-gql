import type { BehaviorSubject } from 'rxjs';
import type { Dish } from './dish/dish.gql';
import type { Order, OrderForm, AddToOrderInput, RemoveOrSetAmountToDish, SetDishCommentInput, CheckResponse } from './order/order.gql';

/**
 * @alias CartBusEvent
 * @event
 * Тип, описывающий события, которые отслеживаются в потоке NgGqlService.orderBus$.
 */
export type CartBusEvent = CartBusEventAdd | CartBusEventUpdate | CartBusEventRemove | CartBusEventSetAmountToDish | CartBusEventSetCommentToDish | CartBusEventCheck | CartBusEventSend;

/**
 * @event CartBusEventBase Базовый интерфейс событий в шине событий
 */
export type CartBusEventBase<T> = {
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (result: T) => void;

  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;

  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading?: BehaviorSubject<boolean>;
};

/**
 *  @event CartBusEventAdd
 * Добавление в заказ (корзину). */
export type CartBusEventAdd = {
  event: 'add';
  /** Данные для операции */
  data: Omit<AddToOrderInput, 'orderId'>;
} & CartBusEventBase<Order>;

/**
 *  @event CartBusEventUpdate
 * Обновление данных в заказе? НЕ связанных с блюдами. */
export type CartBusEventUpdate = {
  event: 'update';
  /** Данные для операции */
  data: Order;
} & CartBusEventBase<Order>;

/**
 * @event CartBusEventRemove
 * Удаление блюда из заказа (корзины). */
export type CartBusEventRemove = {
  event: 'remove';
  /** Данные для операции */
  data: Omit<RemoveOrSetAmountToDish, 'id'>;
} & CartBusEventBase<Order>;

/**
 * @event CartBusEventSetToDish
 * Установить количество порций или комментарий для блюда
 * Данные необходимого блюда и требуемое количество указываются в @field data */
export type CartBusEventSetAmountToDish = {
  event: 'setDishAmount';
  /** Данные для операции */
  data: Omit<RemoveOrSetAmountToDish, 'id'>;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
} & CartBusEventBase<Order>;

/**
 * @event CartBusEventSetToDish
 * Установить количество порций или комментарий для блюда
 * Данные необходимого блюда и требуемое количество указываются в @field data */
export type CartBusEventSetCommentToDish = {
  event: 'setCommentToDish';
  /** Данные для операции */
  data: Omit<SetDishCommentInput<Dish>, 'id'>;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
} & CartBusEventBase<Order>;

/**
 * @event CartBusEventCheck
 * Отправка заказа на проверку перед оформлением. */
export type CartBusEventCheck = {
  event: 'check';
  data: OrderForm;
} & CartBusEventBase<CheckResponse>;

/**
 * @event CartBusEventSend
 * Отправка заказа на оформление */
export type CartBusEventSend = {
  event: 'order';
  data: string;
} & CartBusEventBase<CheckResponse>;

export type StorageOrderTokenEvent = StorageOrderTokenSetOrderId | StorageOrderTokenRemoveOrderId;

export type StorageOrderTokenSetOrderId = {
  event: 'setOrderId';
  data: {
    orderId: string;
    alternativeToken?: string;
  };
};

export type StorageOrderTokenRemoveOrderId = {
  event: 'removeOrderId';
};


