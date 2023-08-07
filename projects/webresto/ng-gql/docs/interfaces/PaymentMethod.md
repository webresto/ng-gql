# Interface: PaymentMethod

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`PaymentMethod`**

## Table of contents

### Properties

- [customData](PaymentMethod.md#customdata)
- [id](PaymentMethod.md#id)
- [type](PaymentMethod.md#type)
- [title](PaymentMethod.md#title)
- [description](PaymentMethod.md#description)
- [isCash](PaymentMethod.md#iscash)
- [adapter](PaymentMethod.md#adapter)
- [sortOrder](PaymentMethod.md#sortorder)
- [enable](PaymentMethod.md#enable)

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

### title

• **title**: `string`

___

### description

• **description**: `string`

___

### isCash

• **isCash**: `boolean`

___

### adapter

• **adapter**: `string`

___

### sortOrder

• **sortOrder**: `number`

___

### enable

• **enable**: `boolean`
