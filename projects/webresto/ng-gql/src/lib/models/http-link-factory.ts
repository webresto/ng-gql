import type {ApolloLink, InMemoryCacheConfig} from '@apollo/client/core';
import {InMemoryCache, split} from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {isValue} from '@axrl/common';
import {HttpLink} from 'apollo-angular/http';
import {LocalStorageWrapper, persistCacheSync} from 'apollo3-cache-persist';
import type {OperationDefinitionNode} from 'graphql';
import {ConnectionParamsOptions, SubscriptionClient} from 'subscriptions-transport-ws';
import {generateUUID} from './get-uuid';
import {NgGqlConfig} from './ng-gql-config';

export function httpLinkFactory(
  httpLink: HttpLink,
  document: Document,
  config: NgGqlConfig,
): {
  link: ApolloLink;
  cache: InMemoryCache;
} {
  const win = document.defaultView;
  const savedDeviceId = localStorage.getItem('restocore-deviceId');
  const deviceId = savedDeviceId ?? generateUUID(win);

  // Create a WebSocket link:
  const ws = new WebSocketLink(
    new SubscriptionClient(config.url.replace('http', 'ws'), {
      reconnect: true,
      connectionParams: (): ConnectionParamsOptions => {
        const token = localStorage.getItem('restocore-token');
        return isValue(token)
          ? {
              'X-Device-Id': deviceId,
              authorization: localStorage.getItem('restocore-token'),
            }
          : {
              'X-Device-Id': deviceId,
            };
      },
    }),
  );

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({query}) => {
      const {kind, operation} = <OperationDefinitionNode>getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    httpLink.create({
      uri: config.url,
    }),
  );

  const defaultCacheConfig: InMemoryCacheConfig = {
    addTypename: true,
    resultCaching: true,
    typePolicies: {
      GroupModifier: {
        keyFields: ['maxAmount', 'minAmount', 'required', 'group', ['id']],
        fields: {
          childModifiers: {
            merge(existing, incoming) {
              return [...incoming];
            },
          },
        },
      },
      Modifier: {
        keyFields: ['maxAmount', 'minAmount', 'defaultAmount', 'dish', ['id']],
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
      ? {...defaultCacheConfig, ...config.apolloCacheConfig}
      : {...defaultCacheConfig},
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
}
