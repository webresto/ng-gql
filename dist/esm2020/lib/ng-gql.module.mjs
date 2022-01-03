import { Inject, NgModule } from '@angular/core';
import { split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache } from '@apollo/client/core';
import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
//import { ModifiresDirective } from './directives/modifires.directive';
import { SetAmountDirective } from './directives/set-amount.directive';
import { DishCalcDirective } from './directives/dish-calc.directive';
import { CheckoutDirective } from "./directives/checkout.directive";
import { SetDishCommentDirective } from './directives/set-dish-comment.directive';
import * as i0 from "@angular/core";
import * as i1 from "apollo-angular";
import * as i2 from "apollo-angular/http";
const DIRECTIVES = [
    AddDishToCartDirective,
    AmountCartDirective,
    DeleteFromCartDirective,
    OrderCartUserDirective,
    //ModifiresDirective,
    DishCalcDirective,
    SetDishCommentDirective,
    SetAmountDirective,
    CheckoutDirective,
];
export class NgGqlModule {
    constructor(apollo, httpLink, config) {
        // Create an http link:
        const http = httpLink.create({
            uri: config.url,
        });
        // Create a WebSocket link:
        const ws = new WebSocketLink({
            uri: config.url.replace('http', 'ws'),
            options: {
                reconnect: true,
            },
        });
        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
        // split based on operation type
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (kind === 'OperationDefinition' && operation === 'subscription');
        }, ws, http);
        if (apollo.client)
            return;
        apollo.create({
            link,
            cache: new InMemoryCache()
        });
    }
    static forRoot(config) {
        return {
            ngModule: NgGqlModule,
            providers: [
                {
                    provide: 'config',
                    useValue: config
                }
            ]
        };
    }
}
NgGqlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgGqlModule, deps: [{ token: i1.Apollo }, { token: i2.HttpLink }, { token: 'config' }], target: i0.ɵɵFactoryTarget.NgModule });
NgGqlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgGqlModule, declarations: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective], exports: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective] });
NgGqlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgGqlModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgGqlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    exports: [DIRECTIVES],
                    declarations: [DIRECTIVES]
                }]
        }], ctorParameters: function () { return [{ type: i1.Apollo }, { type: i2.HttpLink }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbmctZ3FsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsd0VBQXdFO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBR2xGLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsaUJBQWlCO0NBQ2xCLENBQUM7QUFXRixNQUFNLE9BQU8sV0FBVztJQUV0QixZQUNFLE1BQWMsRUFDZCxRQUFrQixFQUNBLE1BQW1CO1FBR3JDLHVCQUF1QjtRQUN2QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzNCLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztTQUNoQixDQUFDLENBQUM7UUFFSCwyQkFBMkI7UUFDM0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxhQUFhLENBQUM7WUFDM0IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDckMsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRSxJQUFJO2FBQ2hCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsbUVBQW1FO1FBQ25FLG9EQUFvRDtRQUNwRCxNQUFNLElBQUksR0FBRyxLQUFLO1FBQ2hCLGdDQUFnQztRQUNoQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUE0QixDQUFDO1lBQ2hGLE9BQU8sQ0FDTCxJQUFJLEtBQUsscUJBQXFCLElBQUksU0FBUyxLQUFLLGNBQWMsQ0FDL0QsQ0FBQztRQUNKLENBQUMsRUFDRCxFQUFFLEVBQ0YsSUFBSSxDQUNMLENBQUM7UUFFRixJQUFJLE1BQU0sQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUUxQixNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ1osSUFBSTtZQUNKLEtBQUssRUFBRSxJQUFJLGFBQWEsRUFBRTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFtQjtRQUNoQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxRQUFRO29CQUNqQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOzt3R0FyRFUsV0FBVyxnRUFLWixRQUFRO3lHQUxQLFdBQVcsaUJBcEJ0QixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsa0JBQWtCO1FBQ2xCLGlCQUFpQixhQVJqQixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsa0JBQWtCO1FBQ2xCLGlCQUFpQjt5R0FZTixXQUFXLFlBSmIsRUFBRTsyRkFJQSxXQUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDckIsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUMzQjs7MEJBTUksTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBcG9sbG8gfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5pbXBvcnQgeyBIdHRwTGluayB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgc3BsaXQgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IFdlYlNvY2tldExpbmsgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9saW5rL3dzJztcbmltcG9ydCB7IGdldE1haW5EZWZpbml0aW9uIH0gZnJvbSAnQGFwb2xsby9jbGllbnQvdXRpbGl0aWVzJztcbmltcG9ydCB7IEluTWVtb3J5Q2FjaGUgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IE9wZXJhdGlvbkRlZmluaXRpb25Ob2RlIH0gZnJvbSAnZ3JhcGhxbCc7XG5cbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnO1xuXG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXG4gIEFtb3VudENhcnREaXJlY3RpdmUsXG4gIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlLFxuICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxuICAvL01vZGlmaXJlc0RpcmVjdGl2ZSxcbiAgRGlzaENhbGNEaXJlY3RpdmUsXG4gIFNldERpc2hDb21tZW50RGlyZWN0aXZlLFxuICBTZXRBbW91bnREaXJlY3RpdmUsXG4gIENoZWNrb3V0RGlyZWN0aXZlLFxuXTtcblxuZXhwb3J0IGludGVyZmFjZSBOZ0dxbENvbmZpZyB7XG4gIHVybDogc3RyaW5nO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVNdLFxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0dxbE1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYXBvbGxvOiBBcG9sbG8sXG4gICAgaHR0cExpbms6IEh0dHBMaW5rLFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIGNvbmZpZzogTmdHcWxDb25maWdcbiAgKSB7XG5cbiAgICAvLyBDcmVhdGUgYW4gaHR0cCBsaW5rOlxuICAgIGNvbnN0IGh0dHAgPSBodHRwTGluay5jcmVhdGUoe1xuICAgICAgdXJpOiBjb25maWcudXJsLFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgV2ViU29ja2V0IGxpbms6XG4gICAgY29uc3Qgd3MgPSBuZXcgV2ViU29ja2V0TGluayh7XG4gICAgICB1cmk6IGNvbmZpZy51cmwucmVwbGFjZSgnaHR0cCcsICd3cycpLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICByZWNvbm5lY3Q6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gdXNpbmcgdGhlIGFiaWxpdHkgdG8gc3BsaXQgbGlua3MsIHlvdSBjYW4gc2VuZCBkYXRhIHRvIGVhY2ggbGlua1xuICAgIC8vIGRlcGVuZGluZyBvbiB3aGF0IGtpbmQgb2Ygb3BlcmF0aW9uIGlzIGJlaW5nIHNlbnRcbiAgICBjb25zdCBsaW5rID0gc3BsaXQoXG4gICAgICAvLyBzcGxpdCBiYXNlZCBvbiBvcGVyYXRpb24gdHlwZVxuICAgICAgKHsgcXVlcnkgfSkgPT4ge1xuICAgICAgICBjb25zdCB7IGtpbmQsIG9wZXJhdGlvbiB9ID0gZ2V0TWFpbkRlZmluaXRpb24ocXVlcnkpIGFzIE9wZXJhdGlvbkRlZmluaXRpb25Ob2RlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJyAmJiBvcGVyYXRpb24gPT09ICdzdWJzY3JpcHRpb24nXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgd3MsXG4gICAgICBodHRwLFxuICAgICk7XG5cbiAgICBpZiAoYXBvbGxvLmNsaWVudCkgcmV0dXJuO1xuXG4gICAgYXBvbGxvLmNyZWF0ZSh7XG4gICAgICBsaW5rLFxuICAgICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKClcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogTmdHcWxDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5nR3FsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ0dxbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ2NvbmZpZycsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=