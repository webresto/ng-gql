import { Injectable } from '@angular/core';
import { NgGqlModule } from '../ng-gql.module';
import { Dish, Group, NavigationBase, Order, PaymentMethod } from '../models';
import { getFilteredData, createSubject } from '@axrl/common';


@Injectable({
  providedIn: NgGqlModule
})
export class NgGqlStorageService {

  constructor() { }

  private _order = createSubject<Order | null>(null);
  order = getFilteredData(this._order);

  private _dishes = createSubject<Dish[] | null>(null);
  dishes = getFilteredData(this._dishes);

  private _menu = createSubject<Group[] | null>(null);
  menu = getFilteredData(this._menu);

  private _navigation = createSubject<NavigationBase | null>(null);
  navigation = getFilteredData(this._navigation);

  private _paymentMethods = createSubject<PaymentMethod[] | null>(null);
  paymentMethods = getFilteredData(this._paymentMethods);

}

