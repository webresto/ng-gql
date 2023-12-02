# Interface: CartBusEventUpdate

CartBusEventUpdate
Обновление данных в заказе? НЕ связанных с блюдами.

## Hierarchy

- [`CartBusEventBase`](CartBusEventBase.md)\<[`Order`](Order.md)\>

  ↳ **`CartBusEventUpdate`**

## Table of contents

### Properties

- [successCb](CartBusEventUpdate.md#successcb)
- [errorCb](CartBusEventUpdate.md#errorcb)
- [isLoading](CartBusEventUpdate.md#isloading)
- [event](CartBusEventUpdate.md#event)
- [data](CartBusEventUpdate.md#data)

## Properties

### successCb

• `Optional` **successCb**: (`result`: [`Order`](Order.md)\<[`Dish`](Dish.md)\>) => `void`

#### Type declaration

▸ (`result`): `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

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

• `Optional` **isLoading**: `BehaviorSubject`\<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.

#### Inherited from

[CartBusEventBase](CartBusEventBase.md).[isLoading](CartBusEventBase.md#isloading)

___

### event

• **event**: ``"update"``

___

### data

• **data**: [`UpdateOrderInput`](UpdateOrderInput.md)

Данные для операции
