# Interface: OneTimePassword

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`OneTimePassword`**

## Table of contents

### Properties

- [customData](OneTimePassword.md#customdata)
- [id](OneTimePassword.md#id)
- [login](OneTimePassword.md#login)
- [password](OneTimePassword.md#password)
- [expires](OneTimePassword.md#expires)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `number`

___

### login

• **login**: `string`

___

### password

• **password**: `string`

___

### expires

• **expires**: `number`
