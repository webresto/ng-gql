[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / GroupModifier

# Interface: GroupModifier

## Hierarchy

- `Exclude`<[`Modifier`](Modifier.md), ``"amount"`` \| ``"defaultAmount"`` \| ``"hideIfDefaultAmount"`` \| ``"groupId"`` \| ``"dish"``\>

  ↳ **`GroupModifier`**

## Table of contents

### Properties

- [amount](GroupModifier.md#amount)
- [childModifiers](GroupModifier.md#childmodifiers)
- [defaultAmount](GroupModifier.md#defaultamount)
- [dish](GroupModifier.md#dish)
- [group](GroupModifier.md#group)
- [groupId](GroupModifier.md#groupid)
- [maxAmount](GroupModifier.md#maxamount)
- [minAmount](GroupModifier.md#minamount)
- [modifierId](GroupModifier.md#modifierid)
- [required](GroupModifier.md#required)
- [totalAmount](GroupModifier.md#totalamount)

## Properties

### amount

• `Optional` **amount**: `number`

#### Inherited from

Exclude.amount

#### Defined in

lib/models/modifier/modifier.gql.ts:17

___

### childModifiers

• **childModifiers**: [`Modifier`](Modifier.md)[]

#### Defined in

lib/models/group-modifier/group-modifier.gql.ts:7

___

### defaultAmount

• **defaultAmount**: `number`

#### Inherited from

Exclude.defaultAmount

#### Defined in

lib/models/modifier/modifier.gql.ts:18

___

### dish

• **dish**: [`Dish`](Dish.md)

#### Inherited from

Exclude.dish

#### Defined in

lib/models/modifier/modifier.gql.ts:19

___

### group

• **group**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |

#### Defined in

lib/models/group-modifier/group-modifier.gql.ts:8

___

### groupId

• `Optional` **groupId**: `string`

#### Inherited from

Exclude.groupId

#### Defined in

lib/models/modifier/modifier.gql.ts:14

___

### maxAmount

• **maxAmount**: `number`

#### Inherited from

Exclude.maxAmount

#### Defined in

lib/models/modifier/modifier.gql.ts:15

___

### minAmount

• **minAmount**: `number`

#### Inherited from

Exclude.minAmount

#### Defined in

lib/models/modifier/modifier.gql.ts:16

___

### modifierId

• **modifierId**: `string`

#### Inherited from

Exclude.modifierId

#### Defined in

lib/models/modifier/modifier.gql.ts:13

___

### required

• **required**: `boolean`

#### Defined in

lib/models/group-modifier/group-modifier.gql.ts:6

___

### totalAmount

• **totalAmount**: `number`

#### Defined in

lib/models/group-modifier/group-modifier.gql.ts:12
