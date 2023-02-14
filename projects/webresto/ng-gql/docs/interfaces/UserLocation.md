# Interface: UserLocation

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`UserLocation`**

## Table of contents

### Properties

- [customData](UserLocation.md#customdata)
- [id](UserLocation.md#id)
- [name](UserLocation.md#name)
- [city](UserLocation.md#city)
- [home](UserLocation.md#home)
- [housing](UserLocation.md#housing)
- [index](UserLocation.md#index)
- [entrance](UserLocation.md#entrance)
- [floor](UserLocation.md#floor)
- [apartment](UserLocation.md#apartment)
- [doorphone](UserLocation.md#doorphone)
- [street](UserLocation.md#street)
- [user](UserLocation.md#user)
- [userId](UserLocation.md#userid)
- [comment](UserLocation.md#comment)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### name

• **name**: `string`

___

### city

• **city**: `string`

___

### home

• **home**: `string`

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

### street

• **street**: `string`

___

### user

• **user**: [`User`](User.md)

___

### userId

• **userId**: `string`

___

### comment

• **comment**: `string`
