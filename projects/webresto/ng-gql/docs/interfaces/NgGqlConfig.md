# Interface: NgGqlConfig

Обьект с параметрами настройки библиотеки для определенного сервера-API

## Table of contents

### Properties

- [url](./interfaces/NgGqlConfig.md#url)
- [nesting](./interfaces/NgGqlConfig.md#nesting)
- [busSubscribeMode](./interfaces/NgGqlConfig.md#bussubscribemode)

## Properties

### <a id="url" name="url"></a> url

• **url**: `string`

URL API сервера GraphQL

___

### <a id="nesting" name="nesting"></a> nesting

• **nesting**: `number`

Уровень вложенности групп с блюдами друг в друга.

___

### <a id="bussubscribemode" name="bussubscribemode"></a> busSubscribeMode

• **busSubscribeMode**: ``"subscribe"`` \| ``"custom"``

Способ подписки на события шины.
При выборе параметра 'subscribe' - библиотека будет автоматически подписываться на события в шине и также автоматически отпишется от нее при завершении работы.
В случае выбора параметра 'custom' - подписка на события и управление ею производится на стороне проекта разработчиком самостоятельно, к примеру, используя asyncPipe.
