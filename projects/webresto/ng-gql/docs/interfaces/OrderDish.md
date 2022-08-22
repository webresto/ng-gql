# Interface: OrderDish<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Dish`](Dish.md) = [`Dish`](Dish.md) |

## Table of contents

### Properties

- [id](OrderDish.md#id)
- [amount](OrderDish.md#amount)
- [dish](OrderDish.md#dish)
- [itemTotal](OrderDish.md#itemtotal)
- [itemTotalBeforeDiscount](OrderDish.md#itemtotalbeforediscount)
- [discountTotal](OrderDish.md#discounttotal)
- [discountType](OrderDish.md#discounttype)
- [discountMessage](OrderDish.md#discountmessage)
- [discountAmount](OrderDish.md#discountamount)
- [comment](OrderDish.md#comment)
- [totalWeight](OrderDish.md#totalweight)
- [total](OrderDish.md#total)
- [modifiers](OrderDish.md#modifiers)
- [isLoading](OrderDish.md#isloading)

## Properties

### id

• **id**: `number`

___

### amount

• **amount**: `number`

___

### dish

• **dish**: `Partial`<`T`\>

___

### itemTotal

• **itemTotal**: `number`

___

### itemTotalBeforeDiscount

• `Optional` **itemTotalBeforeDiscount**: `number`

___

### discountTotal

• **discountTotal**: ``null`` \| `number`

___

### discountType

• **discountType**: ``null`` \| [`DiscountType`](../README.md#discounttype)

___

### discountMessage

• **discountMessage**: ``null`` \| `string`

___

### discountAmount

• **discountAmount**: ``null`` \| `number`

___

### comment

• **comment**: ``null`` \| `string`

___

### totalWeight

• **totalWeight**: `number`

___

### total

• `Optional` **total**: `number`

___

### modifiers

• **modifiers**: `Partial`<[`OrderModifier`](OrderModifier.md)<[`Dish`](Dish.md)\>\>[]

___

### isLoading

• `Optional` **isLoading**: `BehaviorSubject`<`boolean`\>
