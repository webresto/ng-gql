import { Injectable } from '@angular/core';
import type { FetchResult, SubscriptionOptions } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import type { EmptyObject, ExtraSubscriptionOptions } from 'apollo-angular/types';
import { BehaviorSubject } from 'rxjs';
import { filter, take, map, switchMap, shareReplay } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import { Group, Dish, Cart, Order, Phone, CheckPhoneResponse, PaymentMethod, CheckResponse, Navigation, NavigationGql, DishGql, PaymentMethodGql } from './models';
import { CartGql, GroupGql, AddToCartInput, OrderCartInput, CheckPhoneCodeInput, RemoveFromCartInput, SetDishAmountInput, SetDishCommentInput } from './models';

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

  constructor(private apollo: Apollo) { }

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

  customQuery$<T, N extends string = `${string}`>(name: N, queryObject: Record<N, Record<Extract<T, keyof T>, boolean>>, variables: any = {}): Observable<Record<N, T | T[]>> {
    let queryArgumentsStrings: string[] = [];
    for (let key in variables) {
      let valueString = variables[key];
      switch (typeof valueString) {
        case 'object':
          valueString = JSON.stringify(valueString).replace(/\{"([^"]+)"\:/gi, '{$1:')
          break;
        case 'string':
          valueString = `"${valueString}"`;
          break;
      };
      queryArgumentsStrings.push(`${key}: ${valueString}`);
    };
    let queryArgumentsString = queryArgumentsStrings.length
      ? `(${queryArgumentsStrings.join(', ')})`
      : ``;
    let query = JSON.stringify(queryObject)
      .replace(/"/g, '')
      .replace(/\:[a-z0-9]+/gi, '')
      .replace(/\:/g, '');
    if (queryArgumentsString) {
      const queriesKeys = Object.keys(queryObject);
      const countOfQueries = queriesKeys.length;
      if (countOfQueries == 1) {
        query = query.replace(new RegExp('(\{.*)' + queriesKeys[0]), '$1' + queriesKeys[0] + queryArgumentsString);
      }
    };

    return this.apollo.watchQuery<Record<N, T | T[]>, boolean>({
      query: gql`query ${name}${query}`,
      canonizeResults: true
    }).valueChanges
      .pipe(
        map(
          res => res.error || res.errors ? null : res.data),
        filter((data): data is Record<N, T | T[]> => !!data)
      );
  }

  customMutation$<T, N extends string = `${string}`>(name: N, queryObject: Record<N, Record<Extract<T, keyof T>, boolean>>, variables: T): Observable<FetchResult<T>>
  customMutation$<T extends any>(name: string, queryObject: any, variables: any | undefined): Observable<FetchResult<T>>
  customMutation$<T extends any>(name: string, queryObject: any, variables: T): Observable<FetchResult<T>> {
    let mutationArgumentsStrings: string[] = [];
    for (let key in variables) {
      let valueString: string = typeof variables[key] == 'string' ?
        `"${variables[key]}"` :
        JSON.stringify(variables[key]).replace(/\{"([^"]+)"\:/gi, '{$1:');
      mutationArgumentsStrings.push(`${key}: ${valueString}`);
    }
    let mutationArgumentsString = mutationArgumentsStrings.length !== 0
      ? `(${mutationArgumentsStrings.join(', ')})`
      : ``;
    let query = JSON.stringify(queryObject)
      .replace(/"/g, '')
      .replace(/\:[a-z0-9]+/gi, '')
      .replace(/\:/g, '');
    if (mutationArgumentsString) {
      const queriesKeys = Object.keys(queryObject);
      const countOfQueries = queriesKeys.length;
      if (countOfQueries == 1) {
        query = query.replace(new RegExp('(\{.*)' + queriesKeys[0]), '$1' + queriesKeys[0] + mutationArgumentsString);
      }
    }
    return this.apollo.mutate<T>({
      mutation: gql`mutation ${name}${query}`,
      awaitRefetchQueries: true
    });
  }

  customSubscribe$<T, V = EmptyObject>(options: SubscriptionOptions<V, T>, extra?: ExtraSubscriptionOptions): Observable<FetchResult<T>> {
    return this.apollo.subscribe<T, V>(options, extra);
  }



}
