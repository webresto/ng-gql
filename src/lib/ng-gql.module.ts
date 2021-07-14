import { NgModule } from '@angular/core';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { split, ApolloClientOptions } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache } from '@apollo/client/core';
import { OperationDefinitionNode } from 'graphql';

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

const gqlLink = `stage4.api.lifenadym.webresto.dev/graphql`

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
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
            const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          ws,
          http,
        );

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
})
export class NgGqlModule { }
