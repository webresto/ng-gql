import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import type { SimpleChanges } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
import type { Order, OrderInput, PaymentMethod } from '../models';
import { NgOrderService } from '../services/ng-order.service';

@Directive( {
  selector: '[checkout]'
} )
export class CheckoutDirective {

  @Input() orderTotal: number | undefined;
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

  order: Order | null | undefined;
  lastFormChangeKey: string | undefined;

  constructor (
    private orderService: NgOrderService
  ) {

    this.orderService
      .userOrder$()
      .subscribe( order => this.order = order );
    this.orderService.OrderFormChange
      .pipe(
        filter( value => {
          //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
          if ( this.locationId || ( this.streetId || this.street ) && this.home || this.selfService ) {
            return true;
          } else {
            return false;
          }
        } ),
        debounceTime( 1000 )
      )
      .subscribe( () => this.checkStreet() );
  }

  @HostListener( 'click' )
  onClick () {
    if ( !this.locationId && !( ( this.streetId || this.street ) && this.home ) && !this.selfService ) {
      this.error.emit( 'Нужно указать адрес' );
      return;
    }
    if ( !this.order ) {
      return;
    } else {
      let data: OrderInput = {
        orderId: this.order.id,
        customer: {
          phone: this.preparePhone( this.phone ),
          mail: this.email,
          name: this.name
        },
      };

      if ( this.paymentMethodId ) {
        data.paymentMethodId = this.paymentMethodId;
      }

      data.selfService = this.selfService;
      if ( this.locationId ) {
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
      const onSuccess = ( result: any ) => {
        if ( result?.action?.data?.redirectLink ) {
          this.paymentRedirect.emit( result.action.data[ 'redirectLink' ] );
        } else {
          console.log( 'Emit orderId', orderId );
          this.success.emit( orderId );
        }
      };
      if ( this.phonePaymentSmsCode && this.phone ) {
        this.orderService.paymentLink$( this.phonePaymentSmsCode, this.phone ).subscribe( {
          next: res => onSuccess( res ),
          error: err => this.error.emit( err ),
          complete: () => { }
        } );
      } else {
        this.orderService.orderCart$( data ).subscribe( {
          next: res => onSuccess( res ),
          error: err => this.error.emit( err ),
          complete: () => { }
        }


        );
      }
    }





  }

  ngOnChanges ( changes: SimpleChanges ) {
    this.orderService.OrderFormChange.next( changes );
  }

  checkStreet () {
    let comment = this.comment || "";
    if ( !this.order ) {
      return;
    } else {
      let data: OrderInput & {
        personsCount: number;
      } = {
        orderId: this.order.id,
        comment: comment,
        customer: {
          phone: this.phone ? this.preparePhone( this.phone ) : '',
          mail: this.email,
          name: this.name || ''
        },
        personsCount: +this.personsCount
      };

      data.selfService = this.selfService;

      if ( this.paymentMethodId ) {
        data.paymentMethodId = this.paymentMethodId;
      }

      if ( this.callback ) {
        data.customData = { callback: true };
        data.comment = 'Позвоните мне для уточнения деталей. ' + data[ "comment" ];
      }

      if ( this.date ) {
        data.date = this.date;
      }

      if ( this.notifyMethodId ) {
        data.notifyMethodId = this.notifyMethodId;
      }

      if ( this.locationId ) {
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
      if ( this.callback ) {
        data.customData = { callback: true };
      }
      this.isChecking.emit( true );
      this.orderService
        .checkOrder$( data )
        .subscribe(
          () => this.isChecking.emit( true ),
          () => this.isChecking.emit( false )
        );
    };
  }

  preparePhone ( phone: string | undefined ) {
    if ( !phone ) return '';
    phone = '+' + phone.replace( /[^0-9]/gim, '' );
    return phone.replace( '+8', '+7' );
  }
}
