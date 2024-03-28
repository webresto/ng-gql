# Interface: CartBusEventAdd

CartBusEventAdd
Добавление в заказ (корзину).

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)\<[`Order`](Order.md)\>

  ↳ **`CartBusEventAdd`**

## Table of contents

### Properties

- [successCb](CartBusEventAdd.md#successcb)
- [errorCb](CartBusEventAdd.md#errorcb)
- [isLoading](CartBusEventAdd.md#isloading)
- [event](CartBusEventAdd.md#event)
- [data](CartBusEventAdd.md#data)

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

• **event**: ``"add"``

___

### data

• **data**: [`AddToOrderInput`](AddToOrderInput.md)

Данные для операции
