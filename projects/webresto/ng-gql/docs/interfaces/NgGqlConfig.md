# Interface: NgGqlConfig

Обьект с параметрами настройки библиотеки для определенного сервера-API

## Table of contents

### Properties

- [url](NgGqlConfig.md#url)
- [nesting](NgGqlConfig.md#nesting)
- [obsolescence](NgGqlConfig.md#obsolescence)
- [busSubscribeMode](NgGqlConfig.md#bussubscribemode)
- [customDataFields](NgGqlConfig.md#customdatafields)

## Properties

### url

• **url**: `string`

 URL API сервера GraphQL

___

### nesting

• **nesting**: `number`

Уровень вложенности групп с блюдами друг в друга.

___

### obsolescence

• `Optional` **obsolescence**: `number`

Необязательный параметр.
Определяет период времени (в днях), по истечении которого orderId, сохраненный в localStorage, будет считаться старым и не будет использоваться.

___

### busSubscribeMode

• **busSubscribeMode**: ``"subscribe"`` \| ``"custom"``

Способ подписки на события шины.
При выборе параметра 'subscribe' - библиотека будет автоматически подписываться на события в шине и также автоматически отпишется от нее при завершении работы.
В случае выбора параметра 'custom' - подписка на события и управление ею производится на стороне проекта разработчиком самостоятельно, к примеру, используя asyncPipe.

___

### customDataFields

• `Optional` **customDataFields**: `Object`

Необязательный объект с дополнительной пользовательской информацией о структуре свойства customData в базовых моделях? если такие свойства объявлены в схеме GraphQL на сервере.
В качестве ключей указывается название модели, в качестве значений - объект типа `ValuesOrBoolean` для свойства customData этой модели.

**`see`** ValuesOrBoolean

#### Index signature

▪ [modelName: `string`]: [`ValuesOrBoolean`](../README.md#valuesorboolean)<{ `customData`: `unknown` \| ``null``  }[``"customData"``]\>
