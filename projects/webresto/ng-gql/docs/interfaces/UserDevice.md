# Interface: UserDevice

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`UserDevice`**

## Table of contents

### Properties

- [customData](UserDevice.md#customdata)
- [id](UserDevice.md#id)
- [name](UserDevice.md#name)
- [userAgent](UserDevice.md#useragent)
- [isLogined](UserDevice.md#islogined)
- [user](UserDevice.md#user)
- [userId](UserDevice.md#userid)
- [lastIP](UserDevice.md#lastip)
- [loginTime](UserDevice.md#logintime)
- [lastActivity](UserDevice.md#lastactivity)
- [sessionId](UserDevice.md#sessionid)

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

### userAgent

• **userAgent**: `string`

___

### isLogined

• **isLogined**: `boolean`

___

### user

• **user**: [`User`](User.md)

___

### userId

• **userId**: `string`

___

### lastIP

• **lastIP**: `string`

___

### loginTime

• **loginTime**: `number`

___

### lastActivity

• **lastActivity**: `number`

___

### sessionId

• **sessionId**: `string`
