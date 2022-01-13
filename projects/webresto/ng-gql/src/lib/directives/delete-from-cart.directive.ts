import { Directive , HostListener, Input} from '@angular/core';
import type { Cart } from '../models';
import { NgCartService } from '../services/ng-cart.service';

@Directive({
  selector: '[deleteFromCart]'
})
export class DeleteFromCartDirective {

  cart:Cart|undefined;

  constructor(private cartService:NgCartService) {
    this.cartService
      .userCart$()
      .subscribe(res => this.cart = res);
  }


  @Input() dish:any;
  @Input() amountDish:any;

  @HostListener('click')
  onClick() {
    this.cartService.removeDishFromCart$(this.dish.id, this.amountDish).subscribe()
  }

}
