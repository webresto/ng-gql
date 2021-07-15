import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
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
const gqlLink = `stage4.api.lifenadym.webresto.dev/graphql`;
export class NgGqlModule {
}
NgGqlModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    {
                        provide: APOLLO_OPTIONS,
                        useFactory(httpLink) {
                            // Create an http link:
                            const http = httpLink.create({
                                uri: `https://${gqlLink}`,
                            });
                            // Create a WebSocket link:
                            const ws = new WebSocketLink({
                                uri: `wss://${gqlLink}`,
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
                            return {
                                link,
                                cache: new InMemoryCache()
                            };
                        },
                        deps: [HttpLink],
                    },
                ],
                imports: [],
                exports: [DIRECTIVES],
                declarations: [DIRECTIVES]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbmctZ3FsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBdUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLHdFQUF3RTtBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUdsRixNQUFNLFVBQVUsR0FBRztJQUNqQixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtDQUNsQixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsMkNBQTJDLENBQUE7QUE4QzNELE1BQU0sT0FBTyxXQUFXOzs7WUE1Q3ZCLFFBQVEsU0FBQztnQkFDUixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGNBQWM7d0JBQ3ZCLFVBQVUsQ0FBQyxRQUFrQjs0QkFDM0IsdUJBQXVCOzRCQUN2QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dDQUMzQixHQUFHLEVBQUUsV0FBVyxPQUFPLEVBQUU7NkJBQzFCLENBQUMsQ0FBQzs0QkFFSCwyQkFBMkI7NEJBQzNCLE1BQU0sRUFBRSxHQUFHLElBQUksYUFBYSxDQUFDO2dDQUMzQixHQUFHLEVBQUUsU0FBUyxPQUFPLEVBQUU7Z0NBQ3ZCLE9BQU8sRUFBRTtvQ0FDUCxTQUFTLEVBQUUsSUFBSTtpQ0FDaEI7NkJBQ0YsQ0FBQyxDQUFDOzRCQUVILG1FQUFtRTs0QkFDbkUsb0RBQW9EOzRCQUNwRCxNQUFNLElBQUksR0FBRyxLQUFLOzRCQUNoQixnQ0FBZ0M7NEJBQ2hDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO2dDQUNaLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUE0QixDQUFDO2dDQUNoRixPQUFPLENBQ0wsSUFBSSxLQUFLLHFCQUFxQixJQUFJLFNBQVMsS0FBSyxjQUFjLENBQy9ELENBQUM7NEJBQ0osQ0FBQyxFQUNELEVBQUUsRUFDRixJQUFJLENBQ0wsQ0FBQzs0QkFFRixPQUFPO2dDQUNMLElBQUk7Z0NBQ0osS0FBSyxFQUFFLElBQUksYUFBYSxFQUFFOzZCQUMzQixDQUFDO3dCQUNKLENBQUM7d0JBQ0QsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO3FCQUNqQjtpQkFDRjtnQkFDRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JCLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFQT0xMT19PUFRJT05TIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgSHR0cExpbmsgfSBmcm9tICdhcG9sbG8tYW5ndWxhci9odHRwJztcbmltcG9ydCB7IHNwbGl0LCBBcG9sbG9DbGllbnRPcHRpb25zIH0gZnJvbSAnQGFwb2xsby9jbGllbnQvY29yZSc7XG5pbXBvcnQgeyBXZWJTb2NrZXRMaW5rIH0gZnJvbSAnQGFwb2xsby9jbGllbnQvbGluay93cyc7XG5pbXBvcnQgeyBnZXRNYWluRGVmaW5pdGlvbiB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L3V0aWxpdGllcyc7XG5pbXBvcnQgeyBJbk1lbW9yeUNhY2hlIH0gZnJvbSAnQGFwb2xsby9jbGllbnQvY29yZSc7XG5pbXBvcnQgeyBPcGVyYXRpb25EZWZpbml0aW9uTm9kZSB9IGZyb20gJ2dyYXBocWwnO1xuXG5pbXBvcnQgeyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFtb3VudENhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XG4vL2ltcG9ydCB7IE1vZGlmaXJlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9tb2RpZmlyZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNldEFtb3VudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaXNoQ2FsY0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENoZWNrb3V0RGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IFNldERpc2hDb21tZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlJztcblxuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxuICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxuICBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSxcbiAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcbiAgLy9Nb2RpZmlyZXNEaXJlY3RpdmUsXG4gIERpc2hDYWxjRGlyZWN0aXZlLFxuICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcbiAgU2V0QW1vdW50RGlyZWN0aXZlLFxuICBDaGVja291dERpcmVjdGl2ZSxcbl07XG5cbmNvbnN0IGdxbExpbmsgPSBgc3RhZ2U0LmFwaS5saWZlbmFkeW0ud2VicmVzdG8uZGV2L2dyYXBocWxgXG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQT0xMT19PUFRJT05TLFxuICAgICAgdXNlRmFjdG9yeShodHRwTGluazogSHR0cExpbmspIHtcbiAgICAgICAgLy8gQ3JlYXRlIGFuIGh0dHAgbGluazpcbiAgICAgICAgY29uc3QgaHR0cCA9IGh0dHBMaW5rLmNyZWF0ZSh7XG4gICAgICAgICAgdXJpOiBgaHR0cHM6Ly8ke2dxbExpbmt9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgV2ViU29ja2V0IGxpbms6XG4gICAgICAgIGNvbnN0IHdzID0gbmV3IFdlYlNvY2tldExpbmsoe1xuICAgICAgICAgIHVyaTogYHdzczovLyR7Z3FsTGlua31gLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHJlY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB1c2luZyB0aGUgYWJpbGl0eSB0byBzcGxpdCBsaW5rcywgeW91IGNhbiBzZW5kIGRhdGEgdG8gZWFjaCBsaW5rXG4gICAgICAgIC8vIGRlcGVuZGluZyBvbiB3aGF0IGtpbmQgb2Ygb3BlcmF0aW9uIGlzIGJlaW5nIHNlbnRcbiAgICAgICAgY29uc3QgbGluayA9IHNwbGl0KFxuICAgICAgICAgIC8vIHNwbGl0IGJhc2VkIG9uIG9wZXJhdGlvbiB0eXBlXG4gICAgICAgICAgKHsgcXVlcnkgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBraW5kLCBvcGVyYXRpb24gfSA9IGdldE1haW5EZWZpbml0aW9uKHF1ZXJ5KSBhcyBPcGVyYXRpb25EZWZpbml0aW9uTm9kZTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIGtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJyAmJiBvcGVyYXRpb24gPT09ICdzdWJzY3JpcHRpb24nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgd3MsXG4gICAgICAgICAgaHR0cCxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxpbmssXG4gICAgICAgICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKClcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBkZXBzOiBbSHR0cExpbmtdLFxuICAgIH0sXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbRElSRUNUSVZFU10sXG4gIGRlY2xhcmF0aW9uczogW0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE5nR3FsTW9kdWxlIHsgfVxuIl19