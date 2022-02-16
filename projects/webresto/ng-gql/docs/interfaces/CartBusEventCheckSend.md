# Interface: CartBusEventCheckSend

**`interface`** CartBusEventCheckSend
Отправка заказа на проверку перед оформлением или непосредственно оформление.

## Table of contents

### Properties

- [event](CartBusEventCheckSend.md#event)
- [order](CartBusEventCheckSend.md#order)
- [ordered](CartBusEventCheckSend.md#ordered)

### Methods

- [successCb](CartBusEventCheckSend.md#successcb)
- [errorCb](CartBusEventCheckSend.md#errorcb)

## Properties

### event

• **event**: ``"order"`` \| ``"check"``

___

### order

• **order**: [`OrderForm`](../README.md#orderform)

Данные формы чекаута

___

### ordered

• `Optional` **ordered**: `BehaviorSubject`<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

## Methods

### successCb

▸ `Optional` **successCb**(`order`): `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`CheckResponse`](CheckResponse.md) |

#### Returns

`void`

___

### errorCb

▸ `Optional` **errorCb**(`err`): `void`

Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `unknown` |

#### Returns

`void`
