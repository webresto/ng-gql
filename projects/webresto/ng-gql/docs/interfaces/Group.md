# Interface: Group

## Table of contents

### Properties

- [id](Group.md#id)
- [description](Group.md#description)
- [name](Group.md#name)
- [slug](Group.md#slug)
- [concept](Group.md#concept)
- [icon](Group.md#icon)
- [visible](Group.md#visible)
- [sortOrder](Group.md#sortorder)
- [dishesIds](Group.md#dishesids)
- [dishes](Group.md#dishes)
- [discount](Group.md#discount)
- [parentGroup](Group.md#parentgroup)
- [childGroups](Group.md#childgroups)
- [dishesPlaceholder](Group.md#dishesplaceholder)

## Properties

### id

• **id**: `string`

___

### description

• **description**: `string`

___

### name

• **name**: `string`

___

### slug

• `Optional` **slug**: `string`

___

### concept

• `Optional` **concept**: `string`

___

### icon

• `Optional` **icon**: `string`

___

### visible

• **visible**: `boolean`

___

### sortOrder

• **sortOrder**: `number`

___

### dishesIds

• **dishesIds**: `string`[]

___

### dishes

• `Optional` **dishes**: `Partial`\<[`Dish`](Dish.md)\>[]

___

### discount

• `Optional` **discount**: ``null`` \| `string`

___

### parentGroup

• `Optional` **parentGroup**: `Partial`\<`Pick`\<[`Group`](Group.md), ``"id"`` \| ``"dishesPlaceholder"``\>\>

___

### childGroups

• **childGroups**: `Partial`\<[`Group`](Group.md)\>[]

___

### dishesPlaceholder

• **dishesPlaceholder**: ``null`` \| `Partial`\<[`Image`](Image.md)\>
