# Class: NgOrderService

## Table of contents

### Constructors

- [constructor](NgOrderService.md#constructor)

### Methods

- [getOrderId](NgOrderService.md#getorderid)
- [setOrderId](NgOrderService.md#setorderid)
- [removeOrderId](NgOrderService.md#removeorderid)
- [paymentLink$](NgOrderService.md#paymentlink$)
- [getOrder](NgOrderService.md#getorder)
- [loadOrderAsCart](NgOrderService.md#loadorderascart)
- [loadOrder$](NgOrderService.md#loadorder$)
- [addToOrder](NgOrderService.md#addtoorder)
- [removeFromOrder](NgOrderService.md#removefromorder)
- [checkOrder](NgOrderService.md#checkorder)
- [sendOrder](NgOrderService.md#sendorder)
- [setDishAmount](NgOrderService.md#setdishamount)
- [setDishComment](NgOrderService.md#setdishcomment)
- [destroy](NgOrderService.md#destroy)

### Properties

- [actions$](NgOrderService.md#actions$)
- [messages$](NgOrderService.md#messages$)
- [orderBus$](NgOrderService.md#orderbus$)

## Constructors

### constructor

• **new NgOrderService**(`ngGqlService`, `eventer`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `eventer` | [`EventerService`](EventerService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |

## Methods

### getOrderId

▸ **getOrderId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### setOrderId

▸ **setOrderId**(`orderId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`void`

___

### removeOrderId

▸ **removeOrderId**(): `void`

#### Returns

`void`

___

### paymentLink$

▸ **paymentLink$**(`phone`, `fromPhone`, `orderId`): `Observable`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |
| `fromPhone` | `string` |
| `orderId` | `string` |

#### Returns

`Observable`<`any`\>

___

### getOrder

▸ **getOrder**(): `Observable`<[`Order`](../interfaces/Order.md)\>

**`method`** getOrder

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.

___

### loadOrderAsCart

▸ **loadOrderAsCart**(`orderId`): `void`

**`method`** loadOrderAsCart
Метод, иницирующий в потоке @this order$` данные нового заказ.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `undefined` \| `string` | необязательный id заказа. В поток загружается заказ с указанным orderId либо, eсли orderId отсутствует - новый заказ. |

#### Returns

`void`

___

### loadOrder$

▸ **loadOrder$**(`orderId`): `Observable`<[`Order`](../interfaces/Order.md)\>

**`method`** loadOrder$

Метод загружает заказ и делает подписку для получения по нему обновлений.
Используется для внутренних нужд библиотеки, а также может использоваться для загрузки заказа отдельно от шины событий заказов
(например, данные для страницы "Спасибо за заказ").

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `undefined` \| `string` | id загружаемого заказа. Если отсутствует - создается новый заказ и возвращаются данные по нему. |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### addToOrder

▸ **addToOrder**(`order`, `loading`, `dish`, `amount?`, `dishModifiers?`, `successCb?`, `errorCb?`): `void`

**`method`** addToOrder
Используется для отправки в шину события добавления блюда.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `order` | [`Order`](../interfaces/Order.md) | `undefined` | Заказ, с которым выполнется операция |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` | добавляемое блюдо |
| `amount` | `number` | `1` | количество |
| `dishModifiers` | [`Modifier`](../interfaces/Modifier.md)[] | `[]` | выбранные пользователем модификаторы блюда |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### removeFromOrder

▸ **removeFromOrder**(`loading`, `dish`, `amount?`, `order`, `successCb?`, `errorCb?`): `void`

**`method`** removeFromOrder
Используется для отправки в шину события удаления блюда из корзины

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` | добавляемое блюдо |
| `amount` | `number` | `1` | количество |
| `order` | [`Order`](../interfaces/Order.md) | `undefined` | Заказ, с которым выполнется операция |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### checkOrder

▸ **checkOrder**(`order`, `successCb?`, `errorCb?`): `void`

**`method`** checkOrder
Используется для отправки в шину события обязательной проверки заказа перед оформлением.
Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`OrderForm`](../README.md#orderform) | Проверяемый заказ |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### sendOrder

▸ **sendOrder**(`order`, `successCb?`, `errorCb?`): `void`

**`method`** sendOrder
Используется для отправки в шину события оформления заказа.
Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`OrderForm`](../README.md#orderform) | Оформляемый заказ |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### setDishAmount

▸ **setDishAmount**(`loading`, `dish`, `amount?`, `order`, `successCb?`, `errorCb?`): `void`

**`method`** setDishAmount
Устанавливает для блюда dish в заказе количество amount.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` | блюдо, для которого изменяется количество заказываемых порций |
| `amount` | `number` | `1` | необходимое количество порций |
| `order` | [`Order`](../interfaces/Order.md) | `undefined` | Заказ, с которым выполнется операция |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### setDishComment

▸ **setDishComment**(`loading`, `dish`, `comment`, `order`, `successCb?`, `errorCb?`): `void`

**`method`** setDishComment
Добавляет к заказываемому блюду комментарий.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | id добавляемого блюда в корзине |
| `comment` | `string` | добавляемый комментарий |
| `order` | [`Order`](../interfaces/Order.md) | Заказ, с которым выполнется операция |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

## Properties

### actions$

• **actions$**: `Observable`<[`Action`](../interfaces/Action.md)\>

Поток Observable, в который будут поступать события по текущему заказу в процессе оформления, подразумевающие совершение каких-либо действий на стороне фронта и выполняемых пользователем
(переход на страницу оплаты или, к примеру, открытие диалогового окна с предложением блюда по акции, акции и т.п. )

___

### messages$

• **messages$**: `Observable`<[`Message`](../interfaces/Message.md)\>

Поток Observable, в который будут поступать информационные сообщения по текущему заказу (блюдо добавлено/удалено/заказ оформлен).

___

### orderBus$

• **orderBus$**: `Observable`<`void` \| () => `void`\>

Внутренний поток-шина для событий, ассоциированных с действиями, которыми необходимо выполнить с заказом (добавить/удалить блюдо, проверить заказ, отправить на проверку и тп.).
Используется только в случае, если в @see config параметр busSubscribeMode установлен в значении 'custom' для самостоятельного управления подпиской на стороне приложения.
Использование этого потока и событий внутри него извне не подразумевается и не предусматривается,
Для выполнения действий с заказом, необходимо использовать соответствующие методы:

**`see`** addToOrder

**`see`** removeFromOrder

**`see`** checkOrder

**`see`** sendOrder

**`see`** setDishAmount

**`see`** setDishComment
