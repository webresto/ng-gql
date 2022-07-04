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

▸ **addToOrder**(`loading`, `dish`, `amount?`, `dishModifiers?`, `successCb?`, `errorCb?`, `comment?`, `replacedOrderDishId?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` |  |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` |  |
| `amount` | `number` | `1` |  |
| `dishModifiers` | `Partial`<[`Modifier`](../interfaces/Modifier.md)\>[] \| `Partial`<[`OrderModifier`](../interfaces/OrderModifier.md)\>[] | `[]` |  |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` |  |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` |  |
| `comment?` | `string` | `undefined` | - |
| `replacedOrderDishId?` | `number` | `undefined` | - |

#### Returns

`void`

___

### removeFromOrder

▸ **removeFromOrder**(`loading`, `amount?`, `successCb?`, `errorCb?`, `orderDishId?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` |  |
| `amount` | `number` | `1` |  |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` |  |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` |  |
| `orderDishId?` | `number` | `undefined` |  |

#### Returns

`void`

___

### updateOrder

▸ **updateOrder**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.data` | `Partial`<[`Order`](../interfaces/Order.md)\> |  |
| `options.loading` | `BehaviorSubject`<`boolean`\> |  |
| `options.successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | - |
| `options.errorCb?` | (`err`: `unknown`) => `void` | - |

#### Returns

`void`

___

### checkOrder

▸ **checkOrder**(`orderForm`, `successCb?`, `errorCb?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderForm` | [`OrderForm`](../README.md#orderform) |  |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` |  |
| `errorCb?` | (`err`: `unknown`) => `void` |  |

#### Returns

`void`

___

### sendOrder

▸ **sendOrder**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.orderId` | `string` |
| `options.loading?` | `BehaviorSubject`<`boolean`\> |
| `options.successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` |
| `options.errorCb?` | (`err`: `unknown`) => `void` |

#### Returns

`void`

___

### setDishAmount

▸ **setDishAmount**(`loading`, `orderDishId`, `amount?`, `successCb?`, `errorCb?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` |  |
| `orderDishId` | `number` | `undefined` |  |
| `amount` | `number` | `1` |  |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` |  |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` |  |

#### Returns

`void`

___

### setDishComment

▸ **setDishComment**(`loading`, `dish`, `comment`, `successCb?`, `errorCb?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> |  |
| `dish` | [`Dish`](../interfaces/Dish.md) |  |
| `comment` | `string` |  |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` |  |
| `errorCb?` | (`err`: `unknown`) => `void` |  |

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
