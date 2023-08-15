# Interface: GroupModifier<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Dish`](Dish.md) = [`Dish`](Dish.md) |

## Hierarchy

- `Omit`<[`Modifier`](Modifier.md)<`T`\>, ``"amount"`` \| ``"defaultAmount"`` \| ``"hideIfDefaultAmount"`` \| ``"groupId"`` \| ``"dish"``\>

  ↳ **`GroupModifier`**

## Table of contents

### Properties

- [required](GroupModifier.md#required)
- [childModifiers](GroupModifier.md#childmodifiers)
- [group](GroupModifier.md#group)
- [totalAmount](GroupModifier.md#totalamount)
- [maxAmount](GroupModifier.md#maxamount)
- [minAmount](GroupModifier.md#minamount)

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

### maxAmount

• **maxAmount**: `number`

#### Inherited from

Omit.maxAmount

___

### minAmount

• **minAmount**: `number`

#### Inherited from

Omit.minAmount
