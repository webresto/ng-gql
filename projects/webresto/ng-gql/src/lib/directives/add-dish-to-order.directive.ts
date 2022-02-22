import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Order, Dish, Modifier } from '../models';
import { NgOrderService } from '../services/ng-order.service';

@Directive({
  selector: '[addToOrder]'
})
export class AddDishToOrderDirective {
  constructor(private orderService: NgOrderService) { }
  @Input() order: Order | undefined;
  @Input() modifiers: Modifier[] = [];



  @Input() dish: Dish | undefined;
  @Input() amountDish: number = 0;
  @Input() comment: string | undefined;
  @Input() replaceOrderDishId: boolean = false;

  @Output() loading = new BehaviorSubject<boolean>(false);
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<any>();

  @HostListener('click')
  onClick() {
    this.addDishToOrder();
  }

  private addDishToOrder() {
    if (this.order && this.dish && this.modifiers) {
      this.orderService
        .addToOrder(this.order, this.loading, this.dish, this.amountDish, this.modifiers, () => this.success.emit(true), e => this.error.emit(e));
    }

  }


}
