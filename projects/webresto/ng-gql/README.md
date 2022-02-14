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

```ts app.module.ts
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

# Interface: NgGqlConfig

Обьект с параметрами работы бибилиотеки

## Table of contents

### Properties

- [busSubscribeMode](NgGqlConfig.md#bussubscribemode)
- [nesting](NgGqlConfig.md#nesting)
- [url](NgGqlConfig.md#url)

## Properties

### busSubscribeMode

• **busSubscribeMode**: ``"subscribe"`` \| ``"custom"``

Способ подписки на события в шине.
При выборе параметра 'subscribe' - библиотека будет подписываться на события в шине событий и отписываться по завершении работы.
В случае выбора параметра 'custom' - подписку на события необходимо произвести в проекте самостоятельно, к примеру, используя asyncPipe.

___

### nesting

• **nesting**: `number`

Уровень вложенности групп с блюдами друг в друга.

___

### url

• **url**: `string`

URL API сервера GraphQL