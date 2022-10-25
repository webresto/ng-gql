import { Injectable } from '@angular/core';
import { NgGqlModule } from '../ng-gql.module';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Dish, Group, isValue, NavigationBase, Order, PaymentMethod } from '../models';

@Injectable({
  providedIn: NgGqlModule
})
export class NgGqlStorageService {

  constructor() { }

  private makeFilteredObservable<T>(source: BehaviorSubject<T | null>): Observable<T> {
    return source.pipe(
      filter(
        (value): value is T => isValue(value)
      )
    );
  }

  private _order = new BehaviorSubject<Order | null>(null);
  order = this.makeFilteredObservable(this._order);

  private _dishes = new BehaviorSubject<Dish[] | null>(null);
  dishes = this.makeFilteredObservable(this._dishes);

  private _menu = new BehaviorSubject<Group[] | null>(null);
  menu = this.makeFilteredObservable(this._menu);

  private _navigation = new BehaviorSubject<NavigationBase | null>(null);
  navigation = this.makeFilteredObservable(this._navigation);

  private _paymentMethods = new BehaviorSubject<PaymentMethod[] | null>(null);
  paymentMethods = this.makeFilteredObservable(this._paymentMethods);
  
}

