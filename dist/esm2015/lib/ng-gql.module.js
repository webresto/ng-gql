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
NgGqlModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [DIRECTIVES],
                declarations: [DIRECTIVES]
            },] }
];
NgGqlModule.ctorParameters = () => [
    { type: Apollo },
    { type: HttpLink },
    { type: undefined, decorators: [{ type: Inject, args: ['config',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbmctZ3FsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLE1BQU0sRUFBa0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBdUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLHdFQUF3RTtBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUdsRixNQUFNLFVBQVUsR0FBRztJQUNqQixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtDQUNsQixDQUFDO0FBTUYsTUFBTSxVQUFVLEdBQUcsbURBQW1ELENBQUM7QUFPdkUsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFDRSxNQUFjLEVBQ2QsUUFBa0IsRUFDQSxNQUFtQjtRQUdyQyx1QkFBdUI7UUFDdkIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMzQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLE1BQU0sRUFBRSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQzNCLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1lBQ3JDLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsSUFBSTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILG1FQUFtRTtRQUNuRSxvREFBb0Q7UUFDcEQsTUFBTSxJQUFJLEdBQUcsS0FBSztRQUNoQixnQ0FBZ0M7UUFDaEMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBNEIsQ0FBQztZQUNoRixPQUFPLENBQ0wsSUFBSSxLQUFLLHFCQUFxQixJQUFJLFNBQVMsS0FBSyxjQUFjLENBQy9ELENBQUM7UUFDSixDQUFDLEVBQ0QsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNaLElBQUk7WUFDSixLQUFLLEVBQUUsSUFBSSxhQUFhLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBbUI7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsUUFBUTtvQkFDakIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7O1lBMURGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JCLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUMzQjs7O1lBekNRLE1BQU07WUFDTixRQUFROzRDQThDWixNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXBvbGxvLCBBUE9MTE9fT1BUSU9OUyB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IEh0dHBMaW5rIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBzcGxpdCwgQXBvbGxvQ2xpZW50T3B0aW9ucyB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2NvcmUnO1xuaW1wb3J0IHsgV2ViU29ja2V0TGluayB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2xpbmsvd3MnO1xuaW1wb3J0IHsgZ2V0TWFpbkRlZmluaXRpb24gfSBmcm9tICdAYXBvbGxvL2NsaWVudC91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSW5NZW1vcnlDYWNoZSB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2NvcmUnO1xuaW1wb3J0IHsgT3BlcmF0aW9uRGVmaW5pdGlvbk5vZGUgfSBmcm9tICdncmFwaHFsJztcblxuaW1wb3J0IHsgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBbW91bnRDYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPcmRlckNhcnRVc2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL29yZGVyLWNhcnQtdXNlci5kaXJlY3RpdmUnO1xuLy9pbXBvcnQgeyBNb2RpZmlyZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9kaWZpcmVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZXRBbW91bnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDaGVja291dERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvY2hlY2tvdXQuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZSc7XG5cblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSxcbiAgQW1vdW50Q2FydERpcmVjdGl2ZSxcbiAgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUsXG4gIE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUsXG4gIC8vTW9kaWZpcmVzRGlyZWN0aXZlLFxuICBEaXNoQ2FsY0RpcmVjdGl2ZSxcbiAgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUsXG4gIFNldEFtb3VudERpcmVjdGl2ZSxcbiAgQ2hlY2tvdXREaXJlY3RpdmUsXG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nR3FsQ29uZmlnIHtcbiAgdXJsOiBzdHJpbmc7XG59XG5cbmNvbnN0IGRlZmF1bHRVcmwgPSAnaHR0cHM6Ly9zdGFnZTQuYXBpLmxpZmVuYWR5bS53ZWJyZXN0by5kZXYvZ3JhcGhxbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbRElSRUNUSVZFU10sXG4gIGRlY2xhcmF0aW9uczogW0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE5nR3FsTW9kdWxlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhcG9sbG86IEFwb2xsbyxcbiAgICBodHRwTGluazogSHR0cExpbmssXG4gICAgQEluamVjdCgnY29uZmlnJykgY29uZmlnOiBOZ0dxbENvbmZpZ1xuICApIHtcblxuICAgIC8vIENyZWF0ZSBhbiBodHRwIGxpbms6XG4gICAgY29uc3QgaHR0cCA9IGh0dHBMaW5rLmNyZWF0ZSh7XG4gICAgICB1cmk6IGNvbmZpZy51cmwsXG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgYSBXZWJTb2NrZXQgbGluazpcbiAgICBjb25zdCB3cyA9IG5ldyBXZWJTb2NrZXRMaW5rKHtcbiAgICAgIHVyaTogY29uZmlnLnVybC5yZXBsYWNlKCdodHRwJywgJ3dzJyksXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlY29ubmVjdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyB1c2luZyB0aGUgYWJpbGl0eSB0byBzcGxpdCBsaW5rcywgeW91IGNhbiBzZW5kIGRhdGEgdG8gZWFjaCBsaW5rXG4gICAgLy8gZGVwZW5kaW5nIG9uIHdoYXQga2luZCBvZiBvcGVyYXRpb24gaXMgYmVpbmcgc2VudFxuICAgIGNvbnN0IGxpbmsgPSBzcGxpdChcbiAgICAgIC8vIHNwbGl0IGJhc2VkIG9uIG9wZXJhdGlvbiB0eXBlXG4gICAgICAoeyBxdWVyeSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHsga2luZCwgb3BlcmF0aW9uIH0gPSBnZXRNYWluRGVmaW5pdGlvbihxdWVyeSkgYXMgT3BlcmF0aW9uRGVmaW5pdGlvbk5vZGU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAga2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nICYmIG9wZXJhdGlvbiA9PT0gJ3N1YnNjcmlwdGlvbidcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICB3cyxcbiAgICAgIGh0dHAsXG4gICAgKTtcblxuICAgIGlmIChhcG9sbG8uY2xpZW50KSByZXR1cm47XG5cbiAgICBhcG9sbG8uY3JlYXRlKHtcbiAgICAgIGxpbmssXG4gICAgICBjYWNoZTogbmV3IEluTWVtb3J5Q2FjaGUoKVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBOZ0dxbENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TmdHcWxNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nR3FsTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAnY29uZmlnJyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==