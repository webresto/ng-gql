import { Injectable } from '@angular/core';
import { NgGqlModule } from '../ng-gql.module';
import { Dish, Group, NavigationBase, Order, PaymentMethod } from '../models';
import { getFilteredData, createSubject } from '@axrl/common';


@Injectable({
  providedIn: NgGqlModule
})
export class NgGqlStorageService {

  constructor() { }

  private _order = createSubject<Order<Dish> | null>(null);
  order = getFilteredData(this._order);

  updateOrder<T extends Order<Dish>>(order: T) {
    this._order.next(order)
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
    this._navigation.next(navigation)
  }

  private _paymentMethods = createSubject<PaymentMethod[] | null>(null);
  paymentMethods = getFilteredData(this._paymentMethods);

  updatePaymentMethods<T extends PaymentMethod>(methods: T[]) {
    this._paymentMethods.next(methods);
  }

}

