Library for working with GraphQL APIs for Webresto projects.

# @webresto/ng-gql
<span class="badge-npmversion"><a href="https://npmjs.org/package/@webresto/ng-gql" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@webresto/ng-gql.svg" alt="NPM version" /></a></span>

## Installation

First, you need to install the additional libraries required to connect to the GraphQL server:

```bash
npm i apollo-angular @apollo/client graphql subscriptions-transport-ws
```

Then, install the library:

```bash
npm i @webresto/ng-gql
```

## Configuration

```ts
// app.module.ts
import { NgGqlModule } from '@webresto/ng-gql';

...

@NgModule({
  imports: [
    ...
    NgGqlModule.forRoot({
      url: '...',
      nesting: 2,
      busSubscribeMode: 'subscribe'
    }),
    ...
  ]
})
export class AppModule { }
```

Description of the [configuration object](interfaces/NgGqlConfig.md).


This is the README for the graphql module.

## Network Availability Handling

The library provides a built-in mechanism to handle network connectivity issues and API unavailability.

### NgGqlAvailabilityService

This service manages the state of the API connection. You can inject it into your components to check if the API is currently considered unavailable.

```typescript
import { NgGqlAvailabilityService } from '@webresto/ng-gql';

export class MyComponent {
  isApiUnavailable$ = this.availabilityService.isApiUnavailable$;

  constructor(private availabilityService: NgGqlAvailabilityService) {}
}
```

### Automatic Error Handling

The `ApolloService` and `httpLinkFactory` automatically detect network errors (e.g., connection refused, offline). When a network error occurs:

1.  The API state is marked as **unavailable**.
2.  `isApiUnavailable$` emits `true`.
3.  The service automatically starts a background health check, polling the API every 5 seconds.
4.  Once the API becomes reachable again, `isApiUnavailable$` emits `false`, and the health check stops.

### Debug Mode

If `debugMode` is enabled in your `NgGqlConfig`, the library will also show browser alerts (`alert()`) when a connection error occurs.