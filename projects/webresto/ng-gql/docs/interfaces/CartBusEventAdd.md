# Interface: CartBusEventAdd

**`interface`** CartBusEventAdd
 Добавление в заказ (корзину).

## Table of contents

### Properties

- [event](CartBusEventAdd.md#event)
- [data](CartBusEventAdd.md#data)
- [loading](CartBusEventAdd.md#loading)
- [order](CartBusEventAdd.md#order)

### Methods

- [successCb](CartBusEventAdd.md#successcb)
- [errorCb](CartBusEventAdd.md#errorcb)

## Properties

### event

• **event**: ``"add"``

___

### data

• **data**: [`AddToOrderInput`](../README.md#addtoorderinput)

Данные для операции

___

### loading

• **loading**: `BehaviorSubject`<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

___

### order

• **order**: [`Order`](Order.md)

Заказ, с которым выполнется операция

## Methods

### successCb

▸ `Optional` **successCb**(`order`): `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`Order`](Order.md) |

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
