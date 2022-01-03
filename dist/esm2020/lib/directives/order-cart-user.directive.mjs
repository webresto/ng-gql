import { Directive, Input, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-cart.service";
export class OrderCartUserDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.requiredFields = ["name", "phone", "street", "house"];
        this.checkerFields = new BehaviorSubject(undefined);
    }
    onClick() {
        this.order(this.orderCart.value);
        console.log(this.orderCart.value);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.cartService
                .userCart$()
                .subscribe(cart => {
                if (this.cart && this.orderCart.valid && this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                    this.checkStreet(this.orderCart.value);
                }
                this.cart = cart;
            });
        }, 100);
        setTimeout(() => {
            this.checkerFields.next(this.checkForFields(this.orderCart._directives, this.requiredFields));
        }, 100);
        this.checkerFields.subscribe(state => {
            if (state) {
                this.orderCart.controls['street'].valueChanges.subscribe(val => {
                    if (typeof val === 'object') {
                        setTimeout(() => {
                            if (this.orderCart.controls['house'].valid) {
                                this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                                this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                                this.checkStreet(this.orderCart.value);
                            }
                        }, 100);
                    }
                });
                this.orderCart.controls['house'].valueChanges.subscribe(val => {
                    setTimeout(() => {
                        if (this.orderCart.controls['street'].valid) {
                            this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                            this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                            this.checkStreet(this.orderCart.value);
                        }
                    }, 100);
                });
            }
        });
    }
    checkForFields(formDirectives, requiredFields) {
        let fieldsAreAvailable = {};
        let noFields = [];
        formDirectives.forEach(element => {
            fieldsAreAvailable[element.name] = true;
        });
        requiredFields.forEach(element => {
            if (!fieldsAreAvailable.hasOwnProperty(element)) {
                noFields.push(element);
            }
        });
        if (noFields.length <= 0) {
            return true;
        }
        else {
            console.error("У формы отсутсвуют следующие обязательные для корректной работы модуля поля:", noFields);
            return false;
        }
    }
    order(dataToSend) {
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let payment;
            let comment = dataToSend.comment || "Не указан";
            if (dataToSend.cash) {
                payment = "Наличными курьеру";
            }
            else if (dataToSend.bankcard) {
                payment = "Банковской картой курьеру";
            }
            else {
                payment = "Не указан";
            }
            console.log(dataToSend);
            let data = {
                "cartId": this.cart.id,
                // TODO: тип оплаты надо вынести в отдельный модуль.
                "comment": "\n Тип оплаты:" + payment + "\nКоментарий:" + comment,
                // "delivery": {
                //   "type": "string (self or nothing)"
                // },
                "address": {
                    // "city": "string",
                    "streetId": dataToSend.street.id,
                    "home": dataToSend.house,
                    "housing": dataToSend.housing,
                    // "index": "string",
                    "doorphone": dataToSend.doorphone,
                    "entrance": dataToSend.entrance,
                    "floor": dataToSend.floor,
                    "apartment": dataToSend.apartment
                },
                "customer": {
                    "phone": '+' + dataToSend.phone,
                    "mail": dataToSend.email,
                    "name": dataToSend.name
                },
                "personsCount": dataToSend.personsCount
            };
            this.cartService.orderCart$(data).subscribe();
        }
        else {
        }
    }
    checkStreet(dataToSend) {
        console.log(">>>>", dataToSend);
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let data = {
                "cartId": this.cart.id,
                "comment": dataToSend.comment,
                // "delivery": {
                //   "type": "string (self or nothing)"
                // },
                "address": {
                    // "city": "string",
                    "streetId": dataToSend.street.id,
                    "home": dataToSend.house,
                    "housing": dataToSend.housing,
                    // "index": "string",
                    "doorphone": dataToSend.doorphone,
                    "entrance": dataToSend.entrance,
                    "floor": dataToSend.floor,
                    "apartment": dataToSend.apartment
                },
                "customer": {
                    "phone": '+' + dataToSend.phone,
                    "mail": dataToSend.email,
                    "name": dataToSend.name
                },
                "personsCount": dataToSend.personsCount
            };
            //this.cartService.checkStreet(data);
        }
        else {
        }
    }
    stringToNumber(str) {
        console.log(typeof str);
        if (typeof str === 'string') {
            return +str;
        }
        else if (typeof str === "number") {
            return str;
        }
        else {
            console.error("Параметр home должен быть или string или number");
        }
    }
}
OrderCartUserDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: OrderCartUserDirective, deps: [{ token: i1.NgCartService }], target: i0.ɵɵFactoryTarget.Directive });
OrderCartUserDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: OrderCartUserDirective, selector: "[orderCart]", inputs: { orderCart: "orderCart" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: OrderCartUserDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[orderCart]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgCartService }]; }, propDecorators: { orderCart: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFNdkMsTUFBTSxPQUFPLHNCQUFzQjtJQWNqQyxZQUFvQixXQUF5QjtRQUF6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUhyQyxtQkFBYyxHQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSTFFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQVZELE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFTRCxlQUFlO1FBRWIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXO2lCQUNiLFNBQVMsRUFBRTtpQkFDWCxTQUFTLENBQUMsSUFBSSxDQUFBLEVBQUU7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUU7b0JBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FB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RUFBRSxVQUFVLENBQUMsU0FBUztpQkFDbEM7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLE9BQU8sRUFBRSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUs7b0JBQy9CLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSztvQkFDeEIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2lCQUN4QjtnQkFDRCxjQUFjLEVBQUUsVUFBVSxDQUFDLFlBQVk7YUFDeEMsQ0FBQztZQUNGLHFDQUFxQztTQUV0QzthQUFNO1NBRU47SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQWdCO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDO1NBQ2I7YUFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNsQyxPQUFPLEdBQUcsQ0FBQztTQUNaO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDOzttSEFsTFUsc0JBQXNCO3VHQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFIbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7b0dBR1UsU0FBUztzQkFBakIsS0FBSztnQkFJTixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW29yZGVyQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG9yZGVyQ2FydDphbnk7XG4gIGNhcnQ6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLm9yZGVyKHRoaXMub3JkZXJDYXJ0LnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPiA9IFtcIm5hbWVcIiwgXCJwaG9uZVwiLCBcInN0cmVldFwiLCBcImhvdXNlXCJdO1xuICBwcml2YXRlIGNoZWNrZXJGaWVsZHM6QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdDYXJ0U2VydmljZSkge1xuICAgIHRoaXMuY2hlY2tlckZpZWxkcyA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOnZvaWQge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAgIC51c2VyQ2FydCQoKVxuICAgICAgICAuc3Vic2NyaWJlKGNhcnQ9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FydCAmJiB0aGlzLm9yZGVyQ2FydC52YWxpZCAmJiB0aGlzLmNhcnQuY2FydFRvdGFsICE9IGNhcnQuY2FydFRvdGFsICYmIGNhcnQuY2FydFRvdGFsID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICAgICAgfSk7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VyRmllbGRzLm5leHQodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpO1xuICAgIH0sIDEwMCk7XG5cbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snaG91c2UnXS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lIHx8IFwi0J3QtdGD0LrQsNC30LDQvdC+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydzdHJlZXQnXS52YWxpZCkge1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcItCd0LXRg9C60LDQt9Cw0L3QvlwiO1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lIHx8IFwiNzg4ODg4ODg4ODhcIjtcbiAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgfVxuXG5cbiAgY2hlY2tGb3JGaWVsZHMoZm9ybURpcmVjdGl2ZXM6QXJyYXk8YW55PiwgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPik6Ym9vbGVhbiB7XG5cbiAgICBsZXQgZmllbGRzQXJlQXZhaWxhYmxlOm9iamVjdCA9IHt9O1xuICAgIGxldCBub0ZpZWxkczpBcnJheTxzdHJpbmc+ID0gW107XG5cblxuICAgIGZvcm1EaXJlY3RpdmVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBmaWVsZHNBcmVBdmFpbGFibGVbZWxlbWVudC5uYW1lXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKCFmaWVsZHNBcmVBdmFpbGFibGUuaGFzT3duUHJvcGVydHkoZWxlbWVudCkpIHtcbiAgICAgICAgbm9GaWVsZHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub0ZpZWxkcy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLQoyDRhNC+0YDQvNGLINC+0YLRgdGD0YLRgdCy0YPRjtGCINGB0LvQtdC00YPRjtGJ0LjQtSDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0LUg0LTQu9GPINC60L7RgNGA0LXQutGC0L3QvtC5INGA0LDQsdC+0YLRiyDQvNC+0LTRg9C70Y8g0L/QvtC70Y86XCIsIG5vRmllbGRzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9yZGVyKGRhdGFUb1NlbmQpIHtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBwYXltZW50O1xuICAgICAgbGV0IGNvbW1lbnQgPSBkYXRhVG9TZW5kLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiXG5cbiAgICAgIGlmIChkYXRhVG9TZW5kLmNhc2gpIHtcbiAgICAgICAgcGF5bWVudCA9IFwi0J3QsNC70LjRh9C90YvQvNC4INC60YPRgNGM0LXRgNGDXCI7XG4gICAgICB9IGVsc2UgaWYgKGRhdGFUb1NlbmQuYmFua2NhcmQpIHtcbiAgICAgICAgcGF5bWVudCA9IFwi0JHQsNC90LrQvtCy0YHQutC+0Lkg0LrQsNGA0YLQvtC5INC60YPRgNGM0LXRgNGDXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXltZW50ID0gXCLQndC1INGD0LrQsNC30LDQvVwiO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YVRvU2VuZCk7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmlkLFxuICAgICAgICAvLyBUT0RPOiDRgtC40L8g0L7Qv9C70LDRgtGLINC90LDQtNC+INCy0YvQvdC10YHRgtC4INCyINC+0YLQtNC10LvRjNC90YvQuSDQvNC+0LTRg9C70YwuXG4gICAgICAgIFwiY29tbWVudFwiOiBcIlxcbiDQotC40L8g0L7Qv9C70LDRgtGLOlwiICsgcGF5bWVudCArIFwiXFxu0JrQvtC80LXQvdGC0LDRgNC40Lk6XCIgKyBjb21tZW50LFxuICAgICAgICAvLyBcImRlbGl2ZXJ5XCI6IHtcbiAgICAgICAgLy8gICBcInR5cGVcIjogXCJzdHJpbmcgKHNlbGYgb3Igbm90aGluZylcIlxuICAgICAgICAvLyB9LFxuICAgICAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICAgIC8vIFwiY2l0eVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwic3RyZWV0SWRcIjogZGF0YVRvU2VuZC5zdHJlZXQuaWQsXG4gICAgICAgICAgXCJob21lXCI6IGRhdGFUb1NlbmQuaG91c2UsXG4gICAgICAgICAgXCJob3VzaW5nXCI6IGRhdGFUb1NlbmQuaG91c2luZyxcbiAgICAgICAgICAvLyBcImluZGV4XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJkb29ycGhvbmVcIjogZGF0YVRvU2VuZC5kb29ycGhvbmUsXG4gICAgICAgICAgXCJlbnRyYW5jZVwiOiBkYXRhVG9TZW5kLmVudHJhbmNlLFxuICAgICAgICAgIFwiZmxvb3JcIjogZGF0YVRvU2VuZC5mbG9vcixcbiAgICAgICAgICBcImFwYXJ0bWVudFwiOiBkYXRhVG9TZW5kLmFwYXJ0bWVudFxuICAgICAgICB9LFxuICAgICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgICBcInBob25lXCI6ICcrJyArIGRhdGFUb1NlbmQucGhvbmUsXG4gICAgICAgICAgXCJtYWlsXCI6IGRhdGFUb1NlbmQuZW1haWwsXG4gICAgICAgICAgXCJuYW1lXCI6IGRhdGFUb1NlbmQubmFtZVxuICAgICAgICB9LFxuICAgICAgICBcInBlcnNvbnNDb3VudFwiOiBkYXRhVG9TZW5kLnBlcnNvbnNDb3VudFxuICAgICAgfTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uub3JkZXJDYXJ0JChkYXRhKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIGNoZWNrU3RyZWV0KGRhdGFUb1NlbmQpIHtcbiAgICBjb25zb2xlLmxvZyhcIj4+Pj5cIixkYXRhVG9TZW5kKTtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuaWQsXG4gICAgICAgIFwiY29tbWVudFwiOiBkYXRhVG9TZW5kLmNvbW1lbnQsXG4gICAgICAgIC8vIFwiZGVsaXZlcnlcIjoge1xuICAgICAgICAvLyAgIFwidHlwZVwiOiBcInN0cmluZyAoc2VsZiBvciBub3RoaW5nKVwiXG4gICAgICAgIC8vIH0sXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgICAgLy8gXCJjaXR5XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJzdHJlZXRJZFwiOiBkYXRhVG9TZW5kLnN0cmVldC5pZCxcbiAgICAgICAgICBcImhvbWVcIjogZGF0YVRvU2VuZC5ob3VzZSxcbiAgICAgICAgICBcImhvdXNpbmdcIjogZGF0YVRvU2VuZC5ob3VzaW5nLFxuICAgICAgICAgIC8vIFwiaW5kZXhcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcImRvb3JwaG9uZVwiOiBkYXRhVG9TZW5kLmRvb3JwaG9uZSxcbiAgICAgICAgICBcImVudHJhbmNlXCI6IGRhdGFUb1NlbmQuZW50cmFuY2UsXG4gICAgICAgICAgXCJmbG9vclwiOiBkYXRhVG9TZW5kLmZsb29yLFxuICAgICAgICAgIFwiYXBhcnRtZW50XCI6IGRhdGFUb1NlbmQuYXBhcnRtZW50XG4gICAgICAgIH0sXG4gICAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAgIFwicGhvbmVcIjogJysnICsgZGF0YVRvU2VuZC5waG9uZSxcbiAgICAgICAgICBcIm1haWxcIjogZGF0YVRvU2VuZC5lbWFpbCxcbiAgICAgICAgICBcIm5hbWVcIjogZGF0YVRvU2VuZC5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIFwicGVyc29uc0NvdW50XCI6IGRhdGFUb1NlbmQucGVyc29uc0NvdW50XG4gICAgICB9O1xuICAgICAgLy90aGlzLmNhcnRTZXJ2aWNlLmNoZWNrU3RyZWV0KGRhdGEpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgIH1cbiAgfVxuXG4gIHN0cmluZ1RvTnVtYmVyKHN0cjpudW1iZXIgfCBhbnkpOm51bWJlciB7XG4gICAgY29uc29sZS5sb2codHlwZW9mIHN0cik7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gK3N0cjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdHIgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLQn9Cw0YDQsNC80LXRgtGAIGhvbWUg0LTQvtC70LbQtdC9INCx0YvRgtGMINC40LvQuCBzdHJpbmcg0LjQu9C4IG51bWJlclwiKTtcbiAgICB9XG4gIH1cblxufVxuIl19