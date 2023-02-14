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
- [getOrderPaymentMethods$](NgOrderService.md#getorderpaymentmethods$)
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

• **new NgOrderService**(`ngGqlService`, `storage`, `storageWrapper`, `config`, `defaultPaymentMethodFragments`, `defaultActionFragments`, `defaultMessageFragments`, `defaultOrderFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `storage` | [`NgGqlStorageService`](NgGqlStorageService.md) |
| `storageWrapper` | [`NqGqlLocalStorageWrapper`](NqGqlLocalStorageWrapper.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `defaultPaymentMethodFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`PaymentMethod`](../interfaces/PaymentMethod.md)\> |
| `defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Action`](../interfaces/Action.md)<`any`\>\> |
| `defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Message`](../interfaces/Message.md)\> |
| `defaultOrderFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\> |

## Methods

### updateStorageOrderIdToken

▸ **updateStorageOrderIdToken**(`newToken`): `void`

**`Method`**

updateStorageOrderIdToken()

**`See`**

this.StorageWrapper.updateStorageOrderIdToken()

#### Parameters

| Name | Type |
| :------ | :------ |
| `newToken` | `string` |

#### Returns

`void`

___

### getOrderId

▸ **getOrderId**(`storageOrderIdToken`, `storageOrderId?`): `undefined` \| `string`

**`Method`**

getOrderId()

**`See`**

this.StorageWrapper.getOrderId()

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageOrderIdToken` | `string` |
| `storageOrderId?` | `string` |

#### Returns

`undefined` \| `string`

___

### setOrderId

▸ **setOrderId**(`orderId`, `storageOrderIdToken?`): `void`

**`Method`**

setOrderId()

**`See`**

this.StorageWrapper.setOrderId()

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |
| `storageOrderIdToken?` | `string` |

#### Returns

`void`

___

### removeOrderId

▸ **removeOrderId**(`newOrderId?`): `void`

**`Method`**

removeOrderId()

**`See`**

this.StorageWrapper.removeOrderId()

#### Parameters

| Name | Type |
| :------ | :------ |
| `newOrderId?` | `string` |

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

### getOrderPaymentMethods$

▸ **getOrderPaymentMethods$**(): `Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

**`Method`**

getOrderPaymentMethods$()

#### Returns

`Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

Возвращает поток Observable с массивом доступных для этого заказа способов оплаты `PaymentMethod`.

___

### getOrder

▸ **getOrder**(): `Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

**`Method`**

() getOrder

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.

___

### loadOrder$

▸ **loadOrder$**(`id`, `isShort?`): `Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

**`Method`**

loadOrder$()

Метод загружает заказ и делает подписку для получения по нему обновлений.
Используется для внутренних нужд библиотеки, а также может использоваться для загрузки заказа отдельно от шины событий заказов
(например, данные для страницы "Спасибо за заказ").

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `undefined` \| `string` | `undefined` | id загружаемого заказа. Если отсутствует - создается новый заказ и возвращаются данные по нему. |
| `isShort` | `boolean` | `false` | - |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

___

### addToOrder

▸ **addToOrder**(`options`): `void`

**`Method`**

addToOrder()
Используется для отправки в шину события добавления блюда.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.dishId` | `string` | id добавляемого блюдо |
| `options.amount?` | `number` | количество |
| `options.dishModifiers?` | `Partial`<[`Modifier`](../interfaces/Modifier.md)<[`Dish`](../interfaces/Dish.md)\>\>[] \| `Partial`<[`OrderModifier`](../interfaces/OrderModifier.md)<[`Dish`](../interfaces/Dish.md)\>\>[] | выбранные пользователем модификаторы блюда (необязательный) |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |
| `options.comment?` | `string` | - |
| `options.replacedOrderDishId?` | `number` | - |

#### Returns

`void`

___

### removeFromOrder

▸ **removeFromOrder**(`options`): `void`

**`Method`**

removeFromOrder()
Используется для отправки в шину события удаления блюда из корзины

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.amount` | `number` | количество |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |
| `options.orderDishId` | `number` | id удаляемого блюда в корзине |

#### Returns

`void`

___

### updateOrder

▸ **updateOrder**(`options`): `void`

**`Method`**

updateOrder()
Используется для отправки в шину события обновления данных в заказе, не связанных с блюдами.
Может использоваться ТОЛЬКО ДО того, как заказ отправлен через

**`Method`**

this.sendOrder()
Также, заказ нужно повторно проверять методом

**`Method`**

this.checkOrder(), если такая проверка уже проводилась ранее.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.data` | `Partial`<{ `id`: `string` ; `customData`: `Partial`<{ [x: string]: any; }\> ; `dishes`: `Partial`<{ id: number; modifiers: Partial<{ id: string; groupId: string; amount: number; dish: Partial<{ id: string; images: Partial<{ id: string; uploadDate: string; images: Partial<{ large: string; origin: string; small: string; }\>; }\>[]; ... 22 more ...; customData: Partial<...\>; }\>; }\>[]; ... 11 more ...; total: number; }\>[] ; `message`: `string` ; `discountTotal`: `number` ; `comment`: `string` ; `totalWeight`: `number` ; `total`: `number` ; `selfService`: `boolean` ; `pickupAddressId`: `string` ; `locationId`: `string` ; `address`: `Partial`<{ comment: string; streetId: string; home: string; city: string; street: string; housing: string; index: string; entrance: string; floor: string; apartment: string; doorphone: string; }\> ; `customer`: `Partial`<{ name: string; phone: Partial<{ number: string; code: string; additionalNumber: string; }\>; mail: string; }\> ; `shortId`: `string` ; `dishesCount`: `number` ; `deliveryDescription`: `string` ; `deliveryCost`: `number` ; `trifleFrom`: `number` ; `orderTotal`: `number` ; `state`: [`OrderState`](../README.md#orderstate) ; `rmsId`: `string` ; `rmsOrderNumber`: `string` ; `rmsDeliveryDate`: `string` ; `rmsDelivered`: `boolean` ; `paid`: `boolean` ; `paymentMethod`: `Partial`<{ id: string; description: string; customData: Partial<{ [x: string]: any; }\>; order: number; type: string; title: string; isCash: boolean; adapter: string; enable: boolean; }\> ; `promocode`: `string` ; `deliveryTimeInfo`: `Partial`<{ deliveryType: "fast" \| "date-time"; deliveryDate: string; deliveryTime: string; }\>  }\> | объект заказа, при этом не все данные из него будут приняты и, в результате, обновлены. Большая часть будет данных будет проигнорирована и может изменяться только в рамках других методов согласно заложенной бизнес-логике. В настоящее время из всего заказа учитываются изменения ТОЛЬКО в свойстве `Order.trifleFrom`. |
| `options.loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

#### Returns

`void`

___

### checkOrder

▸ **checkOrder**(`options`): `void`

**`Method`**

checkOrder()
Используется для отправки в шину события обязательной проверки заказа перед оформлением.
Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.orderForm` | `Partial`<{ `id`: `string` ; `customData`: `Partial`<{ [x: string]: any; }\> ; `dishes`: `Partial`<{ id: number; modifiers: Partial<{ id: string; groupId: string; amount: number; dish: Partial<{ id: string; images: Partial<{ id: string; uploadDate: string; images: Partial<{ large: string; origin: string; small: string; }\>; }\>[]; ... 22 more ...; customData: Partial<...\>; }\>; }\>[]; ... 11 more ...; total: number; }\>[] ; `message`: `string` ; `discountTotal`: `number` ; `comment`: `string` ; `totalWeight`: `number` ; `total`: `number` ; `selfService`: `boolean` ; `pickupAddressId`: `string` ; `locationId`: `string` ; `address`: `Partial`<{ comment: string; streetId: string; home: string; city: string; street: string; housing: string; index: string; entrance: string; floor: string; apartment: string; doorphone: string; }\> ; `customer`: `Partial`<{ name: string; phone: Partial<{ number: string; code: string; additionalNumber: string; }\>; mail: string; }\> ; `shortId`: `string` ; `dishesCount`: `number` ; `deliveryDescription`: `string` ; `deliveryCost`: `number` ; `trifleFrom`: `number` ; `orderTotal`: `number` ; `state`: [`OrderState`](../README.md#orderstate) ; `rmsId`: `string` ; `rmsOrderNumber`: `string` ; `rmsDeliveryDate`: `string` ; `rmsDelivered`: `boolean` ; `paid`: `boolean` ; `paymentMethod`: `Partial`<{ id: string; description: string; customData: Partial<{ [x: string]: any; }\>; order: number; type: string; title: string; isCash: boolean; adapter: string; enable: boolean; }\> ; `promocode`: `string` ; `deliveryTimeInfo`: `Partial`<{ deliveryType: "fast" \| "date-time"; deliveryDate: string; deliveryTime: string; }\>  }\> | Форма чекаута с данными проверяемого заказа |
| `options.successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

#### Returns

`void`

___

### sendOrder

▸ **sendOrder**(`options`): `void`

**`Method`**

sendOrder()
Используется для отправки в шину события оформления заказа.
Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.orderId` | `string` | Форма чекаута с данными оформляемего заказа |
| `options.orderIdFactory?` | () => `undefined` \| `string` | - |
| `options.loading?` | `BehaviorSubject`<`boolean`\> | - |
| `options.successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

#### Returns

`void`

___

### setDishAmount

▸ **setDishAmount**(`options`): `void`

**`Method`**

setDishAmount()
Устанавливает для блюда dish в заказе количество amount.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.orderDishId` | `number` | id блюда в корзине, для которого изменяется количество заказываемых порций |
| `options.amount?` | `number` | необходимое количество порций |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

#### Returns

`void`

___

### setDishComment

▸ **setDishComment**(`options`): `void`

**`Method`**

setDishComment()
Добавляет к заказываемому блюду комментарий.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.orderDishId` | `number` | id блюда в корзине, которому добавляется комментарий |
| `options.comment` | `string` | добавляемый комментарий |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

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
| `action` | [`Action`](../interfaces/Action.md)<`any`\> |

#### Returns

`void`

___

### getMessageEmitter

▸ **getMessageEmitter**(): `Observable`<[`Message`](../interfaces/Message.md)\>

#### Returns

`Observable`<[`Message`](../interfaces/Message.md)\>

___

### getActionEmitter

▸ **getActionEmitter**(): `Observable`<[`Action`](../interfaces/Action.md)<`any`\>\>

#### Returns

`Observable`<[`Action`](../interfaces/Action.md)<`any`\>\>

## Properties

### orderBus$

• **orderBus$**: `Observable`<`void` \| () => `void`\>

Внутренний поток-шина для событий, ассоциированных с действиями, которыми необходимо выполнить с заказом (добавить/удалить блюдо, проверить заказ, отправить на проверку и тп.).
Используется только в случае, если в

**`See`**

 - this.config параметр busSubscribeMode установлен в значении 'custom' для самостоятельного управления подпиской на стороне приложения.
Использование этого потока и событий внутри него извне не подразумевается и не предусматривается,
Для выполнения действий с заказом, необходимо использовать соответствующие методы:
 - this.addToOrder
 - this.removeFromOrder
 - this.checkOrder
 - this.sendOrder
 - this.setDishAmount
 - this.setDishComment
