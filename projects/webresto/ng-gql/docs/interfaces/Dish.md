# Interface: Dish

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`Dish`**

## Table of contents

### Properties

- [customData](Dish.md#customdata)
- [id](Dish.md#id)
- [name](Dish.md#name)
- [slug](Dish.md#slug)
- [description](Dish.md#description)
- [price](Dish.md#price)
- [oldPrice](Dish.md#oldprice)
- [weight](Dish.md#weight)
- [balance](Dish.md#balance)
- [sortOrder](Dish.md#sortorder)
- [tags](Dish.md#tags)
- [additionalInfo](Dish.md#additionalinfo)
- [images](Dish.md#images)
- [groupId](Dish.md#groupid)
- [parentGroup](Dish.md#parentgroup)
- [modifiers](Dish.md#modifiers)
- [carbohydrateAmount](Dish.md#carbohydrateamount)
- [carbohydrateFullAmount](Dish.md#carbohydratefullamount)
- [energyAmount](Dish.md#energyamount)
- [energyFullAmount](Dish.md#energyfullamount)
- [fatAmount](Dish.md#fatamount)
- [fatFullAmount](Dish.md#fatfullamount)
- [fiberAmount](Dish.md#fiberamount)
- [fiberFullAmount](Dish.md#fiberfullamount)
- [measureUnit](Dish.md#measureunit)
- [discountAmount](Dish.md#discountamount)
- [discountType](Dish.md#discounttype)
- [isLoading](Dish.md#isloading)
- [seoDescription](Dish.md#seodescription)
- [seoKeywords](Dish.md#seokeywords)
- [seoText](Dish.md#seotext)
- [seoTitle](Dish.md#seotitle)

## Properties

### customData

• **customData**: ``null`` \| \{ `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### name

• **name**: `string`

___

### slug

• **slug**: `string`

___

### description

• **description**: `string`

___

### price

• **price**: `number`

___

### oldPrice

• **oldPrice**: ``null`` \| `number`

___

### weight

• **weight**: `number`

___

### balance

• **balance**: `number`

___

### sortOrder

• **sortOrder**: `number`

___

### tags

• `Optional` **tags**: `Partial`\<[`DishTag`](DishTag.md)\>[]

___

### additionalInfo

• `Optional` **additionalInfo**: ``null`` \| `string` \| `number` \| \{ `[key: string]`: `string` \| `any`;  }

___

### images

• **images**: `Partial`\<[`Image`](Image.md)\>[]

___

### groupId

• `Optional` **groupId**: `string`

___

### parentGroup

• **parentGroup**: `Partial`\<`Pick`\<[`Group`](Group.md), ``"id"`` \| ``"dishesPlaceholder"``\>\>

___

### modifiers

• `Optional` **modifiers**: `Partial`\<[`GroupModifier`](GroupModifier.md)\<[`Dish`](Dish.md)\>\>[]

___

### carbohydrateAmount

• `Optional` **carbohydrateAmount**: `number`

___

### carbohydrateFullAmount

• `Optional` **carbohydrateFullAmount**: `number`

___

### energyAmount

• `Optional` **energyAmount**: `number`

___

### energyFullAmount

• `Optional` **energyFullAmount**: `number`

___

### fatAmount

• `Optional` **fatAmount**: `number`

___

### fatFullAmount

• `Optional` **fatFullAmount**: `number`

___

### fiberAmount

• `Optional` **fiberAmount**: `number`

___

### fiberFullAmount

• `Optional` **fiberFullAmount**: `number`

___

### measureUnit

• `Optional` **measureUnit**: `string`

___

### discountAmount

• **discountAmount**: ``null`` \| `number`

___

### discountType

• **discountType**: ``null`` \| [`DiscountType`](../README.md#discounttype)

___

### isLoading

• `Optional` **isLoading**: `BehaviorSubject`\<`boolean`\>

___

### seoDescription

• **seoDescription**: ``null`` \| `string`

___

### seoKeywords

• **seoKeywords**: ``null`` \| `string`

___

### seoText

• **seoText**: ``null`` \| `string`

___

### seoTitle

• **seoTitle**: ``null`` \| `string`
