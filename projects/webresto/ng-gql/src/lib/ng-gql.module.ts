import { inject, NgModule } from '@angular/core';
import type { ModuleWithProviders } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, split } from '@apollo/client/core';
import type { InMemoryCacheConfig } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { generateUUID, NgGqlConfig } from './models';
import { isValue } from '@axrl/common';
import type { OperationDefinitionNode } from 'graphql';
import { persistCacheSync, LocalStorageWrapper } from 'apollo3-cache-persist';
import {
  HttpClientModule,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { XDeviceIdInterceptor, AuthInterceptor } from './interceptors';
import {
  NgOrderService,
  NgGqlService,
  NgGqlUserService,
  NgGqlStorageService,
  ApolloService,
} from './services';

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  exports: [ApolloModule, HttpClientModule],
  providers: [],
  declarations: [],
})
export class NgGqlModule {
  constructor() {}

  static forRoot(config: NgGqlConfig): ModuleWithProviders<NgGqlModule> {
    return {
      ngModule: NgGqlModule,
      providers: [
        {
          provide: 'NG_GQL_CONFIG',
          useValue: config,
        },
        ApolloService,
        NgOrderService,
        NgGqlService,
        NgGqlUserService,
        NgGqlStorageService,
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
          useFactory: (httpLink: HttpLink) => {
            const win = inject(DOCUMENT).defaultView;
            const savedDeviceId = localStorage.getItem('deviceId');
            const deviceId = savedDeviceId ?? generateUUID(win);

            // Create a WebSocket link:
            const ws = new WebSocketLink(
              new SubscriptionClient(config.url.replace('http', 'ws'), {
                reconnect: true,
                connectionParams: () => {
                  const token = localStorage.getItem('token');
                  return isValue(token)
                    ? {
                        'X-Device-Id': deviceId,
                        authorization: localStorage.getItem('token'),
                      }
                    : {
                        'X-Device-Id': deviceId,
                      };
                },
              })
            );
            // using the ability to split links, you can send data to each link
            // depending on what kind of operation is being sent
            const link = split(
              // split based on operation type
              ({ query }) => {
                const { kind, operation } = <OperationDefinitionNode>(
                  getMainDefinition(query)
                );
                return (
                  kind === 'OperationDefinition' && operation === 'subscription'
                );
              },
              ws,
              httpLink.create({
                uri: config.url,
              })
            );

            const defaultCacheConfig: InMemoryCacheConfig = {
              addTypename: true,
              resultCaching: true,
              typePolicies: {
                GroupModifier: {
                  keyFields: [
                    'modifierId',
                    'maxAmount',
                    'minAmount',
                    'required',
                  ],
                  fields: {
                    childModifiers: {
                      merge(existing, incoming) {
                        return [...incoming];
                      },
                    },
                  },
                },
                Modifier: {
                  keyFields: [
                    'modifierId',
                    'maxAmount',
                    'minAmount',
                    'defaultAmount',
                  ],
                },
                Order: {
                  fields: {
                    dishes: {
                      merge(existing, incoming) {
                        return [...incoming];
                      },
                    },
                  },
                },
              },
            };
            const cache = new InMemoryCache(
              isValue(config.apolloCacheConfig)
                ? { ...defaultCacheConfig, ...config.apolloCacheConfig }
                : { ...defaultCacheConfig }
            );
            if (!isValue(config.usePersistCache) || config.usePersistCache) {
              persistCacheSync({
                cache,
                serialize: true,
                storage: new LocalStorageWrapper(window.localStorage),
              });
            }

            return {
              link,
              cache,
            };
          },
          deps: [HttpLink],
        },
      ],
    };
  }
}
