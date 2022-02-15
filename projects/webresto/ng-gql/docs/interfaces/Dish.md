# Interface: Dish

## Table of contents

### Properties

- [id](./interfaces/Dish.md#id)
- [name](./interfaces/Dish.md#name)
- [description](./interfaces/Dish.md#description)
- [price](./interfaces/Dish.md#price)
- [weight](./interfaces/Dish.md#weight)
- [balance](./interfaces/Dish.md#balance)
- [tags](./interfaces/Dish.md#tags)
- [additionalInfo](./interfaces/Dish.md#additionalinfo)
- [images](./interfaces/Dish.md#images)
- [groupId](./interfaces/Dish.md#groupid)
- [parentGroup](./interfaces/Dish.md#parentgroup)
- [modifiers](./interfaces/Dish.md#modifiers)
- [carbohydrateAmount](./interfaces/Dish.md#carbohydrateamount)
- [carbohydrateFullAmount](./interfaces/Dish.md#carbohydratefullamount)
- [energyAmount](./interfaces/Dish.md#energyamount)
- [energyFullAmount](./interfaces/Dish.md#energyfullamount)
- [fatAmount](./interfaces/Dish.md#fatamount)
- [fatFullAmount](./interfaces/Dish.md#fatfullamount)
- [fiberAmount](./interfaces/Dish.md#fiberamount)
- [fiberFullAmount](./interfaces/Dish.md#fiberfullamount)
- [measureUnit](./interfaces/Dish.md#measureunit)

## Properties

### <a id="id" name="id"></a> id

• **id**: `string`

___

### <a id="name" name="name"></a> name

• **name**: `string`

___

### <a id="description" name="description"></a> description

• **description**: `string`

___

### <a id="price" name="price"></a> price

• **price**: `number`

___

### <a id="weight" name="weight"></a> weight

• **weight**: `number`

___

### <a id="balance" name="balance"></a> balance

• **balance**: `number`

___

### <a id="tags" name="tags"></a> tags

• `Optional` **tags**: [`DishTag`](./interfaces/DishTag.md)[]

___

### <a id="additionalinfo" name="additionalinfo"></a> additionalInfo

• `Optional` **additionalInfo**: ``null`` \| `string` \| `number` \| { `[key: string]`: `string` \| `any`;  }

___

### <a id="images" name="images"></a> images

• **images**: [`Image`](./interfaces/Image.md)[]

___

### <a id="groupid" name="groupid"></a> groupId

• `Optional` **groupId**: `string`

___

### <a id="parentgroup" name="parentgroup"></a> parentGroup

• **parentGroup**: `Pick`<[`Group`](./interfaces/Group.md), ``"id"`` \| ``"dishesPlaceholder"``\>

___

### <a id="modifiers" name="modifiers"></a> modifiers

• `Optional` **modifiers**: [`GroupModifier`](./interfaces/GroupModifier.md)[]

___

### <a id="carbohydrateamount" name="carbohydrateamount"></a> carbohydrateAmount

• `Optional` **carbohydrateAmount**: `number`

___

### <a id="carbohydratefullamount" name="carbohydratefullamount"></a> carbohydrateFullAmount

• `Optional` **carbohydrateFullAmount**: `number`

___

### <a id="energyamount" name="energyamount"></a> energyAmount

• `Optional` **energyAmount**: `number`

___

### <a id="energyfullamount" name="energyfullamount"></a> energyFullAmount

• `Optional` **energyFullAmount**: `number`

___

### <a id="fatamount" name="fatamount"></a> fatAmount

• `Optional` **fatAmount**: `number`

___

### <a id="fatfullamount" name="fatfullamount"></a> fatFullAmount

• `Optional` **fatFullAmount**: `number`

___

### <a id="fiberamount" name="fiberamount"></a> fiberAmount

• `Optional` **fiberAmount**: `number`

___

### <a id="fiberfullamount" name="fiberfullamount"></a> fiberFullAmount

• `Optional` **fiberFullAmount**: `number`

___

### <a id="measureunit" name="measureunit"></a> measureUnit

• `Optional` **measureUnit**: `string`
