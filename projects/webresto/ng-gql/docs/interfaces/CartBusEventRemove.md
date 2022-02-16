# Interface: CartBusEventRemove

**`interface`** CartBusEventRemove
Удаление блюда из заказа (корзины).

## Table of contents

### Properties

- [event](CartBusEventRemove.md#event)
- [data](CartBusEventRemove.md#data)
- [loading](CartBusEventRemove.md#loading)
- [order](CartBusEventRemove.md#order)

### Methods

- [successCb](CartBusEventRemove.md#successcb)
- [errorCb](CartBusEventRemove.md#errorcb)

## Properties

### event

• **event**: ``"remove"``

___

### data

• **data**: [`RemoveFromOrderInput`](../README.md#removefromorderinput) & { `dish`: [`Dish`](Dish.md)  }

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
