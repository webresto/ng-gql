import { EventEmitter, Inject, Injectable } from '@angular/core';
import {
  combineLatest,
  fromEvent,
  of,
  filter,
  map,
  switchMap,
  shareReplay,
  startWith,
  catchError,
  concatMap,
  distinctUntilChanged,
  mergeWith,
} from 'rxjs';
import type { Observable, BehaviorSubject } from 'rxjs';
import type {
  NgGqlConfig,
  Action,
  Message,
  CheckOrderInput,
  Order,
  PaymentMethod,
  AddToOrderInput,
  Modifier,
  CheckResponse,
  CartBusEvent,
  RemoveOrSetAmountToDish,
  OrderForm,
  SetDishCommentInput,
  ValuesOrBoolean,
  OrderModifier,
  SendOrderInput,
} from '../models';
import { isValue } from '@axrl/common';
import { NqGqlLocalStorageWrapper } from '../models';
import {
  PAYMENT_METHOD_FRAGMENTS,
  ACTION_FRAGMENTS,
  MESSAGE_FRAGMENTS,
  ORDER_FRAGMENTS,
} from '../injection-tokens';
import { NgGqlService } from './ng-gql.service';
import type { FormGroupType } from '@axrl/ngx-extended-form-builder';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { NgGqlUserBusService } from './ng-gql-user-bus.service';

@Injectable()
export class NgOrderService {
  constructor(
    private ngGqlService: NgGqlService,
    private storage: NgGqlStorageService,
    private storageWrapper: NqGqlLocalStorageWrapper,
    private userBusService: NgGqlUserBusService,
    @Inject('NG_GQL_CONFIG') private config: NgGqlConfig,
    @Inject(PAYMENT_METHOD_FRAGMENTS)
    private defaultPaymentMethodFragments: ValuesOrBoolean<PaymentMethod>,
    @Inject(ACTION_FRAGMENTS)
    private defaultActionFragments: ValuesOrBoolean<Action>,
    @Inject(MESSAGE_FRAGMENTS)
    private defaultMessageFragments: ValuesOrBoolean<Message>,
    @Inject(ORDER_FRAGMENTS)
    private defaultOrderFragments: ValuesOrBoolean<Order>
  ) {}

  /**
   * @method updateStorageOrderIdToken()
   * @see this.StorageWrapper.updateStorageOrderIdToken()
   */
  updateStorageOrderIdToken(newToken: string) {
    this.storageWrapper.updateStorageOrderIdToken(newToken);
  }

  /**
   * @method getOrderId()
   * @see this.StorageWrapper.getOrderId()
   */
  getOrderId(storageOrderIdToken: string, storageOrderId?: string) {
    return this.storageWrapper.getOrderId(storageOrderIdToken, storageOrderId);
  }

  /**
   * @method setOrderId()
   * @see this.StorageWrapper.setOrderId()
   */
  setOrderId(orderId: string, storageOrderIdToken?: string) {
    this.storageWrapper.setOrderId(orderId, storageOrderIdToken);
  }

  /**
   * @method removeOrderId()
   * @see this.StorageWrapper.removeOrderId()
   */
  removeOrderId(newOrderId?: string) {
    this.storageWrapper.removeOrderId(newOrderId);
  }

  paymentLink$(
    phone: string,
    fromPhone: string,
    orderId: string
  ): Observable<any> {
    console.log('paymentLink', orderId, phone, fromPhone);
    return this.ngGqlService
      .customMutation$(
        'paymentLink',
        {
          paymentLink: 1,
        },
        orderId
          ? {
              orderId,
              phone,
              fromPhone,
            }
          : {
              phone,
              fromPhone,
            }
      )
      .pipe(
        catchError((error) => {
          console.log('error', error);
          if (this.config.debugMode) {
            alert(error);
          }
          this.emitMessageEvent({
            type: 'info',
            title: 'Не удалось отправить ссылку для оплаты.',
            message: error.message,
          });
          return of(() => {});
        })
      );
  }

  getPaymentMethods$(orderId: string | undefined): Observable<PaymentMethod[]> {
    return this.ngGqlService
      .customQuery$<PaymentMethod, 'paymentMethod', { orderId: string }>(
        'paymentMethod',
        this.defaultPaymentMethodFragments,
        { orderId: orderId ?? '' },
        {
          fieldsTypeMap: new Map([['orderId', 'String!']]),
        }
      )
      .pipe(
        map((data) =>
          (Array.isArray(data.paymentMethod)
            ? data.paymentMethod
            : [data.paymentMethod]
          ).filter((method) => method.enable)
        )
      );
  }

  private orderAndPaymentMethods$: Observable<{
    order: Order;
    methods: PaymentMethod[];
  }> = this.storageWrapper.storageOrderIdToken$.pipe(
    switchMap((storageOrderIdToken) =>
      fromEvent<StorageEvent>(window, 'storage', {
        passive: true,
      }).pipe(
        startWith(
          this.storageWrapper.startStorageEventFactory(storageOrderIdToken)
        ),
        filter((event) => event.key === storageOrderIdToken),
        map((event) =>
          this.storageWrapper.getOrderId(
            storageOrderIdToken,
            event.newValue ?? undefined
          )
        )
      )
    ),
    distinctUntilChanged(),
    switchMap((storageOrderId) => {
      return combineLatest([
        this.getPaymentMethods$(storageOrderId),
        this.loadOrder$(storageOrderId).pipe(distinctUntilChanged()),
      ]).pipe(
        map(([methods, order]) => {
          if (!isValue(order.paymentMethod) && methods.length > 0) {
            order.paymentMethod = {
              id: methods[0].id,
              title: methods[0].title,
            };
          }
          if (storageOrderId !== order.id) {
            this.setOrderId(order.id);
          }
          this.storage.updateOrder(order);
          this.storage.updatePaymentMethods(methods);

          return { methods, order };
        })
      );
    }),
    shareReplay(1)
  );

  /**
   * @method getOrderPaymentMethods$()
   * @returns Возвращает поток Observable с массивом доступных для этого заказа способов оплаты `PaymentMethod`.
   */
  getOrderPaymentMethods$(): Observable<PaymentMethod[]> {
    return this.orderAndPaymentMethods$.pipe(
      map((orderAndPaymentMethods) => orderAndPaymentMethods.methods)
    );
  }

  /**
   * @method () getOrder
   * @returns Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.
   */
  getOrder(): Observable<Order> {
    return this.orderAndPaymentMethods$.pipe(
      map((orderAndPaymentMethods) => orderAndPaymentMethods.order)
    );
  }

  private _eventMessage: EventEmitter<Message> = new EventEmitter();
  private _eventAction: EventEmitter<Action> = new EventEmitter();

  /**
   * Поток Observable, в который будут поступать события по текущему заказу в процессе оформления, подразумевающие совершение каких-либо действий на стороне фронта и выполняемых пользователем
   * (переход на страницу оплаты или, к примеру, открытие диалогового окна с предложением блюда по акции, акции и т.п. )
   * Для получения потока используется метод @method this.getActionEmitter()
   * Для отправки в поток кастомных сообщений испльзуется @method this.emitActionEvent()
   */
  private _actions$ = this.ngGqlService
    .customSubscribe$<Action, 'action'>('action', this.defaultActionFragments)
    .pipe(mergeWith(this._eventAction.asObservable()), shareReplay(1));

  /**
   * Поток Observable, в который будут поступать информационные сообщения по текущему заказу (блюдо добавлено/удалено/заказ оформлен).
   * Для получения потока используется метод @method this.getMessageEmitter()
   * Для отправки в поток кастомных сообщений испльзуется @method this.emitMessageEvent()
   */
  private _messages$ = this.ngGqlService
    .customSubscribe$<Message, 'message'>(
      'message',
      this.defaultMessageFragments
    )
    .pipe(mergeWith(this._eventMessage.asObservable()), shareReplay(1));

  /**
   * @method loadOrder$()
   *
   * Метод загружает заказ и делает подписку для получения по нему обновлений.
   * Используется для внутренних нужд библиотеки, а также может использоваться для загрузки заказа отдельно от шины событий заказов
   * (например, данные для страницы "Спасибо за заказ").
   *
   * @param id - id загружаемого заказа. Если отсутствует - создается новый заказ и возвращаются данные по нему.
   *  */
  loadOrder$(
    id: string | undefined,
    isShort: boolean = false
  ): Observable<Order> {
    return this.ngGqlService
      .queryAndSubscribe<
        Order,
        'order',
        'order',
        { orderId: string } | { shortId: string }
      >(
        'order',
        'order',
        this.defaultOrderFragments,
        'id',
        id
          ? {
              query: isShort ? { shortId: id } : { orderId: id },
            }
          : undefined,
        undefined
      )
      .pipe(
        map((values) => (values[0] ? values[0] : null)),
        filter((order): order is Order => isValue(order))
        /*      switchMap(
              order => {
                const dishesIds = order.dishes.map(orderDish => orderDish.dish?.id).filter((id): id is string => isValue(id));
                return this.ngGqlService.getDishes$(dishesIds).pipe(
                  map(
                    dishes => {
                      return {
                        ...order,
                        customer: {
                          name: order.customer?.name ?? null,
                          phone: order.customer?.phone ?? {
                            code: this.config.phoneCode,
                            number: null,
                          }
                        },
                        address: order.address ?? {
                          streetId: null,
                          home: null,
                          street: null,
                          comment: undefined,
                          city: undefined,
                          housing: undefined,
                          index: undefined,
                          entrance: undefined,
                          floor: undefined,
                          apartment: undefined,
                          doorphone: undefined
                        },
                        dishes: (order.dishes ?? []).map(
                          orderDish => ({
                            ...orderDish, dish: isValue(orderDish.dish) ?
                              dishes.find(
                                findedDish => findedDish.id === orderDish.dish!.id
                              ) ?? orderDish.dish :
                              orderDish.dish
                          })
                        )
                      };
                    })
                );
              }
            )
            */
      );
  }

  private _orderBus$ = new EventEmitter<CartBusEvent>();

  /**
   * Внутренний поток-шина для событий, ассоциированных с действиями, которыми необходимо выполнить с заказом (добавить/удалить блюдо, проверить заказ, отправить на проверку и тп.).
   * Используется только в случае, если в @see this.config параметр busSubscribeMode установлен в значении 'custom' для самостоятельного управления подпиской на стороне приложения.
   * Использование этого потока и событий внутри него извне не подразумевается и не предусматривается,
   * Для выполнения действий с заказом, необходимо использовать соответствующие методы:
   * @see this.addToOrder
   * @see this.removeFromOrder
   * @see this.checkOrder
   * @see this.sendOrder
   * @see this.setDishAmount
   * @see this.setDishComment
   */
  readonly orderBus$ = this.orderAndPaymentMethods$.pipe(
    map((data) => data.order),
    switchMap((order) =>
      this._orderBus$
        .asObservable()
        .pipe(map((busEvent) => ({ busEvent, order })))
    ),
    concatMap(({ busEvent, order }) => {
      const reducer = (
        busEventData: CartBusEvent
      ): Observable<Order | CheckResponse> => {
        switch (busEventData.event) {
          case 'add':
            return this.addDishToOrder$({
              ...busEventData.data,
              orderId: order.id,
            });
          case 'remove':
            return this.removeDishFromOrder$({
              id: order.id,
              orderDishId: busEventData.data.orderDishId,
              amount: busEventData.data.amount,
            });
          case 'check':
            return this.checkOrder$({
              ...busEventData.data,
              orderId: order.id,
            });
          case 'order':
            return this.sendOrder$(busEventData.data);
          case 'clone':
            return this.cloneOrder$(busEventData.data);
          case 'update':
            return this.updateOrder$(busEventData.data);
          case 'setDishAmount':
            return this.setDishAmount$({
              ...busEventData.data,
              id: order.id,
            });
          case 'setCommentToDish':
            return this.setDishComment$({
              ...busEventData.data,
              id: order.id,
            });
        }
      };
      return reducer(busEvent).pipe(
        map((result) => {
          if (isValue(busEvent.loading)) {
            busEvent.loading.next(false);
          }
          if (isValue(busEvent.successCb)) {
            busEvent.successCb(<Order & CheckResponse>result);
          }
        }),
        catchError((err: unknown) => {
          if (isValue(busEvent.loading)) {
            busEvent.loading.next(false);
          }
          if (busEvent.errorCb) {
            busEvent.errorCb(err);
          }
          if (this.config.debugMode) {
            alert(JSON.stringify(err));
          }
          console.log(err);
          return of(() => {});
        })
      );
    }),
    mergeWith(this.userBusService.userBus$)
  );

  private _orderBusSubscription$ =
    this.config.busSubscribeMode === 'subscribe'
      ? this.orderBus$.subscribe({
          next: () => {},
          error: () => {},
        })
      : undefined;

  /**
   * @method addToOrder()
   * Используется для отправки в шину события добавления блюда.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.dishId - id добавляемого блюдо
   * @param options.amount - количество
   * @param options.dishModifiers - выбранные пользователем модификаторы блюда (необязательный)
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  addToOrder(options: {
    loading: BehaviorSubject<boolean>;
    dishId: string;
    amount?: number;
    dishModifiers?: Partial<OrderModifier>[] | Partial<Modifier>[];
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
    comment?: string;
    replacedOrderDishId?: number;
  }) {
    options.loading.next(true);
    this._orderBus$.emit({
      event: 'add',
      loading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        dishId: options.dishId,
        modifiers: (options.dishModifiers ?? []).map((dishModifier) => ({
          id:
            'id' in dishModifier
              ? dishModifier.id
              : (<Partial<Modifier>>dishModifier).modifierId,
          amount: dishModifier.amount,
          dish: dishModifier.dish,
          groupId:
            dishModifier.dish?.parentGroup?.id ?? dishModifier.dish?.groupId,
        })),
        amount: options.amount ?? 1,
        comment: options.comment,
        replace: isValue(options.replacedOrderDishId),
        orderDishId: options.replacedOrderDishId,
      },
    });
  }

  /**
   * @method removeFromOrder()
   * Используется для отправки в шину события удаления блюда из корзины
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.amount - количество
   * @param options.orderDishId - id удаляемого блюда в корзине
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  removeFromOrder(options: {
    loading: BehaviorSubject<boolean>;
    amount: number;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
    orderDishId: number;
  }): void {
    options.loading.next(true);
    this._orderBus$.emit({
      event: 'remove',
      loading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderDishId: options.orderDishId,
        amount: options.amount ?? 1,
      },
    });
  }

  /**
   * @method updateOrder()
   * Используется для отправки в шину события обновления данных в заказе, не связанных с блюдами.
   * Может использоваться ТОЛЬКО ДО того, как заказ отправлен через @method this.sendOrder()
   * Также, заказ нужно повторно проверять методом @method this.checkOrder(), если такая проверка уже проводилась ранее.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.data - объект заказа, при этом не все данные из него будут приняты и, в результате, обновлены.
   * Большая часть будет данных будет проигнорирована и может изменяться только в рамках других методов согласно заложенной бизнес-логике.
   * В настоящее время из всего заказа учитываются изменения ТОЛЬКО в свойстве `Order.trifleFrom`.
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  updateOrder(options: {
    data: FormGroupType<OrderForm>['value'];
    loading: BehaviorSubject<boolean>;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }) {
    this._orderBus$.emit({
      event: 'update',
      data: options.data,
      loading: options.loading,
      errorCb: options.errorCb,
      successCb: options.successCb,
    });
  }

  /**
   * @method checkOrder()
   * Используется для отправки в шину события обязательной проверки заказа перед оформлением.
   * Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.
   * @param options.orderForm - Форма чекаута с данными проверяемого заказа
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  checkOrder(options: {
    orderForm: FormGroupType<OrderForm>['value'];
    successCb?: (order: CheckResponse) => void;
    errorCb?: (err: unknown) => void;
  }) {
    if (
      isValue(options.orderForm.selfService) &&
      isValue(options.orderForm.paymentMethod) &&
      isValue(options.orderForm.customer) &&
      isValue(options.orderForm.customer.phone) &&
      isValue(options.orderForm.customer.phone.code) &&
      isValue(options.orderForm.customer.phone.number) &&
      isValue(options.orderForm.address)
    ) {
      const data: Omit<CheckOrderInput, 'orderId'> = {
        paymentMethodId: options.orderForm.paymentMethod.id,
        selfService: options.orderForm.selfService,
        address: options.orderForm.address,
        customer: {
          mail: options.orderForm.customer.mail,
          name: options.orderForm.customer.name,
          phone: {
            code: options.orderForm.customer.phone.code,
            number: options.orderForm.customer.phone.number,
          },
        },
        comment: options.orderForm.comment,
        pickupAddressId: options.orderForm.pickupAddressId,
        locationId: options.orderForm.locationId,
        customData: options.orderForm.customData,
        date: options.orderForm.deliveryTimeInfo?.deliveryDate
          ? `${options.orderForm.deliveryTimeInfo.deliveryDate} ${options.orderForm.deliveryTimeInfo.deliveryTime}`
          : undefined,
      };

      this._orderBus$.emit({
        event: 'check',
        successCb: options.successCb,
        errorCb: options.errorCb,
        data,
      });
    } else {
      throw new Error(
        'В options.orderForm отсутствуют один или несколько обязательных параметров : selfService, paymentMethod, address, customer, customer.phone, customer.phone.code, customer.phone.number!'
      );
    }
  }

  /**
   * @method sendOrder()
   * Используется для отправки в шину события оформления заказа.
   * Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.
   * @param options.orderId - Форма чекаута с данными оформляемего заказа
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  sendOrder(options: {
    orderId: string;
    orderIdFactory?: () => string | undefined;
    loading?: BehaviorSubject<boolean>;
    successCb?: (order: CheckResponse) => void;
    errorCb?: (err: unknown) => void;
  }) {
    this._orderBus$.emit({
      event: 'order',
      loading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderId: options.orderId,
        orderIdFactory: options.orderIdFactory,
      },
    });
  }

  /**
   * @method cloneOrder()
   * Используется для отправки в шину события повтора уже сделанного ранее заказа.
   * @param options.orderId - Форма чекаута с данными оформляемего заказа
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  cloneOrder(options: {
    orderId: string;
    orderIdFactory?: () => string | undefined;
    loading?: BehaviorSubject<boolean>;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }) {
    this._orderBus$.emit({
      event: 'clone',
      loading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderId: options.orderId,
        orderIdFactory: options.orderIdFactory,
      },
    });
  }

  /**
   * @method setDishAmount()
   * Устанавливает для блюда dish в заказе количество amount.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.orderDishId - id блюда в корзине, для которого изменяется количество заказываемых порций
   * @param options.amount - необходимое количество порций
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  setDishAmount(options: {
    loading: BehaviorSubject<boolean>;
    orderDishId: number;
    amount?: number;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }): void {
    options.loading.next(true);
    this._orderBus$.emit({
      event: 'setDishAmount',
      loading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderDishId: options.orderDishId,
        amount: options.amount ?? 1,
      },
    });
  }

  /**
   * @method setDishComment()
   * Добавляет к заказываемому блюду комментарий.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.orderDishId - id блюда в корзине, которому добавляется комментарий
   * @param options.comment - добавляемый комментарий
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  setDishComment(options: {
    loading: BehaviorSubject<boolean>;
    orderDishId: number;
    comment: string;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }) {
    options.loading.next(true);
    this._orderBus$.emit({
      event: 'setCommentToDish',
      loading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderDishId: options.orderDishId,
        comment: options.comment,
      },
    });
  }

  private addDishToOrder$(data: AddToOrderInput): Observable<Order> {
    return this.ngGqlService
      .customMutation$<Order, 'orderAddDish', AddToOrderInput>(
        'orderAddDish',
        this.defaultOrderFragments,
        data
      )
      .pipe(map((data) => data.orderAddDish));
  }

  private removeDishFromOrder$(
    data: RemoveOrSetAmountToDish
  ): Observable<Order> {
    return this.ngGqlService
      .customMutation$<Order, 'orderRemoveDish', RemoveOrSetAmountToDish>(
        'orderRemoveDish',
        this.defaultOrderFragments,
        data,
        { requiredFields: ['orderDishId', 'id'] }
      )
      .pipe(map((data) => data.orderRemoveDish));
  }

  private updateOrder$(
    order: FormGroupType<OrderForm>['value']
  ): Observable<Order> {
    return this.ngGqlService
      .customMutation$<
        Order,
        'orderUpdate',
        {
          order: FormGroupType<OrderForm>['value'];
        }
      >('orderUpdate', this.defaultOrderFragments, { order })
      .pipe(map((data) => data.orderUpdate));
  }

  private sendOrder$(sendOrderData: SendOrderInput): Observable<CheckResponse> {
    return this.ngGqlService
      .customMutation$<CheckResponse, 'sendOrder', { orderId: string }>(
        'sendOrder',
        <ValuesOrBoolean<CheckResponse>>{
          order: this.defaultOrderFragments,
          message: this.defaultMessageFragments,
          action: this.defaultActionFragments,
        },
        {
          orderId: sendOrderData.orderId,
        },
        {
          requiredFields: ['orderId'],
        }
      )
      .pipe(
        map((data) => {
          if (isValue(data)) {
            if (isValue(sendOrderData.orderIdFactory)) {
              const newOrderId = sendOrderData.orderIdFactory();
              if (newOrderId) {
                this.setOrderId(newOrderId);
              } else {
                this.removeOrderId(newOrderId);
              }
            } else {
              this.removeOrderId();
            }
          }
          return data.sendOrder;
        })
      );
  }

  private cloneOrder$(sendOrderData: SendOrderInput): Observable<Order> {
    return this.ngGqlService
      .customMutation$<Order, 'orderClone', { orderId: string }>(
        'orderClone',
        this.defaultOrderFragments,

        {
          orderId: sendOrderData.orderId,
        },
        {
          requiredFields: ['orderId'],
        }
      )
      .pipe(
        map((data) => {
          if (isValue(data)) {
            if (isValue(sendOrderData.orderIdFactory)) {
              const newOrderId = sendOrderData.orderIdFactory();
              if (newOrderId) {
                this.setOrderId(newOrderId);
              } else {
                this.removeOrderId(newOrderId);
              }
            } else {
              this.removeOrderId();
            }
          }
          return data.orderClone;
        })
      );
  }

  private checkOrder$(data: CheckOrderInput): Observable<CheckResponse> {
    return this.ngGqlService
      .customMutation$<CheckResponse, 'checkOrder', CheckOrderInput>(
        'checkOrder',
        {
          order: this.defaultOrderFragments,
          message: this.defaultMessageFragments,
          action: this.defaultActionFragments,
        },
        data,
        {
          requiredFields: ['orderId', 'paymentMethodId', 'customer'],
          fieldsTypeMap: new Map([
            ['address', 'Address'],
            ['customer', 'Customer!'],
          ]),
        }
      )
      .pipe(map((data) => data.checkOrder));
  }

  private setDishAmount$(data: RemoveOrSetAmountToDish): Observable<Order> {
    return this.ngGqlService
      .customMutation$<Order, 'orderSetDishAmount', RemoveOrSetAmountToDish>(
        'orderSetDishAmount',
        this.defaultOrderFragments,
        data
      )
      .pipe(map((data) => data.orderSetDishAmount));
  }

  private setDishComment$(data: SetDishCommentInput): Observable<Order> {
    return this.ngGqlService
      .customMutation$<Order, 'orderSetDishComment', SetDishCommentInput>(
        'orderSetDishComment',
        this.defaultOrderFragments,
        data
      )
      .pipe(map((data) => data.orderSetDishComment));
  }

  destroy() {
    if (isValue(this._orderBusSubscription$)) {
      this._orderBusSubscription$.unsubscribe();
    }
    this.storageWrapper.destroy();
    Object.values(this)
      .filter(
        (property): property is EventEmitter<unknown> =>
          property instanceof EventEmitter
      )
      .forEach((property) => property.complete());
  }

  emitMessageEvent(message: Message) {
    this._eventMessage.emit(message);
  }
  emitActionEvent(action: Action) {
    this._eventAction.emit(action);
  }

  getMessageEmitter() {
    return this._messages$;
  }

  getActionEmitter() {
    return this._actions$;
  }
}
