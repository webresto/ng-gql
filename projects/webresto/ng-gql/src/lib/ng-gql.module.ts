import { Inject, NgModule } from '@angular/core';
import type { ModuleWithProviders } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { split, InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { isValue, NgGqlConfig } from './models';
import type { OperationDefinitionNode } from 'graphql';
import { persistCacheSync, LocalStorageWrapper } from 'apollo3-cache-persist';
import type { InMemoryCacheConfig } from '@apollo/client';

@NgModule({
  imports: [
    ApolloModule
  ],
  exports: [],
  declarations: []
})
export class NgGqlModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    @Inject('config') config: NgGqlConfig
  ) {

    // Create an http link:
    const http = httpLink.create({
      uri: config.url
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: config.url.replace('http', 'ws'),
      options: {
        reconnect: true,
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = <OperationDefinitionNode> getMainDefinition(query);
        return (
          kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      ws,
      http,
    );

    if (!apollo.client) {
      const defaultCacheConfig: InMemoryCacheConfig = {
        addTypename: true,
        resultCaching: true,
        typePolicies: {
          GroupModifier: {
            keyFields: [ 'modifierId' ],
            fields: {
              childModifiers: {
                merge(existing, incoming) {
                  return [ ...incoming ];
                }
              }
            }
          },
          Modifier: {
            keyFields: [ 'modifierId' ]
          },
          Order: {
            fields: {
              dishes: {
                merge(existing, incoming) {
                  return [ ...incoming ];
                }
              }
            }
          },
        }

      };
      const cache = new InMemoryCache(
        isValue(config.apolloCacheConfig) ?
          { ...defaultCacheConfig, ...config.apolloCacheConfig }
          : { ...defaultCacheConfig }
      );
      if (!isValue(config.usePersistCache) || config.usePersistCache) {
        persistCacheSync({
          cache,
          serialize: true,
          storage: new LocalStorageWrapper(window.localStorage),
        });
      };

      apollo.create({
        link,
        cache
      });
    };
  }

  static forRoot(config: NgGqlConfig): ModuleWithProviders<NgGqlModule> {
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
