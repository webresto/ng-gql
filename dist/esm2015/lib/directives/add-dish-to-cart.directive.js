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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTTVELE1BQU0sT0FBTyxzQkFBc0I7SUFLakMsWUFBb0IsV0FBeUI7UUFBekIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFjbkMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFmeEMsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLEVBQUU7YUFDWCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXO2FBQ2IsWUFBWSxFQUFFO2FBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBWUQsT0FBTztRQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFTyxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU07UUFFbEMsSUFBSSxJQUFJLEdBQUc7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwRCxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtTQUNyQyxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxXQUFXO2FBQ2IsY0FBYyxDQUFDLElBQUksQ0FBQzthQUNwQixTQUFTLENBQ1IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDNUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDdkIsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDOzs7WUF4REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7WUFMUSxhQUFhOzs7bUJBb0JuQixLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsS0FBSztnQ0FDTCxLQUFLO3NCQUVMLE1BQU07c0JBQ04sTUFBTTtvQkFDTixNQUFNO3NCQUVOLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlICwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLWNhcnQuc2VydmljZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FkZFRvQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIEFkZERpc2hUb0NhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG4gIG1vZGlmaWVycztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQkKClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmdldE1vZGlmaWVycygpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLm1vZGlmaWVycyA9IHJlcyk7XG4gIH1cblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSByZXBsYWNlQ2FydERpc2hJZDpib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBsb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuYWRkRGlzaFRvQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGlzaFRvQ2FydChkaXNoSUQsIGFtb3VudCkge1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnQsXG4gICAgICBcImNhcnRJZFwiOiB1bmRlZmluZWQsXG4gICAgICBcIm1vZGlmaWVyc1wiOiB0aGlzLm1vZGlmaWVycyxcbiAgICAgIFwiY29tbWVudFwiOiB0aGlzLmNvbW1lbnQsXG4gICAgICBcInJlcGxhY2VcIjogdGhpcy5yZXBsYWNlQ2FydERpc2hJZCA/IHRydWUgOiB1bmRlZmluZWQsXG4gICAgICBcImNhcnREaXNoSWRcIjogdGhpcy5yZXBsYWNlQ2FydERpc2hJZFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jYXJ0LmlkKSBkYXRhLmNhcnRJZCA9IHRoaXMuY2FydC5pZDtcblxuICAgIHRoaXMubG9hZGluZy5lbWl0KHRydWUpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmFkZERpc2hUb0NhcnQkKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICBfID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlID0+IHRoaXMuZXJyb3IuZW1pdChlKSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZGluZy5lbWl0KGZhbHNlKVxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cblxufVxuIl19