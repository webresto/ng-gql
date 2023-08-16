# Interface: CartBusEventSetCommentToDish

CartBusEventSetToDish
Установить количество порций или комментарий для блюда
Данные необходимого блюда и требуемое количество указываются в

**`Field`**

data

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)<[`Order`](Order.md)\>

  ↳ **`CartBusEventSetCommentToDish`**

## Table of contents

### Properties

- [successCb](CartBusEventSetCommentToDish.md#successcb)
- [errorCb](CartBusEventSetCommentToDish.md#errorcb)
- [loading](CartBusEventSetCommentToDish.md#loading)
- [event](CartBusEventSetCommentToDish.md#event)
- [data](CartBusEventSetCommentToDish.md#data)

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

• **event**: ``"setCommentToDish"``

___

### data

• **data**: `Omit`<[`SetDishCommentInput`](SetDishCommentInput.md), ``"id"``\>

Данные для операции
