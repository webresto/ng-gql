# NgGql

## Install

`npm install apollo-angular @apollo/client graphql subscriptions-transport-ws @webresto/ng-gql`

```
import { NgGqlModule } from '@webresto/ng-gql';

@NgModule({
  imports: [
    // ...
    NgGqlModule.forRoot({ url: 'https://stage4.api.lifenadym.webresto.dev/graphql' }),
    // ...
  ]
})
export class AppModule { }
```

## Fetching

Query

```
import { Component } from '@angular/core';
import { NgGqlService } from '@webresto/ng-gql';

@Component({
  selector: 'app-root',
  template:  `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(public ngGql: NgGqlService) { 

	this.ngGql
		.customQuery$('restrictions', { 
			restrictions: {
				workTime: true,
				periodPossibleForOrder: true,
				timezone: true,
				deliveryDescription: true,
				minDeliveryTime: true
			} 
		})
		.subscribe(data => console.log(data));

  }
}

```

## Methods

Query

`customQuery$(name: string, queryObject: any, data: any = {})`

Mutation

`customMutation$(name: string, queryObject: any, data: any = {})`