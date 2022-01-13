import { Inject, NgModule } from '@angular/core';
import { split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache } from '@apollo/client/core';
import { AddDishToCartDirective, CheckoutDirective } from './directives';
import * as i0 from "@angular/core";
import * as i1 from "apollo-angular";
import * as i2 from "apollo-angular/http";
//import { ModifiresDirective } from './directives/modifires.directive';
const DIRECTIVES = [
    AddDishToCartDirective,
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
NgGqlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, deps: [{ token: i1.Apollo }, { token: i2.HttpLink }, { token: 'config' }], target: i0.ɵɵFactoryTarget.NgModule });
NgGqlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, declarations: [AddDishToCartDirective,
        CheckoutDirective], exports: [AddDishToCartDirective,
        CheckoutDirective] });
NgGqlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NgGqlModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3FsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLWdxbC9zcmMvbGliL25nLWdxbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3RFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUV6RSx3RUFBd0U7QUFFeEUsTUFBTSxVQUFVLEdBQUc7SUFDakIsc0JBQXNCO0lBQ3RCLGlCQUFpQjtDQUNsQixDQUFDO0FBV0YsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFDRSxNQUFjLEVBQ2QsUUFBa0IsRUFDQSxNQUFtQjtRQUdyQyx1QkFBdUI7UUFDdkIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMzQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLE1BQU0sRUFBRSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQzNCLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1lBQ3JDLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsSUFBSTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILG1FQUFtRTtRQUNuRSxvREFBb0Q7UUFDcEQsTUFBTSxJQUFJLEdBQUcsS0FBSztRQUNoQixnQ0FBZ0M7UUFDaEMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBNEIsQ0FBQztZQUNoRixPQUFPLENBQ0wsSUFBSSxLQUFLLHFCQUFxQixJQUFJLFNBQVMsS0FBSyxjQUFjLENBQy9ELENBQUM7UUFDSixDQUFDLEVBQ0QsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNaLElBQUk7WUFDSixLQUFLLEVBQUUsSUFBSSxhQUFhLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBbUI7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsUUFBUTtvQkFDakIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7d0dBckRVLFdBQVcsZ0VBS1osUUFBUTt5R0FMUCxXQUFXLGlCQWJ0QixzQkFBc0I7UUFDdEIsaUJBQWlCLGFBRGpCLHNCQUFzQjtRQUN0QixpQkFBaUI7eUdBWU4sV0FBVyxZQUpiLEVBQUU7MkZBSUEsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtvQkFDWCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3JCLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFDM0I7OzBCQU1JLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwb2xsbyB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcbmltcG9ydCB7IEh0dHBMaW5rIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBzcGxpdCB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2NvcmUnO1xuaW1wb3J0IHsgV2ViU29ja2V0TGluayB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2xpbmsvd3MnO1xuaW1wb3J0IHsgZ2V0TWFpbkRlZmluaXRpb24gfSBmcm9tICdAYXBvbGxvL2NsaWVudC91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSW5NZW1vcnlDYWNoZSB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2NvcmUnO1xuaW1wb3J0IHsgT3BlcmF0aW9uRGVmaW5pdGlvbk5vZGUgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUsIENoZWNrb3V0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzJztcblxuLy9pbXBvcnQgeyBNb2RpZmlyZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9kaWZpcmVzLmRpcmVjdGl2ZSc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXG4gIENoZWNrb3V0RGlyZWN0aXZlLFxuXTtcblxuZXhwb3J0IGludGVyZmFjZSBOZ0dxbENvbmZpZyB7XG4gIHVybDogc3RyaW5nO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVNdLFxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0dxbE1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYXBvbGxvOiBBcG9sbG8sXG4gICAgaHR0cExpbms6IEh0dHBMaW5rLFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIGNvbmZpZzogTmdHcWxDb25maWdcbiAgKSB7XG5cbiAgICAvLyBDcmVhdGUgYW4gaHR0cCBsaW5rOlxuICAgIGNvbnN0IGh0dHAgPSBodHRwTGluay5jcmVhdGUoe1xuICAgICAgdXJpOiBjb25maWcudXJsLFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgV2ViU29ja2V0IGxpbms6XG4gICAgY29uc3Qgd3MgPSBuZXcgV2ViU29ja2V0TGluayh7XG4gICAgICB1cmk6IGNvbmZpZy51cmwucmVwbGFjZSgnaHR0cCcsICd3cycpLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICByZWNvbm5lY3Q6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gdXNpbmcgdGhlIGFiaWxpdHkgdG8gc3BsaXQgbGlua3MsIHlvdSBjYW4gc2VuZCBkYXRhIHRvIGVhY2ggbGlua1xuICAgIC8vIGRlcGVuZGluZyBvbiB3aGF0IGtpbmQgb2Ygb3BlcmF0aW9uIGlzIGJlaW5nIHNlbnRcbiAgICBjb25zdCBsaW5rID0gc3BsaXQoXG4gICAgICAvLyBzcGxpdCBiYXNlZCBvbiBvcGVyYXRpb24gdHlwZVxuICAgICAgKHsgcXVlcnkgfSkgPT4ge1xuICAgICAgICBjb25zdCB7IGtpbmQsIG9wZXJhdGlvbiB9ID0gZ2V0TWFpbkRlZmluaXRpb24ocXVlcnkpIGFzIE9wZXJhdGlvbkRlZmluaXRpb25Ob2RlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJyAmJiBvcGVyYXRpb24gPT09ICdzdWJzY3JpcHRpb24nXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgd3MsXG4gICAgICBodHRwLFxuICAgICk7XG5cbiAgICBpZiAoYXBvbGxvLmNsaWVudCkgcmV0dXJuO1xuXG4gICAgYXBvbGxvLmNyZWF0ZSh7XG4gICAgICBsaW5rLFxuICAgICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKClcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogTmdHcWxDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5nR3FsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ0dxbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ2NvbmZpZycsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=