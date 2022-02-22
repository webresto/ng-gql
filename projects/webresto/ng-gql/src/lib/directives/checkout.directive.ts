import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import type { SimpleChanges } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
import type { Order, OrderInput, PaymentMethod, CheckResponse } from '../models';
import { isValue } from '../models';
import { NgOrderService } from '../services/ng-order.service';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[checkout]'
})
export class CheckoutDirective {

  @Input() orderTotal: number | undefined;
  @Input() bonuses: any;
  @Input() name: string | undefined;
  @Input() email: string | undefined;
  @Input() phone: string | undefined;
  @Input() phonePaymentSmsCode: string | undefined;
  @Input() delivery: any;
  @Input() selfService: boolean = false;
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
  @Input() order: Order | undefined;

  @Output() success = new EventEmitter<string>();
  @Output() paymentRedirect = new EventEmitter<string>();
  @Output() error = new EventEmitter<unknown>();
  @Output() isChecking = new EventEmitter<boolean>();

  lastFormChangeKey: string | undefined;
  OrderFormChange = new BehaviorSubject<SimpleChanges | null>(null);

  constructor(
    private orderService: NgOrderService
  ) {


    this.OrderFormChange
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
    if (!this.order || !this.name || !this.street || !this.home) {
      return;
    } else {
      let data: OrderInput = {
        orderId: this.order.id,
        selfService: this.selfService,
        customer: {
          phone: this.preparePhone(this.phone),
          mail: this.email,
          name: this.name
        },
      };

      if (this.paymentMethodId) {
        data.paymentMethodId = this.paymentMethodId;
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
        };
      }

      const orderId = this.order.id;
      const onSuccess = (result: CheckResponse) => {
        if (result?.action?.data?.redirectLink) {
          this.paymentRedirect.emit(result.action.data[ 'redirectLink' ]);
        } else {
          console.log('Emit orderId', orderId);
          this.success.emit(orderId);
        }
      };
      if (this.phonePaymentSmsCode && this.phone) {
        this.orderService.paymentLink$(this.phonePaymentSmsCode, this.phone, orderId).subscribe({
          next: res => onSuccess(res),
          error: err => this.error.emit(err),
          complete: () => { }
        });
      } else {
        this.orderService.sendOrder({
          ... this.order, ...data
        }, res => onSuccess(res), err => this.error.emit(err));
      }
    }





  }

  ngOnChanges(changes: SimpleChanges) {
    this.OrderFormChange.next(changes);
  }

  checkStreet() {
    let comment = this.comment || "";
    if (this.order && this.street && this.home) {
      let data: OrderInput & {
        personsCount: number;
      } = {
        orderId: this.order.id,
        selfService: this.selfService,
        comment: comment,
        customer: {
          phone: this.phone ? this.preparePhone(this.phone) : '',
          mail: this.email,
          name: this.name || ''
        },
        personsCount: +this.personsCount
      };


      if (this.paymentMethodId) {
        data.paymentMethodId = this.paymentMethodId;
      }

      if (this.callback) {
        data.customData = { callback: true };
        data.comment = 'Позвоните мне для уточнения деталей. ' + data[ "comment" ];
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
        };
      }
      if (this.callback) {
        data.customData = { callback: true };
      }
      this.isChecking.emit(true);
      this.orderService
        .checkOrder({ ... this.order, ...data }, () => this.isChecking.emit(true), () => this.isChecking.emit(false));
    } else {
      return;
    };
  }

  preparePhone(phone: string | undefined) {
    if (!phone) return '';
    phone = '+' + phone.replace(/[^0-9]/gim, '');
    return phone.replace('+8', '+7');
  }
}
