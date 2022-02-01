import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import type { ExtraSubscriptionOptions } from 'apollo-angular/types';
import { BehaviorSubject } from 'rxjs';
import { filter, take, map, switchMap, shareReplay, startWith } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import type { Group, Dish, Order, Phone, CheckPhoneResponse, PaymentMethod, CheckResponse, Navigation, AddToOrderInput, OrderInput, CheckPhoneCodeInput, RemoveFromOrderInput, SetDishAmountInput, SetDishCommentInput, OrderData } from './models';
import { OrderGql, GroupGql, DishGql, PaymentMethodGql, isValue } from './models';
import { ApolloService } from './services/apollo.service';

type FieldTypes = Object | number | bigint | Symbol | string | boolean;
type ValueOrBoolean<T> = {
  [K in keyof T]: ValueOrBoolean<T[K]>
} | boolean;

export type ValuesOrBoolean<T> = {
  [K in keyof T]: ValueOrBoolean<T[K]>
};

export function generateQueryString<T, N extends `${string}`, V>(name: N, queryObject: T, variables: V) {
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
          entry => typeof entry[1] === 'object' && entry[1] !== undefined && entry[1] !== null ? makeFieldList(
            Array.isArray(entry[1]) && entry[1][0] ? entry[1][0] : entry[1], entry[0], indent + 1
          ) : String(entry[0])
        ).join(
          `,\n  ${indentString}`
        )
      }\n${indentString}}`
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

  menuLoading: boolean | undefined;
  dishesLoading: boolean | undefined;

  private order$: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(null);
  orderLoading: boolean | undefined;
  navigationDataLoading: boolean | undefined;
  paymentMethodLoading: boolean | undefined;
  getPhoneLoading: boolean | undefined;
  checkPhoneLoading: boolean | undefined;

  customFields: { [key: string]: string[] } = {};

  constructor(private apollo: ApolloService) { }

  addCustomField(modelName: string, field: string) {
    if (!this.customFields[modelName]) {
      this.customFields[modelName] = [];
    }
    if (this.customFields[modelName].indexOf(field) == -1) {
      this.customFields[modelName].push(field);
    }
  }

  private _navigationData$: Observable<Navigation[]> = this.queryAndSubscribe<Navigation, 'navigations', 'navigation', unknown>(
    'navigations', 'navigation', {
    mnemonicId: true,
    description: true,
    options: true,
    id: true,
    navigation_menu: true
  }, 'mnemonicId'
  );

  getNavigation$(): Observable<Navigation[]> {
    return this._navigationData$;
  }

  getMenu$(slug: string | string[] | undefined): Observable<Group[] | null> {
    return this.apollo.watchQuery<{
      groups: Group[],
      dishes: Dish[]
    }>({
      query: GroupGql.queries.getGroupsAndDishes(this.customFields)
    }).valueChanges.pipe(
      map(({ data, loading }) => {
        this.menuLoading = loading;
        const { groups, dishes } = data;
        // Groups indexing
        const groupsById = groups.reduce<{
          [key: string]: Group
        }>(
          (accumulator, current) => {
            accumulator[current.id] = {
              ...current,
              dishes: [],
              childGroups: []
            }
            return accumulator;
          }, {}
        );
        const groupIdsBySlug: {
          [key: string]: string
        } = {};

        // Inserting dishes by groups
        for (let dish of dishes) {
          //const { groupId } = dish;
          const groupId = dish.parentGroup?.id;
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
          try {
            group.dishes?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          } catch (e) {
            console.warn(`Group ${groupId} sort error`, e);
          }

          const parentGroupId = group.parentGroup?.id;
          groupIdsBySlug[group.slug!] = groupId;
          if (!parentGroupId) continue;
          if (!groupsById[parentGroupId]) continue;
          groupsById[parentGroupId].childGroups.push(group);
          //delete groupsById[groupId];
        }

        if (slug) {
          switch (typeof slug) {
            case 'string':
              if (!groupIdsBySlug[slug]) {
                return [];
              } else {
                return groupsById[groupIdsBySlug[slug]].childGroups.sort(
                  (g1: Group, g2: Group) => g1.order - g2.order
                );
              };
            default:
              if (!slug.length) {
                return [];
              } else {
                return slug.map(s => groupsById[groupIdsBySlug[s]]);
              };
          }
        } else {
          return Object.values(groupsById).sort((g1: Group, g2: Group) => g1.order - g2.order) as Group[];
        }
      }),
      shareReplay()
    )
  }

  getDishes$(): Observable<Dish[]> {
    return this.apollo.watchQuery<{
      dishes: Dish[]
    }>({
      query: DishGql.queries.getDishes(this.customFields)
    }).valueChanges.pipe(
      map(({ data, loading }) => {
        this.dishesLoading = loading;
        return data.dishes;
      }),
      shareReplay(1)
    );
  }

  getOrder$(orderId: string): Observable<OrderData> {
    return this.apollo.watchQuery<{ getOrder: OrderData }>({
      query: OrderGql.queries.getOrder(orderId, this.customFields)
    }).valueChanges.pipe(
      take(1),
      map(({ data }) => data.getOrder),
      shareReplay(1)
    )
  }

  getOrderAsCart$(orderId: string | undefined): Observable<Order> {
    return this.apollo.watchQuery<{ order: Order }>({
      query: OrderGql.queries.getOrderAsCart(orderId, this.customFields),
      canonizeResults: true,
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      switchMap(({ data, loading }) => {
        this.orderLoading = loading;
        this.order$.next(data.order);
        return this.order$.asObservable();
      }),
      filter(
        (order): order is Order => !!order
      ),
      shareReplay(1)
    );
  }

  getPhone$(phone: string): Observable<Phone> {
    return this.apollo.watchQuery<any>({
      query: OrderGql.queries.getPhone(phone, this.customFields),
      fetchPolicy: 'no-cache'
    })
      .valueChanges
      .pipe(
        map(({ data, loading }) => {
          this.getPhoneLoading = loading;
          return data.phone
        })
      );
  }

  checkPhone$(phone: string): Observable<CheckPhoneResponse> {
    return this.apollo.watchQuery<any>({
      query: OrderGql.queries.checkPhone(phone, this.customFields),
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      map(({ data, loading }) => {
        this.checkPhoneLoading = loading;
        return data.checkPhone
      })
    );
  }

  getPaymentMethods$(orderId: string): Observable<PaymentMethod[]> {
    return this.apollo.watchQuery<any>({
      query: PaymentMethodGql.queries.getPaymentMethod(orderId, this.customFields)
    }).valueChanges.pipe(
      map(({ data, loading }) => {
        this.paymentMethodLoading = loading;
        return data.paymentMethods
      })
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
          if (order) {
            this.order$.next(order);
          };
          return order;
        })
      )
  }

  orderOrder$(data: OrderInput): Observable<CheckResponse> {
    return this.apollo.mutate<{
      orderOrder: CheckResponse
    }>({
      mutation: OrderGql.mutations.orderOrder(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkResponse: CheckResponse = data!.orderOrder;
          this.order$.next(checkResponse.order);
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
          this.order$.next(checkResponse.order);
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
          this.order$.next(order);
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
          this.order$.next(order);
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
          this.order$.next(order);
          return order;
        })
      )
  }

  customQuery$<T, N extends `${string}`, V = Object>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V): Observable<Record<N, T | T[]>>
  customQuery$<T, N extends `${string}`, V = Object>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V): Observable<Record<N, T | T[]>>
  customQuery$<T, N extends `${string}`, V = Object>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V): Observable<Record<N, T | T[]>> {
    return this.apollo.watchQuery<Record<N, T | T[]>, V>({
      query: gql`query ${generateQueryString(name, name in queryObject ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject, variables)}`,
      variables,
    }).valueChanges
      .pipe(
        map(
          res => res.error || res.errors ? null : res.data),
        filter((data): data is Record<N, T | T[]> => !!data)
      );
  }

  customMutation$<T, N extends `${string}`, V>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables: V): Observable<Record<N, T>>
  customMutation$<T, N extends `${string}`, V>(name: N, queryObject: ValuesOrBoolean<T>, variables: V): Observable<Record<N, T>>
  customMutation$<T, N extends `${string}`, V>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables: V): Observable<Record<N, T>> {
    return this.apollo.mutate<Record<N, T>, V>({
      mutation: gql`mutation ${generateQueryString(name, name in queryObject ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject, variables)}`,
      variables
    }).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res)
    );
  }

  customSubscribe$<T, N extends `${string}`, V = Object>(name: N, queryObject: Record<N, ValuesOrBoolean<T>>, variables?: V, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>
  customSubscribe$<T, N extends `${string}`, V = Object>(name: N, queryObject: ValuesOrBoolean<T>, variables?: V, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]>
  customSubscribe$<T, N extends `${string}`, V = Object>(name: N, queryObject: Record<N, ValuesOrBoolean<T>> | ValuesOrBoolean<T>, variables?: V, extra?: ExtraSubscriptionOptions): Observable<Record<N, T>[N]> {
    return this.apollo.subscribe<Record<N, T>, V>({
      query: gql`subscription ${generateQueryString(name, name in queryObject ? (<Record<N, ValuesOrBoolean<T>>>queryObject)[name] : queryObject, variables)}`,
      variables
    }, extra).pipe(
      map(result => result.data),
      filter((res): res is Record<N, T> => !!res),
      map(res => res[name])
    );
  }

  queryAndSubscribe<T, NQuery extends `${string}`, NSubscribe extends `${string}`, V>(nameQuery: NQuery, nameSubscribe: NSubscribe, queryObject: ValuesOrBoolean<T>, uniqueKeyForCompareItem: keyof T, variables?: V) {

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
            updatedValue => isValue(updatedValue) ?
              updateFn(result[nameQuery], Object.assign({}, updatedValue)) :
              Array.isArray(result[nameQuery]) ?
                [... <T[]>result[nameQuery]] :
                <T[]>[result[nameQuery]]
          ),
          shareReplay(1)
        )
      ),
      shareReplay(1)
    );
  }

}


