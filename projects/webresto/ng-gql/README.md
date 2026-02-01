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

## Usage
See the [documentation](docs/README.md). 

This is the README for the graphql module.