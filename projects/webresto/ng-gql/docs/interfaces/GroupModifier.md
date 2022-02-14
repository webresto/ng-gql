[@webresto/ng-gql - v1.1.12](../README.md) / [Exports](../modules.md) / GroupModifier

# Interface: GroupModifier

## Hierarchy

- `Exclude`<[`Modifier`](Modifier.md), ``"amount"`` \| ``"defaultAmount"`` \| ``"hideIfDefaultAmount"`` \| ``"groupId"`` \| ``"dish"``\>

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

• **childModifiers**: [`Modifier`](Modifier.md)[]

___

### group

• **group**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |

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

• **dish**: [`Dish`](Dish.md)

#### Inherited from

Exclude.dish
