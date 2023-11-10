# Interface: BonusProgram

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`BonusProgram`**

## Table of contents

### Properties

- [customData](BonusProgram.md#customdata)
- [id](BonusProgram.md#id)
- [adapter](BonusProgram.md#adapter)
- [sortOrder](BonusProgram.md#sortorder)
- [description](BonusProgram.md#description)
- [enable](BonusProgram.md#enable)
- [name](BonusProgram.md#name)

## Properties

### customData

• **customData**: ``null`` \| \{ `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### adapter

• **adapter**: `string`

___

### sortOrder

• **sortOrder**: `number`

___

### description

• **description**: `string`

___

### enable

• **enable**: `boolean`

___

### name

• **name**: `string`
