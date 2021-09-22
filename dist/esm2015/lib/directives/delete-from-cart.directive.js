import { Directive, HostListener, Input } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
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
DeleteFromCartDirective.ɵfac = function DeleteFromCartDirective_Factory(t) { return new (t || DeleteFromCartDirective)(i0.ɵɵdirectiveInject(i1.NgCartService)); };
DeleteFromCartDirective.ɵdir = i0.ɵɵdefineDirective({ type: DeleteFromCartDirective, selectors: [["", "deleteFromCart", ""]], hostBindings: function DeleteFromCartDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function DeleteFromCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { dish: "dish", amountDish: "amountDish" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DeleteFromCartDirective, [{
        type: Directive,
        args: [{
                selector: '[deleteFromCart]'
            }]
    }], function () { return [{ type: i1.NgCartService }]; }, { dish: [{
            type: Input
        }], amountDish: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBSzVELE1BQU0sT0FBTyx1QkFBdUI7SUFJbEMsWUFBb0IsV0FBeUI7UUFBekIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFDM0MsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLEVBQUU7YUFDWCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFPRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDakYsQ0FBQzs7OEZBakJVLHVCQUF1Qjs0REFBdkIsdUJBQXVCO29HQUF2QixhQUFTOzt1RkFBVCx1QkFBdUI7Y0FIbkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7Z0VBWVUsSUFBSTtrQkFBWixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUdOLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlICwgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlbGV0ZUZyb21DYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0JCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuICB9XG5cblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuY2FydFNlcnZpY2UucmVtb3ZlRGlzaEZyb21DYXJ0JCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaCkuc3Vic2NyaWJlKClcbiAgfVxuXG59XG4iXX0=