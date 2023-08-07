/* eslint-disable rxjs/no-subject-value */
import {Injectable} from '@angular/core';
import {createSubject, getFilteredData, isValue} from '@axrl/common';
import {
  Dish,
  Group,
  NavBarMenu,
  NavigationBase,
  Order,
  PaymentMethod,
  User,
  UserLocationResponse,
  UserOrderHystory,
} from '../models';

@Injectable()
export class NgGqlStoreService {
  private _groups = createSubject<Group[]>([]);
  private _order = createSubject<Order<Dish> | null>(null);
  private _dishes = createSubject<Dish[]>([]);
  private _navBarMenus = createSubject<NavBarMenu[]>([]);
  private _userLocations = createSubject<UserLocationResponse>(null);
  private _orderHystory = createSubject<UserOrderHystory[]>([]);
  private _navigation = createSubject<NavigationBase[] | null>(null);
  private _token = createSubject<string | null>(localStorage.getItem('token'));
  private _user = createSubject<User | null>(null);
  private _paymentMethods = createSubject<PaymentMethod[] | null>(null);

  readonly paymentMethods = getFilteredData(this._paymentMethods);
  readonly user = this._user;
  readonly token = this._token.asObservable();
  readonly isAuthenticated$ = getFilteredData(this.token);
  readonly orderHystory = this._orderHystory.asObservable();
  readonly userLocations = this._userLocations.asObservable();
  readonly navBarMenus = this._navBarMenus.asObservable();
  readonly groups = this._groups.asObservable();
  readonly navigation = this._navigation;
  readonly order = getFilteredData(this._order);
  readonly dishes = this._dishes.asObservable();

  constructor() {}

  updateOrder<T extends Order<Dish>>(order: T): void {
    this._order.next(order);
  }

  updateDishes<T extends Dish>(dishes: T[]): void {
    this._dishes.next(dishes);
  }

  updateMenuGroups<T extends Group>(menuGroups: T[]): void {
    this._groups.next(menuGroups);
  }

  updateNavigation<T extends NavigationBase>(navigation: T[]): void {
    this._navigation.next(navigation);
  }

  updatePaymentMethods<T extends PaymentMethod>(methods: T[]): void {
    this._paymentMethods.next(methods);
  }

  updateUser<T extends User>(user: T | null): void {
    this._user.next(user);
  }

  updateToken(newToken: string | null): void {
    if (isValue(newToken)) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    this._token.next(newToken);
  }

  updateOrderHystory(newPart: UserOrderHystory[]): void {
    const hystory = [...this._orderHystory.value];
    hystory.push(...newPart);
    this._orderHystory.next(hystory);
  }

  updateUserLocations(newValue: UserLocationResponse): void {
    const current = this._userLocations.value;
    if (current) {
      const userLocations = [...current.userLocation];
      userLocations.push(...newValue.userLocation);
      this._userLocations.next({
        userLocationCount: newValue.userLocationCount,
        userLocation: userLocations,
      });
    }
  }

  updateNavBarMenus(items: NavBarMenu[]): void {
    this._navBarMenus.next(items);
  }
}
