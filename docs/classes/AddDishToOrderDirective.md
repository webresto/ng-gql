[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / AddDishToOrderDirective

# Class: AddDishToOrderDirective

## Table of contents

### Constructors

- [constructor](AddDishToOrderDirective.md#constructor)

### Properties

- [amountDish](AddDishToOrderDirective.md#amountdish)
- [comment](AddDishToOrderDirective.md#comment)
- [dish](AddDishToOrderDirective.md#dish)
- [error](AddDishToOrderDirective.md#error)
- [loading](AddDishToOrderDirective.md#loading)
- [modifiers](AddDishToOrderDirective.md#modifiers)
- [order](AddDishToOrderDirective.md#order)
- [replaceOrderDishId](AddDishToOrderDirective.md#replaceorderdishid)
- [success](AddDishToOrderDirective.md#success)

### Methods

- [addDishToOrder](AddDishToOrderDirective.md#adddishtoorder)
- [onClick](AddDishToOrderDirective.md#onclick)

## Constructors

### constructor

• **new AddDishToOrderDirective**(`orderService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderService` | [`NgOrderService`](NgOrderService.md) |

#### Defined in

lib/directives/add-dish-to-order.directive.ts:13

## Properties

### amountDish

• **amountDish**: `number` = `0`

#### Defined in

lib/directives/add-dish-to-order.directive.ts:19

___

### comment

• **comment**: `undefined` \| `string`

#### Defined in

lib/directives/add-dish-to-order.directive.ts:20

___

### dish

• **dish**: `undefined` \| [`Dish`](../interfaces/Dish.md)

#### Defined in

lib/directives/add-dish-to-order.directive.ts:18

___

### error

• **error**: `EventEmitter`<`any`\>

#### Defined in

lib/directives/add-dish-to-order.directive.ts:25

___

### loading

• **loading**: `EventEmitter`<`boolean`\>

#### Defined in

lib/directives/add-dish-to-order.directive.ts:23

___

### modifiers

• **modifiers**: [`OrderModifier`](../interfaces/OrderModifier.md)[] = `[]`

#### Defined in

lib/directives/add-dish-to-order.directive.ts:11

___

### order

• **order**: `undefined` \| ``null`` \| [`Order`](../interfaces/Order.md)

#### Defined in

lib/directives/add-dish-to-order.directive.ts:10

___

### replaceOrderDishId

• **replaceOrderDishId**: `boolean` = `false`

#### Defined in

lib/directives/add-dish-to-order.directive.ts:21

___

### success

• **success**: `EventEmitter`<`boolean`\>

#### Defined in

lib/directives/add-dish-to-order.directive.ts:24

## Methods

### addDishToOrder

▸ `Private` **addDishToOrder**(`dishID`, `amount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishID` | `string` |
| `amount` | `number` |

#### Returns

`void`

#### Defined in

lib/directives/add-dish-to-order.directive.ts:32

___

### onClick

▸ **onClick**(): `void`

#### Returns

`void`

#### Defined in

lib/directives/add-dish-to-order.directive.ts:28
