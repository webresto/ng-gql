[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / NgOrderService

# Class: NgOrderService

## Table of contents

### Constructors

- [constructor](NgOrderService.md#constructor)

### Properties

- [OrderFormChange](NgOrderService.md#orderformchange)
- [messages](NgOrderService.md#messages)
- [modifiers$](NgOrderService.md#modifiers$)
- [modifiersMessage$](NgOrderService.md#modifiersmessage$)
- [order](NgOrderService.md#order)
- [orderId](NgOrderService.md#orderid)
- [orderSubscription](NgOrderService.md#ordersubscription)

### Methods

- [addDishToOrder$](NgOrderService.md#adddishtoorder$)
- [checkOrder$](NgOrderService.md#checkorder$)
- [getModifiers](NgOrderService.md#getmodifiers)
- [getOrderId](NgOrderService.md#getorderid)
- [initialStorage](NgOrderService.md#initialstorage)
- [orderCart$](NgOrderService.md#ordercart$)
- [paymentLink$](NgOrderService.md#paymentlink$)
- [removeDishFromOrder$](NgOrderService.md#removedishfromorder$)
- [removeOrderId](NgOrderService.md#removeorderid)
- [setDishComment$](NgOrderService.md#setdishcomment$)
- [setDishCountToOrder$](NgOrderService.md#setdishcounttoorder$)
- [setModifiers](NgOrderService.md#setmodifiers)
- [setOrderId](NgOrderService.md#setorderid)
- [userOrder$](NgOrderService.md#userorder$)

## Constructors

### constructor

• **new NgOrderService**(`ngGqlService`, `eventer`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `eventer` | [`EventerService`](EventerService.md) |

#### Defined in

lib/services/ng-order.service.ts:25

## Properties

### OrderFormChange

• **OrderFormChange**: `BehaviorSubject`<``null`` \| `SimpleChanges`\>

#### Defined in

lib/services/ng-order.service.ts:22

___

### messages

• **messages**: [`EventMessage`](EventMessage.md)[] = `[]`

#### Defined in

lib/services/ng-order.service.ts:21

___

### modifiers$

• **modifiers$**: `BehaviorSubject`<(`undefined` \| [`Modifier`](../interfaces/Modifier.md))[]\>

#### Defined in

lib/services/ng-order.service.ts:19

___

### modifiersMessage$

• **modifiersMessage$**: `BehaviorSubject`<[`EventMessage`](EventMessage.md)[]\>

#### Defined in

lib/services/ng-order.service.ts:20

___

### order

• **order**: `BehaviorSubject`<``null`` \| [`Order`](../interfaces/Order.md)\>

#### Defined in

lib/services/ng-order.service.ts:17

___

### orderId

• **orderId**: `undefined` \| `string`

#### Defined in

lib/services/ng-order.service.ts:16

___

### orderSubscription

• **orderSubscription**: `undefined` \| `Subscription`

#### Defined in

lib/services/ng-order.service.ts:23

## Methods

### addDishToOrder$

▸ **addDishToOrder$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddToOrderInput`](../modules.md#addtoorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/services/ng-order.service.ts:80

___

### checkOrder$

▸ **checkOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Defined in

lib/services/ng-order.service.ts:127

___

### getModifiers

▸ **getModifiers**(): `Observable`<`any`\>

#### Returns

`Observable`<`any`\>

#### Defined in

lib/services/ng-order.service.ts:55

___

### getOrderId

▸ **getOrderId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

lib/services/ng-order.service.ts:32

___

### initialStorage

▸ **initialStorage**(): `void`

#### Returns

`void`

#### Defined in

lib/services/ng-order.service.ts:59

___

### orderCart$

▸ **orderCart$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Defined in

lib/services/ng-order.service.ts:98

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

#### Defined in

lib/services/ng-order.service.ts:102

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

#### Defined in

lib/services/ng-order.service.ts:89

___

### removeOrderId

▸ **removeOrderId**(): `void`

#### Returns

`void`

#### Defined in

lib/services/ng-order.service.ts:42

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

#### Defined in

lib/services/ng-order.service.ts:140

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

#### Defined in

lib/services/ng-order.service.ts:132

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

#### Defined in

lib/services/ng-order.service.ts:50

___

### setOrderId

▸ **setOrderId**(`orderId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`void`

#### Defined in

lib/services/ng-order.service.ts:36

___

### userOrder$

▸ **userOrder$**(): `Observable`<``null`` \| [`Order`](../interfaces/Order.md)\>

#### Returns

`Observable`<``null`` \| [`Order`](../interfaces/Order.md)\>

#### Defined in

lib/services/ng-order.service.ts:46
