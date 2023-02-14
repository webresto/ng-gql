# Interface: GroupModifier<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Dish`](Dish.md) = [`Dish`](Dish.md) |

## Hierarchy

- `Exclude`<[`Modifier`](Modifier.md)<`T`\>, ``"amount"`` \| ``"defaultAmount"`` \| ``"hideIfDefaultAmount"`` \| ``"groupId"`` \| ``"dish"``\>

  ↳ **`GroupModifier`**

## Table of contents

### Properties

- [required](GroupModifier.md#required)
- [childModifiers](GroupModifier.md#childmodifiers)
- [group](GroupModifier.md#group)
- [totalAmount](GroupModifier.md#totalamount)
- [modifierId](GroupModifier.md#modifierid)
- [groupId](GroupModifier.md#groupid)
- [maxAmount](GroupModifier.md#maxamount)
- [minAmount](GroupModifier.md#minamount)
- [amount](GroupModifier.md#amount)
- [defaultAmount](GroupModifier.md#defaultamount)
- [dish](GroupModifier.md#dish)

## Properties

### required

• **required**: `boolean`

___

### childModifiers

• **childModifiers**: `Partial`<[`Modifier`](Modifier.md)<`T`\>\>[]

___

### group

• **group**: `Partial`<{ `id`: `string` ; `name`: `string`  }\>

___

### totalAmount

• **totalAmount**: `number`

___

### modifierId

• **modifierId**: `string`

#### Inherited from

Exclude.modifierId

___

### groupId

• `Optional` **groupId**: `string`

#### Inherited from

Exclude.groupId

___

### maxAmount

• **maxAmount**: `number`

#### Inherited from

Exclude.maxAmount

___

### minAmount

• **minAmount**: `number`

#### Inherited from

Exclude.minAmount

___

### amount

• `Optional` **amount**: `number`

#### Inherited from

Exclude.amount

___

### defaultAmount

• **defaultAmount**: `number`

#### Inherited from

Exclude.defaultAmount

___

### dish

• **dish**: `Pick`<`T`, ``"id"`` \| ``"images"`` \| ``"additionalInfo"`` \| ``"name"`` \| ``"description"`` \| ``"oldPrice"`` \| ``"price"`` \| ``"weight"`` \| ``"balance"`` \| ``"tags"`` \| ``"groupId"`` \| ``"parentGroup"``\>

#### Inherited from

Exclude.dish
