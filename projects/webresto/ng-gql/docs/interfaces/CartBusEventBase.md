# Interface: CartBusEventBase\<T\>

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
- [isLoading](CartBusEventBase.md#isloading)

## Properties

### successCb

• `Optional` **successCb**: (`result`: `T`) => `void`

Пользовательский callback, который дополнительно будет выполнен в случае успешной операции

#### Type declaration

▸ (`result`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `T` |

##### Returns

`void`

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

___

### isLoading

• `Optional` **isLoading**: `BehaviorSubject`\<`boolean`\>

BehaviorSubject блюда, отслеживающий состояние выполняемого действия.
