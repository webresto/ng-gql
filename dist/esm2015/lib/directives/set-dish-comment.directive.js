import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
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
SetDishCommentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[setDishComment]'
            },] }
];
SetDishCommentDirective.ctorParameters = () => [
    { type: NgCartService }
];
SetDishCommentDirective.propDecorators = {
    comment: [{ type: Input }],
    dish: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSzVELE1BQU0sT0FBTyx1QkFBdUI7SUFXbEMsWUFBb0IsV0FBeUI7UUFBekIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFQbkMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFNSSxDQUFDO0lBSjNCLE9BQU87UUFDNUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFJRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDbkUsR0FBRyxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDNUIsR0FBRyxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDMUIsQ0FBQTtJQUdILENBQUM7OztZQXZCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjthQUM3Qjs7O1lBSlEsYUFBYTs7O3NCQU1uQixLQUFLO21CQUNMLEtBQUs7c0JBRUwsTUFBTTtvQkFDTixNQUFNO3NCQUVOLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLWNhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZXREaXNoQ29tbWVudF0nXG59KVxuZXhwb3J0IGNsYXNzIFNldERpc2hDb21tZW50RGlyZWN0aXZlIHtcbiAgQElucHV0KCkgY29tbWVudDphbnk7XG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5zZXRDb21tZW50KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nQ2FydFNlcnZpY2UpIHsgfVxuXG4gIHNldENvbW1lbnQoKXtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb21tZW50JCh0aGlzLmRpc2guaWQsdGhpcy5jb21tZW50KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PnRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgZXJyPT50aGlzLmVycm9yLmVtaXQoZXJyKVxuICAgIClcbiAgICBcblxuICB9XG5cbn1cbiJdfQ==