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

• **new NgOrderService**(`ngGqlService`, `config`, `defaultPaymentMethodFragments`, `defaultActionFragments`, `defaultMessageFragments`, `defaultOrderFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `defaultPaymentMethodFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`PaymentMethod`](../interfaces/PaymentMethod.md), [`PaymentMethod`](../interfaces/PaymentMethod.md), [`PaymentMethod`](../interfaces/PaymentMethod.md)\> |
| `defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Action`](../interfaces/Action.md)<`any`\>, [`Action`](../interfaces/Action.md)<`any`\>, [`Action`](../interfaces/Action.md)<`any`\>\> |
| `defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Message`](../interfaces/Message.md), [`Message`](../interfaces/Message.md), [`Message`](../interfaces/Message.md)\> |
| `defaultOrderFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Order`](../interfaces/Order.md), [`Order`](../interfaces/Order.md), [`Order`](../interfaces/Order.md)\> |

## Methods

### updateStorageOrderIdToken

▸ **updateStorageOrderIdToken**(`newToken`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newToken` | `string` |  |

#### Returns

`void`

___

### getOrderId

▸ **getOrderId**(`storageOrderIdToken`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageOrderIdToken` | `string` |

#### Returns

`undefined` \| `string`

___

### setOrderId

▸ **setOrderId**(`orderId`, `storageOrderIdToken?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `string` |  |
| `storageOrderIdToken?` | `string` |  |

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

___

### getOrder

▸ **getOrder**(): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### loadOrder$

▸ **loadOrder$**(`orderId`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `undefined` \| `string` |  |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### addToOrder

▸ **addToOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> |  |
| `options.dishId` | `string` |  |
| `options.amount?` | `number` |  |
| `options.dishModifiers?` | `Partial`<[`Modifier`](../interfaces/Modifier.md)\>[] \| `Partial`<[`OrderModifier`](../interfaces/OrderModifier.md)\>[] |  |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |
| `options.comment?` | `string` | - |
| `options.replacedOrderDishId?` | `number` | - |

#### Returns

`void`

___

### removeFromOrder

▸ **removeFromOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> |  |
| `options.amount` | `number` |  |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |
| `options.orderDishId` | `number` |  |

#### Returns

`void`

___

### updateOrder

▸ **updateOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.data` | `Partial`<{ `id`: `string` ; `customData`: `Partial`<{ [x: string]: any; }\> ; `dishes`: `Partial`<{ id: number; amount: number; dish: Partial<{ id: string; images: Partial<{ id: string; uploadDate: string; images: Partial<{ large: string; origin: string; small: string; }\>; }\>[]; groupId: string; ... 20 more ...; customData: Partial<...\>; }\>; ... 9 more ...; total: number; }\>[] ; `message`: `string` ; `discountTotal`: `number` ; `comment`: `string` ; `totalWeight`: `number` ; `total`: `number` ; `shortId`: `string` ; `dishesCount`: `number` ; `deliveryDescription`: `string` ; `deliveryCost`: `number` ; `trifleFrom`: `number` ; `orderTotal`: `number` ; `state`: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"`` ; `rmsId`: `string` ; `rmsOrderNumber`: `string` ; `rmsDeliveryDate`: `string` ; `rmsDelivered`: `boolean` ; `customer`: `Partial`<{ name: string; phone: Partial<{ number: string; code: string; additionalNumber: string; }\>; mail: string; }\> ; `address`: `Partial`<{ comment: string; streetId: string; home: string; city: string; street: string; housing: string; index: string; entrance: string; floor: string; apartment: string; doorphone: string; }\> ; `paid`: `boolean` ; `paymentMethod`: `Partial`<{ id: string; description: string; customData: Partial<{ [x: string]: any; }\>; order: number; type: string; title: string; isCash: boolean; adapter: string; enable: boolean; }\> ; `selfService`: `boolean` ; `pickupAddressId`: `string` ; `locationId`: `string` ; `promocode`: `string` ; `deliveryTimeInfo`: `Partial`<{ deliveryType: "fast" \| "date-time"; deliveryDate: string; deliveryTime: string; }\>  }\> |  |
| `options.loading` | `BehaviorSubject`<`boolean`\> |  |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |

#### Returns

`void`

___

### checkOrder

▸ **checkOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.orderForm` | `Partial`<{ `id`: `string` ; `customData`: `Partial`<{ [x: string]: any; }\> ; `dishes`: `Partial`<{ id: number; amount: number; dish: Partial<{ id: string; images: Partial<{ id: string; uploadDate: string; images: Partial<{ large: string; origin: string; small: string; }\>; }\>[]; groupId: string; ... 20 more ...; customData: Partial<...\>; }\>; ... 9 more ...; total: number; }\>[] ; `message`: `string` ; `discountTotal`: `number` ; `comment`: `string` ; `totalWeight`: `number` ; `total`: `number` ; `shortId`: `string` ; `dishesCount`: `number` ; `deliveryDescription`: `string` ; `deliveryCost`: `number` ; `trifleFrom`: `number` ; `orderTotal`: `number` ; `state`: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"`` ; `rmsId`: `string` ; `rmsOrderNumber`: `string` ; `rmsDeliveryDate`: `string` ; `rmsDelivered`: `boolean` ; `customer`: `Partial`<{ name: string; phone: Partial<{ number: string; code: string; additionalNumber: string; }\>; mail: string; }\> ; `address`: `Partial`<{ comment: string; streetId: string; home: string; city: string; street: string; housing: string; index: string; entrance: string; floor: string; apartment: string; doorphone: string; }\> ; `paid`: `boolean` ; `paymentMethod`: `Partial`<{ id: string; description: string; customData: Partial<{ [x: string]: any; }\>; order: number; type: string; title: string; isCash: boolean; adapter: string; enable: boolean; }\> ; `selfService`: `boolean` ; `pickupAddressId`: `string` ; `locationId`: `string` ; `promocode`: `string` ; `deliveryTimeInfo`: `Partial`<{ deliveryType: "fast" \| "date-time"; deliveryDate: string; deliveryTime: string; }\>  }\> |  |
| `options.successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |

#### Returns

`void`

___

### sendOrder

▸ **sendOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.orderId` | `string` |  |
| `options.loading?` | `BehaviorSubject`<`boolean`\> | - |
| `options.successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |

#### Returns

`void`

___

### setDishAmount

▸ **setDishAmount**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> |  |
| `options.orderDishId` | `number` |  |
| `options.amount?` | `number` |  |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |

#### Returns

`void`

___

### setDishComment

▸ **setDishComment**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.loading` | `BehaviorSubject`<`boolean`\> |  |
| `options.orderDishId` | `number` |  |
| `options.comment` | `string` |  |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |

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
