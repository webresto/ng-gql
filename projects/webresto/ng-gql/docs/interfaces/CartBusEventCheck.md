# Interface: CartBusEventCheck

CartBusEventCheck
Отправка заказа на проверку перед оформлением.

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)<[`CheckResponse`](CheckResponse.md)\>

  ↳ **`CartBusEventCheck`**

## Table of contents

### Properties

- [successCb](CartBusEventCheck.md#successcb)
- [errorCb](CartBusEventCheck.md#errorcb)
- [loading](CartBusEventCheck.md#loading)
- [event](CartBusEventCheck.md#event)
- [data](CartBusEventCheck.md#data)

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

### loading

• `Optional` **loading**: `BehaviorSubject`<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[loading](CartBusEventBase.md#loading)

___

### event

• **event**: ``"check"``

___

### data

• **data**: `Omit`<[`CheckOrderInput`](CheckOrderInput.md), ``"orderId"``\>
