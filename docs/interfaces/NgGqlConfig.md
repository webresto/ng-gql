[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / NgGqlConfig

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

#### Defined in

lib/ng-gql.module.ts:28

___

### nesting

• **nesting**: `number`

Уровень вложенности групп с блюдами друг в друга.

#### Defined in

lib/ng-gql.module.ts:23

___

### url

• **url**: `string`

URL API сервера GraphQL

#### Defined in

lib/ng-gql.module.ts:20
