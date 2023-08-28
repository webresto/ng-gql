# Interface: CartBusEventSend

CartBusEventSend
Отправка заказа на оформление

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)<[`CheckResponse`](CheckResponse.md)\>

  ↳ **`CartBusEventSend`**

## Table of contents

### Properties

- [successCb](CartBusEventSend.md#successcb)
- [errorCb](CartBusEventSend.md#errorcb)
- [isLoading](CartBusEventSend.md#isloading)
- [event](CartBusEventSend.md#event)
- [data](CartBusEventSend.md#data)

## Properties

### successCb

• `Optional` **successCb**: (`result`: [`CheckResponse`](CheckResponse.md)) => `void`

#### Type declaration

▸ (`result`): `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`CheckResponse`](CheckResponse.md) |

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

• **event**: ``"order"``

___

### data

• **data**: [`SendOrderInput`](SendOrderInput.md)
