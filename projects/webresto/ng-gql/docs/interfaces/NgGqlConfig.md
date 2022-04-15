# Interface: NgGqlConfig

Обьект с параметрами настройки библиотеки для определенного сервера-API

## Table of contents

### Properties

- [url](NgGqlConfig.md#url)
- [nesting](NgGqlConfig.md#nesting)
- [obsolescence](NgGqlConfig.md#obsolescence)
- [busSubscribeMode](NgGqlConfig.md#bussubscribemode)
- [customFields](NgGqlConfig.md#customfields)
- [orderIdStorageToken](NgGqlConfig.md#orderidstoragetoken)

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

### customFields

• `Optional` **customFields**: `Object`

Необязательный объект с дополнительной пользовательской информацией о пользовательских свойствах,
добавленных в базовые модели на стороне конкретного сервера и объявленные в схеме GraphQL на сервере.
В качестве ключей указывается название модели, в качестве значений - объекты,
содержащие часть конфигурации `ValuesOrBoolean` этой модели, отражающую отличия с базовой моделью.

**`see`** ValuesOrBoolean

#### Index signature

▪ [modelName: `string`]: [`ValuesOrBoolean`](../README.md#valuesorboolean)<`unknown`\>

___

### orderIdStorageToken

• `Optional` **orderIdStorageToken**: `string`

Токен, с которым в localStorage будут храниться id заказов.
Если не задан - используется токен по умолчанию -'${ window.location.host }-orderId'.
