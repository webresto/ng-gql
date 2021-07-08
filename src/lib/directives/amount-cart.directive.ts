import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';

@Directive({
  selector: '[amountCart]'
})
export class AmountCartDirective {

  cart:object;
  amount:string;

  constructor(
    private cartService:NgCartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {

    this.amount = '0'; 
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);

    this.cartService
      .userCart$()
      .subscribe(res => {
        this.cart = res;
        this.amount = res.dishesCount || 0;
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
      });
  }


}
