import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import type { SimpleChanges } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators'
import type { Cart, OrderCartInput, PaymentMethod } from '../models';
import { NgCartService } from '../services/ng-cart.service';

@Directive({
  selector: '[checkout]'
})
export class CheckoutDirective {

  @Input() cartTotal: number | undefined;
  @Input() bonuses: any;
  @Input() name: string | undefined;
  @Input() email: string | undefined;
  @Input() phone: string | undefined;
  @Input() phonePaymentSmsCode: string | undefined;
  @Input() delivery: any;
  @Input() selfService: boolean | undefined;
  @Input() locationId: string | undefined;
  @Input() street: string | undefined;
  @Input() streetId: string | undefined;
  @Input() home: string | undefined;
  @Input() housing: string | undefined;
  @Input() apartment: string | undefined;
  @Input() entrance: string | undefined;
  @Input() doorphone: string | undefined;
  @Input() floor: string | undefined;
  @Input() paymentMethod: PaymentMethod | undefined;
  @Input() paymentMethodId: string | undefined;
  @Input() personsCount: number = 0;
  @Input() comment: string | undefined;
  @Input() callback: string | undefined;
  @Input() date: string | undefined;
  @Input() notifyMethodId: string | undefined;
  @Output() success = new EventEmitter<string>();
  @Output() paymentRedirect = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();
  @Output() isChecking = new EventEmitter<boolean>();

  cart: Cart | undefined;
  lastFormChangeKey: string | undefined;

  constructor(
    private cartService: NgCartService
  ) {

    this.cartService
      .userCart$()
      .subscribe(cart => this.cart = cart);
    this.cartService.OrderFormChange
      .pipe(
        filter(value => {
          //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
          if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
            return true;
          } else {
            return false;
          }
        }),
        debounceTime(1000)
      )
      .subscribe(() => this.checkStreet());
  }

  @HostListener('click')
  onClick() {
    if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
      this.error.emit('Нужно указать адрес');
      return;
    }
    if (!this.cart) {
      return;
    } else {
      let data: OrderCartInput = {
        cartId: this.cart.id,
        customer: {
          phone: this.preparePhone(this.phone),
          mail: this.email,
          name: this.name
        },
      };

      if (this.paymentMethodId) {
        data.paymentMethodId = this.paymentMethodId;
      }

      data.selfService = this.selfService;
      if (this.locationId) {
        data.locationId = this.locationId;
      } else {
        data.address = {
          streetId: this.streetId,
          street: this.street,
          home: this.home,
          housing: this.housing,
          doorphone: this.doorphone || '',
          entrance: this.entrance || '',
          floor: this.floor || '',
          apartment: this.apartment || ''
        }
      }

      const cartId = this.cart.id;
      const onSuccess = (result: { action: { data: { [x: string]: string | undefined; redirectLink: any; }; }; }) => {
        if (result?.action?.data?.redirectLink) {
          this.paymentRedirect.emit(result.action.data['redirectLink']);
        } else {
          console.log('Emit cartId', cartId);
          this.success.emit(cartId);
        }
      };
      if (this.phonePaymentSmsCode && this.phone) {
        this.cartService
          .paymentLink$(this.phonePaymentSmsCode, this.phone)
          .subscribe(
            onSuccess,
            error => this.error.emit(error)
          );
      } else {
        this.cartService
          .orderCart$(data)
          .subscribe(
            onSuccess,
            error => this.error.emit(error)
          );
      }
    }





  }

  ngOnChanges(changes: SimpleChanges) {
    this.cartService.OrderFormChange.next(changes);
  }

  checkStreet() {
    let comment = this.comment || "";
    if (!this.cart) {
      return;
    } else {
      let data: OrderCartInput & {
        personsCount: number
      } = {
        cartId: this.cart.id,
        comment: comment,
        customer: {
          phone: this.phone ? this.preparePhone(this.phone) : '',
          mail: this.email,
          name: this.name || ''
        },
        personsCount: +this.personsCount
      };

      data.selfService = this.selfService;

      if (this.paymentMethodId) {
        data.paymentMethodId = this.paymentMethodId;
      }

      if (this.callback) {
        data.customData = { callback: true };
        data.comment = 'Позвоните мне для уточнения деталей. ' + data["comment"];
      }

      if (this.date) {
        data.date = this.date;
      }

      if (this.notifyMethodId) {
        data.notifyMethodId = this.notifyMethodId;
      }

      if (this.locationId) {
        data.locationId = this.locationId;
      } else {
        data.address = {
          streetId: this.streetId,
          street: this.street,
          home: this.home,
          housing: this.housing,
          doorphone: this.doorphone || '',
          entrance: this.entrance || '',
          floor: this.floor || '',
          apartment: this.apartment || ''
        }
      }
      if (this.callback) {
        data.customData = { callback: true };
      }
      this.isChecking.emit(true);
      this.cartService
        .checkCart$(data)
        .subscribe(
          () => this.isChecking.emit(true),
          () => this.isChecking.emit(false)
        );
    };
  }

  preparePhone(phone: string | undefined) {
    if (!phone) return '';
    phone = '+' + phone.replace(/[^0-9]/gim, '');
    return phone.replace('+8', '+7');
  }
}
