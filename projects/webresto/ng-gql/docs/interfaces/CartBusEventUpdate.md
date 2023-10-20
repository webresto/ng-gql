# Interface: CartBusEventUpdate

CartBusEventUpdate
Обновление данных в заказе? НЕ связанных с блюдами.

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)<[`Order`](Order.md)\>

  ↳ **`CartBusEventUpdate`**

## Table of contents

### Properties

- [successCb](CartBusEventUpdate.md#successcb)
- [errorCb](CartBusEventUpdate.md#errorcb)
- [isLoading](CartBusEventUpdate.md#isloading)
- [event](CartBusEventUpdate.md#event)
- [data](CartBusEventUpdate.md#data)

## Properties

### successCb

• `Optional` **successCb**: (`result`: [`Order`](Order.md)<[`Dish`](Dish.md)\>) => `void`

#### Type declaration

▸ (`result`): `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`Order`](Order.md)<[`Dish`](Dish.md)\> |

##### Returns

`void`

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[successCb](CartBusEventBase.md#successcb)

___

### errorCb

• `Optional` **errorCb**: (`err`: `unknown`) => `void`

#### Type declaration

▸ (`err`): `void`

Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `unknown` |

##### Returns

`void`

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[errorCb](CartBusEventBase.md#errorcb)

___

### isLoading

• `Optional` **isLoading**: `BehaviorSubject`<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[isLoading](CartBusEventBase.md#isloading)

___

### event

• **event**: ``"update"``

___

### data

• **data**: `Partial`<{ `customData`: `Partial`<{ [x: string]: any; }\> ; `id`: `string` ; `shortId`: `string` ; `dishes`: `Partial`<{ id?: number \| null \| undefined; amount?: number \| null \| undefined; dish?: Partial<{ id?: string \| undefined; name?: string \| undefined; slug?: string \| undefined; description?: string \| undefined; ... 23 more ...; customData?: Partial<...\> \| undefined; }\> \| undefined; ... 9 more ...; modifiers?: Partial<...\>[] \| ...\>[] ; `dishesCount`: ``null`` \| `number` ; `comment`: `string` ; `deliveryDescription`: `string` ; `message`: `string` ; `deliveryCost`: ``null`` \| `number` ; `totalWeight`: ``null`` \| `number` ; `trifleFrom`: ``null`` \| `number` ; `total`: ``null`` \| `number` ; `orderTotal`: ``null`` \| `number` ; `discountTotal`: ``null`` \| `number` ; `state`: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"`` ; `rmsId?`: `string` ; `rmsOrderNumber?`: `string` ; `rmsDeliveryDate?`: `string` ; `rmsDelivered?`: `boolean` ; `customer`: `Partial`<{ phone?: Partial<{ number?: string \| undefined; code?: string \| undefined; additionalNumber?: string \| undefined; }\> \| undefined; mail?: string \| undefined; name?: string \| undefined; }\> ; `address`: `Partial`<{ streetId?: string \| undefined; home?: string \| undefined; comment?: string \| undefined; city?: string \| undefined; street?: string \| undefined; housing?: string \| undefined; index?: string \| undefined; entrance?: string \| undefined; floor?: string \| undefined; apartment?: string \| undefined; doorphone?: string \| u...\> ; `paid?`: `boolean` ; `paymentMethod`: `Partial`<{ id?: string \| undefined; type?: string \| undefined; title?: string \| undefined; description?: string \| undefined; isCash?: boolean \| undefined; adapter?: string \| undefined; sortOrder?: number \| ... 1 more ... \| undefined; enable?: boolean \| undefined; customData?: Partial<...\> \| undefined; }\> ; `selfService`: `boolean` ; `date`: `string` ; `orderDate`: `string` ; `personsCount`: ``null`` \| `number` ; `deliveryStatus`: `string` ; `promotionState`: `Partial`<{ type: string; message: string; state: Partial<{ [x: string]: any; }\>; }\>[] ; `pickupPoint`: `Partial`<{ id: string; title: string; enable: boolean; order: number \| null; address: string; phone: string; }\> ; `locationId?`: `string` ; `promocode?`: `string`  }\>

Данные для операции
