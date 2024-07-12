import {EventEmitter, Inject, Injectable} from '@angular/core';
import {deepClone, isValue} from '@axrl/common';
import type {ScanFormType} from '@axrl/ngx-extended-form-builder';
import type {BehaviorSubject, Observable} from 'rxjs';
import {
  catchError,
  combineLatest,
  concatMap,
  distinctUntilKeyChanged,
  exhaustMap,
  filter,
  fromEvent,
  map,
  mergeWith,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import type {
  Action,
  AddToOrderInput,
  CartBusEvent,
  CheckOrderInput,
  CheckResponse,
  Dish,
  Message,
  Modifier,
  NgGqlConfig,
  Order,
  OrderForm,
  OrderModifier,
  PaymentMethod,
  PickupPoint,
  RemoveOrSetAmountToDish,
  SendOrderInput,
  SetDishCommentInput,
  UpdateOrderInput,
  User,
  ValuesOrBoolean,
} from '../models';
import {
  ACTION_FRAGMENTS,
  DISH_FRAGMENTS,
  MESSAGE_FRAGMENTS,
  NG_GQL_CONFIG,
  ORDERID_FACTORY_FN,
  ORDER_FRAGMENTS,
  PAYMENT_METHOD_FRAGMENTS,
} from '../models';
import {NgGqlStoreService} from './ng-gql-storage.service';
import {NgGqlUserBusService} from './ng-gql-user-bus.service';
import {NgGqlUserService} from './ng-gql-user.service';
import {NgGqlService} from './ng-gql.service';
import {RequestService} from './request.service';
import {NqGqlLocalStorageWrapper} from './storage-wrapper';

@Injectable()
export class NgOrderService {
  private _orderBus = new EventEmitter<CartBusEvent>();

  private readonly _order$: Observable<Order> = this._storageWrapper.storageOrderIdToken$.pipe(
    switchMap(storageOrderIdToken =>
      fromEvent<StorageEvent>(window, 'storage', {
        passive: true,
      }).pipe(
        startWith(this._storageWrapper.startStorageEventFactory(storageOrderIdToken)),
        filter(event => event.key === storageOrderIdToken),
        distinctUntilKeyChanged('key'),
        switchMap(event => {
          const storageOrderId = this._storageWrapper.getOrderId(
            storageOrderIdToken,
            event.newValue ?? undefined,
          );
          return this._loadCurrentOrNewOrder(storageOrderId, storageOrderIdToken);
        }),
      ),
    ),
    switchMap(order => {
      const storageOrderId = order.id;

      return combineLatest([
        this._getPaymentMethods$(storageOrderId),
        this._ngGqlUser.getUser$(),
        this.getPickupPoints(),
      ]).pipe(
        map(([methods, user, points]) => {
          const notPaymentId = !isValue(order.paymentMethod) || !isValue(order.paymentMethod?.id);

          if (notPaymentId && methods.length > 0) {
            order.paymentMethod = {
              id: methods[0].id,
              title: methods[0].title,
            };
          }

          if (!isValue(order.pickupPoint)) {
            order.pickupPoint = {
              id: null,
              address: null,
              title: null,
              order: null,
              enable: null,
              phone: null,
            };
          } else {
            const point = points.find(pickupPoint => pickupPoint.id === order.pickupPoint?.id);
            if (isValue(point)) {
              order.pickupPoint = deepClone(point);
            }
          }

          if (isValue(user)) {
            if (!isValue(order.customer)) {
              order.customer = {};
            }

            if (!isValue(order.customer?.name)) {
              order.customer.name = this._getOrderCustomerName(user);
            }

            if (!isValue(order.customer?.phone)) {
              order.customer.phone = {};
            }

            if (!isValue(order.customer?.phone.code)) {
              order.customer.phone.code = user.phone?.code ?? this._config.phoneCode;
            }

            if (!isValue(order.customer?.phone.number)) {
              order.customer.phone.number = user.phone?.number;
            }

            if (!isValue(order.spendBonus)) {
              order.spendBonus = {
                adapter: null,
                amount: null,
                bonusProgramId: null,
                bonusProgramName: null,
              };
            }
          }

          this._storage.updateOrder(order);
          this._storage.updatePaymentMethods(methods);

          return order;
        }),
      );
    }),
  );

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
  private readonly _orderBus$: Observable<void | (() => void)> = this._orderBus.asObservable().pipe(
    concatMap(busEvent => {
      const reducer = (busEventData: CartBusEvent): Observable<Order | CheckResponse> => {
        switch (busEventData.event) {
          case 'add':
            return this._addDishToOrder$(busEventData.data);
          case 'remove':
            return this._removeDishFromOrder$(busEventData.data);
          case 'check':
            return this._checkOrder$(busEventData.data);
          case 'order':
            return this._sendOrder$(busEventData.data);
          case 'clone':
            return this._cloneOrder$(busEventData.data);
          case 'update':
            return this._updateOrder$(busEventData.data);
          case 'setDishAmount':
            return this._setDishAmount$(busEventData.data);
          case 'setCommentToDish':
            return this._setDishComment$(busEventData.data);
        }
      };
      return reducer(busEvent).pipe(
        map(result => {
          if (isValue(busEvent.isLoading)) {
            busEvent.isLoading.next(false);
          }
          if (isValue(busEvent.successCb)) {
            busEvent.successCb(<Order & CheckResponse>result);
          }

          if (isValue(result.message) && typeof result.message === 'object') {
            this._requestService.emitMessageEvent(result.message);
          }

          if ('action' in result && isValue(result.action)) {
            this._requestService.emitActionEvent(result.action);
          }
        }),
        catchError((err: unknown) => {
          if (isValue(busEvent.isLoading)) {
            busEvent.isLoading.next(false);
          }
          if (busEvent.errorCb) {
            busEvent.errorCb(err);
          }
          if (this._config.debugMode) {
            alert(JSON.stringify(err));
          }
          return of(() => {});
        }),
      );
    }),
    mergeWith(this._userBusService.userBus$),
  );

  private readonly _orderBusSubscription$ =
    this._config.busSubscribeMode === 'subscribe'
      ? this._orderBus$.subscribe({
          next: () => {},
          error: () => {},
        })
      : undefined;
  private readonly _orderSubscription$ = this._order$.subscribe();

  get orderBus$(): Observable<void | (() => void)> {
    return this._orderBus$;
  }

  constructor(
    private _requestService: RequestService,
    private _storage: NgGqlStoreService,
    private _storageWrapper: NqGqlLocalStorageWrapper,
    private _userBusService: NgGqlUserBusService,
    private _ngGqlService: NgGqlService,
    private _ngGqlUser: NgGqlUserService,
    @Inject(NG_GQL_CONFIG) private _config: NgGqlConfig,
    @Inject(PAYMENT_METHOD_FRAGMENTS)
    private _defaultPaymentMethodFragments: ValuesOrBoolean<PaymentMethod>,
    @Inject(ORDER_FRAGMENTS)
    private _defaultOrderFragments: ValuesOrBoolean<Order>,
    @Inject(DISH_FRAGMENTS) private _defaultDishFragments: ValuesOrBoolean<Dish>,
    @Inject(ACTION_FRAGMENTS)
    private _defaultActionFragments: ValuesOrBoolean<Action>,
    @Inject(MESSAGE_FRAGMENTS)
    private _defaultMessageFragments: ValuesOrBoolean<Message>,
  ) {}

  /**
   * @method updateStorageOrderIdToken()
   * @see this.StorageWrapper.updateStorageOrderIdToken()
   */
  updateStorageOrderIdToken(newToken: string): void {
    this._storageWrapper.updateStorageOrderIdToken(newToken);
  }

  paymentLink$(phone: string, fromPhone: string, orderId: string): Observable<any> {
    return this._requestService
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
            },
      )
      .pipe(
        catchError(error => {
          if (this._config.debugMode) {
            alert(error);
          }
          this._requestService.emitMessageEvent({
            type: 'info',
            title: 'Failed to send payment link.',
            message: error.message,
          });
          return of(() => {});
        }),
      );
  }

  /**
   * @method getOrderPaymentMethods$()
   * @returns Возвращает поток Observable с массивом доступных для этого заказа способов оплаты `PaymentMethod`.
   */
  getOrderPaymentMethods$(): Observable<PaymentMethod[]> {
    return this._storage.paymentMethods;
  }

  /**
   * @method () getOrder
   * @returns Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.
   */
  getOrder(): Observable<Order> {
    return this._storage.order;
  }

  /**
   * @method () resetOrder
   * @returns Remove order
   */
  resetOrder(): void {
    this._storageWrapper.storageOrderIdToken$
      .pipe(
        switchMap(storageOrderIdToken =>
          fromEvent<StorageEvent>(window, 'storage', {
            passive: true,
          }).pipe(
            startWith(this._storageWrapper.startStorageEventFactory(storageOrderIdToken)),
            filter(event => event.key === storageOrderIdToken),
            distinctUntilKeyChanged('key'),
            switchMap(event => {
              const storageOrderId = this._storageWrapper.getOrderId(
                storageOrderIdToken,
                event.newValue ?? undefined,
                true,
              );
              this._storageWrapper.setOrderId(storageOrderId);
              return this.loadOrder$(storageOrderId);
            }),
          ),
        ),
      )
      .subscribe();

    return;
  }

  /**
   * @method loadOrder$()
   *
   * Метод загружает заказ и делает подписку для получения по нему обновлений.
   * Используется для внутренних нужд библиотеки, а также может использоваться для загрузки заказа отдельно от шины событий заказов
   * (например, данные для страницы "Спасибо за заказ").
   *
   * @param id - id загружаемого заказа.
   *  */
  loadOrder$(id: string, isShort: boolean = false): Observable<Order> {
    return this._requestService
      .queryAndSubscribe<Order, 'order', 'order', {orderId: string} | {shortId: string}>(
        'order',
        'order',
        this._defaultOrderFragments,
        'id',
        id
          ? {
              query: isShort ? {shortId: id} : {orderId: id},
            }
          : undefined,
        undefined,
      )
      .pipe(
        map(values => (values[0] ? values[0] : null)),
        filter((order): order is Order => isValue(order)),
        switchMap(order => {
          const dishesIds = order.dishes
            .map(orderDish => orderDish.dish?.id)
            .filter((dishId): dishId is string => isValue(dishId));
          return this._ngGqlService.getDishes$(dishesIds).pipe(
            map(dishes => {
              order.dishes.forEach(orderDish => {
                orderDish.dish = dishes.find(dish => dish.id === orderDish.dish?.id);
              });
              return order;
            }),
          );
        }),
      );
  }

  /**
   * @method addToOrder()
   * Используется для отправки в шину события добавления блюда.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.orderId -  id заказа.
   * @param options.dishId - id добавляемого блюдо
   * @param options.amount - количество
   * @param options.dishModifiers - выбранные пользователем модификаторы блюда (необязательный)
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  addToOrder(options: {
    orderId: string;
    loading?: BehaviorSubject<boolean>;
    dishId: string;
    amount?: number;
    dishModifiers?: Array<Partial<OrderModifier>> | Array<Partial<Modifier>>;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
    comment?: string;
    replacedOrderDishId?: number;
  }): void {
    options.loading?.next(true);
    this._orderBus.emit({
      event: 'add',
      isLoading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderId: options.orderId,
        dishId: options.dishId,
        modifiers: (options.dishModifiers ?? []).map(dishModifier => ({
          id: dishModifier.dish?.id,
          amount: dishModifier.amount,
          dish: dishModifier.dish,
          groupId: dishModifier.dish?.parentGroup?.id ?? dishModifier.dish?.groupId,
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
   * @param options.orderId -  id заказа.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.amount - количество
   * @param options.orderDishId - id удаляемого блюда в корзине
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  removeFromOrder(options: {
    orderId: string;
    loading?: BehaviorSubject<boolean>;
    amount: number;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
    orderDishId: number;
  }): void {
    options.loading?.next(true);
    this._orderBus.emit({
      event: 'remove',
      isLoading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        id: options.orderId,
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
    data: ScanFormType<OrderForm>['value'];
    loading?: BehaviorSubject<boolean>;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }): void {
    if (isValue(options.data.id)) {
      const data: UpdateOrderInput = {
        id: options.data.id,
        promotionCodeString: options.data.promotionCodeString,
        trifleFrom: options.data.trifleFrom,
        comment: options.data.comment,
        date: options.data.date,
        isSelfService: options.data.selfService,
        paymentMethodId: options.data.paymentMethod?.id,
      };

      this._orderBus.emit({
        event: 'update',
        data,
        isLoading: options.loading,
        errorCb: options.errorCb,
        successCb: options.successCb,
      });
    }
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
    orderForm: ScanFormType<OrderForm>['value'];
    successCb?: (order: CheckResponse) => void;
    errorCb?: (err: unknown) => void;
  }): void {
    const {selfService, paymentMethod, customer, id, address} = options.orderForm;
    if (
      isValue(selfService) &&
      isValue(paymentMethod) &&
      isValue(customer) &&
      isValue(customer.phone) &&
      isValue(customer.phone.code) &&
      isValue(customer.phone.number) &&
      isValue(id) &&
      isValue(address)
    ) {
      const data: CheckOrderInput = {
        paymentMethodId: paymentMethod.id,
        orderId: id,
        selfService,
        address,
        customer: {
          mail: customer.mail,
          name: customer.name,
          phone: {
            code: customer.phone.code,
            number: customer.phone.number,
          },
        },
        comment: options.orderForm.comment,
        pickupPointId: options.orderForm.pickupPoint?.id,
        locationId: options.orderForm.locationId,
        customData: options.orderForm.customData,
        date: options.orderForm.date,
      };

      if (isValue(options.orderForm.spendBonus?.amount)) {
        data.spendBonus = options.orderForm.spendBonus;
      }

      this._orderBus.emit({
        event: 'check',
        successCb: options.successCb,
        errorCb: options.errorCb,
        data,
      });
    } else {
      throw new Error(
        `В options.orderForm отсутствуют один или несколько обязательных параметров :
        selfService, paymentMethod, address, customer, customer.phone, customer.phone.code, customer.phone.number !`,
      );
    }
  }

  /**
   * @method sendOrder()
   * Используется для отправки в шину события оформления заказа.
   * Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.
   * @param options.orderId - Форма чекаута с данными оформляемего заказа
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  sendOrder(options: {
    orderId: string;
    orderIdFactory?: () => string | undefined;
    loading?: BehaviorSubject<boolean>;
    successCb?: (order: CheckResponse) => void;
    errorCb?: (err: unknown) => void;
  }): void {
    options.loading?.next(true);
    this._orderBus.emit({
      event: 'order',
      isLoading: options.loading,
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
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  cloneOrder(options: {
    orderId: string;
    orderIdFactory?: () => string | undefined;
    loading?: BehaviorSubject<boolean>;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }): void {
    options.loading?.next(true);
    this._orderBus.emit({
      event: 'clone',
      isLoading: options.loading,
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
   * @param options.orderId -  id заказа.
   * @param options.loading -  BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
   * @param options.orderDishId - id блюда в корзине, для которого изменяется количество заказываемых порций
   * @param options.amount - необходимое количество порций
   * @param options.successCb -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции
   * @param options.errorCb - Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции
   */
  setDishAmount(options: {
    orderId: string;
    loading?: BehaviorSubject<boolean>;
    orderDishId: number;
    amount?: number;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }): void {
    options.loading?.next(true);
    this._orderBus.emit({
      event: 'setDishAmount',
      isLoading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        id: options.orderId,
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
    loading?: BehaviorSubject<boolean>;
    orderDishId: number;
    comment: string;
    successCb?: (order: Order) => void;
    errorCb?: (err: unknown) => void;
  }): void {
    options.loading?.next(true);
    this._orderBus.emit({
      event: 'setCommentToDish',
      isLoading: options.loading,
      successCb: options.successCb,
      errorCb: options.errorCb,
      data: {
        orderDishId: options.orderDishId,
        comment: options.comment,
      },
    });
  }

  destroy(): void {
    if (isValue(this._orderBusSubscription$)) {
      this._orderBusSubscription$.unsubscribe();
    }
    this._orderSubscription$.unsubscribe();
    this._storageWrapper.destroy();
    Object.values(this)
      .filter((property): property is EventEmitter<unknown> => property instanceof EventEmitter)
      .forEach(property => property.complete());
  }

  getDishRecomended(dishId: string): Observable<Dish[]> {
    return this.getOrder().pipe(
      switchMap(order =>
        this._requestService
          .customQuery$<Dish, 'recommendedForDish'>(
            'recommendedForDish',
            this._defaultDishFragments,
            {
              dishId,
            },
          )
          .pipe(
            map(data => {
              const orderDishes = order.dishes.map(orderDish => orderDish.dish?.id);
              const array = Array.isArray(data.recommendedForDish)
                ? data.recommendedForDish
                : [data.recommendedForDish];
              return array.filter(dish => !orderDishes.includes(dish.id));
            }),
          ),
      ),
    );
  }

  getOrderRecommended(): Observable<Dish[]> {
    return this.getOrder().pipe(
      switchMap(order =>
        this._requestService
          .customQuery$<
            Dish,
            'recommendedForOrder'
          >('recommendedForOrder', this._defaultDishFragments, {orderId: order.id})
          .pipe(
            map(data => {
              const orderDishes = order.dishes.map(orderDish => orderDish.dish?.id);
              const array = Array.isArray(data.recommendedForOrder)
                ? data.recommendedForOrder
                : [data.recommendedForOrder];
              return array.filter(dish => !orderDishes.includes(dish.id));
            }),
          ),
      ),
    );
  }

  getPickupPoints(): Observable<PickupPoint[]> {
    return this._storage.pickupPoints$.pipe(
      exhaustMap(data => (isValue(data) ? of(data) : this._getPickupPoints())),
    );
  }

  private _getPickupPoints(): Observable<PickupPoint[]> {
    return this._requestService
      .customQuery$<PickupPoint, 'pickuppoints'>('pickuppoints', {
        id: true,
        address: true,
        title: true,
        order: true,
      })
      .pipe(
        map(data => {
          const result = Array.isArray(data.pickuppoints) ? data.pickuppoints : [data.pickuppoints];
          this._storage.updatePickupPoints(result);
          return result;
        }),
      );
  }

  private _getPaymentMethods$(orderId: string | undefined): Observable<PaymentMethod[]> {
    return this._requestService
      .customQuery$<PaymentMethod, 'paymentMethod', {orderId: string}>(
        'paymentMethod',
        this._defaultPaymentMethodFragments,
        {orderId: orderId ?? ''},
        {
          fieldsTypeMap: new Map([['orderId', 'String!']]),
        },
      )
      .pipe(
        map(data =>
          (Array.isArray(data.paymentMethod) ? data.paymentMethod : [data.paymentMethod]).filter(
            method => method.enable,
          ),
        ),
      );
  }

  private _getOrderCustomerName(user: User | null): string | null {
    if (isValue(user)) {
      if (isValue(user.firstName) && isValue(user.lastName)) {
        return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
      } else {
        if (isValue(user.firstName)) {
          return user.firstName;
        } else {
          return user.lastName;
        }
      }
    } else {
      return null;
    }
  }

  private _checkOrder$(data: CheckOrderInput): Observable<CheckResponse> {
    return this._requestService
      .customMutation$<CheckResponse, 'checkOrder', {orderCheckout: CheckOrderInput}>(
        'checkOrder',
        {
          order: this._defaultOrderFragments,
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        {orderCheckout: data},
        {
          fieldsTypeMap: new Map([['orderCheckout', 'InputOrderCheckout']]),
        },
      )
      .pipe(map(data => data.checkOrder));
  }

  private _setDishAmount$(data: RemoveOrSetAmountToDish): Observable<Order> {
    return this._requestService
      .customMutation$<
        Order,
        'orderSetDishAmount',
        RemoveOrSetAmountToDish
      >('orderSetDishAmount', this._defaultOrderFragments, data)
      .pipe(map(data => data.orderSetDishAmount));
  }

  private _setDishComment$(data: SetDishCommentInput): Observable<Order> {
    return this._requestService
      .customMutation$<
        Order,
        'orderSetDishComment',
        SetDishCommentInput
      >('orderSetDishComment', this._defaultOrderFragments, data)
      .pipe(map(data => data.orderSetDishComment));
  }

  private _cloneOrder$(sendOrderData: SendOrderInput): Observable<Order> {
    return this._requestService
      .customMutation$<Order, 'orderClone', {orderId: string}>(
        'orderClone',
        this._defaultOrderFragments,

        {
          orderId: sendOrderData.orderId,
        },
        {
          requiredFields: ['orderId'],
        },
      )
      .pipe(
        map(data => {
          if (isValue(data)) {
            if (isValue(sendOrderData.orderIdFactory)) {
              const newOrderId = sendOrderData.orderIdFactory();
              if (newOrderId) {
                this._storageWrapper.setOrderId(newOrderId);
              } else {
                this._storageWrapper.removeOrderId(newOrderId);
              }
            } else {
              this._storageWrapper.removeOrderId();
            }
          }
          return data.orderClone;
        }),
      );
  }

  private _updateOrder$(data: UpdateOrderInput): Observable<Order> {
    return this._requestService
      .customMutation$<
        Order,
        'orderUpdate',
        {
          order: UpdateOrderInput;
        }
      >(
        'orderUpdate',
        this._defaultOrderFragments,
        {order: data},
        {
          fieldsTypeMap: new Map([['order', 'InputOrderUpdate']]),
        },
      )
      .pipe(map(data => data.orderUpdate));
  }

  private _sendOrder$(sendOrderData: SendOrderInput): Observable<CheckResponse> {
    return this._requestService
      .customMutation$<CheckResponse, 'sendOrder', {orderId: string}>(
        'sendOrder',
        <ValuesOrBoolean<CheckResponse>>{
          order: this._defaultOrderFragments,
          message: this._defaultMessageFragments,
          action: this._defaultActionFragments,
        },
        {
          orderId: sendOrderData.orderId,
        },
        {
          requiredFields: ['orderId'],
        },
      )
      .pipe(
        map(data => {
          if (isValue(data) && data.sendOrder.order.state === 'ORDER') {
            if (isValue(sendOrderData.orderIdFactory)) {
              const newOrderId = sendOrderData.orderIdFactory();
              if (newOrderId) {
                this._storageWrapper.setOrderId(newOrderId);
              } else {
                this._storageWrapper.removeOrderId(newOrderId);
              }
            } else {
              this._storageWrapper.removeOrderId();
            }
          }
          return data.sendOrder;
        }),
      );
  }

  private _addDishToOrder$(data: AddToOrderInput): Observable<Order> {
    return this._requestService
      .customMutation$<
        Order,
        'orderAddDish',
        AddToOrderInput
      >('orderAddDish', this._defaultOrderFragments, data)
      .pipe(map(data => data.orderAddDish));
  }

  private _removeDishFromOrder$(data: RemoveOrSetAmountToDish): Observable<Order> {
    return this._requestService
      .customMutation$<
        Order,
        'orderRemoveDish',
        RemoveOrSetAmountToDish
      >('orderRemoveDish', this._defaultOrderFragments, data, {requiredFields: ['orderDishId', 'id']})
      .pipe(map(data => data.orderRemoveDish));
  }

  private _loadCurrentOrNewOrder(id: string, token: string): Observable<Order> {
    return this.loadOrder$(id).pipe(
      switchMap(order => {
        if (order.state === 'ORDER') {
          const newId = this._storageWrapper.getOrderId(token, undefined, true);
          return this.loadOrder$(newId);
        } else {
          return of(order);
        }
      }),
    );
  }
}
