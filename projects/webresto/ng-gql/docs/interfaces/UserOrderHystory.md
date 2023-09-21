# Interface: UserOrderHystory

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`UserOrderHystory`**

## Table of contents

### Properties

- [customData](UserOrderHystory.md#customdata)
- [id](UserOrderHystory.md#id)
- [uniqueItems](UserOrderHystory.md#uniqueitems)
- [orderTotal](UserOrderHystory.md#ordertotal)
- [total](UserOrderHystory.md#total)
- [order](UserOrderHystory.md#order)
- [discountTotal](UserOrderHystory.md#discounttotal)
- [comment](UserOrderHystory.md#comment)
- [totalWeight](UserOrderHystory.md#totalweight)
- [userId](UserOrderHystory.md#userid)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### uniqueItems

• **uniqueItems**: `number`

___

### orderTotal

• **orderTotal**: `number`

___

### total

• **total**: `number`

___

### order

• **order**: [`Order`](Order.md)<[`Dish`](Dish.md)\>

___

### discountTotal

• **discountTotal**: `number`

___

### comment

• **comment**: `string`

___

### totalWeight

• **totalWeight**: `number`

___

### userId

• **userId**: `string`
