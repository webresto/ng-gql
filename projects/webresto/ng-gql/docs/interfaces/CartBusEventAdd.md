# Interface: CartBusEventAdd

CartBusEventAdd
Добавление в заказ (корзину).

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)<[`Order`](Order.md)\>

  ↳ **`CartBusEventAdd`**

## Table of contents

### Properties

- [successCb](CartBusEventAdd.md#successcb)
- [errorCb](CartBusEventAdd.md#errorcb)
- [loading](CartBusEventAdd.md#loading)
- [event](CartBusEventAdd.md#event)
- [data](CartBusEventAdd.md#data)

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

• **event**: ``"add"``

___

### data

• **data**: `Omit`<[`AddToOrderInput`](AddToOrderInput.md), ``"orderId"``\>

Данные для операции
