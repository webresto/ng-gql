# Class: AddDishToOrderDirective

## Table of contents

### Constructors

- [constructor](AddDishToOrderDirective.md#constructor)

### Properties

- [order](AddDishToOrderDirective.md#order)
- [modifiers](AddDishToOrderDirective.md#modifiers)
- [dish](AddDishToOrderDirective.md#dish)
- [amountDish](AddDishToOrderDirective.md#amountdish)
- [comment](AddDishToOrderDirective.md#comment)
- [replaceOrderDishId](AddDishToOrderDirective.md#replaceorderdishid)
- [loading](AddDishToOrderDirective.md#loading)
- [success](AddDishToOrderDirective.md#success)
- [error](AddDishToOrderDirective.md#error)

### Methods

- [onClick](AddDishToOrderDirective.md#onclick)

## Constructors

### constructor

• **new AddDishToOrderDirective**(`orderService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderService` | [`NgOrderService`](NgOrderService.md) |

## Properties

### order

• **order**: `undefined` \| ``null`` \| [`Order`](../interfaces/Order.md)

___

### modifiers

• **modifiers**: [`OrderModifier`](../interfaces/OrderModifier.md)[] = `[]`

___

### dish

• **dish**: `undefined` \| [`Dish`](../interfaces/Dish.md)

___

### amountDish

• **amountDish**: `number` = `0`

___

### comment

• **comment**: `undefined` \| `string`

___

### replaceOrderDishId

• **replaceOrderDishId**: `boolean` = `false`

___

### loading

• **loading**: `EventEmitter`<`boolean`\>

___

### success

• **success**: `EventEmitter`<`boolean`\>

___

### error

• **error**: `EventEmitter`<`any`\>

## Methods

### onClick

▸ **onClick**(): `void`

#### Returns

`void`
