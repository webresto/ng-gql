import { EventEmitter, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import type { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, shareReplay, catchError, concatMap, distinctUntilKeyChanged } from 'rxjs/operators';
import type { Action, Message, OrderInput, Order, AddToOrderInput, Modifier, CheckResponse, CartBusEvent, Dish, RemoveOrSetAmountToDish, OrderForm } from '../models';
import { isValue, MessageOrActionGql, OrderFragments } from '../models';
import { NgGqlService } from './ng-gql.service';
import { EventerService } from './eventer.service';
import type { NgGqlConfig } from '../ng-gql.module';

const LS_NAME = 'orderId';


@Injectable({
  providedIn: 'root'
})
export class NgOrderService {


  constructor(
    private ngGqlService: NgGqlService,
    private eventer: EventerService,
    @Inject('config') private config: NgGqlConfig
  ) {
    if (this.config.busSubscribeMode === 'subscribe') {
      this._cartBusSubscription$ = this.orderBus$.subscribe({
        next: () => { },
        error: () => { },
        complete: () => this._cartBusSubscription$?.unsubscribe()
      });
    }
  }

  getOrderId(): string | undefined {
    return localStorage.getItem(LS_NAME) ?? undefined;
  }

  setOrderId(orderId: string) {
    if (orderId) {
      localStorage.setItem(LS_NAME, orderId);
    }
  }

  removeOrderId() {
    localStorage.removeItem(LS_NAME);
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

  private _cartBusSubscription$: Subscription | undefined;

  private _orderLoader$ = new BehaviorSubject<string | undefined>('');
  private orderLoader$ = this._orderLoader$.pipe(
    shareReplay(1)
  );

  private order$ = this.orderLoader$.pipe(
    filter((value): value is string | undefined => value !== ''),
    switchMap(
      orderId => {
        return this.loadOrder$(orderId).pipe(
          switchMap(
            order => order.state === 'ORDER' ? this.loadOrder$(undefined) : of(order)
          ),
          shareReplay(1)
        );
      }),
    switchMap(
      order => this.ngGqlService.dishes$.pipe(
        map(
          dishes => {
            if (!order.dishes) {
              order.dishes = [];
            };
            order.dishes.forEach(
              orderDish => {
                if (!orderDish.dish && orderDish.dishId) {
                  orderDish.dish = dishes?.find(dish => orderDish.dishId === dish.id)!;
                };
              });
            return order;
          }),
        shareReplay(1)
      )
    ),
    shareReplay(1)
  );

  /**
   * @method  getOrder
   * @returns Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.
   */
  getOrder(): Observable<Order> {
    return this.order$;
  }

  /**
   * Поток Observable, в который будут поступать события по текущему заказу в процессе оформления, подразумевающие совершение каких-либо действий на стороне фронта и выполняемых пользователем
   * (переход на страницу оплаты или, к примеру, открытие диалогового окна с предложением блюда по акции, акции и т.п. )
   */
  actions$ = this.order$.pipe(
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
  messages$ = this.order$.pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.ngGqlService.customSubscribe$<Message, 'message', {
        orderId: string;
      }>('message', MessageOrActionGql.messageVob, { orderId: order.id })
    ),
    shareReplay(1)
  );

  /**
   * @method loadOrderAsCart
   * Метод, иницирующий в потоке @this order$` данные нового заказ.
   * @param orderId - необязательный id заказа.
   * В поток загружается заказ с указанным orderId либо, eсли orderId отсутствует - новый заказ.
   * */
  loadOrderAsCart(orderId: string | undefined): void {
    this._orderLoader$.next(orderId);
  }

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
    return this.ngGqlService.queryAndSubscribe<Order, 'order', 'order', { orderId: string; } | undefined>('order', 'order', OrderFragments.vOb, 'id', orderId ? {
      orderId
    } : undefined).pipe(
      map(values => values[ 0 ] ? values[ 0 ] : null),
      filter((order): order is Order => isValue(order))
    );
  }

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
  orderBus$ = this._orderBus$.asObservable().pipe(
    concatMap(
      busEvent => {
        const reducer = () => {
          switch (busEvent.event) {
            case 'add': return this.addDishToOrder$({
              ...busEvent.data, orderId: busEvent.order.id
            });
            case 'remove': return this.removeDishFromOrder$({
              id: busEvent.order.id,
              orderDishId: busEvent.data.orderDishId,
              amount: busEvent.data.amount
            });
            case 'check': return this.checkOrder$(this.makeOrderData(busEvent.order, 'check'));
            case 'order': return this.sendOrder$(this.makeOrderData(busEvent.order, 'send'));
            case 'setDishAmount': return this.setDishAmount$(busEvent.data);
            case 'setCommentToDish': return this.setDishComment$(busEvent.data);
          };
        };
        return (<Observable<Order | CheckResponse>> reducer()).pipe(
          map(
            result => {
              if ('loading' in busEvent) {
                busEvent.loading.next(false);
                if (busEvent.successCb) {
                  busEvent.successCb(<Order> result);
                };
              } else {
                busEvent.ordered?.next(true);
                if (busEvent.successCb) {
                  busEvent.successCb(<CheckResponse> result);
                };
              };
            }),
          catchError((err: unknown) => {
            if ('loading' in busEvent) {
              busEvent.loading.next(false);
            } else {
              busEvent.ordered?.next(false);
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


  /**
   * @method addToOrder
   * Используется для отправки в шину события добавления блюда.
   * @param order - Заказ, с которым выполнется операция
   * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param dish - добавляемое блюдо
   * @param amount - количество
   * @param dishModifiers - выбранные пользователем модификаторы блюда
   * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  addToOrder(
    order: Order,
    loading: BehaviorSubject<boolean>,
    dish: Dish,
    amount: number = 1,
    dishModifiers: Modifier[] = [],
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void
  ) {
    loading.next(true);
    this._orderBus$.emit({
      event: 'add', loading, order, successCb, errorCb, data: {
        dishId: dish.id,
        modifiers: dishModifiers.map(
          dishModifier => ({
            id: dishModifier.modifierId,
            amount: dishModifier.amount,
            dish: dishModifier.dish,
            groupId: dishModifier.dish.parentGroup?.id ?? dishModifier.dish.groupId
          })
        ),
        amount,
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
    dish: Dish,
    amount: number = 1,
    order: Order,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void) {
    loading.next(true);
    const orderDishId = order.dishes.find(orderDish => orderDish.dish.id === dish.id)?.id;
    this._orderBus$.emit({
      event: 'remove', loading, order, successCb, errorCb, data: {
        id: order.id,
        orderDishId,
        amount
      }
    });
  }

  /**
   * @method checkOrder
   * Используется для отправки в шину события обязательной проверки заказа перед оформлением.
   * Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.
   * @param order - Проверяемый заказ
   * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  checkOrder(order: OrderForm,
    successCb?: (order: CheckResponse) => void,
    errorCb?: (err: unknown) => void
  ) {
    this._orderBus$.emit({
      event: 'check', successCb, errorCb, order,
    });
  }

  /**
 * @method sendOrder
 * Используется для отправки в шину события оформления заказа.
 * Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.
 * @param order - Оформляемый заказ
 * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
 * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
 */
  sendOrder(order: OrderForm,
    successCb?: (order: CheckResponse) => void,
    errorCb?: (err: unknown) => void
  ) {
    this._orderBus$.emit({
      event: 'order', successCb, errorCb, order
    });
  }

  /**
  * @method setDishAmount
  * Устанавливает для блюда dish в заказе количество amount.
  * @param order - Заказ, с которым выполнется операция
  * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param dish - блюдо, для которого изменяется количество заказываемых порций
  * @param amount - необходимое количество порций
  * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  setDishAmount(
    loading: BehaviorSubject<boolean>,
    dish: Dish,
    amount: number = 1,
    order: Order,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void
  ) {
    loading.next(true);
    const orderDishId = order.dishes.find(orderDish => orderDish.dish.id === dish.id)?.id;
    this._orderBus$.emit({
      event: 'setDishAmount', loading, order, successCb, errorCb, data: {
        orderDishId,
        amount
      }
    });
  }

  /**
  * @method setDishComment
  * Добавляет к заказываемому блюду комментарий.
  * @param order - Заказ, с которым выполнется операция
  * @param loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
  * @param dish - id добавляемого блюда в корзине
  * @param comment - добавляемый комментарий
  * @param successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
  * @param errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
  */
  setDishComment(
    loading: BehaviorSubject<boolean>,
    dish: Dish,
    comment: string,
    order: Order,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void
  ) {
    loading.next(true);
    const orderDishId = order.dishes.find(orderDish => orderDish.dish.id === dish.id)?.id;
    this._orderBus$.emit({
      event: 'setCommentToDish', loading, order, successCb, errorCb, data: {
        orderDishId,
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
    return this.ngGqlService.customMutation$<Order, 'orderRemoveDish', RemoveOrSetAmountToDish>('orderRemoveDish', OrderFragments.vOb, data, { optionalFields: [ 'id', 'orderDishId' ] }).pipe(
      map(
        data => data.orderRemoveDish
      )
    );
  };

  private makeOrderData(orderForm: OrderForm, operation: 'check' | 'send'): OrderInput {
    const result = {
      orderId: orderForm.id,
      paymentMethodId: orderForm.paymentMethod?.id,
      selfService: orderForm.selfService,
      address: orderForm.address,
      customer: orderForm.customer,
      customData: orderForm.customData,
    };
    return operation == 'send' ? result : {
      comment: orderForm.comment,
      pickupAddressId: orderForm.pickupAddressId,
      locationId: orderForm.locationId,
      date: orderForm.deliveryTimeInfo?.deliveryDate ? `${ orderForm.deliveryTimeInfo.deliveryDate } ${ orderForm.deliveryTimeInfo.deliveryTime }` : undefined,
      ...result
    };
  }

  private sendOrder$(data: Exclude<OrderInput, 'comment' | 'pickupAddressId' | 'locationId' | 'date'>): Observable<CheckResponse> {
    return this.ngGqlService.customMutation$<CheckResponse, 'sendOrder', OrderInput>('sendOrder', {
      order: OrderFragments.vOb,
      message: MessageOrActionGql.messageVob,
      action: MessageOrActionGql.actionVob
    }, data, {
      optionalFields: [ 'orderId', 'paymentMethodId' ],
      fieldsTypeMap: new Map([
        [ 'address', 'Address' ],
        [ 'customer', 'Customer!' ]
      ])
    }).pipe(
      map(
        data => data.sendOrder
      )
    );
  };

  private checkOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.ngGqlService.customMutation$<CheckResponse, 'checkOrder', OrderInput>('checkOrder', {
      order: OrderFragments.vOb,
      message: MessageOrActionGql.messageVob,
      action: MessageOrActionGql.actionVob
    }, data, {
      optionalFields: [ 'orderId', 'paymentMethodId', 'customer' ],
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
    return this.ngGqlService.customMutation$<Order, 'orderSetDishAmount', RemoveOrSetAmountToDish>('orderSetDishAmount', OrderFragments.vOb, data).pipe(
      map(
        data => data.orderSetDishAmount
      )
    );
  };

  private setDishComment$(data: RemoveOrSetAmountToDish): Observable<Order> {
    return this.ngGqlService.customMutation$<Order, 'orderSetDishComment', RemoveOrSetAmountToDish>('orderSetDishComment', OrderFragments.vOb, data).pipe(
      map(
        data => data.orderSetDishComment
      )
    );
  };

  destroy() {
    if (this._cartBusSubscription$ && !this._cartBusSubscription$.closed) {
      this._cartBusSubscription$.unsubscribe();
    };
    Object.values(this).filter(
      (property): property is EventEmitter<unknown> | BehaviorSubject<unknown> => property instanceof EventEmitter || property instanceof BehaviorSubject
    ).forEach(
      property => property.complete()
    );
  }
}
