# Class: NgOrderService

## Table of contents

### Constructors

- [constructor](NgOrderService.md#constructor)

### Methods

- [updateStorageOrderIdToken](NgOrderService.md#updatestorageorderidtoken)
- [getOrderId](NgOrderService.md#getorderid)
- [setOrderId](NgOrderService.md#setorderid)
- [removeOrderId](NgOrderService.md#removeorderid)
- [paymentLink$](NgOrderService.md#paymentlink$)
- [getPaymentMethods$](NgOrderService.md#getpaymentmethods$)
- [getOrderAndPaymentMethods$](NgOrderService.md#getorderandpaymentmethods$)
- [getOrder](NgOrderService.md#getorder)
- [loadOrder$](NgOrderService.md#loadorder$)
- [addToOrder](NgOrderService.md#addtoorder)
- [removeFromOrder](NgOrderService.md#removefromorder)
- [updateOrder](NgOrderService.md#updateorder)
- [checkOrder](NgOrderService.md#checkorder)
- [sendOrder](NgOrderService.md#sendorder)
- [setDishAmount](NgOrderService.md#setdishamount)
- [setDishComment](NgOrderService.md#setdishcomment)
- [destroy](NgOrderService.md#destroy)
- [emitMessageEvent](NgOrderService.md#emitmessageevent)
- [emitActionEvent](NgOrderService.md#emitactionevent)
- [getMessageEmitter](NgOrderService.md#getmessageemitter)
- [getActionEmitter](NgOrderService.md#getactionemitter)

### Properties

- [orderBus$](NgOrderService.md#orderbus$)

## Constructors

### constructor

• **new NgOrderService**(`ngGqlService`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |

## Methods

### updateStorageOrderIdToken

▸ **updateStorageOrderIdToken**(`newToken`): `void`

**`method`** updateStorageOrderIdToken
Реализация "мульткорзины".
Предназначен для переключения между корзинами, каждая из которых хранятся в localStorage со своим токеном.
Предназначен для переключения потоков с

#### Parameters

| Name | Type |
| :------ | :------ |
| `newToken` | `string` |

#### Returns

`void`

___

### getOrderId

▸ **getOrderId**(`storageOrderIdToken`): `undefined` \| `string`

**`method`** getOrderId

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageOrderIdToken` | `string` |

#### Returns

`undefined` \| `string`

Возвращает orderId, сохраненный ранее в localStorage с ключом @interface `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).

___

### setOrderId

▸ **setOrderId**(`orderId`, `storageOrderIdToken?`): `void`

**`method`** setOrderId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `string` | id Заказа, который требуется сохранить в localStorage с ключом @interface `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId'). Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp). Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся. Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней). |
| `storageOrderIdToken?` | `string` | необязательный альтернативный токен для сохранения orderId в localstorage. Также все последующие операции в localStorage данными заказа начнут использовать этот токен, т.к. обновится внутренняя подписка информации об используемом токене. |

#### Returns

`void`

___

### removeOrderId

▸ **removeOrderId**(): `void`

**`method`** removeOrderId
Удаляет сохраненный в localStorage id заказа.

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

### getPaymentMethods$

▸ **getPaymentMethods$**(`orderId`): `Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

___

### getOrderAndPaymentMethods$

▸ **getOrderAndPaymentMethods$**(): `Observable`<{ `order`: [`Order`](../interfaces/Order.md) ; `methods`: [`PaymentMethod`](../interfaces/PaymentMethod.md)[]  }\>

**`method`** getOrderAndPaymentMethods$

**`see`** getOrder()

#### Returns

`Observable`<{ `order`: [`Order`](../interfaces/Order.md) ; `methods`: [`PaymentMethod`](../interfaces/PaymentMethod.md)[]  }\>

Возвращает поток Observable с объектом, содержащим:
 1. В свойстве order - данные текущего заказа `Order`.
 2. В свойстве methods - массив доступных для этого заказа способов оплаты `PaymentMethod`.
 Для получения данных только о заказе, без информации о способах оплаты используйте метод `getOrder()`;

___

### getOrder

▸ **getOrder**(): `Observable`<[`Order`](../interfaces/Order.md)\>

**`method`** getOrder

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.

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

▸ **addToOrder**(`loading`, `dish`, `amount?`, `dishModifiers?`, `successCb?`, `errorCb?`, `comment?`, `replacedOrderDishId?`): `void`

**`method`** addToOrder
Используется для отправки в шину события добавления блюда.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` | добавляемое блюдо |
| `amount` | `number` | `1` | количество |
| `dishModifiers` | [`Modifier`](../interfaces/Modifier.md)[] \| [`OrderModifier`](../interfaces/OrderModifier.md)[] | `[]` | выбранные пользователем модификаторы блюда |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |
| `comment?` | `string` | `undefined` | - |
| `replacedOrderDishId?` | `number` | `undefined` | - |

#### Returns

`void`

___

### removeFromOrder

▸ **removeFromOrder**(`loading`, `amount?`, `successCb?`, `errorCb?`, `orderDishId?`): `void`

**`method`** removeFromOrder
Используется для отправки в шину события удаления блюда из корзины

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `amount` | `number` | `1` | количество |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |
| `orderDishId?` | `number` | `undefined` | id блюда в корзине |

#### Returns

`void`

___

### updateOrder

▸ **updateOrder**(`__namedParameters`): `void`

**`method`** updateOrder
Используется для отправки в шину события обновления данных в заказе, не связанных с блюдами.
Может использоваться ТОЛЬКО ДО того, как заказ отправлен через @method sendOrder
Также, заказ нужно повторно проверять методом @method checkOrder, если такая проверка уже проводилась ранее.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `Partial`<[`Order`](../interfaces/Order.md)\> |
| `__namedParameters.loading` | `BehaviorSubject`<`boolean`\> |
| `__namedParameters.successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` |
| `__namedParameters.errorCb?` | (`err`: `unknown`) => `void` |

#### Returns

`void`

___

### checkOrder

▸ **checkOrder**(`orderForm`, `successCb?`, `errorCb?`): `void`

**`method`** checkOrder
Используется для отправки в шину события обязательной проверки заказа перед оформлением.
Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderForm` | [`OrderForm`](../README.md#orderform) | Форма чекаута с данными проверяемого заказа |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### sendOrder

▸ **sendOrder**(`orderId`, `successCb?`, `errorCb?`): `void`

**`method`** sendOrder
Используется для отправки в шину события оформления заказа.
Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `string` | - |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### setDishAmount

▸ **setDishAmount**(`loading`, `orderDishId`, `amount?`, `successCb?`, `errorCb?`): `void`

**`method`** setDishAmount
Устанавливает для блюда dish в заказе количество amount.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `orderDishId` | `number` | `undefined` | - |
| `amount` | `number` | `1` | необходимое количество порций |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### setDishComment

▸ **setDishComment**(`loading`, `dish`, `comment`, `successCb?`, `errorCb?`): `void`

**`method`** setDishComment
Добавляет к заказываемому блюду комментарий.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | блюдо, которому добавляется комментарий в корзине |
| `comment` | `string` | добавляемый комментарий |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

___

### emitMessageEvent

▸ **emitMessageEvent**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../interfaces/Message.md) |

#### Returns

`void`

___

### emitActionEvent

▸ **emitActionEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/Action.md) |

#### Returns

`void`

___

### getMessageEmitter

▸ **getMessageEmitter**(): `Observable`<[`Message`](../interfaces/Message.md)\>

#### Returns

`Observable`<[`Message`](../interfaces/Message.md)\>

___

### getActionEmitter

▸ **getActionEmitter**(): `Observable`<[`Action`](../interfaces/Action.md)\>

#### Returns

`Observable`<[`Action`](../interfaces/Action.md)\>

## Properties

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
