@webresto/ng-gql - v1.1.12 / [Exports](modules.md)

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

```ts app.module.ts
import { NgGqlModule } from '@webresto/ng-gql';

...

@NgModule({
  imports: [
     ...
    NgGqlModule.forRoot({ 
      url: '...',
      nesting:2,
      busSubscribeMode:'subscribe'  }),
     ...
  ]
})
export class AppModule { }
```

Описание [объекта конфигурации:](interfaces/NgGqlConfig.md)

## Использование
См. в [документации.](modules.md)
