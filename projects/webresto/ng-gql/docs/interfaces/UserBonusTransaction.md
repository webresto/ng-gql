# Interface: UserBonusTransaction

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`UserBonusTransaction`**

## Table of contents

### Properties

- [customData](UserBonusTransaction.md#customdata)
- [id](UserBonusTransaction.md#id)
- [type](UserBonusTransaction.md#type)
- [group](UserBonusTransaction.md#group)
- [isPositive](UserBonusTransaction.md#ispositive)
- [amount](UserBonusTransaction.md#amount)
- [balanceAfter](UserBonusTransaction.md#balanceafter)
- [user](UserBonusTransaction.md#user)
- [userId](UserBonusTransaction.md#userid)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### type

• **type**: `string`

___

### group

• **group**: `string`

___

### isPositive

• **isPositive**: `boolean`

___

### amount

• **amount**: `number`

___

### balanceAfter

• **balanceAfter**: `number`

___

### user

• **user**: [`User`](User.md)

___

### userId

• **userId**: `string`
