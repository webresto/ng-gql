import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache } from '@apollo/client/core';
import { OperationDefinitionNode } from 'graphql';
import {
  AddDishToCartDirective,
  AmountCartDirective,
  DeleteFromCartDirective,
  OrderCartUserDirective,
  DishCalcDirective,
  SetDishCommentDirective,
  SetAmountDirective,
  CheckoutDirective
} from './directives';

//import { ModifiresDirective } from './directives/modifires.directive';

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

export interface NgGqlConfig {
  url: string;
}

@NgModule({
  imports: [],
  exports: [DIRECTIVES],
  declarations: [DIRECTIVES]
})
export class NgGqlModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    @Inject('config') config: NgGqlConfig
  ) {

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
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return (
          kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      ws,
      http,
    );

    if (apollo.client) return;

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
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
    }
  }
}
