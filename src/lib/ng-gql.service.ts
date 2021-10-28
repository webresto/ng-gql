import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, filter, take, map, catchError, switchMap } from 'rxjs/operators';
import { Cart } from './cart/cart';
import { CartGql, AddToCartInput, RemoveFromCartInput, OrderCartInput, CheckPhoneCodeInput, SetDishAmountInput, SetDishCommentInput } from './cart/cart.gql';
import { CheckPhoneResponse } from './cart/check-phone-response';
import { CheckResponse } from './cart/check-response';
import { Order } from './cart/order';
import { Phone } from './cart/phone';
import { Dish } from './dish/dish';
import { DishGql } from './dish/dish.gql';
import { Group } from './group/group';
import { GroupGql } from './group/group.gql';
import { Navigation } from './navigation/navigation';
import { NavigationGql } from './navigation/navigation.gql';
import { PaymentMethod } from './payment-method/payment-method';
import { PaymentMethodGql } from './payment-method/payment-method.gql';

export type NavigationData = {
  [key: string]: Navigation
};

@Injectable({
  providedIn: 'root'
})
export class NgGqlService {

  menu$: BehaviorSubject<Group[]> = new BehaviorSubject(null);
  menuLoading: boolean;

  dishes$: BehaviorSubject<Dish[]> = new BehaviorSubject(null);
  dishesLoading: boolean;

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(null);
  cartLoading: boolean;

  navigationData$: BehaviorSubject<NavigationData> = new BehaviorSubject(null);
  navigationDataLoading: boolean;

  paymentMethodLoading: boolean;
  getPhoneLoading: boolean;
  checkPhoneLoading: boolean;

  customQueryiesDataByName: { [key: string]: BehaviorSubject<any> } = {};
  customQueriesDataLoadingByName: { [key: string]: boolean } = {};

  customFields: {[key: string]: string[]} = {};

  constructor(private apollo: Apollo) {
    this.cart$.subscribe(res => console.log('control cart res', res));
  } 

  addCustomField(modelName: string, field: string) {
    if(!this.customFields[modelName]) {
      this.customFields[modelName] = [];
    }
    if (this.customFields[modelName].indexOf(field) == -1) {
      this.customFields[modelName].push(field);
    }
  }

  getNavigation$(): BehaviorSubject<NavigationData> {
    if (!this.navigationData$.getValue() && !this.navigationDataLoading) {
      this.apollo.watchQuery<any>({
        query: NavigationGql.queries.getNavigationes(this.customFields)
      })
        .valueChanges
        .pipe(
          tap(({ data, loading }) => {
            this.menuLoading = loading;
            const navigationData: NavigationData = {};
            for (let navigation of data.navigation) {
              navigationData[navigation.name] = navigation;
            }
            this.navigationData$.next(navigationData);
          })
        )
        .subscribe();
    }
    return this.navigationData$;
  }

  getMenu$(slug: string | string[] = null): BehaviorSubject<Group[]> {
    if (!this.menuLoading) {
      this.apollo.watchQuery<any>({
        query: GroupGql.queries.getGroupsAndDishes(this.customFields)
      })
        .valueChanges
        .pipe(
          tap(({ data, loading }) => {
            this.menuLoading = loading;
            const { groups, dishes } = data;
            const groupsById = {};
            const groupIdsBySlug = {};
            // Groups indexing
            for (let group of groups) {
              groupsById[group.id] = {
                ...group,
                dishes: [],
                childGroups: []
              };
            }
            // Inserting dishes by groups
            for (let dish of dishes) {
              //const { groupId } = dish;
              const groupId = dish.parentGroup?.id;
              if (!groupId) continue;
              if (!groupsById[groupId]) continue;
              groupsById[groupId].dishes.push(dish);
            }
            // Create groups hierarchy
            for (let groupId in groupsById) {
              const group = groupsById[groupId];
              
              try {
                group.dishes.sort((a, b) => a.order - b.order);
              }catch(e) {
                console.warn(`Group ${groupId} sort error`, e);
              }
              
              const parentGroupId = group.parentGroup?.id;
              groupIdsBySlug[group.slug] = groupId;
              if (!parentGroupId) continue;
              if (!groupsById[parentGroupId]) continue;
              groupsById[parentGroupId].childGroups.push(group);
              //delete groupsById[groupId];
            }

            if (slug) {
              switch (typeof slug) {
                case 'string':
                  if (!groupIdsBySlug[slug]) {
                    this.menu$.next([]);
                    return;
                  }
                  this.menu$.next(groupsById[groupIdsBySlug[slug]].childGroups.sort((g1: Group, g2: Group) => g1.order - g2.order));
                  break;
                case 'object':
                  if(!slug.length) {
                    this.menu$.next([]);
                    return;
                  }
                  this.menu$.next(slug.map(s => groupsById[groupIdsBySlug[s]]))
                  break;
              }              
              return;
            }

            const groupsAndDishes: Group[] = Object.values(groupsById).sort((g1: Group, g2: Group) => g1.order - g2.order) as Group[];
            this.menu$.next(groupsAndDishes);
          })
        )
        .subscribe();
    }
    return this.menu$;
  }

  getDishes$(): BehaviorSubject<Dish[]> {
    if (!this.dishes$.getValue() && !this.dishesLoading) {
      this.apollo.watchQuery<any>({
        query: DishGql.queries.getDishes(this.customFields)
      })
        .valueChanges
        .pipe(
          tap(({ data, loading }) => {
            this.dishesLoading = loading;
            this.dishes$.next(data.dishes);
          })
        )
        .subscribe();
    }
    return this.dishes$;
  }

  getOrder$(orderId: string = null): Observable<Order> {
    return this.apollo.watchQuery<any>({
      query: CartGql.queries.getOrder(orderId, this.customFields)
    })
      .valueChanges
      .pipe(
        take(1),
        map(({ data }) => data.getOrder)
      )
  }

  getCart$(cartId: string = null): BehaviorSubject<Cart> {
    const lastCart = this.cart$.getValue();
    if (!(lastCart && lastCart.id == cartId) && !this.cartLoading) {
      this.apollo.watchQuery<any>({
        query: CartGql.queries.getCart(cartId, this.customFields),
        fetchPolicy: 'no-cache'
      })
        .valueChanges
        .pipe(
          take(1),
          tap(({ data, loading }) => {
            this.cartLoading = loading;
            this.cart$.next(data.cart);
          })
        )
        .subscribe();
    }
    return this.cart$;
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
    })
      .valueChanges
      .pipe(
        map(({ data, loading }) => {
          this.checkPhoneLoading = loading;
          return data.checkPhone
        })
      );
  }

  getPaymentMethods$(cartId: string): Observable<PaymentMethod[]> {
    return this.apollo.watchQuery<any>({
      query: PaymentMethodGql.queries.getPaymentMethod(cartId, this.customFields)
    })
      .valueChanges
      .pipe(
        map(({ data, loading }) => {
          this.paymentMethodLoading = loading;
          return data.paymentMethods
        })
      );
  }

  addDishToCart$(data: AddToCartInput): Observable<Cart> {
    return this.apollo.mutate({
      mutation: CartGql.mutations.addDishToCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data['cartAddDish'];
          this.cart$.next(cart);
          return cart;
        })
      )
  }

  orderCart$(data: OrderCartInput): Observable<CheckResponse> {
    return this.apollo.mutate({
      mutation: CartGql.mutations.orderCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkResponse: CheckResponse = data['orderCart'];
          this.cart$.next(checkResponse.cart);
          return checkResponse;
        })
      )
  }

  checkCart$(data: OrderCartInput): Observable<CheckResponse> {
    return this.apollo.mutate({
      mutation: CartGql.mutations.checkCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkResponse: CheckResponse = data['checkCart'];
          this.cart$.next(checkResponse.cart);
          return checkResponse;
        })
      )
  }

  checkPhoneCode$(data: CheckPhoneCodeInput): Observable<CheckPhoneResponse> {
    return this.apollo.mutate({
      mutation: CartGql.mutations.checkPhoneCode(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const checkPhoneResponse: CheckPhoneResponse = data['setPhoneCode'];
          return checkPhoneResponse;
        })
      )
  }

  removeDishFromCart$(data: RemoveFromCartInput): Observable<Cart> {
    return this.apollo.mutate({
      mutation: CartGql.mutations.removeDishFromCart(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data['cartRemoveDish'];
          this.cart$.next(cart);
          return cart;
        })
      )
  }

  setDishAmount$(data: SetDishAmountInput): Observable<Cart> {
    return this.apollo.mutate({
      mutation: CartGql.mutations.setDishAmount(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data['cartSetDishAmount'];
          this.cart$.next(cart);
          return cart;
        })
      )
  }

  setDishComment$(data: SetDishCommentInput): Observable<Cart> {
    return this.apollo.mutate({
      mutation: CartGql.mutations.setDishComment(this.customFields),
      variables: data
    })
      .pipe(
        map(({ data }) => {
          const cart: Cart = data['cartSetDishComment'];
          this.cart$.next(cart);
          return cart;
        })
      )
  }

  customQuery$<T = any>(name: string, queryObject: any, variables: any = {}): Observable<T> {
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
      }
      queryArgumentsStrings.push(`${key}: ${valueString}`);
    }
    let queryArgumentsString = queryArgumentsStrings.length
      ? `(${queryArgumentsStrings.join(', ')})`
      : ``;
    const queryKey = (name + queryArgumentsString).replace(/[^a-z0-9]/gi, '');
    let query = JSON.stringify(queryObject)
      .replace(/"/g, '')
      .replace(/\:[a-z0-9]+/gi, '')
      .replace(/\:/g, '');
    if(queryArgumentsString) {
      const queriesKeys = Object.keys(queryObject);
      const countOfQueries = queriesKeys.length;
      if (countOfQueries == 1) {
        query = query.replace(new RegExp('(\{.*)' + queriesKeys[0]), '$1' + queriesKeys[0] + queryArgumentsString);
      }
    }

    if (!this.customQueryiesDataByName[queryKey]) {
      this.customQueryiesDataByName[queryKey] = new BehaviorSubject(null);
      this.customQueriesDataLoadingByName[queryKey] = false;
    }
    if (!this.customQueryiesDataByName[queryKey].getValue() && !this.customQueriesDataLoadingByName[queryKey]) {
      this.apollo.watchQuery<T, boolean>({ 
        query: gql`query ${name}${query}`,
        fetchPolicy: 'no-cache'
       })
        .valueChanges
        .pipe(
          tap(({ data, loading }) => {
            this.customQueriesDataLoadingByName[queryKey] = loading;
            this.customQueryiesDataByName[queryKey].next(data);
          }),
          catchError(error => {
            
            this.customQueryiesDataByName[queryKey].next({
              error: error
            });
            return of(null);
          })
        )
        .subscribe();
    }
    return this.customQueryiesDataByName[queryKey].pipe(
      switchMap((data) => {
        if(data && data.error) {
          return throwError(data.error);
        }
        return of(data);
      }),
      filter(data => !!data)
    );
  }

  customMutation$<T = any>(name: string, queryObject: any, variables = {}): Observable<FetchResult<T>> {
    let mutationArgumentsStrings: string[] = [];
    for (let key in variables) {
      let valueString = variables[key];
      switch (typeof valueString) {
        case 'object':
          valueString = JSON.stringify(valueString).replace(/\{"([^"]+)"\:/gi, '{$1:');
          break;
        case 'string':
          valueString = `"${valueString}"`;
          break;
      }
      mutationArgumentsStrings.push(`${key}: ${valueString}`);
    }
    let mutationArgumentsString = mutationArgumentsStrings.length 
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

    return this.apollo.mutate({
      mutation: gql`mutation ${name}${query}`
    });
  }
}
