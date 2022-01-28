import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import type { ExtraSubscriptionOptions } from 'apollo-angular/types';
import { BehaviorSubject } from 'rxjs';
import { filter, take, map, switchMap, shareReplay, startWith } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import type { Group, Dish, Cart, Order, Phone, CheckPhoneResponse, PaymentMethod, CheckResponse, Navigation, AddToCartInput, OrderCartInput, CheckPhoneCodeInput, RemoveFromCartInput, SetDishAmountInput, SetDishCommentInput } from './models';
import { CartGql, GroupGql, NavigationGql, DishGql, PaymentMethodGql, isValue } from './models';
import { ApolloService } from './services/apollo.service';

type FieldTypes = Object | number | bigint | Symbol | string | boolean;

export type ValueOrBoolean<T> = {
  [K in keyof T]: ValueOrBoolean<T[K]>
} | boolean;

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
      default: throw new Error('Параметр должен принадлежать типам number, string или boolean');
    }
  };
  return `${name[0].toUpperCase() + name.slice(1)} ${variables ? `(${(<(keyof V)[]>Object.keys(variables)).map(
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

  private cart$: BehaviorSubject<Cart | null> = new BehaviorSubject<Cart | null>(null);
  cartLoading: boolean | undefined;
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

  getNavigation$(): Observable<Navigation[]> {
    return this.apollo.watchQuery<{ navigations: Navigation[] }>({
      query: NavigationGql.queries.getNavigationes(this.customFields)
    }).valueChanges.pipe(
      map(
        ({ data, loading }) => {
          this.menuLoading = loading;
          return data.navigations;
        }),
      shareReplay(1)
    );
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

  getOrder$(orderId: string): Observable<Order> {
    return this.apollo.watchQuery<{ getOrder: Order }>({
      query: CartGql.queries.getOrder(orderId, this.customFields)
    }).valueChanges.pipe(
      take(1),
      map(({ data }) => data.getOrder),
      shareReplay(1)
    )
  }

  getCart$(cartId: string | undefined): Observable<Cart> {
    return this.apollo.watchQuery<{ cart: Cart }>({
      query: CartGql.queries.getCart(cartId, this.customFields),
      canonizeResults: true,
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      switchMap(({ data, loading }) => {
        this.cartLoading = loading;
        this.cart$.next(data.cart);
        return this.cart$.asObservable();
      }),
      filter(
        (cart): cart is Cart => !!cart
      ),
      shareReplay(1)
    );
  }

  getPhone$(phone: string): Observable<Phone> {
    return this.apollo.watchQuery<any>({
      query: CartGql.queries.getPhone(phone, this.customFields),
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
      query: CartGql.queries.checkPhone(phone, this.customFields),
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      map(({ data, loading }) => {
        this.checkPhoneLoading = loading;
        return data.checkPhone
      })
    );
  }

  getPaymentMethods$(cartId: string): Observable<PaymentMethod[]> {
    return this.apollo.watchQuery<any>({
      query: PaymentMethodGql.queries.getPaymentMethod(cartId, this.customFields)
    }).valueChanges.pipe(
      map(({ data, loading }) => {
        this.paymentMethodLoading = loading;
        return data.paymentMethods
      })
    );
  }

  addDishToCart$(data: AddToCartInput): Observable<Cart> {
    return this.apollo.mutate<{
      cartAddDish: Cart
    }>({
      mutation: CartGql.mutations.addDishToCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data!.cartAddDish;
          if (cart) {
            this.cart$.next(cart);
          };
          return cart;
        })
      )
  }

  orderCart$(data: OrderCartInput): Observable<CheckResponse> {
    return this.apollo.mutate<{
      orderCart: CheckResponse
    }>({
      mutation: CartGql.mutations.orderCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkResponse: CheckResponse = data!.orderCart;
          this.cart$.next(checkResponse.cart);
          return checkResponse;
        })
      )
  }

  checkCart$(data: OrderCartInput): Observable<CheckResponse> {
    return this.apollo.mutate<{
      checkCart: CheckResponse
    }>({
      mutation: CartGql.mutations.checkCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkResponse: CheckResponse = data!['checkCart'];
          this.cart$.next(checkResponse.cart);
          return checkResponse;
        })
      )
  }

  checkPhoneCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse> {
    return this.apollo.mutate<{
      setPhoneCode: CheckPhoneResponse
    }>({
      mutation: CartGql.mutations.checkPhoneCode(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkPhoneResponse: CheckPhoneResponse = data!['setPhoneCode'];
          return checkPhoneResponse;
        })
      )
  }

  removeDishFromCart$(data: RemoveFromCartInput): Observable<Cart> {
    return this.apollo.mutate<{
      cartRemoveDish: Cart
    }>({
      mutation: CartGql.mutations.removeDishFromCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data!['cartRemoveDish'];
          this.cart$.next(cart);
          return cart;
        })
      )
  }

  setDishAmount$(data: SetDishAmountInput): Observable<Cart> {
    return this.apollo.mutate<{
      cartSetDishAmount: Cart
    }>({
      mutation: CartGql.mutations.setDishAmount(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data!['cartSetDishAmount'];
          this.cart$.next(cart);
          return cart;
        })
      )
  }

  setDishComment$(data: SetDishCommentInput): Observable<Cart> {
    return this.apollo.mutate<{
      cartSetDishComment: Cart
    }>({
      mutation: CartGql.mutations.setDishComment(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data!['cartSetDishComment'];
          this.cart$.next(cart);
          return cart;
        })
      )
  }

  customQuery$<T, N extends `${string}`, V = Object>(
    name: N, queryObject: Record<N, ValueOrBoolean<T>>, variables?: V): Observable<Record<N, T | T[]>>
  customQuery$<T, N extends `${string}`, V = Object>(
    name: N, queryObject: T, variables?: V): Observable<Record<N, T | T[]>>
  customQuery$<T, N extends `${string}`, V = Object>(
    name: N, queryObject: Record<N, ValueOrBoolean<T>> | T, variables?: V): Observable<Record<N, T | T[]>> {
    return this.apollo.watchQuery<Record<N, T | T[]>, V>({
      query: gql`query ${generateQueryString(name, name in queryObject ? (<Record<N, ValueOrBoolean<T>>>queryObject)[name] : queryObject, variables)}`,
      variables,
    }).valueChanges
      .pipe(
        map(
          res => res.error || res.errors ? null : res.data),
        filter((data): data is Record<N, T | T[]> => !!data)
      );
  }

  customMutation$<T, N extends `${string}`, V>(name: N, queryObject: T, variables: V) {
    return this.apollo.mutate<Record<N, T>, V>({
      mutation: gql`mutation ${generateQueryString(name, queryObject, variables)}`,
      variables
    });
  }

  customSubscribe$<T, N extends `${string}`, V = Object>(
    name: N, queryObject: Record<N, ValueOrBoolean<T>>, variables?: V, extra?: ExtraSubscriptionOptions): Observable<NonNullable<Record<N, T>>[N]>
  customSubscribe$<T, N extends `${string}`, V = Object>(
    name: N, queryObject: T, variables?: V, extra?: ExtraSubscriptionOptions): Observable<NonNullable<Record<N, T>>[N]>
  customSubscribe$<T, N extends `${string}`, V = Object>(
    name: N, queryObject: Record<N, ValueOrBoolean<T>> | T, variables?: V, extra?: ExtraSubscriptionOptions): Observable<NonNullable<Record<N, T>>[N]> {
    return this.apollo.subscribe<Record<N, T>, V>({
      query: gql`subscription ${generateQueryString(name, name in queryObject ? (<Record<N, ValueOrBoolean<T>>>queryObject)[name] : queryObject, variables)}`,
      variables
    }, extra).pipe(
      map(result => result.data![name])
    );
  }

  queryAndSubscribe<T, N extends `${string}`, V>(
    name: N, queryObject: Record<N, {
      [K in keyof T]: ValueOrBoolean<T[K]>;
    }>, updateFn: (store: T | T[], subscribeValue: T) => T[], variables?: V) {

    return this.customQuery$<T, N, V>(name, queryObject, variables).pipe(
      switchMap(
        result => this.customSubscribe$(name, queryObject, variables).pipe(
          startWith(null),
          map(
            updatedValue => isValue(updatedValue) ?
              updateFn(result[name], Object.assign({}, updatedValue)) :
              result[name]
          ),
          shareReplay(1)
        )
      ),
      shareReplay(1)
    );
  }

}


