import { Directive , HostListener, Input, Output, EventEmitter} from '@angular/core';
import type { AddToCartInput, Cart, Dish, CartModifier } from '../models';
import { NgCartService } from '../services/ng-cart.service';

@Directive({
  selector: '[addToCart]'
})
export class AddDishToCartDirective {

  cart:Cart | undefined;
  modifiers: CartModifier[] = [];

  constructor(private cartService:NgCartService) {
    this.cartService
      .userCart$()
      .subscribe(res => this.cart = res);
    this.cartService
      .getModifiers()
      .subscribe(res => this.modifiers = res);
  }

  @Input() dish:Dish | undefined;
  @Input() amountDish:number = 0;
  @Input() comment:string | undefined;
  @Input() replaceCartDishId:boolean = false;

  @Output() loading = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<any>();

  @HostListener('click')
  onClick() {
    this.addDishToCart(this.dish!.id, this.amountDish)
  }

  private addDishToCart(dishID: string, amount: number) {

    let data:AddToCartInput = {
      "dishId": dishID,
      "amount": amount,
      "cartId": undefined,
      "modifiers": this.modifiers,
      "comment": this.comment,
      "replace": this.replaceCartDishId ? true : undefined,
      "cartDishId": this.cart?.id
    };

    this.loading.emit(true);

    this.cartService
      .addDishToCart$(data)
      .subscribe(
        _ => this.success.emit(true),
        e => this.error.emit(e),
        () => {
          this.loading.emit(false)
        }
      );
  }


}
