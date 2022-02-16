import {EventEmitter, Inject, Injectable} from '@angular/core';
import {gql} from 'apollo-angular';
import type {ExtraSubscriptionOptions} from 'apollo-angular/types';
import {BehaviorSubject, of} from 'rxjs';
import {filter, map, switchMap, shareReplay, startWith, distinctUntilChanged, concatMap, catchError, distinctUntilKeyChanged} from 'rxjs/operators';
import type {Observable, Subscription} from 'rxjs';
import {CartBusEvent, Action, Message, GQLRequestVariables, Group, ValuesOrBoolean, Dish, Order, Phone, CheckResponse, CheckPhoneResponse, PaymentMethod, Navigation, AddToOrderInput, OrderInput, CheckPhoneCodeInput, RemoveFromOrderInput, SetDishAmountInput, SetDishCommentInput, VCriteria, OrderForm, Modifier, MessageOrActionGql} from './models';
import {OrderFragments, isValue, NavigationFragments, GroupFragments, DishFragments, generateQueryString, PaymentMethodFragments} from './models';
import {ApolloService} from './services/apollo.service';
import {makeForm} from '@axrl/ngx-extended-form-builder';
import type {NgGqlConfig} from './ng-gql.module';

interface ParamSettings<V> {
  optionalFields?: (keyof V)[];
  fieldsTypeMap?: Map<keyof V, string>;
}

@Injectable({
  providedIn: 'root'
})
/** Основной сервис для работы с библиотекой. Содержит все необходимые методы для управления сайтом. */
export class NgGqlService {

  customFields: {[modelName: string]: string[];} = {};

  constructor (
    private apollo: ApolloService,
    @Inject('config') private config: NgGqlConfig) {
    if (config.busSubscribeMode === 'subscribe') {
      this._cartBusSubscription$ = this.orderBus$.subscribe({
        next: () => {},
        error: () => {},
        complete: () => this._cartBusSubscription$?.unsubscribe()
      });
    }
  }

  addCustomField(modelName: string, field: string) {
    if (!this.customFields[modelName]) {
      this.customFields[modelName] = [];
    }
    if (this.customFields[modelName].indexOf(field) == -1) {
      this.customFields[modelName].push(field);
    }
  }

  private _navigationData$: Observable<Navigation[]> = this.queryAndSubscribe(
    'navigations', 'navigation', NavigationFragments.vOb, 'mnemonicId'
  );

  getNavigation$(): Observable<Navigation[]> {
    return this._navigationData$;
  }

  rootGroups$: Observable<{
    slug: string;
    id: string | null;
  }[]> = this._navigationData$.pipe(
    switchMap(navigationData => {
      const menuItem = navigationData.find(item => item.mnemonicId === 'menu')!;
      return menuItem.options.behavior?.includes('navigationmenu') ?
        of(menuItem.navigation_menu.map(item => ({slug: item.groupSlug, id: null}))) :
        this.customQuery$<{childGroups: {slug: string; id: string;}[];}, 'groups', VCriteria>('groups', {
          childGroups: {
            slug: true,
            id: true
          }
        }, {
          criteria: {
            slug: menuItem.options.initGroupSlug
          }
        }).pipe(
          map(group => {
            const array = (<{
              childGroups: {
                id: string;
                slug: string;
              }[];
            }[]> group.groups);
            return array.length == 0 ? [] : array[0].childGroups;
          }
          ),
          shareReplay(1)
        );
    }),
    shareReplay(1)
  );
  private _orderLoader$ = new BehaviorSubject<string | undefined | null>(null);
  private orderLoader$ = this._orderLoader$.pipe(
    shareReplay(1)
  );

  order$ = this.orderLoader$.pipe(
    filter((value): value is string | undefined => value !== null),
    switchMap(
      orderId => {
        return this.loadOrder$(orderId);
      }),
    switchMap(
      order => this.dishes$.pipe(
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

  actions$ = this.order$.pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.customSubscribe$<Action, 'action', {
        orderId: string;
      }>('action', MessageOrActionGql.actionVob, {orderId: order.id})
    ),
    shareReplay(1)
  );

  messages$ = this.order$.pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.customSubscribe$<Message, 'message', {
        orderId: string;
      }>('message', MessageOrActionGql.messageVob, {orderId: order.id})
    ),
    shareReplay(1)
  );

  private dishes$ = new BehaviorSubject<Dish[] | null>(null);

  private loadedMenu$ = this.rootGroups$.pipe(
    switchMap(
      rootGroups => {
        const nesting = this.config.nesting ?? 2;
        const queryObject: ValuesOrBoolean<Group> = new Array(nesting).fill(nesting).reduce(
          (accumulator: ValuesOrBoolean<Group>) => {
            const item = {...GroupFragments.vOb};
            item.childGroups = accumulator;
            return item;
          }, {...GroupFragments.vOb, childGroups: {...GroupFragments.vOb}}
        );
        const criteria = !!rootGroups[0]?.id ? {
          id: rootGroups.map(rootGroup => rootGroup.id)
        } : {
          slug: rootGroups.map(rootGroup => rootGroup.slug)
        };
        return this.queryAndSubscribe<Group, 'groups', 'group', VCriteria>('groups', 'group', queryObject, 'id', {
          criteria
        });
      }),
    switchMap(
      groups => {
        const addGroup = (items: Group[], item: Group) => {
          if (!items.find(value => value.id === item.id)) {
            items.push(item);
          }
        };
        const getGroups = (items: Group[]) => items.reduce<Group[]>(
          (accumulator, current) => {
            addGroup(accumulator, current);
            if (current.childGroups && current.childGroups.length > 0) {
              getGroups(current.childGroups).forEach(
                child => addGroup(accumulator, child)
              );
            };
            return accumulator;
          }, []
        );
        const allNestingsGroups = getGroups(groups);
        const allNestingsIds = allNestingsGroups.map(group => group.id);
        console.log(allNestingsGroups);
        return this.queryAndSubscribe<Dish, 'dishes', 'dish', VCriteria>('dishes', 'dish', DishFragments.vOb, 'id', {
          criteria: {
            parentGroup: allNestingsIds
          }
        }).pipe(
          map(dishes => {
            this.dishes$.next(dishes);
            const groupsById = allNestingsGroups.reduce<{
              [key: string]: Group;
            }>(
              (accumulator, current) => {
                if (!current.childGroups) {
                  current.childGroups = [];
                };
                if (!current.dishes) {
                  current.dishes = [];
                };
                accumulator[current.id] = current;
                return accumulator;
              }, {}
            );
            const groupIdsBySlug: {
              [key: string]: string;
            } = {};

            // Inserting dishes by groups
            for (let dish of dishes) {
              const groupId = dish.parentGroup?.id || dish.groupId;
              if (!groupId) continue;
              if (!groupsById[groupId]) continue;
              if (groupsById[groupId].dishes) {
                groupsById[groupId].dishes?.push(dish);
              } else {
                groupsById[groupId].dishes = [dish];
              }
            }
            // Create groups hierarchy
            for (let groupId in groupsById) {
              const group = groupsById[groupId];
              const parentGroupId = group.parentGroup?.id;
              groupIdsBySlug[group.slug!] = groupId;
              if (!parentGroupId) continue;
              if (!groupsById[parentGroupId]) continue;
              if (groupsById[parentGroupId].childGroups.find(chGroup => chGroup.id === group.id)) continue;
              groupsById[parentGroupId].childGroups.push(group);
            }
            return {groupsById, groupIdsBySlug};
          }),
          shareReplay(1)
        );
      }
    ),
    shareReplay(1)
  );

  getMenu$(slug: string | string[] | undefined): Observable<Group[] | null> {
    return this.loadedMenu$.pipe(
      map(({groupsById, groupIdsBySlug}) => {
        if (slug) {
          switch (typeof slug) {
            case 'string':
              if (!groupIdsBySlug[slug]) {
                return [];
              } else {
                return groupsById[groupIdsBySlug[slug]].childGroups;
              };
            default:
              if (!slug.length) {
                return [];
              } else {
                return slug.map(s => groupsById[groupIdsBySlug[s]]);
              };
          }
        } else {
          return Object.values(groupsById) as Group[];
        }
      }),
      shareReplay(1)
    );
  }

  getDishes$(id?: string | string[]): Observable<Dish[]> {
    const dishes = this.dishes$.value;
    if (dishes) {
      const ids = typeof id === 'string' ? [id] : id;
      const dishesInStock = dishes.filter(item => typeof id === 'string' ? item.id === id : id?.includes(item.id));
      if (!ids) {
        return of(dishes);
      } else {
        if (dishesInStock.length == ids.length) {
          return of(dishesInStock);
        } else {
          const dishesNotInStock = ids.filter(dishId => !dishes.find(dish => dish.id === dishId));
          return this.customQuery$<Dish, 'dishes', VCriteria>('dishes', DishFragments.vOb, {
            criteria: {
              id: dishesNotInStock
            }
          }).pipe(
            map(loadedDishes => {
              const result = Array.isArray(loadedDishes.dishes) ? loadedDishes.dishes : [loadedDishes.dishes];
              dishes.push(...result);
              this.dishes$.next(dishes);
              return [...dishesInStock, ...result];
            })
          );
        }
      }
    } else {
      return this.dishes$.asObservable().pipe(
        filter((data): data is Dish[] => !!data)
      );
    }
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
    return this.queryAndSubscribe<Order, 'order', 'order', {orderId: string;} | undefined>('order', 'order', OrderFragments.vOb, 'id', orderId ? {
      orderId
    } : undefined).pipe(
      map(values => values[0] ? values[0] : null),
      filter((order): order is Order => isValue(order))
    );
  }

  getOrder(): Observable<Order> {
    return this.order$;
  }

  private _orderBus$ = new EventEmitter<CartBusEvent>();

  orderBus$ = this._orderBus$.asObservable().pipe(
    concatMap(
      busEvent => {

        switch (busEvent.event) {
          case 'add':
            busEvent.data.orderId = busEvent.order.id;
            return this.addDishToOrder$(busEvent.data).pipe(
              map(order => {
                busEvent.loading.next(false);
                if (busEvent.successCb) {
                  busEvent.successCb(order);
                };
              }),
              catchError((err: unknown) => {
                busEvent.loading.next(false);
                if (busEvent.errorCb) {
                  busEvent.errorCb(err);
                };
                console.log(err);
                return of(() => {});
              })
            );
          case 'remove':
            const requestData: RemoveFromOrderInput = {
              id: busEvent.order.id,
              orderDishId: busEvent.data.orderDishId,
              amount: busEvent.data.amount
            };
            return this.removeDishFromOrder$(requestData).pipe(
              map(order => {
                busEvent.loading.next(false);
                if (busEvent.successCb) {
                  busEvent.successCb(order);
                };
              }),
              catchError(err => {
                console.log(err);
                if (busEvent.errorCb) {
                  busEvent.errorCb(err);
                };
                return of(
                  () => {}
                );
              })
            );
          case 'check':
            return this.checkOrder$(this.makeOrderData(busEvent.order)).pipe(
              map(res => {
                if (busEvent.successCb) {
                  busEvent.successCb(res);
                };
              }),
              catchError(err => {
                if (busEvent.errorCb) {
                  busEvent.errorCb(err);
                };
                console.log(err);
                return of(
                  () => {}
                );
              })
            );
          case 'order':
            return this.sendOrder$(this.makeOrderData(busEvent.order, 'send')).pipe(
              map(res => {
                if (busEvent.ordered) {
                  busEvent.ordered.next(true);
                };
                if (busEvent.successCb) {
                  busEvent.successCb(res);
                };
              }),
              catchError(err => {
                if (busEvent.errorCb) {
                  busEvent.errorCb(err);
                };
                console.log(err);
                return of(
                  () => {}
                );
              })
            );
        }
      }),
    shareReplay(1)
  );

  private _cartBusSubscription$: Subscription | undefined;

  getPaymentMethods$(orderId: string): Observable<PaymentMethod[]> {
    return this.customQuery$<PaymentMethod, 'paymentMethod', {
      orderId: string;
    }>('paymentMethod', PaymentMethodFragments.vOb, {
      orderId
    }, {optionalFields: ['orderId']}).pipe(
      map(
        data => Array.isArray(data.paymentMethod) ? data.paymentMethod : [data.paymentMethod]
      )
    );
  };

  loadOrderAsCart(orderId: string | undefined): void {
    this._orderLoader$.next(orderId);
  }


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
    orderDishId: number | undefined,
    order: Order,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void) {
    loading.next(true);
    this._orderBus$.emit({
      event: 'remove', loading, order, successCb, errorCb, data: {
        dish,
        orderDishId,
        amount
      }
    });
  }

  private makeOrderData(orderForm: OrderForm, operation: 'check' | 'send' = 'check'): OrderInput {
    const result = {
      orderId: orderForm.id,
      paymentMethodId: orderForm.paymentMethod?.id,
      selfService: orderForm.selfService,
      address: orderForm.address,
      customer: orderForm.customer,
      customData: orderForm.customData,
      pickupAddressId: orderForm.pickupAddressId
    };
    return operation == 'send' ? result : {
      comment: orderForm.comment ?? undefined,
      ...result
    };
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

  addDishToOrder$(data: AddToOrderInput): Observable<Order> {
    return this.customMutation$<Order, 'orderAddDish', AddToOrderInput>(
      'orderAddDish', OrderFragments.vOb, data
    ).pipe(
      map(
        data => data.orderAddDish
      )
    );
  };

  removeDishFromOrder$(data: RemoveFromOrderInput): Observable<Order> {
    return this.customMutation$<Order, 'orderRemoveDish', RemoveFromOrderInput>('orderRemoveDish', OrderFragments.vOb, data, {optionalFields: ['id', 'orderDishId']}).pipe(
      map(
        data => data.orderRemoveDish
      )
    );
  };

  sendOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.customMutation$<CheckResponse, 'sendOrder', OrderInput>('sendOrder', {
      order: OrderFragments.vOb,
      message: MessageOrActionGql.messageVob,
      action: MessageOrActionGql.actionVob
    }, data, {
      optionalFields: ['orderId', 'paymentMethodId'],
      fieldsTypeMap: new Map([
        ['address', 'Address'],
        ['customer', 'Customer!']
      ])
    }).pipe(
      map(
        data => data.sendOrder
      )
    );
  };

  checkOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.customMutation$<CheckResponse, 'checkOrder', OrderInput>('checkOrder', {
      order: OrderFragments.vOb,
      message: MessageOrActionGql.messageVob,
      action: MessageOrActionGql.actionVob
    }, data, {
      optionalFields: ['orderId', 'paymentMethodId', 'customer'],
      fieldsTypeMap: new Map([
        ['address', 'Address'],
        ['customer', 'Customer!']
      ])
    }).pipe(
      map(
        data => data.checkOrder
      )
    );
  };

  getPhone$(phone: string): Observable<Phone | Phone[]> {
    return this.customQuery$<Phone, 'phone', {
      phone: string;
    }>('phone', {
      id: true,
      phone: true,
      isFirst: true,
      isConfirm: true,
      codeTime: true,
      confirmCode: true
    }, {
      phone
    }).pipe(
      map(
        data => data.phone
      )
    );
  };

  checkPhone$(phone: string): Observable<CheckPhoneResponse | CheckPhoneResponse[]> {
    return this.customQuery$<CheckPhoneResponse, 'checkPhone'>('checkPhone', {
      type: true,
      title: true,
      message: true,
      confirmed: true,
      firstbuy: true
    }, {
      phone
    }).pipe(
      map(
        data => data.checkPhone
      )
    );
  };
  checkPhoneCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse> {
    return this.customMutation$<CheckPhoneResponse, 'setPhoneCode', CheckPhoneCodeInput>('setPhoneCode', {
      type: true,
      title: true,
      message: true,
      confirmed: true,
      firstbuy: true
    }, data).pipe(
      map(
        result => result.setPhoneCode
      )
    );
  };

  setDishAmount$(data: SetDishAmountInput): Observable<Order> {
    return this.customMutation$<Order, 'orderSetDishAmount', SetDishAmountInput>('orderSetDishAmount', OrderFragments.vOb, data).pipe(
      map(
        data => data.orderSetDishAmount
      )
    );
  };

  setDishComment$(data: SetDishCommentInput): Observable<Order> {
    return this.customMutation$<Order, 'orderSetDishComment', SetDishCommentInput>('orderSetDishComment', OrderFragments.vOb, data).pipe(
      map(
        data => data.orderSetDishComment
      )
    );
  };

  /** 
   * @method customQuery$ для выполнения запросов типа "query" к серверу API GraphQL 
   * @typeParam T Тип запрашиваемых данных, по которому построен объект @see `queryObject`.
   * @typeParam N Строка-название операции из схемы сервера GraphQL.
   * @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
   * @param name - название операции, объвленное в схеме сервера GraphQL.
   * @param queryObject - объект-источник информации о структуре запрашиваемых данных. 
   *  Для совместимости может передаваться в виде:
   *    1. Обьекта, реализующего тип ValuesOrBoolean<T>. 
   *    2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.
   *    @see ValuesOrBoolean<T>
   * @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса. 
   *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
   *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
   *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields, 
   *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
   * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
   * @param options.optionalFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип
   * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
   *    (например у параметра указан тип String!, а не String).
   * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса, 
   * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
   * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как необязательный.
   * 
   * @returns - Observable поток с результатом получения данных от сервера в формате объекта с одним ключом N (название операции), значение которого - непосредственно запрошенные данные
   *  в виде одиночного объекта либо массива.
   **/
  customQuery$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, paramOptions?: ParamSettings<V>): Observable<Record<N, T | T[]>>;
  customQuery$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, paramOptions?: ParamSettings<V>): Observable<Record<N, T | T[]>>;
  customQuery$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V, paramOptions?: ParamSettings<V>): Observable<Record<N, T | T[]>> {
    return this.apollo.watchQuery<Record<N, T | T[]>, V>({
      query: gql`query ${ generateQueryString({
        name,
        queryObject: name in queryObject && Object.keys(queryObject).length == 1 ? (<Record<N, ValuesOrBoolean<T>>> queryObject)[name] : queryObject,
        variables,
        optionalFields: paramOptions?.optionalFields,
        fieldsTypeMap: paramOptions?.fieldsTypeMap
      }) }`,
      variables,
    }).pipe(
      map(
        res => res.error || res.errors ? null : res.data),
      filter((data): data is Record<N, T | T[]> => !!data)
    );
  };

  /**
 * @method customMutation$ для выполнения запросов типа "mutation" к серверу API GraphQL 
 * @typeParam T Тип мутируемых данных, по которому построен объект @see `queryObject`.
 * @typeParam N Строка-название операции из схемы сервера GraphQL.
 * @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
 * @param name - название операции, объвленное в схеме сервера GraphQL.
 * @param queryObject - объект-источник информации о структуре запрашиваемых данных.
 *  Для совместимости может передаваться в виде:
 *     1. Обьекта, реализующего тип ValuesOrBoolean<T>. 
 *     2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.
 *     @see ValuesOrBoolean<T>
 * @param variables - обязательный - объект с переменными, которые будут использованы в качестве параметров запроса. 
 *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
 *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
 *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields, 
 *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
 * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
 * @param options.optionalFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип
 * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
 *    (например у параметра указан тип String!, а не String).
 * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса, 
 * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
 * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как необязательный.
 * 
 * @returns - Observable поток с результатом выполнения операции в формате объекта с одним ключом N (название операции), значение которого - непосредственно результат операции.
 **/
  customMutation$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables: V, paramOptions?: ParamSettings<V>): Observable<Record<N, T>>;
  customMutation$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: ValuesOrBoolean<T>, variables: V, paramOptions?: ParamSettings<V>): Observable<Record<N, T>>;
  customMutation$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables: V, paramOptions?: ParamSettings<V>): Observable<Record<N, T>> {
    return this.apollo.mutate<Record<N, T>, V>({
      mutation: gql`mutation ${ generateQueryString({
        name,
        queryObject: name in queryObject && Object.keys(queryObject).length == 1 ? (<Record<N, ValuesOrBoolean<T>>> queryObject)[name] : queryObject,
        variables,
        optionalFields: paramOptions?.optionalFields,
        fieldsTypeMap: paramOptions?.fieldsTypeMap
      }) }`,
      variables
    }).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res)
    );
  };

  /**
* @method customSubscribe$ для выполнения запросов типа "subscription" к серверу API GraphQL 
* @typeParam T Тип данных, на обновление которых производится подписка и по которому построен объект @see `queryObject`.
* @typeParam N Строка-название операции из схемы сервера GraphQL.
* @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
* @param name - название операции, объвленное в схеме сервера GraphQL.
* @param queryObject - объект-источник информации о структуре данных, на которые происходит подписка. 
*   Для совместимости может передаваться в виде:
*     1. Обьекта, реализующего тип ValuesOrBoolean<T>. 
*     2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.
*     @see ValuesOrBoolean<T>
* @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса. 
*  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
*  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
*  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields, 
*  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
* @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
* @param options.optionalFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип
* КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
*    (например у параметра указан тип String!, а не String).
* @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса, 
* а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
* ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как необязательный.
* 
* @returns - Observable поток с данными типа T, которые будут поступать в рамках сделанной подписки.
* ВАЖНО! В потоке будут поступать только обновления для данных, на которые сделана подписка. 
* Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
* В ситуациях, где требуется получить некие данные и подписаться на обновления для них, также можно для удобства использовать метод queryAndSubscribe.
* @see queryAndSubscribe
**/
  customSubscribe$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, paramOptions?: ParamSettings<V>, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>;
  customSubscribe$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, paramOptions?: ParamSettings<V>, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>;
  customSubscribe$<T, N extends `${ string }`, V = GQLRequestVariables>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V, paramOptions?: ParamSettings<V>, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]> {
    const q = generateQueryString({
      name,
      queryObject: name in queryObject && Object.keys(queryObject).length == 1 ? (<Record<N, ValuesOrBoolean<T>>> queryObject)[name] : queryObject,
      variables,
      optionalFields: paramOptions?.optionalFields,
      fieldsTypeMap: paramOptions?.fieldsTypeMap
    });
    return this.apollo.subscribe<Record<N, T>, V>({
      query: gql`subscription ${ q }`,
      variables
    }, extra).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res),
      map(res => res[name])
    );
  };

  /**
  * @method queryAndSubscribe 
  * Метод, объединяющий получение неких первоначальных данных и подписку на их обновление.
  
  * @param nameQuery - название операции типа "query" - запроса данных, объвленное в схеме сервера GraphQL.
  * @param nameSubscribe - название операции типа "subscription", объвленное в схеме сервера GraphQL  для запрашиваемых данных.
  * @param queryObject - объект-источник информации о структуре запрашиваемых данных, на которые происходит подписка 
  в виде обьекта, реализующего тип ValuesOrBoolean<T>.
  *   @see ValuesOrBoolean<T>
  * @param uniqueKeyForCompareItem - наименование ключа, значение которого является уникальным для запрашиваемых данных (например,'id').
    Необходим для работы внутренней вспомогательной функции обновления изначального набора данных актуальными данными, поступившими в рамках подписки.
  * @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса. 
  *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
  *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
  *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields, 
  *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
  * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
  * @param options.optionalFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип
  * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
  *    (например у параметра указан тип String!, а не String).
  * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса, 
  * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
  * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как необязательный.
  * @returns - Observable поток с данными, которые будут поступать в рамках сделанной подписки.
  * Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка. 
  * Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
  **/
  queryAndSubscribe<T, NQuery extends `${ string }`, NSubscribe extends `${ string }`, VQ = GQLRequestVariables, VS = VQ>(
    nameQuery: NQuery,
    nameSubscribe: NSubscribe,
    queryObject: ValuesOrBoolean<T>,
    uniqueKeyForCompareItem: keyof T,
    variables?: VQ,
    paramOptions?: ParamSettings<VQ>): Observable<T[]>;
  queryAndSubscribe<
    T, NQuery extends `${ string }`, NSubscribe extends `${ string }`,
    VQ = Exclude<GQLRequestVariables, 'query' | 'subscribe'>,
    VS = Exclude<GQLRequestVariables, 'query' | 'subscribe'>>(
      nameQuery: NQuery,
      nameSubscribe: NSubscribe,
      queryObject: ValuesOrBoolean<T>,
      uniqueKeyForCompareItem: keyof T,
      variables?: {
        query?: VQ,
        subscribe?: VS;
      },
      paramOptions?: {
        query?: ParamSettings<VQ>,
        subscribe?: ParamSettings<VS>;
      }): Observable<T[]>;
  queryAndSubscribe<T, NQuery extends `${ string }`, NSubscribe extends `${ string }`, VQ = GQLRequestVariables, VS = GQLRequestVariables | VQ>(
    nameQuery: NQuery,
    nameSubscribe: NSubscribe,
    queryObject: ValuesOrBoolean<T>,
    uniqueKeyForCompareItem: keyof T,
    variables?: {
      query?: VQ,
      subscribe?: VS;
    } | VQ,
    paramOptions?: {
      query?: ParamSettings<VQ>,
      subscribe?: ParamSettings<VS>;
    } | ParamSettings<VQ>): Observable<T[]> {
    const updateFn: (store: T | T[], subscribeValue: T) => T[] = (store, newValue) => {
      const array = (Array.isArray(store) ? store : [store]);
      const findItem = array.find(
        item => newValue[uniqueKeyForCompareItem] === item[uniqueKeyForCompareItem]
      );
      if (findItem) {
        Object.assign(findItem, newValue);
        return array;
      } else {
        return [...array, newValue];
      };
    };
    return this.customQuery$(
      nameQuery, queryObject,
      isValue(variables) && 'query' in variables ? variables.query : <VQ> variables,
      isValue(paramOptions) && 'query' in paramOptions ? paramOptions.query : <ParamSettings<VQ>> paramOptions
    ).pipe(
      switchMap(
        result => this.customSubscribe$<T, NSubscribe, VS>(
          nameSubscribe, queryObject,
          isValue(variables) && ('subscribe' in variables) ?
            variables.subscribe : <VS> variables,
          isValue(paramOptions) && ('subscribe' in paramOptions) ?
            paramOptions.subscribe :
            <ParamSettings<VS>> paramOptions).pipe(
              startWith(null),
              map(
                updatedValue => {
                  const store: T | T[] = makeForm(result[nameQuery]).value;
                  const copyedUpdatedValue: T = makeForm(updatedValue).value;
                  return isValue(updatedValue) ?
                    updateFn(store, copyedUpdatedValue) :
                    Array.isArray(store) ?
                      store :
                      <T[]>[store];
                }),
              shareReplay(1)
            )
      ),
      shareReplay(1)
    );
  }

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
