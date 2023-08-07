# Class: NgOrderService

## Table of contents

### Constructors

- [constructor](NgOrderService.md#constructor)

### Accessors

- [orderBus$](NgOrderService.md#orderbus$)

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
- [cloneOrder](NgOrderService.md#cloneorder)
- [setDishAmount](NgOrderService.md#setdishamount)
- [setDishComment](NgOrderService.md#setdishcomment)
- [destroy](NgOrderService.md#destroy)
- [getDishRecomended](NgOrderService.md#getdishrecomended)
- [getOrderRecommended](NgOrderService.md#getorderrecommended)

## Constructors

### constructor

• **new NgOrderService**(`requestService`, `storage`, `storageWrapper`, `userBusService`, `ngGqlService`, `ngGqlUser`, `config`, `defaultPaymentMethodFragments`, `defaultOrderFragments`, `defaultDishFragments`, `defaultActionFragments`, `defaultMessageFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestService` | [`RequestService`](RequestService.md) |
| `storage` | [`NgGqlStoreService`](NgGqlStoreService.md) |
| `storageWrapper` | [`NqGqlLocalStorageWrapper`](NqGqlLocalStorageWrapper.md) |
| `userBusService` | [`NgGqlUserBusService`](NgGqlUserBusService.md) |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `ngGqlUser` | [`NgGqlUserService`](NgGqlUserService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `defaultPaymentMethodFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`PaymentMethod`](../interfaces/PaymentMethod.md)\> |
| `defaultOrderFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\> |
| `defaultDishFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Dish`](../interfaces/Dish.md)\> |
| `defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Action`](../interfaces/Action.md)<`any`\>\> |
| `defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Message`](../interfaces/Message.md)\> |

## Accessors

### orderBus$

• `get` **orderBus$**(): `Observable`<`void` \| () => `void`\>

#### Returns

`Observable`<`void` \| () => `void`\>

## Methods

### updateStorageOrderIdToken

▸ **updateStorageOrderIdToken**(`newToken`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newToken` | `string` |

#### Returns

`void`

**`Method`**

updateStorageOrderIdToken()

**`See`**

this.StorageWrapper.updateStorageOrderIdToken()

___

### getOrderId

▸ **getOrderId**(`storageOrderIdToken`, `storageOrderId?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageOrderIdToken` | `string` |
| `storageOrderId?` | `string` |

#### Returns

`string`

**`Method`**

getOrderId()

**`See`**

this.StorageWrapper.getOrderId()

___

### setOrderId

▸ **setOrderId**(`orderId`, `storageOrderIdToken?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |
| `storageOrderIdToken?` | `string` |

#### Returns

`void`

**`Method`**

setOrderId()

**`See`**

this.StorageWrapper.setOrderId()

___

### removeOrderId

▸ **removeOrderId**(`newOrderId?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newOrderId?` | `string` |

#### Returns

`void`

**`Method`**

removeOrderId()

**`See`**

this.StorageWrapper.removeOrderId()

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

#### Returns

`Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

Возвращает поток Observable с массивом доступных для этого заказа способов оплаты `PaymentMethod`.

**`Method`**

getOrderPaymentMethods$()

___

### getOrder

▸ **getOrder**(): `Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.

**`Method`**

() getOrder

___

### loadOrder$

▸ **loadOrder$**(`id`, `isShort?`): `Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `undefined` \| `string` | `undefined` | id загружаемого заказа. Если отсутствует - создается новый заказ и возвращаются данные по нему. |
| `isShort` | `boolean` | `false` | - |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

**`Method`**

loadOrder$()

Метод загружает заказ и делает подписку для получения по нему обновлений.
Используется для внутренних нужд библиотеки, а также может использоваться для загрузки заказа отдельно от шины событий заказов
(например, данные для страницы "Спасибо за заказ").

___

### addToOrder

▸ **addToOrder**(`options`): `void`

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

**`Method`**

addToOrder()
Используется для отправки в шину события добавления блюда.

___

### removeFromOrder

▸ **removeFromOrder**(`options`): `void`

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

**`Method`**

removeFromOrder()
Используется для отправки в шину события удаления блюда из корзины

___

### updateOrder

▸ **updateOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.data` | `Partial`<{ `id`: `string` ; `customData`: `Partial`<{ [x: string]: any; }\> ; `dishes`: `Partial`<{ id: number; modifiers: Partial<{ id: string; groupId: string; amount: number; dish: Partial<{ id: string; additionalInfo: string \| number \| Partial<{ [x: string]: any; }\>; name: string; description: string; ... 21 more ...; customData: Partial<...\>; }\>; }\>[]; ... 11 more ...; total: number; }\>[] ; `message`: `string` ; `selfService`: `boolean` ; `pickupAddressId`: `string` ; `locationId`: `string` ; `date`: `string` ; `address`: `Partial`<{ comment: string; streetId: string; home: string; city: string; street: string; housing: string; index: string; entrance: string; floor: string; apartment: string; doorphone: string; }\> ; `customer`: `Partial`<{ name: string; phone: Partial<{ number: string; code: string; additionalNumber: string; }\>; mail: string; }\> ; `comment`: `string` ; `discountTotal`: `number` ; `totalWeight`: `number` ; `total`: `number` ; `shortId`: `string` ; `dishesCount`: `number` ; `deliveryDescription`: `string` ; `deliveryCost`: `number` ; `trifleFrom`: `number` ; `orderTotal`: `number` ; `state`: [`OrderState`](../README.md#orderstate) ; `rmsId`: `string` ; `rmsOrderNumber`: `string` ; `rmsDeliveryDate`: `string` ; `rmsDelivered`: `boolean` ; `paid`: `boolean` ; `paymentMethod`: `Partial`<{ id: string; description: string; sortOrder: number; customData: Partial<{ [x: string]: any; }\>; title: string; type: string; enable: boolean; isCash: boolean; adapter: string; }\> ; `promocode`: `string`  }\> | объект заказа, при этом не все данные из него будут приняты и, в результате, обновлены. Большая часть будет данных будет проигнорирована и может изменяться только в рамках других методов согласно заложенной бизнес-логике. В настоящее время из всего заказа учитываются изменения ТОЛЬКО в свойстве `Order.trifleFrom`. |
| `options.loading` | `BehaviorSubject`<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

#### Returns

`void`

**`Method`**

updateOrder()
Используется для отправки в шину события обновления данных в заказе, не связанных с блюдами.
Может использоваться ТОЛЬКО ДО того, как заказ отправлен через

**`Method`**

this.sendOrder()
Также, заказ нужно повторно проверять методом

**`Method`**

this.checkOrder(), если такая проверка уже проводилась ранее.

___

### checkOrder

▸ **checkOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.orderForm` | `Partial`<{ `id`: `string` ; `customData`: `Partial`<{ [x: string]: any; }\> ; `dishes`: `Partial`<{ id: number; modifiers: Partial<{ id: string; groupId: string; amount: number; dish: Partial<{ id: string; additionalInfo: string \| number \| Partial<{ [x: string]: any; }\>; name: string; description: string; ... 21 more ...; customData: Partial<...\>; }\>; }\>[]; ... 11 more ...; total: number; }\>[] ; `message`: `string` ; `selfService`: `boolean` ; `pickupAddressId`: `string` ; `locationId`: `string` ; `date`: `string` ; `address`: `Partial`<{ comment: string; streetId: string; home: string; city: string; street: string; housing: string; index: string; entrance: string; floor: string; apartment: string; doorphone: string; }\> ; `customer`: `Partial`<{ name: string; phone: Partial<{ number: string; code: string; additionalNumber: string; }\>; mail: string; }\> ; `comment`: `string` ; `discountTotal`: `number` ; `totalWeight`: `number` ; `total`: `number` ; `shortId`: `string` ; `dishesCount`: `number` ; `deliveryDescription`: `string` ; `deliveryCost`: `number` ; `trifleFrom`: `number` ; `orderTotal`: `number` ; `state`: [`OrderState`](../README.md#orderstate) ; `rmsId`: `string` ; `rmsOrderNumber`: `string` ; `rmsDeliveryDate`: `string` ; `rmsDelivered`: `boolean` ; `paid`: `boolean` ; `paymentMethod`: `Partial`<{ id: string; description: string; sortOrder: number; customData: Partial<{ [x: string]: any; }\>; title: string; type: string; enable: boolean; isCash: boolean; adapter: string; }\> ; `promocode`: `string`  }\> | Форма чекаута с данными проверяемого заказа |
| `options.successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

#### Returns

`void`

**`Method`**

checkOrder()
Используется для отправки в шину события обязательной проверки заказа перед оформлением.
Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.

___

### sendOrder

▸ **sendOrder**(`options`): `void`

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

**`Method`**

sendOrder()
Используется для отправки в шину события оформления заказа.
Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.

___

### cloneOrder

▸ **cloneOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.orderId` | `string` | Форма чекаута с данными оформляемего заказа |
| `options.orderIdFactory?` | () => `undefined` \| `string` | - |
| `options.loading?` | `BehaviorSubject`<`boolean`\> | - |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `options.errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно выполнен в случае успешной операции |

#### Returns

`void`

**`Method`**

cloneOrder()
Используется для отправки в шину события повтора уже сделанного ранее заказа.

___

### setDishAmount

▸ **setDishAmount**(`options`): `void`

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

**`Method`**

setDishAmount()
Устанавливает для блюда dish в заказе количество amount.

___

### setDishComment

▸ **setDishComment**(`options`): `void`

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

**`Method`**

setDishComment()
Добавляет к заказываемому блюду комментарий.

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

___

### getDishRecomended

▸ **getDishRecomended**(`dishId`): `Observable`<[`Dish`](../interfaces/Dish.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `string` |

#### Returns

`Observable`<[`Dish`](../interfaces/Dish.md)[]\>

___

### getOrderRecommended

▸ **getOrderRecommended**(): `Observable`<[`Dish`](../interfaces/Dish.md)[]\>

#### Returns

`Observable`<[`Dish`](../interfaces/Dish.md)[]\>
