# Interface: Street

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`Street`**

## Table of contents

### Properties

- [customData](Street.md#customdata)
- [id](Street.md#id)
- [externalId](Street.md#externalid)
- [name](Street.md#name)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### externalId

• **externalId**: `string`

___

### name

• **name**: `string`
