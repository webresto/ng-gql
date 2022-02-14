import { Inject, NgModule } from '@angular/core';
import type { ModuleWithProviders } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { split, InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import type { OperationDefinitionNode } from 'graphql';
import { AddDishToOrderDirective, CheckoutDirective } from './directives';

const DIRECTIVES = [
  AddDishToOrderDirective,
  CheckoutDirective,
];

/** Обьект с параметрами работы бибилиотеки */
export interface NgGqlConfig {

  /** URL API сервера GraphQL */
  url: string;

  /** Уровень вложенности групп с блюдами друг в друга.   */
  nesting: number;
  /** Способ подписки на события в шине. 
   * При выборе параметра 'subscribe' - библиотека будет подписываться на события в шине событий и отписываться по завершении работы.
   * В случае выбора параметра 'custom' - подписку на события необходимо произвести в проекте самостоятельно, к примеру, используя asyncPipe.
   * */
  busSubscribeMode: 'subscribe' | 'custom';
}

@NgModule( {
  imports: [],
  exports: [ DIRECTIVES ],
  declarations: [ DIRECTIVES ]
} )
export class NgGqlModule {

  constructor (
    apollo: Apollo,
    httpLink: HttpLink,
    @Inject( 'config' ) config: NgGqlConfig
  ) {

    // Create an http link:
    const http = httpLink.create( {
      uri: config.url,
    } );

    // Create a WebSocket link:
    const ws = new WebSocketLink( {
      uri: config.url.replace( 'http', 'ws' ),
      options: {
        reconnect: true,
      },
    } );

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ( { query } ) => {
        const { kind, operation } = <OperationDefinitionNode> getMainDefinition( query );
        return (
          kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      ws,
      http,
    );

    if ( !apollo.client ) {
      apollo.create( {
        link,
        cache: new InMemoryCache()
      } );
    };
  }

  static forRoot ( config: NgGqlConfig ): ModuleWithProviders<NgGqlModule> {
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
