# Interface: PhoneKnowledge

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`PhoneKnowledge`**

## Table of contents

### Properties

- [customData](PhoneKnowledge.md#customdata)
- [id](PhoneKnowledge.md#id)
- [phone](PhoneKnowledge.md#phone)
- [isFirst](PhoneKnowledge.md#isfirst)
- [isConfirm](PhoneKnowledge.md#isconfirm)
- [codeTime](PhoneKnowledge.md#codetime)
- [confirmCode](PhoneKnowledge.md#confirmcode)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: ``null`` \| `number`

___

### phone

• **phone**: ``null`` \| `string`

___

### isFirst

• **isFirst**: `boolean`

___

### isConfirm

• **isConfirm**: `boolean`

___

### codeTime

• **codeTime**: ``null`` \| `string`

___

### confirmCode

• **confirmCode**: ``null`` \| `string`
