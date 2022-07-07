import { EventEmitter, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, of } from 'rxjs';
import type { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, shareReplay, startWith, catchError, concatMap, distinctUntilKeyChanged, distinctUntilChanged, mergeWith } from 'rxjs/operators';
import type {
  NgGqlConfig, Action, Message,
  CheckOrderInput, Order, PaymentMethod, AddToOrderInput, Modifier,
  CheckResponse, CartBusEvent, RemoveOrSetAmountToDish, OrderForm,
  SetDishCommentInput, ValuesOrBoolean, StorageOrderTokenEvent, OrderModifier, SendOrderInput
} from '../models';
import { isValue, isEqualItems, PAYMENT_METHOD_FRAGMENTS, ACTION_FRAGMENTS, MESSAGE_FRAGMENTS, ORDER_FRAGMENTS } from '../models';;
import { NgGqlService } from './ng-gql.service';
import type { ScanFormType } from '../models/scan-form-type';


@Injectable({
  providedIn: 'root'
})
export class NgOrderService {

  constructor(
    private ngGqlService: NgGqlService,
    @Inject('config') private config: NgGqlConfig,
    @Inject(PAYMENT_METHOD_FRAGMENTS) private defaultPaymentMethodFragments: ValuesOrBoolean<PaymentMethod>,
    @Inject(ACTION_FRAGMENTS) private defaultActionFragments: ValuesOrBoolean<Action>,
    @Inject(MESSAGE_FRAGMENTS) private defaultMessageFragments: ValuesOrBoolean<Message>,
    @Inject(ORDER_FRAGMENTS) private defaultOrderFragments: ValuesOrBoolean<Order>,
  ) { }

  /**
   * Поток для изменения "на лету" токена, с которым в localStorage сохраняется id заказа.
   * Необходим для реализации на сайте "мультикорзины" - нескольких параллельных корзин, между которыми пользователь может переключаться при переходе по страницам сайта.
   */
  private _storageOrderIdToken$ = new BehaviorSubject<string | null>(
    this.config.orderIdStorageToken !== undefined ?
      this.config.orderIdStorageToken :
      `${ window.location.host }-orderId
     `);

  private storageOrderIdToken$ = this._storageOrderIdToken$.pipe(
    filter((storageOrderIdToken): storageOrderIdToken is string => !!storageOrderIdToken),
    distinctUntilChanged(),
  );

  /**
   * @method updateStorageOrderIdToken
   * Реализация "мульткорзины".
   * Предназначен для переключения между корзинами, каждая из которых хранятся в localStorage со своим токеном.
   * Предназначен для переключения потоков с
   * @param newToken
   */
  updateStorageOrderIdToken(newToken: string) {
    this._storageOrderIdToken$.next(newToken);
  }

  /**
   * @method getOrderId
   *  @returns Возвращает orderId, сохраненный ранее в localStorage с ключом @interface `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
   * Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
   * Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
   * Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).
   */
  getOrderId(storageOrderIdToken: string, storageOrderId?: string): string | undefined {
    try {
      const cartString = isValue(storageOrderId) ? storageOrderId : localStorage.getItem(storageOrderIdToken);
      if (cartString) {
        const cartData: {
          orderId: string;
          dt: number;
        } = JSON.parse(cartString);
        const idObsolescence = (43200000 * (isValue(this.config.obsolescence) ? this.config.obsolescence : 14));
        if ((Date.now() - cartData.dt) > idObsolescence) {
          return undefined;
        } else {
          return cartData.orderId;
        };
      } else {
        return undefined;
      };
    } catch (error) {
      return undefined;
    };
  }

  /**
   * @method setOrderId
   * @param orderId - id Заказа, который требуется сохранить в localStorage с ключом @interface `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
   * Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
   * Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
   * Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).
   * @param storageOrderIdToken - необязательный альтернативный токен для сохранения orderId в localstorage.
   * Также все последующие операции в localStorage данными заказа начнут использовать этот токен, т.к. обновится внутренняя подписка информации об используемом токене.
   */
  setOrderId(orderId: string, storageOrderIdToken?: string) {
    this._storageActionBus$.emit({
      event: 'setOrderId',
      data: {
        orderId,
        alternativeToken: storageOrderIdToken
      }
    });
  }

  /**
   * @method removeOrderId
   * Удаляет сохраненный в localStorage id заказа.
   */
  removeOrderId(newOrderId?: string) {
    this._storageActionBus$.emit({
      event: 'removeOrderId',
      newOrderId
    });
  }

  paymentLink$(phone: string, fromPhone: string, orderId: string): Observable<any> {
    console.log('paymentLink', orderId, phone, fromPhone);
    return this.ngGqlService.customMutation$('paymentLink', {
      paymentLink: 1
    }, orderId ? {
      orderId,
      phone,
      fromPhone
    } : {
      phone,
      fromPhone
    })
      .pipe(
        catchError(error => {
          console.log('error', error);
          this.emitMessageEvent({
            type: 'info',
            title: 'Не удалось отправить ссылку для оплаты.',
            message: error.message
          });
          return of(null);
        })
      );
  }

  getPaymentMethods$(orderId: string | undefined): Observable<PaymentMethod[]> {
    return this.ngGqlService.customQuery$<PaymentMethod, 'paymentMethod', { orderId: string; }>(
      'paymentMethod', this.defaultPaymentMethodFragments, { orderId: orderId ?? '' }, {
      fieldsTypeMap: new Map([
        [ 'orderId', 'String!' ]
      ])
    }
    ).pipe(
      map(
        data => (
          Array.isArray(data.paymentMethod) ? data.paymentMethod : [ data.paymentMethod ]
        ).filter(
          method => method.enable
        )
      )
    );
  };

  private orderAndPaymentMethods$: Observable<{
    order: Order,
    methods: PaymentMethod[];
  }> = this.storageOrderIdToken$.pipe(
    switchMap(
      storageOrderIdToken => fromEvent<StorageEvent>(window, 'storage', {
        passive: true
      }).pipe(
        startWith({
          key: storageOrderIdToken,
          /** Returns the new value of the key of the storage item whose value is being changed. */
          newValue: localStorage.getItem(storageOrderIdToken),
          /** Returns the old value of the key of the storage item whose value is being changed. */
          oldValue: localStorage.getItem(storageOrderIdToken),
          /** Returns the Storage object that was affected. */
          storageArea: window.localStorage,
          /** Returns the URL of the document whose storage item changed. */
          url: window.location.href
        }),
        //    filter(event => event.key === storageOrderIdToken),
        map(ev => {
          debugger;
          return ev;
        }),
        map(event => this.getOrderId(storageOrderIdToken, event.newValue ?? undefined)),
        shareReplay(1),
      )
    ),
    distinctUntilChanged(),
    switchMap(

      storageOrderId => {
        debugger;
        return combineLatest([
          this.getPaymentMethods$(storageOrderId),
          this.loadOrder$(storageOrderId).pipe(
            map(
              order => {
                if (order.state === 'ORDER') {
                  this.removeOrderId();
                };
                return order;
              }),
            distinctUntilChanged((previous, current) => {
              return isEqualItems(previous, current);
            })
          )
        ]).pipe(
          map(
            data => {
              const [ methods, order ] = data;

              return {
                methods,
                order: {
                  ...order,
                  paymentMethod: !order.paymentMethod && methods.length > 0 ? {
                    id: methods[ 0 ].id,
                    title: methods[ 0 ].title
                  } : order.paymentMethod
                }
              };
            })
        );
      }),
    shareReplay(1),
    distinctUntilChanged((previous, current) => {
      return isEqualItems(previous, current);
    })
  );

  private _orderPaymentMethods$ = this.orderAndPaymentMethods$.pipe(
    map(
      orderAndPaymentMethods => orderAndPaymentMethods.methods
    )
  );

  /**
   * @method getOrderPaymentMethods$
   * @returns Возвращает поток Observable с массивом доступных для этого заказа способов оплаты `PaymentMethod`.
   */
  getOrderPaymentMethods$(): Observable<PaymentMethod[]> {
    return this._orderPaymentMethods$;
  };

  private _order$ = this.orderAndPaymentMethods$.pipe(
    map(
      orderAndPaymentMethods => orderAndPaymentMethods.order
    )
  );

  /**
   * @method  getOrder
   * @returns Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.
   */
  getOrder(): Observable<Order> {
    return this._order$;
  };


  private _eventMessage: EventEmitter<Message> = new EventEmitter();
  private _eventAction: EventEmitter<Action> = new EventEmitter();

  /**
   * Поток Observable, в который будут поступать события по текущему заказу в процессе оформления, подразумевающие совершение каких-либо действий на стороне фронта и выполняемых пользователем
   * (переход на страницу оплаты или, к примеру, открытие диалогового окна с предложением блюда по акции, акции и т.п. )
   * Для получения потока используется метод @method getActionEmitter()
   * Для отправки в поток кастомных сообщений испльзуется @method emitActionEvent()
   */
  private _actions$ = this.getOrder().pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.ngGqlService.customSubscribe$<Action, 'action', {
        orderId: string;
      }>('action', this.defaultActionFragments, { orderId: order.id })
    ),
    mergeWith(this._eventAction.asObservable()),
    shareReplay(1)
  );

  /**
   * Поток Observable, в который будут поступать информационные сообщения по текущему заказу (блюдо добавлено/удалено/заказ оформлен).
   * Для получения потока используется метод @method getMessageEmitter()
   * Для отправки в поток кастомных сообщений испльзуется @method emitMessageEvent()
   */
  private _messages$ = this.getOrder().pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.ngGqlService.customSubscribe$<Message, 'message', {
        orderId: string;
      }>('message', this.defaultMessageFragments, { orderId: order.id })
    ),
    mergeWith(this._eventMessage.asObservable()),
    shareReplay(1)
  );

  /**
  * @method loadOrder$
  *
  * Метод загружает заказ и делает подписку для получения по нему обновлений.
  * Используется для внутренних нужд библиотеки, а также может использоваться для загрузки заказа отдельно от шины событий заказов
  * (например, данные для страницы "Спасибо за заказ").
  *
  * @param orderId - id загружаемого заказа. Если отсутствует - создается новый заказ и возвращаются данные по нему.
  *  */
  loadOrder$(orderId: string | undefined): Observable<Order> {
    const customvOb = this.config.customFields?.[ 'Order' ];
    const vOb = customvOb ? { ...this.defaultOrderFragments, ...customvOb } : this.defaultOrderFragments;
    return this.ngGqlService.queryAndSubscribe<Order, 'order', 'order', { orderId: string; } | undefined>('order', 'order', vOb, 'id', orderId ? {
      query: {
        orderId
      },
      subscribe: {
        orderId
      }
    } : undefined, undefined).pipe(
      map(values => values[ 0 ] ? values[ 0 ] : null),
      filter((order): order is Order => isValue(order)),
      map(
        order => {
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
            dishes: order.dishes ?? []
          };
        }
      )
    );
  }

  private _storageActionBus$ = new EventEmitter<StorageOrderTokenEvent>();
  private storageActionBus$ = this._storageActionBus$.pipe(
    switchMap(
      busEvent => {
        const setStorage = (token: string, orderId: string) => {
          const storageOrderId = this.getOrderId(token);
          if (!storageOrderId || orderId !== storageOrderId) {
            localStorage.setItem(
              token, JSON.stringify({ orderId: orderId, dt: Date.now() })
            );

          };
        };
        if (busEvent.event == 'setOrderId' && isValue(busEvent.data.alternativeToken)) {
          setStorage(busEvent.data.alternativeToken, busEvent.data.orderId);
          this.updateStorageOrderIdToken(busEvent.data.alternativeToken);
          return of(() => { });
        } else {
          return this.storageOrderIdToken$.pipe(
            map(
              storageOrderIdToken => {
                switch (busEvent.event) {
                  case 'removeOrderId':
                    if (busEvent.newOrderId) {
                      setStorage(storageOrderIdToken, busEvent.newOrderId);
                    } else {
                      localStorage.removeItem(storageOrderIdToken);
                    };
                    break;
                  case 'setOrderId':
                    setStorage(storageOrderIdToken, busEvent.data.orderId);
                    break;
                };
              }),
          );
        };
      }),
  );

  private _orderBus$ = new EventEmitter<CartBusEvent>();

  /**
  * Внутренний поток-шина для событий, ассоциированных с действиями, которыми необходимо выполнить с заказом (добавить/удалить блюдо, проверить заказ, отправить на проверку и тп.).
  * Используется только в случае, если в @see config параметр busSubscribeMode установлен в значении 'custom' для самостоятельного управления подпиской на стороне приложения.
  * Использование этого потока и событий внутри него извне не подразумевается и не предусматривается,
  * Для выполнения действий с заказом, необходимо использовать соответствующие методы:
  * @see this.addToOrder
  * @see this.removeFromOrder
  * @see this.checkOrder
  * @see this.sendOrder
  * @see this.setDishAmount
  * @see this.setDishComment
  */
  orderBus$ = this.orderAndPaymentMethods$.pipe(
    map(
      data => data.order
    ),
    switchMap(
      order => this._orderBus$.asObservable().pipe(
        map(
          busEvent => ({ busEvent, order })
        ))
    ),
    concatMap(
      ({ busEvent, order }) => {
        const reducer = (busEventData: CartBusEvent): Observable<Order | CheckResponse> => {
          switch (busEventData.event) {
            case 'add': return this.addDishToOrder$({
              ...busEventData.data,
              orderId: order.id,
            });
            case 'remove': return this.removeDishFromOrder$({
              id: order.id,
              orderDishId: busEventData.data.orderDishId,
              amount: busEventData.data.amount
            });
            case 'check': return this.checkOrder$({ ...busEventData.data, orderId: order.id });
            case 'order': return this.sendOrder$(busEventData.data);
            case 'update': return this.updateOrder$(busEventData.data);
            case 'setDishAmount': return this.setDishAmount$({
              ...busEventData.data, id: order.id
            });
            case 'setCommentToDish': return this.setDishComment$({
              ...busEventData.data, id: order.id
            });
          };
        };
        return reducer(busEvent).pipe(
          map(
            result => {
              if (isValue(busEvent.loading)) {
                busEvent.loading.next(false);
              };
              if (isValue(busEvent.successCb)) {
                busEvent.successCb(<Order & CheckResponse> result);
              };
            }),
          catchError((err: unknown) => {
            if (isValue(busEvent.loading)) {
              busEvent.loading.next(false);
            };
            if (busEvent.errorCb) {
              busEvent.errorCb(err);
            };
            console.log(err);
            return of(() => { });
          })
        );
      }),
  );

  private _orderBusSubscription$: Subscription | undefined = this.config.busSubscribeMode === 'subscribe' ? this.orderBus$.subscribe({
    next: () => { },
    error: () => { },
    complete: () => this._orderBusSubscription$?.unsubscribe()
  }) : undefined;

  private _storageActionBusSubscription$: Subscription = this.storageActionBus$.subscribe({
    next: () => { },
    error: () => { },
    complete: () => this._storageActionBusSubscription$?.unsubscribe()
  });


  /**
   * @method addToOrder
   * Используется для отправки в шину события добавления блюда.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.dishId - id добавляемого блюдо
   * @param options.amount - количество
   * @param options.dishModifiers - выбранные пользователем модификаторы блюда (необязательный)
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  addToOrder(
    options: {
      loading: BehaviorSubject<boolean>,
      dishId: string,
      amount?: number,
      dishModifiers?: Partial<OrderModifier>[] | Partial<Modifier>[],
      successCb?: (order: Order) => void,
      errorCb?: (err: unknown) => void,
      comment?: string,
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
        modifiers: (options.dishModifiers ?? []).map(
          dishModifier => ({
            id: 'id' in dishModifier ? dishModifier.id : (<Partial<Modifier>> dishModifier).modifierId,
            amount: dishModifier.amount,
            dish: dishModifier.dish,
            groupId: dishModifier.dish?.parentGroup?.id ?? dishModifier.dish?.groupId
          })
        ),
        amount: options.amount ?? 1,
        comment: options.comment,
        replace: isValue(options.replacedOrderDishId),
        orderDishId: options.replacedOrderDishId
      }
    });
  }

  /**
  * @method removeFromOrder
  * Используется для отправки в шину события удаления блюда из корзины
  * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param options.amount - количество
  * @param options.orderDishId - id удаляемого блюда в корзине
  * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  removeFromOrder(options: {
    loading: BehaviorSubject<boolean>,
    amount: number,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void,
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
        amount: options.amount ?? 1
      }
    });
  }

  /**
  * @method updateOrder
  * Используется для отправки в шину события обновления данных в заказе, не связанных с блюдами.
  * Может использоваться ТОЛЬКО ДО того, как заказ отправлен через @method sendOrder
  * Также, заказ нужно повторно проверять методом @method checkOrder, если такая проверка уже проводилась ранее.
  * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param options.data - объект заказа, при этом не все данные из него будут приняты и, в результате, обновлены.
  * Большая часть будет данных будет проигнорирована и может изменяться только в рамках других методов согласно заложенной бизнес-логике.
  * В настоящее время из всего заказа учитываются изменения ТОЛЬКО в свойстве `Order.trifleFrom`.
  * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  updateOrder(options: {
    data: ScanFormType<OrderForm>[ 'value' ],
    loading: BehaviorSubject<boolean>,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void,
  }) {
    this._orderBus$.emit({
      event: 'update',
      data: options.data,
      loading: options.loading,
      errorCb: options.errorCb,
      successCb: options.successCb
    });
  }

  /**
   * @method checkOrder
   * Используется для отправки в шину события обязательной проверки заказа перед оформлением.
   * Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.
   * @param options.orderForm - Форма чекаута с данными проверяемого заказа
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  checkOrder(options: {
    orderForm: ScanFormType<OrderForm>[ 'value' ],
    successCb?: (order: CheckResponse) => void,
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
            number: options.orderForm.customer.phone.number
          }
        },
        comment: options.orderForm.comment,
        pickupAddressId: options.orderForm.pickupAddressId,
        locationId: options.orderForm.locationId,
        customData: options.orderForm.customData,
        date: options.orderForm.deliveryTimeInfo?.deliveryDate ?
          `${ options.orderForm.deliveryTimeInfo.deliveryDate } ${ options.orderForm.deliveryTimeInfo.deliveryTime }` :
          undefined
      };

      this._orderBus$.emit({
        event: 'check',
        successCb: options.successCb,
        errorCb: options.errorCb,
        data,
      });

    } else {
      throw new Error('В options.orderForm отсутствуют один или несколько обязательных параметров : selfService, paymentMethod, address, customer, customer.phone, customer.phone.code, customer.phone.number!');
    }
  }

  /**
  * @method sendOrder
  * Используется для отправки в шину события оформления заказа.
  * Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.
  * @param options.orderId - Форма чекаута с данными оформляемего заказа
  * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  sendOrder(options: {
    orderId: string,
    orderIdFactory?: () => string | undefined;
    loading?: BehaviorSubject<boolean>,
    successCb?: (order: CheckResponse) => void,
    errorCb?: (err: unknown) => void;
  }) {
    this._orderBus$.emit({
      event: 'order',
      loading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderId: options.orderId,
        orderIdFactory: options.orderIdFactory
      }
    });
  }

  /**
  * @method setDishAmount
  * Устанавливает для блюда dish в заказе количество amount.
  * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param options.orderDishId - id блюда в корзине, для которого изменяется количество заказываемых порций
  * @param options.amount - необходимое количество порций
  * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  setDishAmount(options: {
    loading: BehaviorSubject<boolean>,
    orderDishId: number,
    amount?: number,
    successCb?: (order: Order) => void,
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
        amount: options.amount ?? 1
      }
    });
  }

  /**
  * @method setDishComment
  * Добавляет к заказываемому блюду комментарий.
  * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param options.orderDishId - id блюда в корзине, которому добавляется комментарий
  * @param options.comment - добавляемый комментарий
  * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  setDishComment(options: {
    loading: BehaviorSubject<boolean>,
    orderDishId: number,
    comment: string,
    successCb?: (order: Order) => void,
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
        comment: options.comment
      }
    });
  }

  private addDishToOrder$(data: AddToOrderInput): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderAddDish', AddToOrderInput>(
      'orderAddDish', this.defaultOrderFragments, data
    ).pipe(
      map(
        data => data.orderAddDish
      )
    );
  };

  private removeDishFromOrder$(data: RemoveOrSetAmountToDish): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderRemoveDish', RemoveOrSetAmountToDish>('orderRemoveDish', this.defaultOrderFragments, data, { requiredFields: [ 'orderDishId', 'id' ] }).pipe(
      map(
        data => data.orderRemoveDish
      )
    );
  };

  private updateOrder$(order: ScanFormType<OrderForm>[ 'value' ]): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderUpdate', {
      order: ScanFormType<OrderForm>[ 'value' ];
    }>('orderUpdate', this.defaultOrderFragments, { order }).pipe(
      map(
        data => data.orderUpdate
      )
    );
  }

  private sendOrder$(sendOrderData: SendOrderInput): Observable<CheckResponse> {
    return this.ngGqlService.customMutation$<CheckResponse, 'sendOrder', { orderId: string; }>(
      'sendOrder', <ValuesOrBoolean<CheckResponse>> {
        order: this.defaultOrderFragments,
        message: this.defaultMessageFragments,
        action: this.defaultActionFragments
      }, {
      orderId: sendOrderData.orderId
    }, {
      requiredFields: [ 'orderId' ]
    }).pipe(
      map(
        data => {
          if (isValue(data)) {
            if (isValue(sendOrderData.orderIdFactory)) {
              const newOrderId = sendOrderData.orderIdFactory();
              if (newOrderId) {
                this.setOrderId(newOrderId);
              } else {
                this.removeOrderId(newOrderId);
              };
            } else {
              this.removeOrderId();
            };
          };
          return data.sendOrder;
        })
    );
  };

  private checkOrder$(data: CheckOrderInput): Observable<CheckResponse> {
    return this.ngGqlService.customMutation$<CheckResponse, 'checkOrder', CheckOrderInput>('checkOrder', {
      order: this.defaultOrderFragments,
      message: this.defaultMessageFragments,
      action: this.defaultActionFragments
    }, data, {
      requiredFields: [ 'orderId', 'paymentMethodId', 'customer' ],
      fieldsTypeMap: new Map([
        [ 'address', 'Address' ],
        [ 'customer', 'Customer!' ]
      ])
    }).pipe(
      map(
        data => data.checkOrder
      )
    );
  };

  private setDishAmount$(data: RemoveOrSetAmountToDish): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderSetDishAmount', RemoveOrSetAmountToDish>(
      'orderSetDishAmount', this.defaultOrderFragments, data,
    ).pipe(
      map(
        data => data.orderSetDishAmount
      )
    );
  };

  private setDishComment$(data: SetDishCommentInput): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderSetDishComment', SetDishCommentInput>('orderSetDishComment', this.defaultOrderFragments, data).pipe(
      map(
        data => data.orderSetDishComment
      )
    );
  };

  destroy() {
    if (this._orderBusSubscription$ && !this._orderBusSubscription$.closed) {
      this._orderBusSubscription$.unsubscribe();
    };
    this._storageActionBusSubscription$.unsubscribe();
    Object.values(this).filter(
      (property): property is EventEmitter<unknown> | BehaviorSubject<unknown> => property instanceof EventEmitter || property instanceof BehaviorSubject
    ).forEach(
      property => property.complete()
    );
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
