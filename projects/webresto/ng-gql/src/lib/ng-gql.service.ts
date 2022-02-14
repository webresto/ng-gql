import { EventEmitter, Inject, Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import type { ExtraSubscriptionOptions } from 'apollo-angular/types';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, switchMap, shareReplay, startWith, distinctUntilChanged, concatMap, catchError, distinctUntilKeyChanged } from 'rxjs/operators';
import type { Observable, Subscription } from 'rxjs';
import type { Action, Message, Group, ValuesOrBoolean, Dish, Order, Phone, CheckPhoneResponse, PaymentMethod, Navigation, AddToOrderInput, OrderInput, CheckPhoneCodeInput, RemoveFromOrderInput, SetDishAmountInput, SetDishCommentInput, VCriteria, OrderForm, Modifier } from './models';
import { OrderFragments, isValue, NavigationFragments, GroupFragments, DishFragments, CheckResponse, generateQueryString, PaymentMethodFragments } from './models';
import { ApolloService } from './services/apollo.service';
import { makeForm } from '@axrl/ngx-extended-form-builder';
import type { NgGqlConfig } from './ng-gql.module';

/**
 * Тип событий, которые отслеживаются в потоке NgGqlService.orderBus$.
 */
export type CartBusEvent = {
  /** Добавление в заказ (корзину). */
  event: 'add';
  /** Данные для операции */
  data: AddToOrderInput;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;
  /** Заказ, с которым выполнется операция */
  order: Order;
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (order: Order) => void;
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;
} | {
  /** Удаление блюда из заказа (корзины). */
  event: 'remove';
  /** Данные для операции */
  data: RemoveFromOrderInput & { dish: Dish; };
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  loading: BehaviorSubject<boolean>;
  /** Заказ, с которым выполнется операция */
  order: Order;
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (order: Order) => void;
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;
} | {
  event: 'check' | 'order';
  /** Данные формы чекаута */
  order: OrderForm;
  /** BehaviorSubject блюда, отслеживающий состояние выполняемого действия. */
  ordered?: BehaviorSubject<boolean>;
  /** Пользовательский callback, который дополнительно будет выполнен в случае успешной операции */
  successCb?: (order: CheckResponse) => void;
  /** Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции */
  errorCb?: (err: unknown) => void;
} | {
  /** Загрузка заказа */
  event: 'load';
  /** Загружается заказ с переданным orderId, иначе - создается новый. */
  orderId: string | undefined;
};

@Injectable({
  providedIn: 'root'
})
/** Основной сервис для работы с библиотекой. Содержит все необходимые методы для управления сайтом. */
export class NgGqlService {

  customFields: { [modelName: string]: string[]; } = {};

  constructor(
    private apollo: ApolloService,
    @Inject('config') private config: NgGqlConfig) {
    if (config.busSubscribeMode === 'subscribe') {
      this._cartBusSubscription$ = this.orderBus$.subscribe({
        next: () => { },
        error: () => { },
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
        of(menuItem.navigation_menu.map(item => ({ slug: item.groupSlug, id: null }))) :
        this.customQuery$<{ childGroups: { slug: string; id: string; }[]; }, 'groups', VCriteria>('groups', {
          childGroups: {
            slug: true,
            id: true
          }
        }, {
          criteria: {
            slug: menuItem.options.initGroupSlug
          }
        }).pipe(
          map(group => (<{
            childGroups: {
              id: string;
              slug: string;
            }[];
          }[]>group.groups)[0].childGroups
          ),
          shareReplay(1)
        );
    }),
    shareReplay(1)
  );
  private _orderLoader$ = new BehaviorSubject<string | undefined | null>(null);
  private orderLoader$ = this._orderLoader$.asObservable().pipe(
    distinctUntilChanged(),
    map(orderId => orderId ?? undefined),
    shareReplay(1)
  );

  order$ = this.orderLoader$.pipe(
    switchMap(
      orderId => {
        return this._getOrder$(orderId);
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
      }>('action', {
        type: true,
        data: true
      }, { orderId: order.id })
    ),
    shareReplay(1)
  );

  messages$ = this.order$.pipe(
    distinctUntilKeyChanged('id'),
    switchMap(
      order => this.customSubscribe$<Message, 'message', {
        orderId: string;
      }>('message', {
        title: true,
        type: true,
        message: true
      }, { orderId: order.id })
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
            const item = { ...GroupFragments.vOb };
            item.childGroups = accumulator;
            return item;
          }, { ...GroupFragments.vOb, childGroups: { ...GroupFragments.vOb } }
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
            return { groupsById, groupIdsBySlug };
          }),
          shareReplay(1)
        );
      }
    ),
    shareReplay(1)
  );

  getMenu$(slug: string | string[] | undefined): Observable<Group[] | null> {
    return this.loadedMenu$.pipe(
      map(({ groupsById, groupIdsBySlug }) => {
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
  private _getOrder$(orderId: string | undefined): Observable<Order> {
    return this.queryAndSubscribe<Order, 'order', 'order', { orderId: string; } | undefined>('order', 'order', OrderFragments.vOb, 'id', orderId ? {
      orderId
    } : undefined).pipe(
      map(values => values[0])
    );
  }

  getOrder(orderId: string | undefined): Observable<Order> {
    return this._getOrder$(orderId);
  }

  loadOrderAsCart$(orderId: string | undefined): void {
    if (this._orderLoader$.value !== orderId) {
      this._orderLoader$.next(orderId);
    };
  }

  private _orderBus$ = new EventEmitter<CartBusEvent>();

  orderBus$ = this._orderBus$.pipe(
    concatMap(
      busEvent => {
        switch (busEvent.event) {
          case 'load':
            this.loadOrderAsCart$(busEvent.orderId);
            return of(() => { });
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
                return of(() => { });
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
                  () => { }
                );
              })
            );
          case 'check':
            const checkInput = { ...busEvent.order, orderId: busEvent.order.id };
            return this.checkOrder$(checkInput).pipe(
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
                  () => { }
                );
              })
            );
          case 'order':
            const oredrInput = { ...busEvent.order, orderId: busEvent.order.id };
            return this.sendOrder$(oredrInput).pipe(
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
                  () => { }
                );
              })
            );
        }
      }),
    shareReplay(1)
  );

  private _cartBusSubscription$: Subscription | undefined;

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

  getPaymentMethods$(orderId: string): Observable<PaymentMethod[]> {
    return this.customQuery$<PaymentMethod, 'paymentMethod', {
      orderId: string;
    }>('paymentMethod', PaymentMethodFragments.vOb, {
      orderId
    }, ['orderId']).pipe(
      map(
        data => Array.isArray(data.paymentMethod) ? data.paymentMethod : [data.paymentMethod]
      )
    );
  };

  addDishToOrder$(data: AddToOrderInput): Observable<Order> {
    return this.customMutation$<Order, 'orderAddDish', AddToOrderInput>(
      'orderAddDish', OrderFragments.vOb, data
    ).pipe(
      map(
        data => data.orderAddDish
      )
    );
  };

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
    this._orderBus$.next({
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

  removeFromOrder(
    loading: BehaviorSubject<boolean>,
    dish: Dish,
    amount: number = 1,
    orderDishId: number | undefined,
    order: Order,
    successCb?: (order: Order) => void,
    errorCb?: (err: unknown) => void) {
    loading.next(true);
    this._orderBus$.next({
      event: 'remove', loading, order, successCb, errorCb, data: {
        dish,
        orderDishId,
        amount
      }
    });
  }

  checkOrder(order: OrderForm,
    successCb?: (order: CheckResponse) => void,
    errorCb?: (err: unknown) => void
  ) {
    this._orderBus$.next({
      event: 'check', successCb, errorCb, order,
    });
  }

  sendOrder(order: OrderForm,
    successCb?: (order: CheckResponse) => void,
    errorCb?: (err: unknown) => void
  ) {
    this._orderBus$.next({
      event: 'order', successCb, errorCb, order
    });
  }

  sendOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.customMutation$<CheckResponse, 'sendOrder', OrderInput>('sendOrder', OrderFragments.vOb, data, ['orderId', 'paymentMethodId']).pipe(
      map(
        data => data.sendOrder
      )
    );
  };

  checkOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.customMutation$<CheckResponse, 'checkOrder', OrderInput>('checkOrder', OrderFragments.vOb, data, ['orderId', 'paymentMethodId', 'customer']).pipe(
      map(
        data => data.checkOrder
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

  removeDishFromOrder$(data: RemoveFromOrderInput): Observable<Order> {
    return this.customMutation$<Order, 'orderRemoveDish', RemoveFromOrderInput>('orderRemoveDish', OrderFragments.vOb, data, ['id', 'orderDishId']).pipe(
      map(
        data => data.orderRemoveDish
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

  customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, optionalFields?: string[]): Observable<Record<N, T | T[]>>;
  customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, optionalFields?: string[]): Observable<Record<N, T | T[]>>;
  customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V, optionalFields?: string[]): Observable<Record<N, T | T[]>> {
    return this.apollo.watchQuery<Record<N, T | T[]>, V>({
      query: gql`query ${generateQueryString({
        name,
        queryObject: name in queryObject && Object.keys(queryObject).length == 1 ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject,
        variables,
        optionalFields
      })}`,
      variables,
    }).pipe(
      map(
        res => res.error || res.errors ? null : res.data),
      filter((data): data is Record<N, T | T[]> => !!data)
    );
  };

  customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables: V, optionalFields?: string[]): Observable<Record<N, T>>;
  customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables: V, optionalFields?: string[]): Observable<Record<N, T>>;
  customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables: V, optionalFields?: string[]): Observable<Record<N, T>> {
    return this.apollo.mutate<Record<N, T>, V>({
      mutation: gql`mutation ${generateQueryString({
        name,
        queryObject: name in queryObject && Object.keys(queryObject).length == 1 ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject,
        variables,
        optionalFields
      })}`,
      variables
    }).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res)
    );
  };

  customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, optionalFields?: string[], extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>;
  customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, optionalFields?: string[], extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>;
  customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V, optionalFields?: string[], extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]> {
    const q = generateQueryString({
      name,
      queryObject: name in queryObject && Object.keys(queryObject).length == 1 ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject,
      variables,
      optionalFields
    });
    return this.apollo.subscribe<Record<N, T>, V>({
      query: gql`subscription ${q}`,
      variables
    }, extra).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res),
      map(res => res[name])
    );
  };

  queryAndSubscribe<T, NQuery extends `${string}`, NSubscribe extends `${string}`, V = unknown>(nameQuery: NQuery, nameSubscribe: NSubscribe, queryObject: ValuesOrBoolean<T>, uniqueKeyForCompareItem: keyof T, variables?: V) {
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
    return this.customQuery$(nameQuery, queryObject, variables).pipe(
      switchMap(
        result => this.customSubscribe$(nameSubscribe, queryObject, variables).pipe(
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
