import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
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

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://stage4.api.lifenadym.webresto.dev/graphql',
          }),
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
