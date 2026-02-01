# Interface: CartBusEventClone

CartBusEventSend
Отправка заказа на оформление

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)\<[`Order`](Order.md)\>

  ↳ **`CartBusEventClone`**

## Table of contents

### Properties

- [successCb](CartBusEventClone.md#successcb)
- [errorCb](CartBusEventClone.md#errorcb)
- [isLoading](CartBusEventClone.md#isloading)
- [event](CartBusEventClone.md#event)
- [data](CartBusEventClone.md#data)

## Properties

### successCb

• `Optional` **successCb**: (`result`: [`Order`](Order.md)\<[`Dish`](Dish.md)\>) => `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

#### Type declaration

▸ (`result`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`Order`](Order.md)\<[`Dish`](Dish.md)\> |

##### Returns

`void`

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[successCb](CartBusEventBase.md#successcb)

___

### errorCb

• `Optional` **errorCb**: (`err`: `unknown`) => `void`

Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции

#### Type declaration

▸ (`err`): `void`

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

• `Optional` **isLoading**: `BehaviorSubject`\<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[isLoading](CartBusEventBase.md#isloading)

___

### event

• **event**: ``"clone"``

___

### data

• **data**: [`SendOrderInput`](SendOrderInput.md)
