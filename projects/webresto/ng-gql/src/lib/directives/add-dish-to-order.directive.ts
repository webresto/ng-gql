import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import type { AddToOrderInput, Order, Dish, OrderModifier } from '../models';
import { NgOrderService } from '../services/ng-order.service';

@Directive( {
  selector: '[addToOrder]'
} )
export class AddDishToOrderDirective {

  order: Order | null | undefined;
  modifiers: OrderModifier[] = [];

  constructor ( private orderService: NgOrderService ) {
    this.orderService.userOrder$().subscribe( res => this.order = res );
    this.orderService.getModifiers().subscribe( res => this.modifiers = res );
  }

  @Input() dish: Dish | undefined;
  @Input() amountDish: number = 0;
  @Input() comment: string | undefined;
  @Input() replaceOrderDishId: boolean = false;

  @Output() loading = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<any>();

  @HostListener( 'click' )
  onClick () {
    this.addDishToOrder( this.dish!.id, this.amountDish );
  }

  private addDishToOrder ( dishID: string, amount: number ) {

    let data: AddToOrderInput = {
      "dishId": dishID,
      "amount": amount,
      "orderId": undefined,
      "modifiers": this.modifiers,
      "comment": this.comment,
      "replace": this.replaceOrderDishId ? true : undefined,
      "orderDishId": this.order?.id
    };

    this.loading.emit( true );

    this.orderService
      .addDishToOrder$( data )
      .subscribe(
        _ => this.success.emit( true ),
        e => this.error.emit( e ),
        () => {
          this.loading.emit( false );
        }
      );
  }


}
