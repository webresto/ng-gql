import type {BehaviorSubject} from 'rxjs';
import type {
  AddToOrderInput,
  Address,
  CheckOrderInput,
  CheckResponse,
  Order,
  RemoveOrSetAmountToDish,
  SetDishCommentInput,
} from './order/order';
import {PaymentMethod} from './payment-method';

/**
 * @alias @event CartBusEvent
 * Тип, описывающий события, которые отслеживаются в потоке NgGqlService.orderBus$.
 */
export type CartBusEvent =
  | CartBusEventAdd
  | CartBusEventUpdate
  | CartBusEventRemove
  | CartBusEventSetAmountToDish
  | CartBusEventSetCommentToDish
  | CartBusEventCheck
  | CartBusEventSend
  | CartBusEventClone;

/**
 * @event CartBusEventBase Базовый интерфейс событий в шине событий
 */
export interface CartBusEventBase<T> {
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (result: T) => void;

  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;

  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  isLoading?: BehaviorSubject<boolean>;
}

/**
 *  @event CartBusEventAdd
 * Добавление в заказ (корзину). */
export interface CartBusEventAdd extends CartBusEventBase<Order> {
  event: 'add';
  /** Данные для операции */
  data: AddToOrderInput;
}

/**
 *  @event CartBusEventUpdate
 * Обновление данных в заказе? НЕ связанных с блюдами. */
export interface CartBusEventUpdate extends CartBusEventBase<Order> {
  event: 'update';
  /** Данные для операции */
  data: UpdateOrderInput;
}

/**
 * @event CartBusEventRemove
 * Удаление блюда из заказа (корзины). */
export interface CartBusEventRemove extends CartBusEventBase<Order> {
  event: 'remove';
  /** Данные для операции */
  data: RemoveOrSetAmountToDish;
}

/**
 * @event CartBusEventSetToDish
 * Установить количество порций или комментарий для блюда
 * Данные необходимого блюда и требуемое количество указываются в @field data */
export interface CartBusEventSetAmountToDish extends CartBusEventBase<Order> {
  event: 'setDishAmount';
  /** Данные для операции */
  data: RemoveOrSetAmountToDish;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
}

/**
 * @event CartBusEventSetToDish
 * Установить количество порций или комментарий для блюда
 * Данные необходимого блюда и требуемое количество указываются в @field data */
export interface CartBusEventSetCommentToDish extends CartBusEventBase<Order> {
  event: 'setCommentToDish';
  /** Данные для операции */
  data: SetDishCommentInput;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
}

/**
 * @event CartBusEventCheck
 * Отправка заказа на проверку перед оформлением. */
export interface CartBusEventCheck extends CartBusEventBase<CheckResponse> {
  event: 'check';
  data: CheckOrderInput;
}

/**
 * @interface SendOrderInput
 * Данные для отправки оформленного заказа
 * orderId - id оформляемого заказа
 * orderIdFactory - необязательная фабричная функция для кастомной генерации id нового заказа, в случае успешного ответа API.
 * По умолчанию (если orderIdFactory не передавался) в качестве id нового заказа будет отправлено undefined и id будет сгенерирован на стороне сервера API.
 */
export interface SendOrderInput {
  orderId: string;
  orderIdFactory?: () => string | undefined;
}

/**
 * @interface UpdateOrderInput
 * Данные для обновления данных в заказе
 */
export interface UpdateOrderInput {
  id: Order['id'];
  comment?: Order['comment'] | undefined;
  trifleFrom?: Order['trifleFrom'] | undefined;
  promotionCodeString?: Order['promotionCodeString'];

  date?: Order['date'] | undefined;
  selfService?: Order['selfService'] | undefined;
  paymentMethodId?: PaymentMethod['id'] | undefined;
  address: Partial<Address> | undefined;
  pickupPoint: string | undefined;
}

/**
 * @event CartBusEventSen
 * Отправка заказа на оформление */
export interface CartBusEventSend extends CartBusEventBase<CheckResponse> {
  event: 'order';
  data: SendOrderInput;
}

/**
 * @event CartBusEventSend
 * Отправка заказа на оформление */
export interface CartBusEventClone extends CartBusEventBase<Order> {
  event: 'clone';
  data: SendOrderInput;
}
