import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-cart.service";
export class CheckoutDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.paymentRedirect = new EventEmitter();
        this.error = new EventEmitter();
        this.isChecking = new EventEmitter();
        this.cartService
            .userCart$()
            .subscribe(cart => this.cart = cart);
        this.cartService.OrderFormChange
            .pipe(filter(() => {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
                return true;
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
        let comment = this.comment || "";
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.id,
            //"comment": comment,
            "customer": {
                "phone": this.preparePhone(this.phone),
                "mail": this.email,
                "name": this.name
            },
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
        const onSuccess = result => {
            var _a, _b;
            if ((_b = (_a = result === null || result === void 0 ? void 0 : result.action) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.redirectLink) {
                this.paymentRedirect.emit(result.action.data['redirectLink']);
            }
            else {
                console.log('Emit cartId', cartId);
                this.success.emit(cartId);
            }
        };
        if (this.phonePaymentSmsCode) {
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
                "phone": this.phone ? this.preparePhone(this.phone) : null,
                "mail": this.email,
                "name": this.name || null
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
        result => this.isChecking.emit(false), error => this.isChecking.emit(false));
    }
    preparePhone(phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.ɵfac = function CheckoutDirective_Factory(t) { return new (t || CheckoutDirective)(i0.ɵɵdirectiveInject(i1.NgCartService)); };
CheckoutDirective.ɵdir = i0.ɵɵdefineDirective({ type: CheckoutDirective, selectors: [["", "checkout", ""]], hostBindings: function CheckoutDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function CheckoutDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { cartTotal: "cartTotal", bonuses: "bonuses", name: "name", email: "email", phone: "phone", phonePaymentSmsCode: "phonePaymentSmsCode", delivery: "delivery", selfService: "selfService", locationId: "locationId", street: "street", streetId: "streetId", home: "home", housing: "housing", apartment: "apartment", entrance: "entrance", doorphone: "doorphone", floor: "floor", paymentMethod: "paymentMethod", paymentMethodId: "paymentMethodId", personsCount: "personsCount", comment: "comment", callback: "callback", date: "date", notifyMethodId: "notifyMethodId" }, outputs: { success: "success", paymentRedirect: "paymentRedirect", error: "error", isChecking: "isChecking" }, features: [i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckoutDirective, [{
        type: Directive,
        args: [{
                selector: '[checkout]'
            }]
    }], function () { return [{ type: i1.NgCartService }]; }, { cartTotal: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWtCLE1BQU0sZ0JBQWdCLENBQUE7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFLNUQsTUFBTSxPQUFPLGlCQUFpQjtJQXlDNUIsWUFDVSxXQUEwQjtRQUExQixnQkFBVyxHQUFYLFdBQVcsQ0FBZTtRQVYxQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDN0MsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbkMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFVakQsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLEVBQUU7YUFDWCxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZTthQUM3QixJQUFJLENBQ0gsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNWLGtIQUFrSDtZQUNsSCxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JGLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUM7UUFDRjs7Ozs7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RyxVQUFVO2tCQUFsQixLQUFLO1lBRUcsTUFBTTtrQkFBZCxLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUVHLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxlQUFlO2tCQUF2QixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFFRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBRUksT0FBTztrQkFBaEIsTUFBTTtZQUNHLGVBQWU7a0JBQXhCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFDRyxVQUFVO2tCQUFuQixNQUFNO1lBNkNQLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGRlYm91bmNlVGltZSwgdGFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IE5nQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgY2FydFRvdGFsOmFueTtcblxuICBASW5wdXQoKSBib251c2VzOiBhbnk7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTogc3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZVBheW1lbnRTbXNDb2RlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OiBhbnk7XG4gIEBJbnB1dCgpIHNlbGZTZXJ2aWNlOiBhbnk7XG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6IHN0cmluZztcblxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZztcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nO1xuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6IHN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZztcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2RJZDogc3RyaW5nO1xuICBASW5wdXQoKSBwZXJzb25zQ291bnQ6IG51bWJlcjtcbiAgQElucHV0KCkgY29tbWVudDogc3RyaW5nO1xuICBASW5wdXQoKSBjYWxsYmFjazogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGRhdGU6IHN0cmluZztcbiAgQElucHV0KCkgbm90aWZ5TWV0aG9kSWQ6IHN0cmluZztcbiAgXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcGF5bWVudFJlZGlyZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXG4gIGNhcnQ6IGFueTtcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ0NhcnRTZXJ2aWNlXG4gICkge1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0JCgpXG4gICAgICAuc3Vic2NyaWJlKGNhcnQgPT4gdGhpcy5jYXJ0ID0gY2FydCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XG4gICAgICAgICAgLy9pZigodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQpICYmIHRoaXMuaG9tZSAmJiB0aGlzLnBob25lICYmIHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLmxlbmd0aCA+IDExKSB7XG4gICAgICAgICAgaWYodGhpcy5sb2NhdGlvbklkIHx8ICh0aGlzLnN0cmVldElkIHx8IHRoaXMuc3RyZWV0KSAmJiB0aGlzLmhvbWUgfHwgdGhpcy5zZWxmU2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgLypmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAxOiB0aGlzLmxvY2F0aW9uSWQsXG4gICAgICAgICAgICAyOiB0aGlzLnN0cmVldElkLFxuICAgICAgICAgICAgMzogdGhpcy5zdHJlZXQsXG4gICAgICAgICAgICA0OiB0aGlzLmhvbWUsXG4gICAgICAgICAgICA1OiB0aGlzLmNhcnRUb3RhbCxcbiAgICAgICAgICAgIDY6IHRoaXMuYm9udXNlcyxcbiAgICAgICAgICAgIDc6IHRoaXMuZGVsaXZlcnksXG4gICAgICAgICAgICA4OiB0aGlzLnBheW1lbnRNZXRob2RJZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoZm9ybUNoYW5nZUtleSAhPT0gdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCovXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RyZWV0KCkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKCF0aGlzLmxvY2F0aW9uSWQgJiYgISgodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lKSAmJiAhdGhpcy5zZWxmU2VydmljZSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndGD0LbQvdC+INGD0LrQsNC30LDRgtGMINCw0LTRgNC10YEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcIlwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwi0J3QtSDRg9C60LDQt9Cw0L3QvlwiO1xuICAgIFxuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuaWQsXG4gICAgICAvL1wiY29tbWVudFwiOiBjb21tZW50LFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgLy9cInBlcnNvbnNDb3VudFwiOiArdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG4gICAgaWYodGhpcy5wYXltZW50TWV0aG9kSWQpIHtcbiAgICAgIGRhdGFbXCJwYXltZW50TWV0aG9kSWRcIl0gPSB0aGlzLnBheW1lbnRNZXRob2RJZDtcbiAgICB9XG5cbiAgICAvL2lmKHRoaXMuY2FsbGJhY2spIHtcbiAgICAvLyAgZGF0YVtcImN1c3RvbURhdGFcIl0gPSB7IGNhbGxiYWNrOiB0cnVlIH07XG4gICAgLy8gIGRhdGFbXCJjb21tZW50XCJdID0gJ9Cf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LUg0LTQu9GPINGD0YLQvtGH0L3QtdC90LjRjyDQtNC10YLQsNC70LXQuS4gJyArIGRhdGFbXCJjb21tZW50XCJdO1xuICAgIC8vfVxuXG4gICAgLy9pZih0aGlzLmRhdGUpIHtcbiAgICAvLyAgZGF0YVtcImRhdGVcIl0gPSB0aGlzLmRhdGU7XG4gICAgLy99XG5cbiAgICAvL2lmKHRoaXMubm90aWZ5TWV0aG9kSWQpIHtcbiAgICAvLyAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcbiAgICAvL31cblxuICAgIGRhdGFbXCJzZWxmU2VydmljZVwiXSA9IHRoaXMuc2VsZlNlcnZpY2U7XG5cblxuICAgIC8vaWYodGhpcy5ib251c2VzKSB7XG4gICAgLy8gIGRhdGFbJ2JvbnVzZXMnXSA9IHRoaXMuYm9udXNlcy5tYXAoYiA9PiB7XG4gICAgLy8gICAgcmV0dXJuIHtcbiAgICAvLyAgICAgIG5hbWU6IGIubmFtZSxcbiAgICAvLyAgICAgIGFtb3VudDogYi5hbW91bnRcbiAgICAvLyAgICB9XG4gICAgLy8gIH0pO1xuICAgIC8vfVxuXG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAvLyAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0LFxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FydElkID0gdGhpcy5jYXJ0LmlkO1xuXG4gICAgY29uc3Qgb25TdWNjZXNzID0gcmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQ/LmFjdGlvbj8uZGF0YT8ucmVkaXJlY3RMaW5rKSB7XG4gICAgICAgIHRoaXMucGF5bWVudFJlZGlyZWN0LmVtaXQocmVzdWx0LmFjdGlvbi5kYXRhWydyZWRpcmVjdExpbmsnXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnRW1pdCBjYXJ0SWQnLCBjYXJ0SWQpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuZW1pdChjYXJ0SWQpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHRoaXMucGhvbmVQYXltZW50U21zQ29kZSkge1xuICAgICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgICAucGF5bWVudExpbmskKHRoaXMucGhvbmVQYXltZW50U21zQ29kZSwgdGhpcy5waG9uZSlcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICBvblN1Y2Nlc3MsXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAgIC5vcmRlckNhcnQkKGRhdGEpXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgb25TdWNjZXNzLFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2UubmV4dChjaGFuZ2VzKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0KCkge1xuXG4gICAgLy9pZih0aGlzLnN0cmVldElkID09ICcwJykgcmV0dXJuO1xuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCJcIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcItCd0LUg0YPQutCw0LfQsNC90L5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmlkLFxuICAgICAgXCJjb21tZW50XCI6IGNvbW1lbnQsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgXCJwaG9uZVwiOiB0aGlzLnBob25lID8gdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSkgOiBudWxsLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZSB8fCBudWxsXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogK3RoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuICAgIGRhdGFbXCJzZWxmU2VydmljZVwiXSA9IHRoaXMuc2VsZlNlcnZpY2U7XG5cbiAgICBpZih0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICBkYXRhW1wiY3VzdG9tRGF0YVwiXSA9IHsgY2FsbGJhY2s6IHRydWUgfTtcbiAgICAgIGRhdGFbXCJjb21tZW50XCJdID0gJ9Cf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LUg0LTQu9GPINGD0YLQvtGH0L3QtdC90LjRjyDQtNC10YLQsNC70LXQuS4gJyArIGRhdGFbXCJjb21tZW50XCJdO1xuICAgIH1cblxuICAgIGlmKHRoaXMuZGF0ZSkge1xuICAgICAgZGF0YVtcImRhdGVcIl0gPSB0aGlzLmRhdGU7XG4gICAgfVxuXG4gICAgaWYodGhpcy5ub3RpZnlNZXRob2RJZCkge1xuICAgICAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcbiAgICB9XG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRJZFwiOiB0aGlzLnN0cmVldElkLFxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICBkYXRhW1wiY3VzdG9tRGF0YVwiXSA9IHsgY2FsbGJhY2s6IHRydWUgfTtcbiAgICB9XG4gICAgXG5cbiAgICB0aGlzLmlzQ2hlY2tpbmcuZW1pdCh0cnVlKTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5jaGVja0NhcnQkKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAvLygpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICAvL2Vycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICAgcmVzdWx0ID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpXG4gICAgICApO1xuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgaWYoIXBob25lKSByZXR1cm4gJyc7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnKzcnKTtcbiAgfVxufVxuIl19