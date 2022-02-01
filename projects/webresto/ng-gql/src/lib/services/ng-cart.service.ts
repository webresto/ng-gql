import { Injectable } from '@angular/core';
import type { SimpleChanges } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import type { Observable, Subscription } from 'rxjs';
import { tap, filter, map, catchError } from 'rxjs/operators';
import type { EventMessage, OrderCartInput, CheckResponse, Cart, AddToCartInput, Modifier } from '../models';
import { NgGqlService } from '../ng-gql.service';
import { EventerService } from './eventer.service';

const LS_NAME = 'cartId';

@Injectable({
  providedIn: 'root'
})
export class NgCartService {
  cartId: string | undefined;
  cart: BehaviorSubject<Cart | null> = new BehaviorSubject<Cart | null>(null);;

  modifiers$ = new BehaviorSubject<Partial<Modifier[]>>([]);
  modifiersMessage$: BehaviorSubject<EventMessage[]> = new BehaviorSubject<EventMessage[]>([]);
  messages: EventMessage[] = [];
  OrderFormChange = new BehaviorSubject<SimpleChanges | null>(null);
  cartSubscription: Subscription | undefined;

  constructor(
    private ngGqlService: NgGqlService,
    private eventer: EventerService
  ) {
    this.initialStorage();
    this.modifiersMessage$.subscribe(messages => this.messages = messages);
  }

  getCartId(): string | undefined {
    return localStorage.getItem(LS_NAME) ?? undefined;
  }

  setCartId(cartId: string) {
    if (cartId) {
      localStorage.setItem(LS_NAME, cartId);
    }
  }

  removeCartId() {
    localStorage.removeItem(LS_NAME);
  }

  userCart$(): BehaviorSubject<any> | Observable<any> {
    return this.cart.pipe(filter(cart => !!cart));
  }

  setModifiers(modifiers: Modifier[], messages?: EventMessage[]): void {
    this.modifiers$.next(modifiers);
    if (messages) this.modifiersMessage$.next(messages);
  }

  getModifiers(): Observable<any> {
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
          if (cart?.state == 'ORDER') {
            throw new Error('Cart in order state');
          }
          this.setCartId(cart.id);
        })
      )
      .subscribe(
        cart => this.cart.next(cart),
        error => this.removeCartId()
      );
  }

  addDishToCart$(data: AddToCartInput) {
    if (this.messages.length) {
      this.messages.forEach(message => {
        this.eventer.emitMessageEvent(message);
      });
    }
    return this.ngGqlService.addDishToCart$(data);
  }

  removeDishFromCart$(dishId: number, amount: number) {
    return this.ngGqlService.removeDishFromCart$({
      cartDishId: dishId,
      cartId: this.cartId,
      amount
    });
  }


  orderCart$(data: OrderCartInput): Observable<CheckResponse> {
    return this.ngGqlService.orderCart$(data);
  }

  paymentLink$(phone: string, fromPhone: string): Observable<any> {
    console.log('paymentLink', this.cartId, phone, fromPhone);
    //return of(null);
    return this.ngGqlService.customMutation$('paymentLink', {
      paymentLink: 1
    }, this.cartId ? {
      cartId: this.cartId,
      phone,
      fromPhone
    } : {
      phone,
      fromPhone
    })
      .pipe(
        catchError(error => {
          console.log('error', error);
          this.eventer.emitMessageEvent({
            type: 'info',
            title: 'Не удалось отправить ссылку для оплаты.',
            body: error.message
          });
          return of(null);
        })
      )
  }

  checkCart$(data: OrderCartInput): Observable<CheckResponse> {
    console.log('Check cart$', data);
    return this.ngGqlService.checkCart$(data);
  }

  setDishCountToCart$(dishId: number, amount: number) {
    return this.ngGqlService.setDishAmount$({
      cartDishId: dishId,
      cartId: this.cartId,
      amount
    });
  }

  setDishComment$(dishId: number, comment: string) {
    return this.ngGqlService.setDishComment$({
      cartDishId: dishId,
      cartId: this.cartId,
      comment
    });
  }
}
