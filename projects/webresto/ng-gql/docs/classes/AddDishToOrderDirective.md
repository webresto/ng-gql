# Class: AddDishToOrderDirective

## Table of contents

### Constructors

- [constructor](./classes/AddDishToOrderDirective.md#constructor)

### Properties

- [order](./classes/AddDishToOrderDirective.md#order)
- [modifiers](./classes/AddDishToOrderDirective.md#modifiers)
- [dish](./classes/AddDishToOrderDirective.md#dish)
- [amountDish](./classes/AddDishToOrderDirective.md#amountdish)
- [comment](./classes/AddDishToOrderDirective.md#comment)
- [replaceOrderDishId](./classes/AddDishToOrderDirective.md#replaceorderdishid)
- [loading](./classes/AddDishToOrderDirective.md#loading)
- [success](./classes/AddDishToOrderDirective.md#success)
- [error](./classes/AddDishToOrderDirective.md#error)

### Methods

- [onClick](./classes/AddDishToOrderDirective.md#onclick)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new AddDishToOrderDirective**(`orderService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderService` | [`NgOrderService`](./classes/NgOrderService.md) |

## Properties

### <a id="order" name="order"></a> order

• **order**: `undefined` \| ``null`` \| [`Order`](./interfaces/Order.md)

___

### <a id="modifiers" name="modifiers"></a> modifiers

• **modifiers**: [`OrderModifier`](./interfaces/OrderModifier.md)[] = `[]`

___

### <a id="dish" name="dish"></a> dish

• **dish**: `undefined` \| [`Dish`](./interfaces/Dish.md)

___

### <a id="amountdish" name="amountdish"></a> amountDish

• **amountDish**: `number` = `0`

___

### <a id="comment" name="comment"></a> comment

• **comment**: `undefined` \| `string`

___

### <a id="replaceorderdishid" name="replaceorderdishid"></a> replaceOrderDishId

• **replaceOrderDishId**: `boolean` = `false`

___

### <a id="loading" name="loading"></a> loading

• **loading**: `EventEmitter`<`boolean`\>

___

### <a id="success" name="success"></a> success

• **success**: `EventEmitter`<`boolean`\>

___

### <a id="error" name="error"></a> error

• **error**: `EventEmitter`<`any`\>

## Methods

### <a id="onclick" name="onclick"></a> onClick

▸ **onClick**(): `void`

#### Returns

`void`
