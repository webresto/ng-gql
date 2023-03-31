# Interface: UserLocation

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`InputLocation`](InputLocation.md)

  ↳ **`UserLocation`**

## Table of contents

### Properties

- [customData](UserLocation.md#customdata)
- [street](UserLocation.md#street)
- [home](UserLocation.md#home)
- [name](UserLocation.md#name)
- [city](UserLocation.md#city)
- [housing](UserLocation.md#housing)
- [index](UserLocation.md#index)
- [entrance](UserLocation.md#entrance)
- [floor](UserLocation.md#floor)
- [apartment](UserLocation.md#apartment)
- [doorphone](UserLocation.md#doorphone)
- [comment](UserLocation.md#comment)
- [customFields](UserLocation.md#customfields)
- [id](UserLocation.md#id)
- [user](UserLocation.md#user)
- [userId](UserLocation.md#userid)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[InputLocation](InputLocation.md).[customData](InputLocation.md#customdata)

___

### street

• **street**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[street](InputLocation.md#street)

___

### home

• **home**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[home](InputLocation.md#home)

___

### name

• **name**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[name](InputLocation.md#name)

___

### city

• **city**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[city](InputLocation.md#city)

___

### housing

• **housing**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[housing](InputLocation.md#housing)

___

### index

• **index**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[index](InputLocation.md#index)

___

### entrance

• **entrance**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[entrance](InputLocation.md#entrance)

___

### floor

• **floor**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[floor](InputLocation.md#floor)

___

### apartment

• **apartment**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[apartment](InputLocation.md#apartment)

___

### doorphone

• **doorphone**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[doorphone](InputLocation.md#doorphone)

___

### comment

• **comment**: `string`

#### Inherited from

[InputLocation](InputLocation.md).[comment](InputLocation.md#comment)

___

### customFields

• **customFields**: `any`

#### Inherited from

[InputLocation](InputLocation.md).[customFields](InputLocation.md#customfields)

___

### id

• **id**: `string`

___

### user

• **user**: [`User`](User.md)

___

### userId

• **userId**: `string`
