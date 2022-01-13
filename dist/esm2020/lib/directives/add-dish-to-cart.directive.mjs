import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-cart.service";
export class AddDishToCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.modifiers = [];
        this.amountDish = 0;
        this.replaceCartDishId = false;
        this.loading = new EventEmitter();
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.cartService
            .userCart$()
            .subscribe(res => this.cart = res);
        this.cartService
            .getModifiers()
            .subscribe(res => this.modifiers = res);
    }
    onClick() {
        this.addDishToCart(this.dish.id, this.amountDish);
    }
    addDishToCart(dishID, amount) {
        let data = {
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
            .subscribe(_ => this.success.emit(true), e => this.error.emit(e), () => {
            this.loading.emit(false);
        });
    }
}
AddDishToCartDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddDishToCartDirective, deps: [{ token: i1.NgCartService }], target: i0.ɵɵFactoryTarget.Directive });
AddDishToCartDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: AddDishToCartDirective, selector: "[addToCart]", inputs: { dish: "dish", amountDish: "amountDish", comment: "comment", replaceCartDishId: "replaceCartDishId" }, outputs: { loading: "loading", success: "success", error: "error" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddDishToCartDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[addToCart]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgCartService }]; }, propDecorators: { dish: [{
                type: Input
            }], amountDish: [{
                type: Input
            }], comment: [{
                type: Input
            }], replaceCartDishId: [{
                type: Input
            }], loading: [{
                type: Output
            }], success: [{
                type: Output
            }], error: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy1ncWwvc3JjL2xpYi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUcsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFPckYsTUFBTSxPQUFPLHNCQUFzQjtJQUtqQyxZQUFvQixXQUF5QjtRQUF6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUY3QyxjQUFTLEdBQW1CLEVBQUUsQ0FBQztRQVl0QixlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBRXRCLHNCQUFpQixHQUFXLEtBQUssQ0FBQztRQUVqQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQWZ4QyxJQUFJLENBQUMsV0FBVzthQUNiLFNBQVMsRUFBRTthQUNYLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVc7YUFDYixZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFZRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUVsRCxJQUFJLElBQUksR0FBa0I7WUFDeEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTztZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDcEQsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtTQUM1QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLFdBQVc7YUFDYixjQUFjLENBQUMsSUFBSSxDQUFDO2FBQ3BCLFNBQVMsQ0FDUixDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM1QixDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUN2QixHQUFHLEVBQUU7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7O21IQW5EVSxzQkFBc0I7dUdBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQUhsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4QjtvR0FlVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVJLE9BQU87c0JBQWhCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxLQUFLO3NCQUFkLE1BQU07Z0JBR1AsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IEFkZFRvQ2FydElucHV0LCBDYXJ0LCBEaXNoLCBDYXJ0TW9kaWZpZXIgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgTmdDYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLWNhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thZGRUb0NhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0OkNhcnQgfCB1bmRlZmluZWQ7XG4gIG1vZGlmaWVyczogQ2FydE1vZGlmaWVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQkKClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmdldE1vZGlmaWVycygpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLm1vZGlmaWVycyA9IHJlcyk7XG4gIH1cblxuICBASW5wdXQoKSBkaXNoOkRpc2ggfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6bnVtYmVyID0gMDtcbiAgQElucHV0KCkgY29tbWVudDpzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIHJlcGxhY2VDYXJ0RGlzaElkOmJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgbG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmFkZERpc2hUb0NhcnQodGhpcy5kaXNoIS5pZCwgdGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcHJpdmF0ZSBhZGREaXNoVG9DYXJ0KGRpc2hJRDogc3RyaW5nLCBhbW91bnQ6IG51bWJlcikge1xuXG4gICAgbGV0IGRhdGE6QWRkVG9DYXJ0SW5wdXQgPSB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnQsXG4gICAgICBcImNhcnRJZFwiOiB1bmRlZmluZWQsXG4gICAgICBcIm1vZGlmaWVyc1wiOiB0aGlzLm1vZGlmaWVycyxcbiAgICAgIFwiY29tbWVudFwiOiB0aGlzLmNvbW1lbnQsXG4gICAgICBcInJlcGxhY2VcIjogdGhpcy5yZXBsYWNlQ2FydERpc2hJZCA/IHRydWUgOiB1bmRlZmluZWQsXG4gICAgICBcImNhcnREaXNoSWRcIjogdGhpcy5jYXJ0Py5pZFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRpbmcuZW1pdCh0cnVlKTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5hZGREaXNoVG9DYXJ0JChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgXyA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZSA9PiB0aGlzLmVycm9yLmVtaXQoZSksXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcuZW1pdChmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG5cbn1cbiJdfQ==