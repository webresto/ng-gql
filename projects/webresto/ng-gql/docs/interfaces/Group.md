# Interface: Group

## Table of contents

### Properties

- [id](./interfaces/Group.md#id)
- [description](./interfaces/Group.md#description)
- [name](./interfaces/Group.md#name)
- [slug](./interfaces/Group.md#slug)
- [visible](./interfaces/Group.md#visible)
- [order](./interfaces/Group.md#order)
- [dishes](./interfaces/Group.md#dishes)
- [discount](./interfaces/Group.md#discount)
- [parentGroup](./interfaces/Group.md#parentgroup)
- [childGroups](./interfaces/Group.md#childgroups)
- [dishesPlaceholder](./interfaces/Group.md#dishesplaceholder)

## Properties

### <a id="id" name="id"></a> id

• **id**: `string`

___

### <a id="description" name="description"></a> description

• **description**: `string`

___

### <a id="name" name="name"></a> name

• **name**: `string`

___

### <a id="slug" name="slug"></a> slug

• `Optional` **slug**: `string`

___

### <a id="visible" name="visible"></a> visible

• **visible**: `boolean`

___

### <a id="order" name="order"></a> order

• **order**: `number`

___

### <a id="dishes" name="dishes"></a> dishes

• `Optional` **dishes**: [`Dish`](./interfaces/Dish.md)[]

___

### <a id="discount" name="discount"></a> discount

• `Optional` **discount**: `number`

___

### <a id="parentgroup" name="parentgroup"></a> parentGroup

• `Optional` **parentGroup**: `Pick`<[`Group`](./interfaces/Group.md), ``"id"`` \| ``"dishesPlaceholder"``\>

___

### <a id="childgroups" name="childgroups"></a> childGroups

• **childGroups**: [`Group`](./interfaces/Group.md)[]

___

### <a id="dishesplaceholder" name="dishesplaceholder"></a> dishesPlaceholder

• **dishesPlaceholder**: ``null`` \| [`Image`](./interfaces/Image.md)
