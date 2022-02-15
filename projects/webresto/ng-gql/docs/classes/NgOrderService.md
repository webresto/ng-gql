# Class: NgOrderService

## Table of contents

### Constructors

- [constructor](NgOrderService.md#constructor)

### Properties

- [orderId](NgOrderService.md#orderid)
- [order](NgOrderService.md#order)
- [modifiers$](NgOrderService.md#modifiers$)
- [modifiersMessage$](NgOrderService.md#modifiersmessage$)
- [messages](NgOrderService.md#messages)
- [OrderFormChange](NgOrderService.md#orderformchange)
- [orderSubscription](NgOrderService.md#ordersubscription)

### Methods

- [getOrderId](NgOrderService.md#getorderid)
- [setOrderId](NgOrderService.md#setorderid)
- [removeOrderId](NgOrderService.md#removeorderid)
- [userOrder$](NgOrderService.md#userorder$)
- [setModifiers](NgOrderService.md#setmodifiers)
- [getModifiers](NgOrderService.md#getmodifiers)
- [initialStorage](NgOrderService.md#initialstorage)
- [addDishToOrder$](NgOrderService.md#adddishtoorder$)
- [removeDishFromOrder$](NgOrderService.md#removedishfromorder$)
- [orderCart$](NgOrderService.md#ordercart$)
- [paymentLink$](NgOrderService.md#paymentlink$)
- [checkOrder$](NgOrderService.md#checkorder$)
- [setDishCountToOrder$](NgOrderService.md#setdishcounttoorder$)
- [setDishComment$](NgOrderService.md#setdishcomment$)

## Constructors

### constructor

• **new NgOrderService**(`ngGqlService`, `eventer`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `eventer` | [`EventerService`](EventerService.md) |

## Properties

### orderId

• **orderId**: `undefined` \| `string`

___

### order

• **order**: `BehaviorSubject`<``null`` \| [`Order`](../interfaces/Order.md)\>

___

### modifiers$

• **modifiers$**: `BehaviorSubject`<(`undefined` \| [`Modifier`](../interfaces/Modifier.md))[]\>

___

### modifiersMessage$

• **modifiersMessage$**: `BehaviorSubject`<[`EventMessage`](EventMessage.md)[]\>

___

### messages

• **messages**: [`EventMessage`](EventMessage.md)[] = `[]`

___

### OrderFormChange

• **OrderFormChange**: `BehaviorSubject`<``null`` \| `SimpleChanges`\>

___

### orderSubscription

• **orderSubscription**: `undefined` \| `Subscription`

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

### userOrder$

▸ **userOrder$**(): `Observable`<``null`` \| [`Order`](../interfaces/Order.md)\>

#### Returns

`Observable`<``null`` \| [`Order`](../interfaces/Order.md)\>

___

### setModifiers

▸ **setModifiers**(`modifiers`, `messages?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modifiers` | [`Modifier`](../interfaces/Modifier.md)[] |
| `messages?` | [`EventMessage`](EventMessage.md)[] |

#### Returns

`void`

___

### getModifiers

▸ **getModifiers**(): `Observable`<`any`\>

#### Returns

`Observable`<`any`\>

___

### initialStorage

▸ **initialStorage**(): `void`

#### Returns

`void`

___

### addDishToOrder$

▸ **addDishToOrder$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddToOrderInput`](../modules.md#addtoorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### removeDishFromOrder$

▸ **removeDishFromOrder$**(`dishId`, `amount`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `number` |
| `amount` | `number` |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### orderCart$

▸ **orderCart$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

___

### paymentLink$

▸ **paymentLink$**(`phone`, `fromPhone`): `Observable`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |
| `fromPhone` | `string` |

#### Returns

`Observable`<`any`\>

___

### checkOrder$

▸ **checkOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

___

### setDishCountToOrder$

▸ **setDishCountToOrder$**(`dishId`, `amount`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `number` |
| `amount` | `number` |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### setDishComment$

▸ **setDishComment$**(`dishId`, `comment`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `number` |
| `comment` | `string` |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>
