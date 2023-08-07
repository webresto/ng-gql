import {DOCUMENT} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {AuthInterceptor, MemoryInterceptor, XDeviceIdInterceptor} from './interceptors';
import {NG_GQL_CONFIG, httpLinkFactory} from './models';
import {
  ApolloService,
  NgGqlService,
  NgGqlStoreService,
  NgGqlUserBusService,
  NgGqlUserService,
  NgOrderService,
  NqGqlLocalStorageWrapper,
  RequestService,
} from './services';

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  exports: [ApolloModule, HttpClientModule],
  providers: [
    ApolloService,
    NgOrderService,
    NgGqlService,
    NgGqlUserService,
    NgGqlStoreService,
    NgGqlUserBusService,
    NqGqlLocalStorageWrapper,
    RequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MemoryInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XDeviceIdInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: httpLinkFactory,
      deps: [HttpLink, DOCUMENT, NG_GQL_CONFIG],
    },
  ],
  declarations: [],
})
export class NgGqlModule {}
