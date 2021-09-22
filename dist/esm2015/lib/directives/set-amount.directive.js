import { Directive, Input, HostListener } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-cart.service";
export class SetAmountDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart$()
            .subscribe(res => this.cart = res);
    }
    onClick() {
        this.changeAmount(this.action);
    }
    changeAmount(action) {
        switch (action) {
            case '+':
                this.cartService.setDishCountToCart$(this.dish.id, this.dish.amount + 1).subscribe();
                break;
            case '-':
                this.cartService.setDishCountToCart$(this.dish.id, this.dish.amount - 1).subscribe();
                break;
            default:
                console.log("Директива SetDishAmount получила ложное значение action");
                break;
        }
    }
}
SetAmountDirective.ɵfac = function SetAmountDirective_Factory(t) { return new (t || SetAmountDirective)(i0.ɵɵdirectiveInject(i1.NgCartService)); };
SetAmountDirective.ɵdir = i0.ɵɵdefineDirective({ type: SetAmountDirective, selectors: [["", "setDishAmount", ""]], hostBindings: function SetAmountDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function SetAmountDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { action: "action", dish: "dish" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SetAmountDirective, [{
        type: Directive,
        args: [{
                selector: '[setDishAmount]'
            }]
    }], function () { return [{ type: i1.NgCartService }]; }, { action: [{
            type: Input
        }], dish: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWFtb3VudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBSzVELE1BQU0sT0FBTyxrQkFBa0I7SUFVN0IsWUFBb0IsV0FBeUI7UUFBekIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFDM0MsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLEVBQUU7YUFDWCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFWc0IsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBVUQsWUFBWSxDQUFDLE1BQU07UUFFakIsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNyQixDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNkLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNyQixDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNkLE1BQU07WUFDUjtnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU07U0FDVDtJQUVILENBQUM7O29GQXBDVSxrQkFBa0I7dURBQWxCLGtCQUFrQjsrRkFBbEIsYUFBUzs7dUZBQVQsa0JBQWtCO2NBSDlCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCO2dFQUVVLE1BQU07a0JBQWQsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUVpQixPQUFPO2tCQUE3QixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2V0RGlzaEFtb3VudF0nXG59KVxuZXhwb3J0IGNsYXNzIFNldEFtb3VudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGFjdGlvbjphbnk7XG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICB0aGlzLmNoYW5nZUFtb3VudCh0aGlzLmFjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0JCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydCQoXG4gICAgICAgICAgdGhpcy5kaXNoLmlkLFxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgKyAxXG4gICAgICAgICkuc3Vic2NyaWJlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLSc6XG4gICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvdW50VG9DYXJ0JChcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXG4gICAgICAgICAgdGhpcy5kaXNoLmFtb3VudCAtIDFcbiAgICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcItCU0LjRgNC10LrRgtC40LLQsCBTZXREaXNoQW1vdW50INC/0L7Qu9GD0YfQuNC70LAg0LvQvtC20L3QvtC1INC30L3QsNGH0LXQvdC40LUgYWN0aW9uXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG59XG4iXX0=