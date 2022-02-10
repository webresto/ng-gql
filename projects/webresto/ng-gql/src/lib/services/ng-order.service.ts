import { Injectable } from '@angular/core';
import type { SimpleChanges } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import type { Observable, Subscription } from 'rxjs';
import { tap, filter, catchError } from 'rxjs/operators';
import type { EventMessage, OrderInput, Order, AddToOrderInput, Modifier, CheckResponse } from '../models';
import { NgGqlService } from '../ng-gql.service';
import { EventerService } from './eventer.service';

const LS_NAME = 'orderId';

@Injectable( {
  providedIn: 'root'
} )
export class NgOrderService {
  orderId: string | undefined;
  order: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>( null );;

  modifiers$ = new BehaviorSubject<Partial<Modifier[]>>( [] );
  modifiersMessage$: BehaviorSubject<EventMessage[]> = new BehaviorSubject<EventMessage[]>( [] );
  messages: EventMessage[] = [];
  OrderFormChange = new BehaviorSubject<SimpleChanges | null>( null );
  orderSubscription: Subscription | undefined;

  constructor (
    private ngGqlService: NgGqlService,
    private eventer: EventerService
  ) {
    this.modifiersMessage$.subscribe( messages => this.messages = messages );
  }

  getOrderId (): string | undefined {
    return localStorage.getItem( LS_NAME ) ?? undefined;
  }

  setOrderId ( orderId: string ) {
    if ( orderId ) {
      localStorage.setItem( LS_NAME, orderId );
    }
  }

  removeOrderId () {
    localStorage.removeItem( LS_NAME );
  }

  userOrder$ (): Observable<Order | null> {
    return this.order.pipe( filter( order => !!order ) );
  }

  setModifiers ( modifiers: Modifier[], messages?: EventMessage[] ): void {
    this.modifiers$.next( modifiers );
    if ( messages ) this.modifiersMessage$.next( messages );
  }

  getModifiers (): Observable<any> {
    return this.modifiers$;
  }

  initialStorage () {
    this.orderId = this.getOrderId();
    this.orderSubscription?.unsubscribe();
    this.ngGqlService.loadOrderAsCart$( this.orderId );
    this.orderSubscription = this.ngGqlService.order$
      .pipe(
        tap( order => {
          console.log( 'order tap', order );
          if ( order?.state == 'ORDER' ) {
            throw new Error( 'Order in order state' );
          }
          this.setOrderId( order.id );
        } )
      )
      .subscribe(
        order => this.order.next( order ),
        error => this.removeOrderId(),
        () => this.orderSubscription?.unsubscribe()
      );
  }

  addDishToOrder$ ( data: AddToOrderInput ) {
    if ( this.messages.length ) {
      this.messages.forEach( message => {
        this.eventer.emitMessageEvent( message );
      } );
    }
    return this.ngGqlService.addDishToOrder$( data );
  }

  removeDishFromOrder$ ( dishId: number, amount: number ) {
    return this.ngGqlService.removeDishFromOrder$( {
      orderDishId: dishId,
      id: this.orderId,
      amount
    } );
  }


  orderCart$ ( data: OrderInput ): Observable<CheckResponse> {
    return this.ngGqlService.sendOrder$( data );
  }

  paymentLink$ ( phone: string, fromPhone: string ): Observable<any> {
    console.log( 'paymentLink', this.orderId, phone, fromPhone );
    return this.ngGqlService.customMutation$( 'paymentLink', {
      paymentLink: 1
    }, this.orderId ? {
      orderId: this.orderId,
      phone,
      fromPhone
    } : {
      phone,
      fromPhone
    } )
      .pipe(
        catchError( error => {
          console.log( 'error', error );
          this.eventer.emitMessageEvent( {
            type: 'info',
            title: 'Не удалось отправить ссылку для оплаты.',
            body: error.message
          } );
          return of( null );
        } )
      );
  }

  checkOrder$ ( data: OrderInput ): Observable<CheckResponse> {
    console.log( 'Check order$', data );
    return this.ngGqlService.checkOrder$( data );
  }

  setDishCountToOrder$ ( dishId: number, amount: number ) {
    return this.ngGqlService.setDishAmount$( {
      orderDishId: dishId,
      id: this.orderId,
      amount
    } );
  }

  setDishComment$ ( dishId: number, comment: string ) {
    return this.ngGqlService.setDishComment$( {
      orderDishId: dishId,
      id: this.orderId,
      comment
    } );
  }
}
