import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, filter, take, map, catchError, switchMap } from 'rxjs/operators';
import { Cart } from './cart/cart';
import { CartGql, AddToCartInput, RemoveFromCartInput, OrderCartInput, CheckPhoneCodeInput } from './cart/cart.gql';
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

  constructor(private apollo: Apollo) {
    this.cart$.subscribe(res => console.log('control cart res', res));
  } 

  getNavigation$(): BehaviorSubject<NavigationData> {
    if (!this.navigationData$.getValue() && !this.navigationDataLoading) {
      this.apollo.watchQuery<any>({
        query: NavigationGql.queries.getNavigationes()
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

  getMenu$(slug: string = null): BehaviorSubject<Group[]> {
    if (!this.menu$.getValue() && !this.menuLoading) {
      this.apollo.watchQuery<any>({
        query: GroupGql.queries.getGroupsAndDishes()
      })
        .valueChanges
        .pipe(
          tap(({ data, loading }) => {
            this.menuLoading = loading;
            const { groups, dishes } = data;
            const groupsById = {};
            let bySlugGroupId = null;
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
              const parentGroupId = group.parentGroup?.id;
              if (!parentGroupId) continue;
              if (!groupsById[parentGroupId]) continue;
              groupsById[parentGroupId].childGroups.push(group);
              if (slug && group.slug == slug) {
                bySlugGroupId = groupId;
                continue;
              }
              delete groupsById[groupId];
            }

            if (slug) {
              if (!bySlugGroupId) {
                this.menu$.next([]);
                return;
              }
              this.menu$.next(groupsById[bySlugGroupId].childGroups.sort((g1: Group, g2: Group) => g1.order - g2.order));
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
        query: DishGql.queries.getDishes()
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
      query: CartGql.queries.getOrder(orderId)
    })
      .valueChanges
      .pipe(
        take(1),
        map(({ data }) => data.getOrder)
      )
  }

  getCart$(cartId: string = null): BehaviorSubject<Cart> {
    if (!this.cart$.getValue() && !this.cartLoading) {
      this.apollo.watchQuery<any>({
        query: CartGql.queries.getCart(cartId)
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
      query: CartGql.queries.getPhone(phone)
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
      query: CartGql.queries.checkPhone(phone)
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
      query: PaymentMethodGql.queries.getPaymentMethod(cartId)
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
      mutation: CartGql.mutations.addDishToCart(),
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
      mutation: CartGql.mutations.orderCart(),
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
      mutation: CartGql.mutations.checkCart(),
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
      mutation: CartGql.mutations.checkPhoneCode(),
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
      mutation: CartGql.mutations.removeDishFromCart(),
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
