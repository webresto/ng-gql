# Interface: CartBusEventBase<T\>

CartBusEventBase Базовый интерфейс событий в шине событий

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`CartBusEventBase`**

  ↳ [`CartBusEventAdd`](CartBusEventAdd.md)

  ↳ [`CartBusEventUpdate`](CartBusEventUpdate.md)

  ↳ [`CartBusEventRemove`](CartBusEventRemove.md)

  ↳ [`CartBusEventSetAmountToDish`](CartBusEventSetAmountToDish.md)

  ↳ [`CartBusEventSetCommentToDish`](CartBusEventSetCommentToDish.md)

  ↳ [`CartBusEventCheck`](CartBusEventCheck.md)

  ↳ [`CartBusEventSend`](CartBusEventSend.md)

  ↳ [`CartBusEventClone`](CartBusEventClone.md)

## Table of contents

### Properties

- [successCb](CartBusEventBase.md#successcb)
- [errorCb](CartBusEventBase.md#errorcb)
- [loading](CartBusEventBase.md#loading)

## Properties

### successCb

• `Optional` **successCb**: (`result`: `T`) => `void`

#### Type declaration

▸ (`result`): `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `T` |

##### Returns

`void`

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

___

### loading

• `Optional` **loading**: `BehaviorSubject`<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
