import { Injectable } from '@angular/core';
import { createSubject, getFilteredData, isValue } from '@axrl/common';
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
export class NgGqlStorageService {
  constructor() {}

  private _order = createSubject<Order<Dish> | null>(null);
  readonly order = getFilteredData(this._order);

  updateOrder<T extends Order<Dish>>(order: T) {
    this._order.next(order);
  }

  private _dishes = createSubject<Dish[]>([]);
  readonly dishes = this._dishes.asObservable();

  updateDishes<T extends Dish>(dishes: T[]) {
    this._dishes.next(dishes);
  }

  private _groups = createSubject<Group[]>([]);
  readonly groups = this._groups.asObservable();

  updateMenuGroups<T extends Group>(menuGroups: T[]) {
    this._groups.next(menuGroups);
  }

  private _navigation = createSubject<NavigationBase[] | null>(null);
  readonly navigation = this._navigation;

  updateNavigation<T extends NavigationBase>(navigation: T[]) {
    this._navigation.next(navigation);
  }

  private _paymentMethods = createSubject<PaymentMethod[] | null>(null);
  readonly paymentMethods = getFilteredData(this._paymentMethods);

  updatePaymentMethods<T extends PaymentMethod>(methods: T[]) {
    this._paymentMethods.next(methods);
  }

  private _user = createSubject<User | null>(null);
  readonly user = this._user;

  updateUser<T extends User>(user: T | null) {
    this._user.next(user);
  }

  private _token = createSubject<string | null>(localStorage.getItem('token'));
  readonly token = this._token.asObservable();
  readonly isAuthenticated$ = getFilteredData(this.token);

  updateToken(newToken: string | null) {
    if (isValue(newToken)) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    this._token.next(newToken);
  }

  private _orderHystory = createSubject<UserOrderHystory[]>([]);
  readonly orderHystory = this._orderHystory.asObservable();

  updateOrderHystory(newPart: UserOrderHystory[]) {
    const hystory = [...this._orderHystory.value];
    hystory.push(...newPart);
    this._orderHystory.next(hystory);
  }

  private _userLocations = createSubject<UserLocationResponse>(null);
  readonly userLocations = this._userLocations.asObservable();

  updateUserLocations(newValue: UserLocationResponse) {
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

  private _navBarMenus = createSubject<NavBarMenu[]>([]);
  readonly navBarMenus = this._navBarMenus.asObservable();

  updateNavBarMenus(items: NavBarMenu[]) {
    this._navBarMenus.next(items);
  }
}
