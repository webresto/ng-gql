import { inject, NgModule } from '@angular/core';
import type { ModuleWithProviders } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import type { InMemoryCacheConfig } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { generateUUID, NgGqlConfig } from './models';
import { isValue } from '@axrl/common';
import type { OperationDefinitionNode } from 'graphql';
import { persistCacheSync, LocalStorageWrapper } from 'apollo3-cache-persist';
import { HttpClientModule } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  exports: [HttpClientModule, ApolloModule],
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
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink) => {
            const win = inject(DOCUMENT).defaultView;
            const savedDeviceId = localStorage.getItem('deviceId');
            const deviceId = savedDeviceId ?? generateUUID(win);

            if (!isValue(savedDeviceId)) {
              localStorage.setItem('deviceId', deviceId);
            }

            const basic = setContext((operation, context) => ({
              headers: {
                'X-Device-Id': deviceId,
                Accept: 'charset=utf-8',
              },
            }));

            const auth = setContext((operation, context) => {
              const token = localStorage.getItem('token');

              if (token === null) {
                return {};
              } else {
                return {
                  headers: {
                    Authorization: token,
                  },
                };
              }
            });

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
                const { kind, operation } = <OperationDefinitionNode>(
                  getMainDefinition(query)
                );
                return (
                  kind === 'OperationDefinition' && operation === 'subscription'
                );
              },
              ws,
              ApolloLink.from([basic,auth,http])
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
