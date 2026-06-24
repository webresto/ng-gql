# Interface: CartBusEventSetAmountToDish

CartBusEventSetToDish
Установить количество порций или комментарий для блюда
Данные необходимого блюда и требуемое количество указываются в

**`Field`**

data

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)\<[`Order`](Order.md)\>

  ↳ **`CartBusEventSetAmountToDish`**

## Table of contents

### Properties

- [successCb](CartBusEventSetAmountToDish.md#successcb)
- [errorCb](CartBusEventSetAmountToDish.md#errorcb)
- [isLoading](CartBusEventSetAmountToDish.md#isloading)
- [event](CartBusEventSetAmountToDish.md#event)
- [data](CartBusEventSetAmountToDish.md#data)

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

• **event**: ``"setDishAmount"``

___

### data

• **data**: [`RemoveOrSetAmountToDish`](RemoveOrSetAmountToDish.md)

Данные для операции
