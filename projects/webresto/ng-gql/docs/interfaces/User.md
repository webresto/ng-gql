# Interface: User

Модели, описывающие авторизованного пользователя и его данные

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`User`**

## Table of contents

### Properties

- [customData](User.md#customdata)
- [id](User.md#id)
- [login](User.md#login)
- [firstName](User.md#firstname)
- [lastName](User.md#lastname)
- [email](User.md#email)
- [phone](User.md#phone)
- [birthday](User.md#birthday)
- [favorites](User.md#favorites)
- [bonusProgram](User.md#bonusprogram)
- [orderCount](User.md#ordercount)
- [locations](User.md#locations)
- [devices](User.md#devices)
- [lastPasswordChange](User.md#lastpasswordchange)
- [temporaryCode](User.md#temporarycode)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### login

• **login**: `string`

___

### firstName

• **firstName**: `string`

___

### lastName

• **lastName**: `string`

___

### email

• **email**: `string`

___

### phone

• **phone**: [`Phone`](Phone.md)

___

### birthday

• **birthday**: `string`

___

### favorites

• **favorites**: [`Dish`](Dish.md)[]

___

### bonusProgram

• **bonusProgram**: [`UserBonusProgram`](UserBonusProgram.md)[]

___

### orderCount

• **orderCount**: `number`

___

### locations

• **locations**: [`UserLocation`](../README.md#userlocation)[]

___

### devices

• **devices**: [`UserDevice`](UserDevice.md)[]

___

### lastPasswordChange

• **lastPasswordChange**: `number`

___

### temporaryCode

• **temporaryCode**: `string`
