# Interface: OrderModifier\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Dish`](Dish.md) = [`Dish`](Dish.md) |

## Table of contents

### Properties

- [id](OrderModifier.md#id)
- [amount](OrderModifier.md#amount)
- [groupId](OrderModifier.md#groupid)
- [dish](OrderModifier.md#dish)

## Properties

### id

• **id**: `string`

___

### amount

• `Optional` **amount**: `number`

___

### groupId

• **groupId**: `string`

___

### dish

• **dish**: `Omit`\<`Partial`\<`T`\>, ``"modifiers"``\>
