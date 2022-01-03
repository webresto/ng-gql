import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-cart.service";
export class DeleteFromCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart$()
            .subscribe(res => this.cart = res);
    }
    onClick() {
        this.cartService.removeDishFromCart$(this.dish.id, this.amountDish).subscribe();
    }
}
DeleteFromCartDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DeleteFromCartDirective, deps: [{ token: i1.NgCartService }], target: i0.ɵɵFactoryTarget.Directive });
DeleteFromCartDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: DeleteFromCartDirective, selector: "[deleteFromCart]", inputs: { dish: "dish", amountDish: "amountDish" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DeleteFromCartDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[deleteFromCart]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgCartService }]; }, propDecorators: { dish: [{
                type: Input
            }], amountDish: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFNL0QsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUFvQixXQUF5QjtRQUF6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUMzQyxJQUFJLENBQUMsV0FBVzthQUNiLFNBQVMsRUFBRTthQUNYLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU9ELE9BQU87UUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNqRixDQUFDOztvSEFqQlUsdUJBQXVCO3dHQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFIbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2lCQUM3QjtvR0FZVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFHTixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLWNhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWxldGVGcm9tQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdDYXJ0U2VydmljZSkge1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJlbW92ZURpc2hGcm9tQ2FydCQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpLnN1YnNjcmliZSgpXG4gIH1cblxufVxuIl19