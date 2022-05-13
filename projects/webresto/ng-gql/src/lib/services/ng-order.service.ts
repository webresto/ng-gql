import { EventEmitter, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import type { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, shareReplay, catchError, concatMap, distinctUntilKeyChanged, distinctUntilChanged } from 'rxjs/operators';
import type { NgGqlConfig, Action, Message, OrderInput, CheckOrderInput, Order, PaymentMethod, AddToOrderInput, Modifier, CheckResponse, CartBusEvent, Dish, RemoveOrSetAmountToDish, OrderForm, SetDishCommentInput, CartBusEventUpdate, ValuesOrBoolean, StorageOrderTokenEvent, OrderModifier } from '../models';
import { isValue, MessageOrActionGql, OrderFragments, PaymentMethodFragments } from '../models';
import { NgGqlService } from './ng-gql.service';
import { EventerService } from './eventer.service';

@Injectable({
  providedIn: 'root'
})
export class NgOrderService {

  constructor(
    private ngGqlService: NgGqlService,
    private eventer: EventerService,
    @Inject('config') private config: NgGqlConfig
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
    shareReplay(1)
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
  getOrderId(storageOrderIdToken: string): string | undefined {
    try {
      const cartString = localStorage.getItem(storageOrderIdToken);
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
  removeOrderId() {
    this._storageActionBus$.emit({
      event: 'removeOrderId'
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
          this.eventer.emitMessageEvent({
            type: 'info',
            title: 'Не удалось отправить ссылку для оплаты.',
            body: error.message
          });
          return of(null);
        })
      );
  }

  getPaymentMethods$(orderId: string | undefined): Observable<PaymentMethod[]> {
    return this.ngGqlService.customQuery$<PaymentMethod, 'paymentMethod', { orderId: string; }>(
      'paymentMethod', PaymentMethodFragments.vOb, { orderId: orderId ?? '' }, {
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
      storageOrderIdToken => {
        const orderId = this.getOrderId(storageOrderIdToken);
        return this.getPaymentMethods$(orderId).pipe(
          map(
            methods => ({
              methods, orderId
            })
          ),
          switchMap(
            methodsAndId => this.loadOrder$(methodsAndId.orderId).pipe(
              switchMap(
                order => order.state === 'ORDER' ? this.loadOrder$(undefined) : of(order)
              ),
              map(
                order => {
                  const storageOrderId = this.getOrderId(storageOrderIdToken);
                  if (!storageOrderId || storageOrderId !== order.id) {
                    this.setOrderId(order.id);
                  };
                  return {
                    methods: methodsAndId.methods,
                    order: {
                      ...order,
                      paymentMethod: !order.paymentMethod && methodsAndId.methods.length > 0 ? {
                        id: methodsAndId.methods[ 0 ].id,
                        title: methodsAndId.methods[ 0 ].title
                      } : order.paymentMethod
                    }
                  };
                }
              ),
              shareReplay(1)
            )
          ),
          shareReplay(1)
        );
      }),
    shareReplay(1)
  );

  /**
   * @method getOrderAndPaymentMethods$
   * @returns Возвращает поток Observable с объектом, содержащим:
   *  1. В свойстве order - данные текущего заказа `Order`.
   *  2. В свойстве methods - массив доступных для этого заказа способов оплаты `PaymentMethod`.
   *  Для получения данных только о заказе, без информации о способах оплаты используйте метод `getOrder()`;
   *  @see getOrder()
   */
  getOrderAndPaymentMethods$(): Observable<{
    order: Order,
    methods: PaymentMethod[];
  }> {
    return this.orderAndPaymentMethods$;
  };

  /**
   * @method  getOrder
   * @returns Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.
   */
  getOrder(): Observable<Order> {
    return this.orderAndPaymentMethods$.pipe(
      map(
        orderAndPaymentMethods => orderAndPaymentMethods.order
      ),
      shareReplay(1)
    );
  };

  /**
   * Поток Observable, в который будут поступать события по текущему заказу в процессе оформления, подразумевающие совершение каких-либо действий на стороне фронта и выполняемых пользователем
   * (переход на страницу оплаты или, к примеру, открытие диалогового окна с предложением блюда по акции, акции и т.п. )
   */
  actions$ = this.getOrder().pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.ngGqlService.customSubscribe$<Action, 'action', {
        orderId: string;
      }>('action', MessageOrActionGql.actionVob, { orderId: order.id })
    ),
    shareReplay(1)
  );

  /**
   * Поток Observable, в который будут поступать информационные сообщения по текущему заказу (блюдо добавлено/удалено/заказ оформлен).
   */
  messages$ = this.getOrder().pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.ngGqlService.customSubscribe$<Message, 'message', {
        orderId: string;
      }>('message', MessageOrActionGql.messageVob, { orderId: order.id })
    ),
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
    const vOb = customvOb ? { ...OrderFragments.vOb, ...customvOb } : OrderFragments.vOb;
    return this.ngGqlService.queryAndSubscribe<Order, 'order', 'order', { orderId: string; } | undefined>('order', 'order', vOb, 'id', orderId ? {
      query: {
        orderId
      },
      subscribe: {
        orderId
      }
    } : undefined, undefined, false).pipe(
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
      ),
      shareReplay(1)
    );
  }

  private _storageActionBus$ = new EventEmitter<StorageOrderTokenEvent>();
  private storageActionBus$ = this._storageActionBus$.pipe(
    switchMap(
      busEvent => {
        const setStgorage = (token: string, orderId: string) => {
          const storageOrderId = this.getOrderId(token);
          if (!storageOrderId || orderId !== storageOrderId) {
            localStorage.setItem(
              token, JSON.stringify({ orderId: orderId, dt: Date.now() })
            );
          };
        };
        if (busEvent.event == 'setOrderId' && isValue(busEvent.data.alternativeToken)) {
          setStgorage(busEvent.data.alternativeToken, busEvent.data.orderId);
          this.updateStorageOrderIdToken(busEvent.data.alternativeToken);
          return of(() => { });
        } else {
          return this.storageOrderIdToken$.pipe(
            map(
              storageOrderIdToken => {
                switch (busEvent.event) {
                  case 'removeOrderId':
                    localStorage.removeItem(storageOrderIdToken);
                    break;
                  case 'setOrderId':
                    setStgorage(storageOrderIdToken, busEvent.data.orderId);
                    break;
                };
              }),
          );
        }

      }


    ),
  );

  private _orderBus$ = new EventEmitter<CartBusEvent>();

  /**
  * Внутренний поток-шина для событий, ассоциированных с действиями, которыми необходимо выполнить с заказом (добавить/удалить блюдо, проверить заказ, отправить на проверку и тп.).
  * Используется только в случае, если в @see config параметр busSubscribeMode установлен в значении 'custom' для самостоятельного управления подпиской на стороне приложения.
  * Использование этого потока и событий внутри него извне не подразумевается и не предусматривается,
  * Для выполнения действий с заказом, необходимо использовать соответствующие методы:
  * @see addToOrder
  * @see removeFromOrder
  * @see checkOrder
  * @see sendOrder
  * @see setDishAmount
  * @see setDishComment
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
        const reducer = () => {
          switch (busEvent.event) {
            case 'add': return this.addDishToOrder$({
              ...busEvent.data,
              orderId: order.id,
            });
            case 'remove': return this.removeDishFromOrder$({
              id: order.id,
              orderDishId: busEvent.data.orderDishId,
              amount: busEvent.data.amount
            });
            case 'check': return this.checkOrder$({
              orderId: busEvent.data.id,
              paymentMethodId: busEvent.data.paymentMethod?.id,
              selfService: busEvent.data.selfService,
              address: busEvent.data.address,
              customer: busEvent.data.customer,
              comment: busEvent.data.comment,
              pickupAddressId: busEvent.data.pickupAddressId,
              locationId: busEvent.data.locationId,
              customData: busEvent.data.customData,
              date: busEvent.data.deliveryTimeInfo?.deliveryDate ? `${ busEvent.data.deliveryTimeInfo.deliveryDate } ${ busEvent.data.deliveryTimeInfo.deliveryTime }` : undefined,
            });
            case 'order': return this.sendOrder$(busEvent.data);
            case 'update': return this.updateOrder$(busEvent.data);
            case 'setDishAmount': return this.setDishAmount$({
              ...busEvent.data, id: order.id
            });
            case 'setCommentToDish': return this.setDishComment$({
              ...busEvent.data, id: order.id
            });
          };
        };
        return (<Observable<Order | CheckResponse>> reducer()).pipe(
          map(
            result => {
              if (isValue(busEvent.loading)) {
                busEvent.loading.next(false);
                if (busEvent.successCb) {
                  busEvent.successCb(<Order & CheckResponse> result);
                };
              }
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
    shareReplay(1)
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
   * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param dish - добавляемое блюдо
   * @param amount - количество
   * @param dishModifiers - выбранные пользователем модификаторы блюда
   * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  addToOrder(
    loading: BehaviorSubject<boolean>,
    dish: Dish,
    amount: number = 1,
    dishModifiers: Modifier[] | OrderModifier[] = [],
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void,
    comment?: string,
    replacedOrderDishId?: number,
  ) {
    loading.next(true);
    this._orderBus$.emit({
      event: 'add', loading, successCb, errorCb, data: {
        dishId: dish.id,
        modifiers: dishModifiers.map(
          dishModifier => ({
            id: 'id' in dishModifier ? dishModifier.id : dishModifier.modifierId,
            amount: dishModifier.amount,
            dish: dishModifier.dish,
            groupId: dishModifier.dish?.parentGroup?.id ?? dishModifier.dish.groupId
          })
        ),
        amount,
        comment,
        replace: isValue(replacedOrderDishId),
        orderDishId: replacedOrderDishId
      }
    });
  }

  /**
  * @method removeFromOrder
  * Используется для отправки в шину события удаления блюда из корзины
  * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param dish - добавляемое блюдо
  * @param amount - количество
  * @param orderDishId - id блюда в корзине
  * @param order - Заказ, с которым выполнется операция
  * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  removeFromOrder(
    loading: BehaviorSubject<boolean>,
    amount: number = 1,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void,
    orderDishId?: number
  ) {
    loading.next(true);
    this._orderBus$.emit({
      event: 'remove', loading, successCb, errorCb, data: {
        orderDishId, amount
      }
    });
  }

  /**
  * @method updateOrder
  * Используется для отправки в шину события обновления данных в заказе, не связанных с блюдами.
  * Может использоваться ТОЛЬКО ДО того, как заказ отправлен через @method sendOrder
  * Также, заказ нужно повторно проверять методом @method checkOrder, если такая проверка уже проводилась ранее.
  * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param order - объект заказа, при этом не все данные из него будут приняты и, в результате, обновлены.
  * Большая часть будет данных будет проигнорирована и может изменяться только в рамках других методов согласно заложенной бизнес-логике.
  * В настоящее время из всего заказа учитываются изменения ТОЛЬКО в свойстве `Order.trifleFrom`.
  * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  updateOrder({ data, loading, successCb, errorCb }: {
    data: Partial<Order>,
    loading: BehaviorSubject<boolean>,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void,
  }) {
    this._orderBus$.emit(<CartBusEventUpdate> {
      event: 'update', data, loading, errorCb, successCb
    });
  }

  /**
   * @method checkOrder
   * Используется для отправки в шину события обязательной проверки заказа перед оформлением.
   * Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.
  * @param orderForm - Форма чекаута с данными проверяемого заказа
   * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  checkOrder(orderForm: OrderForm,
    successCb?: (order: CheckResponse) => void,
    errorCb?: (err: unknown) => void
  ) {
    this._orderBus$.emit({
      event: 'check', successCb, errorCb, data: orderForm,
    });
  }

  /**
  * @method sendOrder
  * Используется для отправки в шину события оформления заказа.
  * Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.
  * @param orderForm - Форма чекаута с данными оформляемего заказа
  * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  sendOrder(orderId: string,
    successCb?: (order: CheckResponse) => void,
    errorCb?: (err: unknown) => void
  ) {
    this._orderBus$.emit({
      event: 'order', successCb, errorCb, data: orderId
    });
  }

  /**
  * @method setDishAmount
  * Устанавливает для блюда dish в заказе количество amount.
  * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param dish - блюдо, для которого изменяется количество заказываемых порций
  * @param amount - необходимое количество порций
  * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  setDishAmount(
    loading: BehaviorSubject<boolean>,
    orderDishId: number,
    amount: number = 1,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void
  ) {
    loading.next(true);
    this._orderBus$.emit({
      event: 'setDishAmount', loading, successCb, errorCb, data: {
        orderDishId,
        amount
      }
    });
  }

  /**
  * @method setDishComment
  * Добавляет к заказываемому блюду комментарий.
  * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param dish - блюдо, которому добавляется комментарий в корзине
  * @param comment - добавляемый комментарий
  * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  setDishComment(
    loading: BehaviorSubject<boolean>,
    dish: Dish,
    comment: string,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void
  ) {
    loading.next(true);
    this._orderBus$.emit({
      event: 'setCommentToDish', loading, successCb, errorCb, data: {
        dish,
        comment
      }
    });
  }

  private addDishToOrder$(data: AddToOrderInput): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderAddDish', AddToOrderInput>(
      'orderAddDish', OrderFragments.vOb, data
    ).pipe(
      map(
        data => data.orderAddDish
      )
    );
  };

  private removeDishFromOrder$(data: RemoveOrSetAmountToDish): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderRemoveDish', RemoveOrSetAmountToDish>('orderRemoveDish', OrderFragments.vOb, data, { requiredFields: [ 'orderDishId', 'id' ] }).pipe(
      map(
        data => data.orderRemoveDish
      )
    );
  };

  private updateOrder$(order: Partial<Order>): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderUpdate', {
      order: Partial<Order>;
    }>('orderUpdate', OrderFragments.vOb, { order }).pipe(
      map(
        data => data.orderUpdate
      )
    );
  }

  private sendOrder$(orderId: string): Observable<CheckResponse> {
    return this.ngGqlService.customMutation$<CheckResponse, 'sendOrder', OrderInput>('sendOrder', <ValuesOrBoolean<CheckResponse>> {
      order: OrderFragments.vOb,
      message: MessageOrActionGql.messageVob,
      action: MessageOrActionGql.actionVob
    }, {
      orderId
    }, {
      requiredFields: [ 'orderId' ]
    }).pipe(
      map(
        data => data.sendOrder
      )
    );
  };

  private checkOrder$(data: CheckOrderInput): Observable<CheckResponse> {
    return this.ngGqlService.customMutation$<CheckResponse, 'checkOrder', CheckOrderInput>('checkOrder', {
      order: OrderFragments.vOb,
      message: MessageOrActionGql.messageVob,
      action: MessageOrActionGql.actionVob
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
      'orderSetDishAmount', OrderFragments.vOb, data,
    ).pipe(
      map(
        data => data.orderSetDishAmount
      )
    );
  };

  private setDishComment$(data: SetDishCommentInput<number>): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderSetDishComment', SetDishCommentInput<number>>('orderSetDishComment', OrderFragments.vOb, data).pipe(
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

}
