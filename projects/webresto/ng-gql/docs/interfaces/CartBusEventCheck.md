# Interface: CartBusEventCheck

CartBusEventCheck
Отправка заказа на проверку перед оформлением.

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)\<[`CheckResponse`](CheckResponse.md)\>

  ↳ **`CartBusEventCheck`**

## Table of contents

### Properties

- [successCb](CartBusEventCheck.md#successcb)
- [errorCb](CartBusEventCheck.md#errorcb)
- [isLoading](CartBusEventCheck.md#isloading)
- [event](CartBusEventCheck.md#event)
- [data](CartBusEventCheck.md#data)

## Properties

### successCb

• `Optional` **successCb**: (`result`: [`CheckResponse`](CheckResponse.md)) => `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

#### Type declaration

▸ (`result`): `void`

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

• **event**: ``"check"``

___

### data

• **data**: [`CheckOrderInput`](CheckOrderInput.md)
