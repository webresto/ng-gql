# Interface: UserBonusProgram

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`UserBonusProgram`**

## Table of contents

### Properties

- [customData](UserBonusProgram.md#customdata)
- [id](UserBonusProgram.md#id)
- [active](UserBonusProgram.md#active)
- [balance](UserBonusProgram.md#balance)
- [user](UserBonusProgram.md#user)
- [userId](UserBonusProgram.md#userid)
- [BonusProgram](UserBonusProgram.md#bonusprogram)
- [BonusProgramId](UserBonusProgram.md#bonusprogramid)
- [syncedToTime](UserBonusProgram.md#syncedtotime)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### active

• **active**: `boolean`

___

### balance

• **balance**: `number`

___

### user

• **user**: [`User`](User.md)

___

### userId

• **userId**: `string`

___

### BonusProgram

• **BonusProgram**: [`BonusProgram`](BonusProgram.md)

___

### BonusProgramId

• **BonusProgramId**: `string`

___

### syncedToTime

• **syncedToTime**: `string`
