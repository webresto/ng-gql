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
- [loading](CartBusEventUpdate.md#loading)
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

### loading

• `Optional` **loading**: `BehaviorSubject`<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[loading](CartBusEventBase.md#loading)

___

### event

• **event**: ``"update"``

___

### data

• **data**: `Partial`<{ `id`: `string` ; `customData`: `Partial`<{ [x: string]: any; }\> ; `dishes`: `Partial`<{ modifiers: Partial<{ id: string; groupId: string; amount: number; dish: Partial<{ id: string; additionalInfo: string \| number \| Partial<{ [x: string]: any; }\>; name: string; description: string; oldPrice: number; ... 20 more ...; customData: Partial<...\>; }\>; }\>[]; ... 12 more ...; total: number; }\>[] ; `selfService`: `boolean` ; `pickupAddressId`: `string` ; `locationId`: `string` ; `address`: `Partial`<{ comment: string; streetId: string; home: string; city: string; street: string; housing: string; index: string; entrance: string; floor: string; apartment: string; doorphone: string; }\> ; `customer`: `Partial`<{ name: string; phone: Partial<{ number: string; code: string; additionalNumber: string; }\>; mail: string; }\> ; `comment`: `string` ; `discountTotal`: `number` ; `totalWeight`: `number` ; `total`: `number` ; `shortId`: `string` ; `dishesCount`: `number` ; `deliveryDescription`: `string` ; `message`: `string` ; `deliveryCost`: `number` ; `trifleFrom`: `number` ; `orderTotal`: `number` ; `state`: [`OrderState`](../README.md#orderstate) ; `rmsId`: `string` ; `rmsOrderNumber`: `string` ; `rmsDeliveryDate`: `string` ; `rmsDelivered`: `boolean` ; `paid`: `boolean` ; `paymentMethod`: `Partial`<{ id: string; description: string; sortOrder: number; customData: Partial<{ [x: string]: any; }\>; type: string; title: string; isCash: boolean; adapter: string; enable: boolean; }\> ; `promocode`: `string` ; `deliveryTimeInfo`: `Partial`<{ deliveryType: "fast" \| "date-time"; deliveryDate: string; deliveryTime: string; }\>  }\>

Данные для операции
