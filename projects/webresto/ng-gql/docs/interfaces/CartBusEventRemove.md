# Interface: CartBusEventRemove

CartBusEventRemove
Удаление блюда из заказа (корзины).

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)<[`Order`](Order.md)\>

  ↳ **`CartBusEventRemove`**

## Table of contents

### Properties

- [successCb](CartBusEventRemove.md#successcb)
- [errorCb](CartBusEventRemove.md#errorcb)
- [isLoading](CartBusEventRemove.md#isloading)
- [event](CartBusEventRemove.md#event)
- [data](CartBusEventRemove.md#data)

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

### isLoading

• `Optional` **isLoading**: `BehaviorSubject`<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[isLoading](CartBusEventBase.md#isloading)

___

### event

• **event**: ``"remove"``

___

### data

• **data**: [`RemoveOrSetAmountToDish`](RemoveOrSetAmountToDish.md)

Данные для операции
