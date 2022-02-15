# Class: NgOrderService

## Table of contents

### Constructors

- [constructor](./classes/NgOrderService.md#constructor)

### Properties

- [orderId](./classes/NgOrderService.md#orderid)
- [order](./classes/NgOrderService.md#order)
- [modifiers$](./classes/NgOrderService.md#modifiers$)
- [modifiersMessage$](./classes/NgOrderService.md#modifiersmessage$)
- [messages](./classes/NgOrderService.md#messages)
- [OrderFormChange](./classes/NgOrderService.md#orderformchange)
- [orderSubscription](./classes/NgOrderService.md#ordersubscription)

### Methods

- [getOrderId](./classes/NgOrderService.md#getorderid)
- [setOrderId](./classes/NgOrderService.md#setorderid)
- [removeOrderId](./classes/NgOrderService.md#removeorderid)
- [userOrder$](./classes/NgOrderService.md#userorder$)
- [setModifiers](./classes/NgOrderService.md#setmodifiers)
- [getModifiers](./classes/NgOrderService.md#getmodifiers)
- [initialStorage](./classes/NgOrderService.md#initialstorage)
- [addDishToOrder$](./classes/NgOrderService.md#adddishtoorder$)
- [removeDishFromOrder$](./classes/NgOrderService.md#removedishfromorder$)
- [orderCart$](./classes/NgOrderService.md#ordercart$)
- [paymentLink$](./classes/NgOrderService.md#paymentlink$)
- [checkOrder$](./classes/NgOrderService.md#checkorder$)
- [setDishCountToOrder$](./classes/NgOrderService.md#setdishcounttoorder$)
- [setDishComment$](./classes/NgOrderService.md#setdishcomment$)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new NgOrderService**(`ngGqlService`, `eventer`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](./classes/NgGqlService.md) |
| `eventer` | [`EventerService`](./classes/EventerService.md) |

## Properties

### <a id="orderid" name="orderid"></a> orderId

• **orderId**: `undefined` \| `string`

___

### <a id="order" name="order"></a> order

• **order**: `BehaviorSubject`<``null`` \| [`Order`](./interfaces/Order.md)\>

___

### <a id="modifiers$" name="modifiers$"></a> modifiers$

• **modifiers$**: `BehaviorSubject`<(`undefined` \| [`Modifier`](./interfaces/Modifier.md))[]\>

___

### <a id="modifiersmessage$" name="modifiersmessage$"></a> modifiersMessage$

• **modifiersMessage$**: `BehaviorSubject`<[`EventMessage`](./classes/EventMessage.md)[]\>

___

### <a id="messages" name="messages"></a> messages

• **messages**: [`EventMessage`](./classes/EventMessage.md)[] = `[]`

___

### <a id="orderformchange" name="orderformchange"></a> OrderFormChange

• **OrderFormChange**: `BehaviorSubject`<``null`` \| `SimpleChanges`\>

___

### <a id="ordersubscription" name="ordersubscription"></a> orderSubscription

• **orderSubscription**: `undefined` \| `Subscription`

## Methods

### <a id="getorderid" name="getorderid"></a> getOrderId

▸ **getOrderId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### <a id="setorderid" name="setorderid"></a> setOrderId

▸ **setOrderId**(`orderId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`void`

___

### <a id="removeorderid" name="removeorderid"></a> removeOrderId

▸ **removeOrderId**(): `void`

#### Returns

`void`

___

### <a id="userorder$" name="userorder$"></a> userOrder$

▸ **userOrder$**(): `Observable`<``null`` \| [`Order`](./interfaces/Order.md)\>

#### Returns

`Observable`<``null`` \| [`Order`](./interfaces/Order.md)\>

___

### <a id="setmodifiers" name="setmodifiers"></a> setModifiers

▸ **setModifiers**(`modifiers`, `messages?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modifiers` | [`Modifier`](./interfaces/Modifier.md)[] |
| `messages?` | [`EventMessage`](./classes/EventMessage.md)[] |

#### Returns

`void`

___

### <a id="getmodifiers" name="getmodifiers"></a> getModifiers

▸ **getModifiers**(): `Observable`<`any`\>

#### Returns

`Observable`<`any`\>

___

### <a id="initialstorage" name="initialstorage"></a> initialStorage

▸ **initialStorage**(): `void`

#### Returns

`void`

___

### <a id="adddishtoorder$" name="adddishtoorder$"></a> addDishToOrder$

▸ **addDishToOrder$**(`data`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddToOrderInput`](./modules.md#addtoorderinput) |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="removedishfromorder$" name="removedishfromorder$"></a> removeDishFromOrder$

▸ **removeDishFromOrder$**(`dishId`, `amount`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `number` |
| `amount` | `number` |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="ordercart$" name="ordercart$"></a> orderCart$

▸ **orderCart$**(`data`): `Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](./modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

___

### <a id="paymentlink$" name="paymentlink$"></a> paymentLink$

▸ **paymentLink$**(`phone`, `fromPhone`): `Observable`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |
| `fromPhone` | `string` |

#### Returns

`Observable`<`any`\>

___

### <a id="checkorder$" name="checkorder$"></a> checkOrder$

▸ **checkOrder$**(`data`): `Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](./modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

___

### <a id="setdishcounttoorder$" name="setdishcounttoorder$"></a> setDishCountToOrder$

▸ **setDishCountToOrder$**(`dishId`, `amount`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `number` |
| `amount` | `number` |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="setdishcomment$" name="setdishcomment$"></a> setDishComment$

▸ **setDishComment$**(`dishId`, `comment`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `number` |
| `comment` | `string` |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>
