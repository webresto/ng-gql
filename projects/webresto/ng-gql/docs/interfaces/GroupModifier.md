# Interface: GroupModifier

## Hierarchy

- `Exclude`<[`Modifier`](./interfaces/Modifier.md), ``"amount"`` \| ``"defaultAmount"`` \| ``"hideIfDefaultAmount"`` \| ``"groupId"`` \| ``"dish"``\>

  ↳ **`GroupModifier`**

## Table of contents

### Properties

- [required](./interfaces/GroupModifier.md#required)
- [childModifiers](./interfaces/GroupModifier.md#childmodifiers)
- [group](./interfaces/GroupModifier.md#group)
- [totalAmount](./interfaces/GroupModifier.md#totalamount)
- [modifierId](./interfaces/GroupModifier.md#modifierid)
- [groupId](./interfaces/GroupModifier.md#groupid)
- [maxAmount](./interfaces/GroupModifier.md#maxamount)
- [minAmount](./interfaces/GroupModifier.md#minamount)
- [amount](./interfaces/GroupModifier.md#amount)
- [defaultAmount](./interfaces/GroupModifier.md#defaultamount)
- [dish](./interfaces/GroupModifier.md#dish)

## Properties

### <a id="required" name="required"></a> required

• **required**: `boolean`

___

### <a id="childmodifiers" name="childmodifiers"></a> childModifiers

• **childModifiers**: [`Modifier`](./interfaces/Modifier.md)[]

___

### <a id="group" name="group"></a> group

• **group**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |

___

### <a id="totalamount" name="totalamount"></a> totalAmount

• **totalAmount**: `number`

___

### <a id="modifierid" name="modifierid"></a> modifierId

• **modifierId**: `string`

#### Inherited from

Exclude.modifierId

___

### <a id="groupid" name="groupid"></a> groupId

• `Optional` **groupId**: `string`

#### Inherited from

Exclude.groupId

___

### <a id="maxamount" name="maxamount"></a> maxAmount

• **maxAmount**: `number`

#### Inherited from

Exclude.maxAmount

___

### <a id="minamount" name="minamount"></a> minAmount

• **minAmount**: `number`

#### Inherited from

Exclude.minAmount

___

### <a id="amount" name="amount"></a> amount

• `Optional` **amount**: `number`

#### Inherited from

Exclude.amount

___

### <a id="defaultamount" name="defaultamount"></a> defaultAmount

• **defaultAmount**: `number`

#### Inherited from

Exclude.defaultAmount

___

### <a id="dish" name="dish"></a> dish

• **dish**: [`Dish`](./interfaces/Dish.md)

#### Inherited from

Exclude.dish
