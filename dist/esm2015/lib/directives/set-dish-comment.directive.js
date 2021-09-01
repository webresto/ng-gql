import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-cart.service";
export class SetDishCommentDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        this.setComment();
    }
    setComment() {
        this.cartService.setDishComment$(this.dish.id, this.comment).subscribe(res => this.success.emit(true), err => this.error.emit(err));
    }
}
SetDishCommentDirective.ɵfac = function SetDishCommentDirective_Factory(t) { return new (t || SetDishCommentDirective)(i0.ɵɵdirectiveInject(i1.NgCartService)); };
SetDishCommentDirective.ɵdir = i0.ɵɵdefineDirective({ type: SetDishCommentDirective, selectors: [["", "setDishComment", ""]], hostBindings: function SetDishCommentDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function SetDishCommentDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { comment: "comment", dish: "dish" }, outputs: { success: "success", error: "error" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SetDishCommentDirective, [{
        type: Directive,
        args: [{
                selector: '[setDishComment]'
            }]
    }], function () { return [{ type: i1.NgCartService }]; }, { comment: [{
            type: Input
        }], dish: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFLNUQsTUFBTSxPQUFPLHVCQUF1QjtJQVdsQyxZQUFvQixXQUF5QjtRQUF6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQVBuQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQU1JLENBQUM7SUFKM0IsT0FBTztRQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUlELFVBQVU7UUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUNuRSxHQUFHLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM1QixHQUFHLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUMxQixDQUFBO0lBR0gsQ0FBQzs7OEZBcEJVLHVCQUF1Qjs0REFBdkIsdUJBQXVCO29HQUF2QixhQUFTOzt1RkFBVCx1QkFBdUI7Y0FIbkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7Z0VBRVUsT0FBTztrQkFBZixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBRUksT0FBTztrQkFBaEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQUVnQixPQUFPO2tCQUE3QixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NldERpc2hDb21tZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUge1xuICBASW5wdXQoKSBjb21tZW50OmFueTtcbiAgQElucHV0KCkgZGlzaDphbnk7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICB0aGlzLnNldENvbW1lbnQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdDYXJ0U2VydmljZSkgeyB9XG5cbiAgc2V0Q29tbWVudCgpe1xuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvbW1lbnQkKHRoaXMuZGlzaC5pZCx0aGlzLmNvbW1lbnQpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+dGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICBlcnI9PnRoaXMuZXJyb3IuZW1pdChlcnIpXG4gICAgKVxuICAgIFxuXG4gIH1cblxufVxuIl19