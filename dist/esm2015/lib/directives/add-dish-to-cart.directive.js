import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';
export class AddDishToCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
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
            "cartDishId": this.replaceCartDishId
        };
        console.log('this.cart', this.cart);
        console.log('this.modifiers', this.modifiers);
        if (this.cart.id)
            data.cartId = this.cart.id;
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe(_ => this.success.emit(true), e => this.error.emit(e), () => {
            this.loading.emit(false);
        });
    }
}
AddDishToCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[addToCart]'
            },] }
];
AddDishToCartDirective.ctorParameters = () => [
    { type: NgCartService }
];
AddDishToCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    comment: [{ type: Input }],
    replaceCartDishId: [{ type: Input }],
    loading: [{ type: Output }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTTVELE1BQU0sT0FBTyxzQkFBc0I7SUFLakMsWUFBb0IsV0FBeUI7UUFBekIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFjbkMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFmeEMsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLEVBQUU7YUFDWCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXO2FBQ2IsWUFBWSxFQUFFO2FBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBWUQsT0FBTztRQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFTyxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU07UUFFbEMsSUFBSSxJQUFJLEdBQUc7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwRCxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtTQUNyQyxDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsV0FBVzthQUNiLGNBQWMsQ0FBQyxJQUFJLENBQUM7YUFDcEIsU0FBUyxDQUNSLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzVCLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3ZCLEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFCLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQzs7O1lBM0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4Qjs7O1lBTFEsYUFBYTs7O21CQW9CbkIsS0FBSzt5QkFDTCxLQUFLO3NCQUNMLEtBQUs7Z0NBQ0wsS0FBSztzQkFFTCxNQUFNO3NCQUNOLE1BQU07b0JBQ04sTUFBTTtzQkFFTixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1jYXJ0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thZGRUb0NhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuICBtb2RpZmllcnM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0JCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5nZXRNb2RpZmllcnMoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5tb2RpZmllcnMgPSByZXMpO1xuICB9XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuICBASW5wdXQoKSBjb21tZW50OnN0cmluZztcbiAgQElucHV0KCkgcmVwbGFjZUNhcnREaXNoSWQ6Ym9vbGVhbjtcblxuICBAT3V0cHV0KCkgbG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmFkZERpc2hUb0NhcnQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpXG4gIH1cblxuICBwcml2YXRlIGFkZERpc2hUb0NhcnQoZGlzaElELCBhbW91bnQpIHtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50LFxuICAgICAgXCJjYXJ0SWRcIjogdW5kZWZpbmVkLFxuICAgICAgXCJtb2RpZmllcnNcIjogdGhpcy5tb2RpZmllcnMsXG4gICAgICBcImNvbW1lbnRcIjogdGhpcy5jb21tZW50LFxuICAgICAgXCJyZXBsYWNlXCI6IHRoaXMucmVwbGFjZUNhcnREaXNoSWQgPyB0cnVlIDogdW5kZWZpbmVkLFxuICAgICAgXCJjYXJ0RGlzaElkXCI6IHRoaXMucmVwbGFjZUNhcnREaXNoSWRcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJ3RoaXMuY2FydCcsIHRoaXMuY2FydCk7XG4gICAgY29uc29sZS5sb2coJ3RoaXMubW9kaWZpZXJzJywgdGhpcy5tb2RpZmllcnMpO1xuXG4gICAgaWYgKHRoaXMuY2FydC5pZCkgZGF0YS5jYXJ0SWQgPSB0aGlzLmNhcnQuaWQ7XG5cbiAgICB0aGlzLmxvYWRpbmcuZW1pdCh0cnVlKTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5hZGREaXNoVG9DYXJ0JChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgXyA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZSA9PiB0aGlzLmVycm9yLmVtaXQoZSksXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcuZW1pdChmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG5cbn1cbiJdfQ==