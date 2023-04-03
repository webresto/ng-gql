import { Injectable } from '@angular/core';
import {
  Dish,
  Group,
  NavigationBase,
  Order,
  PaymentMethod,
  User,
  UserLocationResponse,
  UserOrderHystory,
} from '../models';
import { getFilteredData, createSubject, isValue } from '@axrl/common';

@Injectable()
export class NgGqlStorageService {
  constructor() {}

  private _order = createSubject<Order<Dish> | null>(null);
  order = getFilteredData(this._order);

  updateOrder<T extends Order<Dish>>(order: T) {
    this._order.next(order);
  }

  private _dishes = createSubject<Dish[] | null>(null);
  dishes = getFilteredData(this._dishes);

  updateDishes<T extends Dish>(dishes: T[]) {
    this._dishes.next(dishes);
  }

  private _menu = createSubject<Group[] | null>(null);
  menu = getFilteredData(this._menu);

  updateMenuGroups<T extends Group>(menuGroups: T[]) {
    this._menu.next(menuGroups);
  }

  private _navigation = createSubject<NavigationBase[] | null>(null);
  navigation = getFilteredData(this._navigation);

  updateNavigation<T extends NavigationBase>(navigation: T[]) {
    this._navigation.next(navigation);
  }

  private _paymentMethods = createSubject<PaymentMethod[] | null>(null);
  paymentMethods = getFilteredData(this._paymentMethods);

  updatePaymentMethods<T extends PaymentMethod>(methods: T[]) {
    this._paymentMethods.next(methods);
  }

  private _user = createSubject<User | null>(null);
  user = this._user;

  updateUser<T extends User>(user: T | null) {
    this._user.next(user);
  }

  private _token = createSubject<string | null>(localStorage.getItem('token'));
  token = this._token.asObservable();

  updateToken(newToken: string | null) {
    if (isValue(newToken)) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    this._token.next(newToken);
  }

  private _orderHystory = createSubject<UserOrderHystory[]>([]);
  orderHystory = this._orderHystory.asObservable();

  updateOrderHystory(newPart: UserOrderHystory[]) {
    const hystory = [...this._orderHystory.value];
    hystory.push(...newPart);
    this._orderHystory.next(hystory);
  }

  private _userLocations = createSubject<UserLocationResponse>(null);
  userLocations = this._userLocations.asObservable();

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
}
