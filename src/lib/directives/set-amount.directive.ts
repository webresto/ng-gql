import { Directive, Input, HostListener } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';

@Directive({
  selector: '[setDishAmount]'
})
export class SetAmountDirective {
  @Input() action:any;
  @Input() dish:any;

  @HostListener('click') onClick() {
    this.changeAmount(this.action);
  }

  private cart;

  constructor(private cartService:NgCartService) {
    this.cartService
      .userCart$()
      .subscribe(res => this.cart = res);
  }

  changeAmount(action) {

    switch (action) {
      case '+':
        this.cartService.setDishCountToCart(
          this.dish.id,
          this.dish.amount + 1
        );
        break;
      case '-':
        this.cartService.setDishCountToCart(
          this.dish.id,
          this.dish.amount - 1
        );
        break;
      default:
        console.log("Директива SetDishAmount получила ложное значение action");
        break;
    }

  }

}
