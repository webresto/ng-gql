[@webresto/ng-gql - v1.1.12](../README.md) / [Exports](../modules.md) / NgGqlConfig

# Interface: NgGqlConfig

Обьект с параметрами настройки библиотеки для определенного сервера-API

## Table of contents

### Properties

- [url](NgGqlConfig.md#url)
- [nesting](NgGqlConfig.md#nesting)
- [busSubscribeMode](NgGqlConfig.md#bussubscribemode)

## Properties

### url

• **url**: `string`

URL API сервера GraphQL

___

### nesting

• **nesting**: `number`

Уровень вложенности групп с блюдами друг в друга.

___

### busSubscribeMode

• **busSubscribeMode**: ``"subscribe"`` \| ``"custom"``

Способ подписки на события шины.
При выборе параметра 'subscribe' - библиотека будет автоматически подписываться на события в шине и также автоматически отпишется от нее при завершении работы.
В случае выбора параметра 'custom' - подписка на события и управление ею производится на стороне проекта разработчиком самостоятельно, к примеру, используя asyncPipe.
