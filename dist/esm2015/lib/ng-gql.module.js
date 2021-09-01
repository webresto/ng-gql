import { Inject, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
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
const defaultUrl = 'https://stage4.api.lifenadym.webresto.dev/graphql';
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
NgGqlModule.ɵfac = function NgGqlModule_Factory(t) { return new (t || NgGqlModule)(i0.ɵɵinject(i1.Apollo), i0.ɵɵinject(i2.HttpLink), i0.ɵɵinject('config')); };
NgGqlModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgGqlModule });
NgGqlModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgGqlModule, { declarations: [AddDishToCartDirective,
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
        CheckoutDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgGqlModule, [{
        type: NgModule,
        args: [{
                imports: [],
                exports: [DIRECTIVES],
                declarations: [DIRECTIVES]
            }]
    }], function () { return [{ type: i1.Apollo }, { type: i2.HttpLink }, { type: undefined, decorators: [{
                type: Inject,
                args: ['config']
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbmctZ3FsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLE1BQU0sRUFBa0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBdUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLHdFQUF3RTtBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7OztBQUdsRixNQUFNLFVBQVUsR0FBRztJQUNqQixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtDQUNsQixDQUFDO0FBTUYsTUFBTSxVQUFVLEdBQUcsbURBQW1ELENBQUM7QUFPdkUsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFDRSxNQUFjLEVBQ2QsUUFBa0IsRUFDQSxNQUFtQjtRQUdyQyx1QkFBdUI7UUFDdkIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMzQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLE1BQU0sRUFBRSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQzNCLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1lBQ3JDLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsSUFBSTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILG1FQUFtRTtRQUNuRSxvREFBb0Q7UUFDcEQsTUFBTSxJQUFJLEdBQUcsS0FBSztRQUNoQixnQ0FBZ0M7UUFDaEMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBNEIsQ0FBQztZQUNoRixPQUFPLENBQ0wsSUFBSSxLQUFLLHFCQUFxQixJQUFJLFNBQVMsS0FBSyxjQUFjLENBQy9ELENBQUM7UUFDSixDQUFDLEVBQ0QsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNaLElBQUk7WUFDSixLQUFLLEVBQUUsSUFBSSxhQUFhLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBbUI7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsUUFBUTtvQkFDakIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7c0VBckRVLFdBQVcsZ0VBS1osUUFBUTsrQ0FMUCxXQUFXO21EQUpiLEVBQUU7d0ZBSUEsV0FBVyxtQkF0QnRCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixrQkFBa0I7UUFDbEIsaUJBQWlCLGFBUmpCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixrQkFBa0I7UUFDbEIsaUJBQWlCO3VGQWNOLFdBQVc7Y0FMdkIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckIsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2FBQzNCOztzQkFNSSxNQUFNO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFwb2xsbywgQVBPTExPX09QVElPTlMgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5pbXBvcnQgeyBIdHRwTGluayB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgc3BsaXQsIEFwb2xsb0NsaWVudE9wdGlvbnMgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IFdlYlNvY2tldExpbmsgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9saW5rL3dzJztcbmltcG9ydCB7IGdldE1haW5EZWZpbml0aW9uIH0gZnJvbSAnQGFwb2xsby9jbGllbnQvdXRpbGl0aWVzJztcbmltcG9ydCB7IEluTWVtb3J5Q2FjaGUgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IE9wZXJhdGlvbkRlZmluaXRpb25Ob2RlIH0gZnJvbSAnZ3JhcGhxbCc7XG5cbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnO1xuXG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXG4gIEFtb3VudENhcnREaXJlY3RpdmUsXG4gIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlLFxuICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxuICAvL01vZGlmaXJlc0RpcmVjdGl2ZSxcbiAgRGlzaENhbGNEaXJlY3RpdmUsXG4gIFNldERpc2hDb21tZW50RGlyZWN0aXZlLFxuICBTZXRBbW91bnREaXJlY3RpdmUsXG4gIENoZWNrb3V0RGlyZWN0aXZlLFxuXTtcblxuZXhwb3J0IGludGVyZmFjZSBOZ0dxbENvbmZpZyB7XG4gIHVybDogc3RyaW5nO1xufVxuXG5jb25zdCBkZWZhdWx0VXJsID0gJ2h0dHBzOi8vc3RhZ2U0LmFwaS5saWZlbmFkeW0ud2VicmVzdG8uZGV2L2dyYXBocWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVNdLFxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0dxbE1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYXBvbGxvOiBBcG9sbG8sXG4gICAgaHR0cExpbms6IEh0dHBMaW5rLFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIGNvbmZpZzogTmdHcWxDb25maWdcbiAgKSB7XG5cbiAgICAvLyBDcmVhdGUgYW4gaHR0cCBsaW5rOlxuICAgIGNvbnN0IGh0dHAgPSBodHRwTGluay5jcmVhdGUoe1xuICAgICAgdXJpOiBjb25maWcudXJsLFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgV2ViU29ja2V0IGxpbms6XG4gICAgY29uc3Qgd3MgPSBuZXcgV2ViU29ja2V0TGluayh7XG4gICAgICB1cmk6IGNvbmZpZy51cmwucmVwbGFjZSgnaHR0cCcsICd3cycpLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICByZWNvbm5lY3Q6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gdXNpbmcgdGhlIGFiaWxpdHkgdG8gc3BsaXQgbGlua3MsIHlvdSBjYW4gc2VuZCBkYXRhIHRvIGVhY2ggbGlua1xuICAgIC8vIGRlcGVuZGluZyBvbiB3aGF0IGtpbmQgb2Ygb3BlcmF0aW9uIGlzIGJlaW5nIHNlbnRcbiAgICBjb25zdCBsaW5rID0gc3BsaXQoXG4gICAgICAvLyBzcGxpdCBiYXNlZCBvbiBvcGVyYXRpb24gdHlwZVxuICAgICAgKHsgcXVlcnkgfSkgPT4ge1xuICAgICAgICBjb25zdCB7IGtpbmQsIG9wZXJhdGlvbiB9ID0gZ2V0TWFpbkRlZmluaXRpb24ocXVlcnkpIGFzIE9wZXJhdGlvbkRlZmluaXRpb25Ob2RlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJyAmJiBvcGVyYXRpb24gPT09ICdzdWJzY3JpcHRpb24nXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgd3MsXG4gICAgICBodHRwLFxuICAgICk7XG5cbiAgICBpZiAoYXBvbGxvLmNsaWVudCkgcmV0dXJuO1xuXG4gICAgYXBvbGxvLmNyZWF0ZSh7XG4gICAgICBsaW5rLFxuICAgICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKClcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogTmdHcWxDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5nR3FsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ0dxbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ2NvbmZpZycsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=