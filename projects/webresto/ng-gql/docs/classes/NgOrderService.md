# Class: NgOrderService

## Table of contents

### Constructors

- [constructor](NgOrderService.md#constructor)

### Accessors

- [orderBus$](NgOrderService.md#orderbus$)

### Methods

- [updateStorageOrderIdToken](NgOrderService.md#updatestorageorderidtoken)
- [paymentLink$](NgOrderService.md#paymentlink$)
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
- [getPickupPoints](NgOrderService.md#getpickuppoints)

## Constructors

### constructor

• **new NgOrderService**(`_requestService`, `_storage`, `_storageWrapper`, `_userBusService`, `_ngGqlService`, `_ngGqlUser`, `_config`, `_defaultPaymentMethodFragments`, `_defaultOrderFragments`, `_defaultDishFragments`, `_defaultActionFragments`, `_defaultMessageFragments`): [`NgOrderService`](NgOrderService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_requestService` | [`RequestService`](RequestService.md) |
| `_storage` | [`NgGqlStoreService`](NgGqlStoreService.md) |
| `_storageWrapper` | [`NqGqlLocalStorageWrapper`](NqGqlLocalStorageWrapper.md) |
| `_userBusService` | [`NgGqlUserBusService`](NgGqlUserBusService.md) |
| `_ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `_ngGqlUser` | [`NgGqlUserService`](NgGqlUserService.md) |
| `_config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `_defaultPaymentMethodFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`PaymentMethod`](../interfaces/PaymentMethod.md)\> |
| `_defaultOrderFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>\> |
| `_defaultDishFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`Dish`](../interfaces/Dish.md)\> |
| `_defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`Action`](../interfaces/Action.md)\<`any`\>\> |
| `_defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`Message`](../interfaces/Message.md)\> |

#### Returns

[`NgOrderService`](NgOrderService.md)

## Accessors

### orderBus$

• `get` **orderBus$**(): `Observable`\<`void` \| () => `void`\>

#### Returns

`Observable`\<`void` \| () => `void`\>

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

### paymentLink$

▸ **paymentLink$**(`phone`, `fromPhone`, `orderId`): `Observable`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |
| `fromPhone` | `string` |
| `orderId` | `string` |

#### Returns

`Observable`\<`any`\>

___

### getOrderPaymentMethods$

▸ **getOrderPaymentMethods$**(): `Observable`\<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

#### Returns

`Observable`\<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

Возвращает поток Observable с массивом доступных для этого заказа способов оплаты `PaymentMethod`.

**`Method`**

getOrderPaymentMethods$()

___

### getOrder

▸ **getOrder**(): `Observable`\<[`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>\>

#### Returns

`Observable`\<[`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>\>

Возвращает поток Observable с данными текущего заказа, оформление которого не завершено.

**`Method`**

() getOrder

___

### loadOrder$

▸ **loadOrder$**(`id`, `isShort?`): `Observable`\<[`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `string` | `undefined` | id загружаемого заказа. |
| `isShort` | `boolean` | `false` | - |

#### Returns

`Observable`\<[`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>\>

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
| `options.orderId` | `string` | id заказа. |
| `options.loading?` | `BehaviorSubject`\<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.dishId` | `string` | id добавляемого блюдо |
| `options.amount?` | `number` | количество |
| `options.dishModifiers?` | `Partial`\<[`Modifier`](../interfaces/Modifier.md)\<[`Dish`](../interfaces/Dish.md)\>\>[] \| `Partial`\<[`OrderModifier`](../interfaces/OrderModifier.md)\<[`Dish`](../interfaces/Dish.md)\>\>[] | выбранные пользователем модификаторы блюда (необязательный) |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
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
| `options.orderId` | `string` | id заказа. |
| `options.loading?` | `BehaviorSubject`\<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.amount` | `number` | количество |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
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
| `options.data` | `Partial`\<\{ `customData`: `Partial`\<\{ [x: string]: any; }\> ; `id`: `string` ; `shortId`: `string` ; `dishes`: `Partial`\<\{ id?: number \| null \| undefined; amount?: number \| null \| undefined; dish?: Partial\<\{ id?: string \| undefined; name?: string \| undefined; slug?: string \| undefined; description?: string \| undefined; ... 27 more ...; customData?: Partial\<...\> \| undefined; }\> \| undefined; ... 9 more ...; modifiers?: Partial\<...\>[] \| ...\>[] ; `dishesCount`: ``null`` \| `number` ; `comment`: `string` ; `deliveryDescription`: `string` ; `message`: `string` ; `deliveryCost`: ``null`` \| `number` ; `totalWeight`: ``null`` \| `number` ; `trifleFrom`: ``null`` \| `number` ; `total`: ``null`` \| `number` ; `orderTotal`: ``null`` \| `number` ; `discountTotal`: ``null`` \| `number` ; `state`: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"`` ; `rmsId?`: `string` ; `rmsOrderNumber?`: `string` ; `rmsDeliveryDate?`: `string` ; `rmsDelivered?`: `boolean` ; `customer`: `Partial`\<\{ phone?: Partial\<\{ number?: string \| undefined; code?: string \| undefined; additionalNumber?: string \| undefined; }\> \| undefined; mail?: string \| undefined; name?: string \| undefined; }\> ; `address`: `Partial`\<\{ streetId?: string \| undefined; home?: string \| undefined; comment?: string \| undefined; city?: string \| undefined; street?: string \| undefined; housing?: string \| undefined; index?: string \| undefined; entrance?: string \| undefined; floor?: string \| undefined; apartment?: string \| undefined; doorphone?: string \| u...\> ; `paid?`: `boolean` ; `paymentMethod`: `Partial`\<\{ id?: string \| undefined; type?: string \| undefined; title?: string \| undefined; description?: string \| undefined; isCash?: boolean \| undefined; adapter?: string \| undefined; sortOrder?: number \| ... 1 more ... \| undefined; enable?: boolean \| undefined; customData?: Partial\<...\> \| undefined; }\> ; `selfService`: `boolean` ; `date`: `string` ; `orderDate`: `string` ; `personsCount`: ``null`` \| `number` ; `deliveryStatus`: `string` ; `promotionState`: `Partial`\<\{ type: string; message: string; state: Partial\<\{ [x: string]: any; }\>; }\>[] ; `pickupPoint`: `Partial`\<\{ id: string; title: string; enable: boolean; order: number \| null; address: string; phone: string; }\> ; `spendBonus`: `Partial`\<\{ bonusProgramId: string; amount: number \| null; adapter: string; bonusProgramName: string; }\> ; `bonusesTotal`: ``null`` \| `number` ; `promotionUnorderable`: `boolean` ; `promotionCodeString`: `string` ; `locationId?`: `string`  }\> | объект заказа, при этом не все данные из него будут приняты и, в результате, обновлены. Большая часть будет данных будет проигнорирована и может изменяться только в рамках других методов согласно заложенной бизнес-логике. В настоящее время из всего заказа учитываются изменения ТОЛЬКО в свойстве `Order.trifleFrom`. |
| `options.loading?` | `BehaviorSubject`\<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
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
| `options.orderForm` | `Partial`\<\{ `customData`: `Partial`\<\{ [x: string]: any; }\> ; `id`: `string` ; `shortId`: `string` ; `dishes`: `Partial`\<\{ id?: number \| null \| undefined; amount?: number \| null \| undefined; dish?: Partial\<\{ id?: string \| undefined; name?: string \| undefined; slug?: string \| undefined; description?: string \| undefined; ... 27 more ...; customData?: Partial\<...\> \| undefined; }\> \| undefined; ... 9 more ...; modifiers?: Partial\<...\>[] \| ...\>[] ; `dishesCount`: ``null`` \| `number` ; `comment`: `string` ; `deliveryDescription`: `string` ; `message`: `string` ; `deliveryCost`: ``null`` \| `number` ; `totalWeight`: ``null`` \| `number` ; `trifleFrom`: ``null`` \| `number` ; `total`: ``null`` \| `number` ; `orderTotal`: ``null`` \| `number` ; `discountTotal`: ``null`` \| `number` ; `state`: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"`` ; `rmsId?`: `string` ; `rmsOrderNumber?`: `string` ; `rmsDeliveryDate?`: `string` ; `rmsDelivered?`: `boolean` ; `customer`: `Partial`\<\{ phone?: Partial\<\{ number?: string \| undefined; code?: string \| undefined; additionalNumber?: string \| undefined; }\> \| undefined; mail?: string \| undefined; name?: string \| undefined; }\> ; `address`: `Partial`\<\{ streetId?: string \| undefined; home?: string \| undefined; comment?: string \| undefined; city?: string \| undefined; street?: string \| undefined; housing?: string \| undefined; index?: string \| undefined; entrance?: string \| undefined; floor?: string \| undefined; apartment?: string \| undefined; doorphone?: string \| u...\> ; `paid?`: `boolean` ; `paymentMethod`: `Partial`\<\{ id?: string \| undefined; type?: string \| undefined; title?: string \| undefined; description?: string \| undefined; isCash?: boolean \| undefined; adapter?: string \| undefined; sortOrder?: number \| ... 1 more ... \| undefined; enable?: boolean \| undefined; customData?: Partial\<...\> \| undefined; }\> ; `selfService`: `boolean` ; `date`: `string` ; `orderDate`: `string` ; `personsCount`: ``null`` \| `number` ; `deliveryStatus`: `string` ; `promotionState`: `Partial`\<\{ type: string; message: string; state: Partial\<\{ [x: string]: any; }\>; }\>[] ; `pickupPoint`: `Partial`\<\{ id: string; title: string; enable: boolean; order: number \| null; address: string; phone: string; }\> ; `spendBonus`: `Partial`\<\{ bonusProgramId: string; amount: number \| null; adapter: string; bonusProgramName: string; }\> ; `bonusesTotal`: ``null`` \| `number` ; `promotionUnorderable`: `boolean` ; `promotionCodeString`: `string` ; `locationId?`: `string`  }\> | Форма чекаута с данными проверяемого заказа |
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
| `options.loading?` | `BehaviorSubject`\<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
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
| `options.loading?` | `BehaviorSubject`\<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
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
| `options.orderId` | `string` | id заказа. |
| `options.loading?` | `BehaviorSubject`\<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.orderDishId` | `number` | id блюда в корзине, для которого изменяется количество заказываемых порций |
| `options.amount?` | `number` | необходимое количество порций |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
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
| `options.loading?` | `BehaviorSubject`\<`boolean`\> | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `options.orderDishId` | `number` | id блюда в корзине, которому добавляется комментарий |
| `options.comment` | `string` | добавляемый комментарий |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)\<[`Dish`](../interfaces/Dish.md)\>) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
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

▸ **getDishRecomended**(`dishId`): `Observable`\<[`Dish`](../interfaces/Dish.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `string` |

#### Returns

`Observable`\<[`Dish`](../interfaces/Dish.md)[]\>

___

### getOrderRecommended

▸ **getOrderRecommended**(): `Observable`\<[`Dish`](../interfaces/Dish.md)[]\>

#### Returns

`Observable`\<[`Dish`](../interfaces/Dish.md)[]\>

___

### getPickupPoints

▸ **getPickupPoints**(): `Observable`\<[`PickupPoint`](../README.md#pickuppoint)[]\>

#### Returns

`Observable`\<[`PickupPoint`](../README.md#pickuppoint)[]\>
