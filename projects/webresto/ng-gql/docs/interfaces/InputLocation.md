# Interface: InputLocation

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`InputLocation`**

  ↳↳ [`UserLocation`](UserLocation.md)

## Table of contents

### Properties

- [customData](InputLocation.md#customdata)
- [street](InputLocation.md#street)
- [home](InputLocation.md#home)
- [name](InputLocation.md#name)
- [city](InputLocation.md#city)
- [housing](InputLocation.md#housing)
- [index](InputLocation.md#index)
- [entrance](InputLocation.md#entrance)
- [floor](InputLocation.md#floor)
- [apartment](InputLocation.md#apartment)
- [doorphone](InputLocation.md#doorphone)
- [comment](InputLocation.md#comment)
- [customFields](InputLocation.md#customfields)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### street

• **street**: `string`

___

### home

• **home**: `string`

___

### name

• **name**: `string`

___

### city

• **city**: `string`

___

### housing

• **housing**: `string`

___

### index

• **index**: `string`

___

### entrance

• **entrance**: `string`

___

### floor

• **floor**: `string`

___

### apartment

• **apartment**: `string`

___

### doorphone

• **doorphone**: `string`

___

### comment

• **comment**: `string`

___

### customFields

• **customFields**: `any`
