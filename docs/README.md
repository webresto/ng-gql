@webresto/ng-gql / [Exports](modules.md)

# @webresto/ng-gql

Библиотека для работы с GraphQL-API проектов Webresto.

## Установка

В первую очередь, требуется установить дополнительные библиотеки , необходимые для подключения к серверу GraphQL:
```bash
npm i apollo-angular @apollo/client graphql subscriptions-transport-ws
```
И затем:
```bash
npm i @webresto/ng-gql
```

## Настройка

```app.module.ts
import { NgGqlModule } from '@webresto/ng-gql';

...

@NgModule({
  imports: [
    // ...
    NgGqlModule.forRoot({ url: 'https://stage4.api.lifenadym.webresto.dev/graphql' }),
    // ...
  ]
})
export class AppModule { }
```
