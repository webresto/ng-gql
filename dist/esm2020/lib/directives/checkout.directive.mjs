import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-cart.service";
export class CheckoutDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.personsCount = 0;
        this.success = new EventEmitter();
        this.paymentRedirect = new EventEmitter();
        this.error = new EventEmitter();
        this.isChecking = new EventEmitter();
        this.cartService
            .userCart$()
            .subscribe(cart => this.cart = cart);
        this.cartService.OrderFormChange
            .pipe(filter(value => {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
                return true;
            }
            else {
                return false;
            }
        }), 
        /*filter(() => {
          const formChangeKey = JSON.stringify({
            1: this.locationId,
            2: this.streetId,
            3: this.street,
            4: this.home,
            5: this.cartTotal,
            6: this.bonuses,
            7: this.delivery,
            8: this.paymentMethodId
          });

          if(formChangeKey !== this.lastFormChangeKey) {
            this.lastFormChangeKey = formChangeKey;
            return true;
          }
        }),*/
        debounceTime(1000))
            .subscribe(() => this.checkStreet());
    }
    onClick() {
        if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
            this.error.emit('Нужно указать адрес');
            return;
        }
        let data = {
            "cartId": this.cart.id,
            //"comment": comment,
            "customer": {
                "phone": this.preparePhone(this.phone),
                "mail": this.email,
                "name": this.name
            },
            //"personsCount": +this.personsCount
        };
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        //if(this.callback) {
        //  data["customData"] = { callback: true };
        //  data["comment"] = 'Позвоните мне для уточнения деталей. ' + data["comment"];
        //}
        //if(this.date) {
        //  data["date"] = this.date;
        //}
        //if(this.notifyMethodId) {
        //  data["notifyMethodId"] = this.notifyMethodId;
        //}
        data["selfService"] = this.selfService;
        //if(this.bonuses) {
        //  data['bonuses'] = this.bonuses.map(b => {
        //    return {
        //      name: b.name,
        //      amount: b.amount
        //    }
        //  });
        //}
        if (this.locationId) {
            //  data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "streetId": this.streetId,
                "street": this.street,
                "home": this.home,
                "housing": this.housing,
                "doorphone": this.doorphone || '',
                "entrance": this.entrance || '',
                "floor": this.floor || '',
                "apartment": this.apartment || ''
            };
        }
        const cartId = this.cart.id;
        const onSuccess = (result) => {
            if (result?.action?.data?.redirectLink) {
                this.paymentRedirect.emit(result.action.data['redirectLink']);
            }
            else {
                console.log('Emit cartId', cartId);
                this.success.emit(cartId);
            }
        };
        if (this.phonePaymentSmsCode && this.phone) {
            this.cartService
                .paymentLink$(this.phonePaymentSmsCode, this.phone)
                .subscribe(onSuccess, error => this.error.emit(error));
        }
        else {
            this.cartService
                .orderCart$(data)
                .subscribe(onSuccess, error => this.error.emit(error));
        }
    }
    ngOnChanges(changes) {
        this.cartService.OrderFormChange.next(changes);
    }
    checkStreet() {
        //if(this.streetId == '0') return;
        let comment = this.comment || "";
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.id,
            "comment": comment,
            "customer": {
                "phone": this.phone ? this.preparePhone(this.phone) : '',
                "mail": this.email,
                "name": this.name || ''
            },
            "personsCount": +this.personsCount
        };
        data["selfService"] = this.selfService;
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        if (this.callback) {
            data["customData"] = { callback: true };
            data["comment"] = 'Позвоните мне для уточнения деталей. ' + data["comment"];
        }
        if (this.date) {
            data["date"] = this.date;
        }
        if (this.notifyMethodId) {
            data["notifyMethodId"] = this.notifyMethodId;
        }
        if (this.locationId) {
            data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "streetId": this.streetId,
                "street": this.street,
                "home": this.home,
                "housing": this.housing,
                "doorphone": this.doorphone || '',
                "entrance": this.entrance || '',
                "floor": this.floor || '',
                "apartment": this.apartment || ''
            };
        }
        if (this.callback) {
            data["customData"] = { callback: true };
        }
        this.isChecking.emit(true);
        this.cartService
            .checkCart$(data)
            .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        () => this.isChecking.emit(false), () => this.isChecking.emit(false));
    }
    preparePhone(phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CheckoutDirective, deps: [{ token: i1.NgCartService }], target: i0.ɵɵFactoryTarget.Directive });
CheckoutDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: CheckoutDirective, selector: "[checkout]", inputs: { cartTotal: "cartTotal", bonuses: "bonuses", name: "name", email: "email", phone: "phone", phonePaymentSmsCode: "phonePaymentSmsCode", delivery: "delivery", selfService: "selfService", locationId: "locationId", street: "street", streetId: "streetId", home: "home", housing: "housing", apartment: "apartment", entrance: "entrance", doorphone: "doorphone", floor: "floor", paymentMethod: "paymentMethod", paymentMethodId: "paymentMethodId", personsCount: "personsCount", comment: "comment", callback: "callback", date: "date", notifyMethodId: "notifyMethodId" }, outputs: { success: "success", paymentRedirect: "paymentRedirect", error: "error", isChecking: "isChecking" }, host: { listeners: { "click": "onClick()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CheckoutDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[checkout]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgCartService }]; }, propDecorators: { cartTotal: [{
                type: Input
            }], bonuses: [{
                type: Input
            }], name: [{
                type: Input
            }], email: [{
                type: Input
            }], phone: [{
                type: Input
            }], phonePaymentSmsCode: [{
                type: Input
            }], delivery: [{
                type: Input
            }], selfService: [{
                type: Input
            }], locationId: [{
                type: Input
            }], street: [{
                type: Input
            }], streetId: [{
                type: Input
            }], home: [{
                type: Input
            }], housing: [{
                type: Input
            }], apartment: [{
                type: Input
            }], entrance: [{
                type: Input
            }], doorphone: [{
                type: Input
            }], floor: [{
                type: Input
            }], paymentMethod: [{
                type: Input
            }], paymentMethodId: [{
                type: Input
            }], personsCount: [{
                type: Input
            }], comment: [{
                type: Input
            }], callback: [{
                type: Input
            }], date: [{
                type: Input
            }], notifyMethodId: [{
                type: Input
            }], success: [{
                type: Output
            }], paymentRedirect: [{
                type: Output
            }], error: [{
                type: Output
            }], isChecking: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctZ3FsL3NyYy9saWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckYsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTs7O0FBT3JELE1BQU0sT0FBTyxpQkFBaUI7SUF1QzVCLFlBQ1UsV0FBMEI7UUFBMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFqQjNCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBT3hCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM3QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVVqRCxJQUFJLENBQUMsV0FBVzthQUNiLFNBQVMsRUFBRTthQUNYLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlO2FBQzdCLElBQUksQ0FDSCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDYixrSEFBa0g7WUFDbEgsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUN0RixPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNM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O3NCQUFoQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUVJLE9BQU87c0JBQWhCLE1BQU07Z0JBQ0csZUFBZTtzQkFBeEIsTUFBTTtnQkFDRyxLQUFLO3NCQUFkLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkErQ1AsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgdHlwZSB7IE9yZGVyQ2FydElucHV0LCBQYXltZW50TWV0aG9kIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE5nQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgY2FydFRvdGFsOiBhbnk7XG4gIEBJbnB1dCgpIGJvbnVzZXM6IGFueTtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwaG9uZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwaG9uZVBheW1lbnRTbXNDb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OiBhbnk7XG4gIEBJbnB1dCgpIHNlbGZTZXJ2aWNlOiBhbnk7XG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBkb29ycGhvbmU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOiBQYXltZW50TWV0aG9kIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwYXltZW50TWV0aG9kSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcGVyc29uc0NvdW50OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBjb21tZW50OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGNhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgZGF0ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBub3RpZnlNZXRob2RJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcGF5bWVudFJlZGlyZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXG4gIGNhcnQ6IGFueTtcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ0NhcnRTZXJ2aWNlXG4gICkge1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0JCgpXG4gICAgICAuc3Vic2NyaWJlKGNhcnQgPT4gdGhpcy5jYXJ0ID0gY2FydCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcih2YWx1ZSA9PiB7XG4gICAgICAgICAgLy9pZigodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQpICYmIHRoaXMuaG9tZSAmJiB0aGlzLnBob25lICYmIHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLmxlbmd0aCA+IDExKSB7XG4gICAgICAgICAgaWYgKHRoaXMubG9jYXRpb25JZCB8fCAodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lIHx8IHRoaXMuc2VsZlNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgLypmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAxOiB0aGlzLmxvY2F0aW9uSWQsXG4gICAgICAgICAgICAyOiB0aGlzLnN0cmVldElkLFxuICAgICAgICAgICAgMzogdGhpcy5zdHJlZXQsXG4gICAgICAgICAgICA0OiB0aGlzLmhvbWUsXG4gICAgICAgICAgICA1OiB0aGlzLmNhcnRUb3RhbCxcbiAgICAgICAgICAgIDY6IHRoaXMuYm9udXNlcyxcbiAgICAgICAgICAgIDc6IHRoaXMuZGVsaXZlcnksXG4gICAgICAgICAgICA4OiB0aGlzLnBheW1lbnRNZXRob2RJZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoZm9ybUNoYW5nZUtleSAhPT0gdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCovXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RyZWV0KCkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmICghdGhpcy5sb2NhdGlvbklkICYmICEoKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuc2VsZlNlcnZpY2UpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQsNC00YDQtdGBJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGRhdGE6IE9yZGVyQ2FydElucHV0ID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmlkLFxuICAgICAgLy9cImNvbW1lbnRcIjogY29tbWVudCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICBcInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgfSxcbiAgICAgIC8vXCJwZXJzb25zQ291bnRcIjogK3RoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIC8vaWYodGhpcy5jYWxsYmFjaykge1xuICAgIC8vICBkYXRhW1wiY3VzdG9tRGF0YVwiXSA9IHsgY2FsbGJhY2s6IHRydWUgfTtcbiAgICAvLyAgZGF0YVtcImNvbW1lbnRcIl0gPSAn0J/QvtC30LLQvtC90LjRgtC1INC80L3QtSDQtNC70Y8g0YPRgtC+0YfQvdC10L3QuNGPINC00LXRgtCw0LvQtdC5LiAnICsgZGF0YVtcImNvbW1lbnRcIl07XG4gICAgLy99XG5cbiAgICAvL2lmKHRoaXMuZGF0ZSkge1xuICAgIC8vICBkYXRhW1wiZGF0ZVwiXSA9IHRoaXMuZGF0ZTtcbiAgICAvL31cblxuICAgIC8vaWYodGhpcy5ub3RpZnlNZXRob2RJZCkge1xuICAgIC8vICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xuICAgIC8vfVxuXG4gICAgZGF0YVtcInNlbGZTZXJ2aWNlXCJdID0gdGhpcy5zZWxmU2VydmljZTtcblxuXG4gICAgLy9pZih0aGlzLmJvbnVzZXMpIHtcbiAgICAvLyAgZGF0YVsnYm9udXNlcyddID0gdGhpcy5ib251c2VzLm1hcChiID0+IHtcbiAgICAvLyAgICByZXR1cm4ge1xuICAgIC8vICAgICAgbmFtZTogYi5uYW1lLFxuICAgIC8vICAgICAgYW1vdW50OiBiLmFtb3VudFxuICAgIC8vICAgIH1cbiAgICAvLyAgfSk7XG4gICAgLy99XG5cblxuICAgIGlmICh0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIC8vICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJzdHJlZXRcIjogdGhpcy5zdHJlZXQsXG4gICAgICAgIFwiaG9tZVwiOiB0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYXJ0SWQgPSB0aGlzLmNhcnQuaWQ7XG5cbiAgICBjb25zdCBvblN1Y2Nlc3MgPSAocmVzdWx0OiB7IGFjdGlvbjogeyBkYXRhOiB7IFt4OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7IHJlZGlyZWN0TGluazogYW55OyB9OyB9OyB9KSA9PiB7XG4gICAgICBpZiAocmVzdWx0Py5hY3Rpb24/LmRhdGE/LnJlZGlyZWN0TGluaykge1xuICAgICAgICB0aGlzLnBheW1lbnRSZWRpcmVjdC5lbWl0KHJlc3VsdC5hY3Rpb24uZGF0YVsncmVkaXJlY3RMaW5rJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0VtaXQgY2FydElkJywgY2FydElkKTtcbiAgICAgICAgdGhpcy5zdWNjZXNzLmVtaXQoY2FydElkKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICh0aGlzLnBob25lUGF5bWVudFNtc0NvZGUgJiYgdGhpcy5waG9uZSkge1xuICAgICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgICAucGF5bWVudExpbmskKHRoaXMucGhvbmVQYXltZW50U21zQ29kZSwgdGhpcy5waG9uZSlcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICBvblN1Y2Nlc3MsXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAgIC5vcmRlckNhcnQkKGRhdGEpXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgb25TdWNjZXNzLFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZS5uZXh0KGNoYW5nZXMpO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoKSB7XG5cbiAgICAvL2lmKHRoaXMuc3RyZWV0SWQgPT0gJzAnKSByZXR1cm47XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcIlwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwi0J3QtSDRg9C60LDQt9Cw0L3QvlwiO1xuXG4gICAgbGV0IGRhdGE6IE9yZGVyQ2FydElucHV0ICYge1xuICAgICAgcGVyc29uc0NvdW50OiBudW1iZXJcbiAgICB9ID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmlkLFxuICAgICAgXCJjb21tZW50XCI6IGNvbW1lbnQsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgXCJwaG9uZVwiOiB0aGlzLnBob25lID8gdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSkgOiAnJyxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiB0aGlzLm5hbWUgfHwgJydcbiAgICAgIH0sXG4gICAgICBcInBlcnNvbnNDb3VudFwiOiArdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG4gICAgZGF0YVtcInNlbGZTZXJ2aWNlXCJdID0gdGhpcy5zZWxmU2VydmljZTtcblxuICAgIGlmICh0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICBkYXRhW1wiY3VzdG9tRGF0YVwiXSA9IHsgY2FsbGJhY2s6IHRydWUgfTtcbiAgICAgIGRhdGFbXCJjb21tZW50XCJdID0gJ9Cf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LUg0LTQu9GPINGD0YLQvtGH0L3QtdC90LjRjyDQtNC10YLQsNC70LXQuS4gJyArIGRhdGFbXCJjb21tZW50XCJdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGUpIHtcbiAgICAgIGRhdGFbXCJkYXRlXCJdID0gdGhpcy5kYXRlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5vdGlmeU1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRJZFwiOiB0aGlzLnN0cmVldElkLFxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICBkYXRhW1wiY3VzdG9tRGF0YVwiXSA9IHsgY2FsbGJhY2s6IHRydWUgfTtcbiAgICB9XG5cblxuICAgIHRoaXMuaXNDaGVja2luZy5lbWl0KHRydWUpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmNoZWNrQ2FydCQoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIC8vKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIC8vZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgICAoKSA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSksXG4gICAgICAgICgpID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKVxuICAgICAgKTtcbiAgfVxuXG4gIHByZXBhcmVQaG9uZShwaG9uZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFwaG9uZSkgcmV0dXJuICcnO1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwgJycpO1xuICAgIHJldHVybiBwaG9uZS5yZXBsYWNlKCcrOCcsICcrNycpO1xuICB9XG59XG4iXX0=