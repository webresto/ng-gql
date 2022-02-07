import { Inject, Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import type { ExtraSubscriptionOptions } from 'apollo-angular/types';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, switchMap, shareReplay, startWith, distinctUntilChanged } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import type { Group, ValuesOrBoolean, Dish, Order, Phone, CheckPhoneResponse, PaymentMethod, CheckResponse, Navigation, AddToOrderInput, OrderInput, CheckPhoneCodeInput, RemoveFromOrderInput, SetDishAmountInput, SetDishCommentInput } from './models';
import { OrderGql, PaymentMethodGql, isValue, NavigationFragments, GroupFragments, DishFragments } from './models';
import { ApolloService } from './services/apollo.service';
import { makeForm } from '@axrl/ngx-extended-form-builder';
import type { NgGqlConfig } from './ng-gql.module';

export type VCriteria = {
  criteria: {
    [key: string]: any
  }
}

type FieldTypes = Object | number | bigint | Symbol | string | boolean;

export function generateQueryString<T, N extends `${string}`, V>(options: {
  name: N,
  queryObject: T,
  variables: V,
}) {
  const { name, queryObject, variables } = options;
  const makeFieldList = <T, V>(source: T, name: string, indent: number = 1, variables?: V): string => {
    const indentString = new Array<string>(indent * 2).fill(' ').join('');
    return `${name}${indent === 1 && variables ? `(${(<(keyof V)[]>Object.keys(variables)).map(
      key => `${key}:$${key}`
    ).join(',')
      })` : ''} {\n  ${indentString}${Object.entries(source).
        filter(
          (entry): entry is [string, FieldTypes] => typeof entry[1] !== 'function'
        ).
        map(
          entry => typeof entry[1] === 'object' && entry[1] !== undefined && entry[1] !== null ?
            makeFieldList(
              Array.isArray(entry[1]) && entry[1][0] ? entry[1][0] : entry[1], entry[0], indent + 1
            ) :
            typeof entry[1] === 'string' && entry[1].includes('Fragment') ?
              `${entry[0]} : {...${entry[1]}}` :
              String(entry[0])
        ).join(
          `,\n  ${indentString}`
        )
      }\n${indentString}}
      `
  };
  const getGqlType = (value: FieldTypes): string => {
    switch (typeof value) {
      case 'number': return 'Int';
      case 'string': return 'String';
      case 'boolean': return 'Boolean';
      case 'object': return 'Json';
      default: throw new Error('Параметр должен принадлежать типам number, string, object или boolean');
    }
  };
  return ` load${name[0].toUpperCase() + name.slice(1)} ${variables ? `(${(<(keyof V)[]>Object.keys(variables)).map(
    key => `$${key}:${getGqlType(variables[key])}`
  ).join(',')
    })` : ''} {\n${makeFieldList(queryObject, name, 1, variables)}\n}`;
}

@Injectable({
  providedIn: 'root'
})
export class NgGqlService {

  customFields: { [key: string]: string[] } = {};

  constructor(private apollo: ApolloService, @Inject('config') private config: NgGqlConfig) { }

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

  rootGroupsSlugs$ = this._navigationData$.pipe(
    switchMap(navigationData => {
      const menuItem = navigationData.find(item => item.mnemonicId === 'menu')!;
      return menuItem.options.behavior?.includes('navigationmenu') ?
        of(menuItem.navigation_menu.map(item => item.groupSlug)) :
        this.customQuery$<{ childGroups: { slug: string }[] }, 'groups', VCriteria>('groups', {
          childGroups: {
            slug: true
          }
        }, {
          criteria: {
            slug: menuItem.options.initGroupSlug
          }
        }).pipe(
          map(group => (<{
            childGroups: {
              slug: string;
            }[];
          }[]>group.groups)[0].childGroups.map(child => child.slug)
          ),
          shareReplay(1)
        );
    }),
    shareReplay(1)
  )

  orderLoader$ = new BehaviorSubject<string | undefined | null>(null);

  order$ = this.orderLoader$.asObservable().pipe(
    filter((value): value is string | undefined => value !== null),
    distinctUntilChanged(),
    switchMap(
      orderId => {
        return this.getOrder$(orderId)
      }
    ),
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
                  orderDish.dish = dishes?.find(dish => orderDish.dishId === dish.id)!
                };
              });
            return order;
          }),
        shareReplay(1)
      )),
    shareReplay(1)
  );

  private dishes$ = new BehaviorSubject<Dish[] | null>(null);

  private loadedMenu$ = this.rootGroupsSlugs$.pipe(
    switchMap(
      slugs => {
        const nesting = this.config.nesting ?? 2;
        const queryObject: ValuesOrBoolean<Group> = new Array(nesting).fill(nesting).reduce(
          (accumulator: ValuesOrBoolean<Group>) => {
            const item = { ...GroupFragments.vOb };
            item.childGroups = accumulator;
            return item;
          }, { ...GroupFragments.vOb, childGroups: { ...GroupFragments.vOb } }
        );
        return this.queryAndSubscribe<Group, 'groups', 'group', VCriteria>('groups', 'group', queryObject, 'id', {
          criteria: {
            slug: slugs
          }
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
              [key: string]: Group
            }>(
              (accumulator, current) => {
                if (!current.childGroups) {
                  current.childGroups = [];
                };
                if (!current.dishes) {
                  current.dishes = []
                };
                accumulator[current.id] = current;
                return accumulator;
              }, {}
            );
            const groupIdsBySlug: {
              [key: string]: string
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
        )
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
      shareReplay()
    )
  }

  getDishes$(): Observable<Dish[]> {
    return this.dishes$.asObservable().pipe(
      filter((data): data is Dish[] => !!data)
    );
  }

  getOrder$(orderId: string | undefined): Observable<Order> {
    return this.queryAndSubscribe<Order, 'order', 'order', { orderId: string } | undefined>('order', 'order', OrderGql.vOb, 'id', orderId ? {
      orderId
    } : undefined).pipe(
      map(values => values[0])
    );
  }

  getOrderAsCart$(orderId: string | undefined): Observable<Order> {
    this.orderLoader$.next(orderId);
    return this.order$;
  }

  getPhone$(phone: string): Observable<Phone> {
    return this.apollo.watchQuery<any>({
      query: OrderGql.queries.getPhone(phone, this.customFields),
      fetchPolicy: 'no-cache'
    })
      .valueChanges
      .pipe(
        map(
          ({ data }) => data.phone
        )
      );
  }

  checkPhone$(phone: string): Observable<CheckPhoneResponse> {
    return this.apollo.watchQuery<any>({
      query: OrderGql.queries.checkPhone(phone, this.customFields),
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      map(
        ({ data }) => data.checkPhone
      )
    );
  }

  getPaymentMethods$(orderId: string): Observable<PaymentMethod[]> {
    return this.apollo.watchQuery<any>({
      query: PaymentMethodGql.queries.getPaymentMethod(orderId, this.customFields)
    }).valueChanges.pipe(
      map(
        ({ data }) => data.paymentMethods
      )
    );
  }

  addDishToOrder$(data: AddToOrderInput): Observable<Order> {
    return this.apollo.mutate<{
      orderAddDish: Order
    }>({
      mutation: OrderGql.mutations.addDishToOrder(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const order: Order = data!.orderAddDish;
          return order;
        })
      )
  }

  sendOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.apollo.mutate<{
      sendOrder: CheckResponse
    }>({
      mutation: OrderGql.mutations.sendOrder(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkResponse: CheckResponse = data!.sendOrder;
          return checkResponse;
        })
      )
  }

  checkOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.apollo.mutate<{
      checkOrder: CheckResponse
    }>({
      mutation: OrderGql.mutations.checkOrder(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkResponse: CheckResponse = data!['checkOrder'];
          return checkResponse;
        })
      )
  }

  checkPhoneCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse> {
    return this.apollo.mutate<{
      setPhoneCode: CheckPhoneResponse
    }>({
      mutation: OrderGql.mutations.checkPhoneCode(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkPhoneResponse: CheckPhoneResponse = data!['setPhoneCode'];
          return checkPhoneResponse;
        })
      )
  }

  removeDishFromOrder$(data: RemoveFromOrderInput): Observable<Order> {
    return this.apollo.mutate<{
      orderRemoveDish: Order
    }>({
      mutation: OrderGql.mutations.removeDishFromOrder(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const order: Order = data!['orderRemoveDish'];
          return order;
        })
      )
  }

  setDishAmount$(data: SetDishAmountInput): Observable<Order> {
    return this.apollo.mutate<{
      orderSetDishAmount: Order
    }>({
      mutation: OrderGql.mutations.setDishAmount(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const order: Order = data!['orderSetDishAmount'];
          return order;
        })
      )
  }

  setDishComment$(data: SetDishCommentInput): Observable<Order> {
    return this.apollo.mutate<{
      orderSetDishComment: Order
    }>({
      mutation: OrderGql.mutations.setDishComment(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const order: Order = data!['orderSetDishComment'];
          return order;
        })
      )
  }

  customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V): Observable<Record<N, T | T[]>>
  customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V): Observable<Record<N, T | T[]>>
  customQuery$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V): Observable<Record<N, T | T[]>> {
    return this.apollo.watchQuery<Record<N, T | T[]>, V>({
      query: gql`query ${generateQueryString({
        name,
        queryObject: name in queryObject ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject,
        variables,
      })}`,
      variables,
    }).valueChanges
      .pipe(
        map(
          res => res.error || res.errors ? null : res.data),
        filter((data): data is Record<N, T | T[]> => !!data)
      );
  }

  customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables: V): Observable<Record<N, T>>
  customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables: V): Observable<Record<N, T>>
  customMutation$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables: V): Observable<Record<N, T>> {
    return this.apollo.mutate<Record<N, T>, V>({
      mutation: gql`mutation ${generateQueryString({
        name,
        queryObject: name in queryObject ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject,
        variables,
      })}`,
      variables
    }).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res)
    );
  }

  customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>
  customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>
  customSubscribe$<T, N extends `${string}`, V = unknown>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]> {
    return this.apollo.subscribe<Record<N, T>, V>({
      query: gql`subscription ${generateQueryString({
        name,
        queryObject: name in queryObject ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject,
        variables
      })}`,
      variables
    }, extra).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res),
      map(res => res[name])
    );
  }

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
                  <T[]>[store]
            }),
          shareReplay(1)
        )
      ),
      shareReplay(1)
    );
  }

}


