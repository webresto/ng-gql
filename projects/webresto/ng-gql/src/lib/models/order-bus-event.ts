import type { BehaviorSubject } from 'rxjs';
import type { Order, CheckOrderInput, AddToOrderInput, RemoveOrSetAmountToDish, SetDishCommentInput, CheckResponse, OrderForm } from './order/order.gql';
import type { ScanFormType } from './scan-form-type';

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
  data: ScanFormType<OrderForm>[ 'value' ];
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
  data: Omit<SetDishCommentInput, 'id'>;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
} & CartBusEventBase<Order>;

/**
 * @event CartBusEventCheck
 * Отправка заказа на проверку перед оформлением. */
export type CartBusEventCheck = {
  event: 'check';
  data: Omit<CheckOrderInput, 'orderId'>;
} & CartBusEventBase<CheckResponse>;

/**
 * @interface SendOrderInput
 * Данные для отправки оформленного заказа
 * orderId - id оформляемого заказа
 * orderIdFactory - необязательная фабричная функция для кастомной генерации id нового заказа, в случае успешного ответа API.
 * По умолчанию (если orderIdFactory не передавался) в качестве id нового заказа будет отправлено undefined и id будет сгенерирован на стороне сервера API.
 */
export interface SendOrderInput {
  orderId: string,
  orderIdFactory?: () => string | undefined;
}

/**
 * @event CartBusEventSend
 * Отправка заказа на оформление */
export type CartBusEventSend = {
  event: 'order';
  data: SendOrderInput;
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
  newOrderId?: string;
};
