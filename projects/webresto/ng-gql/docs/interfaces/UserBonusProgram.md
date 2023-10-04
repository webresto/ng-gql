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
- [isActive](UserBonusProgram.md#isactive)
- [balance](UserBonusProgram.md#balance)
- [userId](UserBonusProgram.md#userid)
- [bonusProgram](UserBonusProgram.md#bonusprogram)
- [bonusProgramId](UserBonusProgram.md#bonusprogramid)
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

### isActive

• **isActive**: `boolean`

___

### balance

• **balance**: `number`

___

### userId

• **userId**: `string`

___

### bonusProgram

• **bonusProgram**: [`BonusProgram`](BonusProgram.md)

___

### bonusProgramId

• **bonusProgramId**: `string`

___

### syncedToTime

• **syncedToTime**: `string`
