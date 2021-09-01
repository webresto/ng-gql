import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of, Subscription } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';
import { OrderCartInput } from '../cart/cart.gql';
import { CheckResponse } from '../cart/check-response';
import { EventMessage } from '../event-message/event-message';
import { NgGqlService } from '../ng-gql.service';
import { EventerService } from './eventer.service';

const LS_NAME = 'cartId';

@Injectable({
  providedIn: 'root'
})
export class NgCartService {
  cartId:string;
  cart:BehaviorSubject<any>;

  modifiers$:BehaviorSubject<any>;
  modifiersMessage$:BehaviorSubject<any>;
  messages:EventMessage[];

  OrderFormChange = new BehaviorSubject(null);

  cartSubscription: Subscription;

  constructor(
    private ngGqlService: NgGqlService,
    private eventer: EventerService
  ) { 
    this.cart = new BehaviorSubject({});
    this.initialStorage();
    this.modifiers$ = new BehaviorSubject([]);
    this.modifiersMessage$ = new BehaviorSubject([]);
    this.modifiersMessage$.subscribe(messages => this.messages = messages);
  }

  getCartId():string {
    return localStorage.getItem(LS_NAME);
  }

  setCartId(cartId) {
    if(!cartId) return null;
    localStorage.setItem(LS_NAME, cartId);
  }

  removeCartId() {
    localStorage.removeItem(LS_NAME);
  }

  userCart$():BehaviorSubject<any> |  Observable<any> {
    return this.cart.pipe(filter(cart => !!cart));
  }

  setModifiers(modifiers, messages?:EventMessage[]):void {
    this.modifiers$.next(modifiers);
    if (messages) this.modifiersMessage$.next(messages);
  }

  getModifiers():Observable<any> {
    return this.modifiers$;
  }

  initialStorage() {
    this.cartId = this.getCartId();
    this.cartSubscription?.unsubscribe();
    this.cartSubscription = this.ngGqlService
      .getCart$(this.cartId)
      .pipe(
        tap(cart => {
          console.log('cart tap', cart);
          if(cart?.state == 'ORDER') {
            throwError(new Error('Cart in order state'))
          }
          this.setCartId(cart?.id);
        })
      )
      .subscribe(
        cart => this.cart.next(cart),
        error => this.removeCartId()
      );
  }

  addDishToCart$(data) {
    if (this.messages.length) {
      this.messages.forEach(message => {
        this.eventer.emitMessageEvent(message);
      });
    }
    return this.ngGqlService.addDishToCart$(data);
  }

  removeDishFromCart$(dishId, amount) {
    return this.ngGqlService.removeDishFromCart$({
      cartDishId: dishId,
      cartId: this.cartId,
      amount
    });
  }


  orderCart$(data: OrderCartInput): Observable<CheckResponse> {
    return this.ngGqlService.orderCart$(data);
  }

  checkCart$(data: OrderCartInput): Observable<CheckResponse> {
    console.log('Check cart$', data);
    return this.ngGqlService.checkCart$(data);
  }

  setDishCountToCart$(dishId, amount) {
    return this.ngGqlService.setDishAmount$({
      cartDishId: dishId,
      cartId: this.cartId,
      amount
    });
  }

  setDishComment$(dishId, comment) {
    return this.ngGqlService.setDishComment$({
      cartDishId: dishId,
      cartId: this.cartId,
      comment
    });
  }
}
