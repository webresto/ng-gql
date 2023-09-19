# Interface: Order<T\>

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Dish`](Dish.md) = [`Dish`](Dish.md) |

## Hierarchy

- [`BaseModelWithCustomData`](BaseModelWithCustomData.md)

  ↳ **`Order`**

## Table of contents

### Properties

- [customData](Order.md#customdata)
- [id](Order.md#id)
- [shortId](Order.md#shortid)
- [dishes](Order.md#dishes)
- [dishesCount](Order.md#dishescount)
- [comment](Order.md#comment)
- [deliveryDescription](Order.md#deliverydescription)
- [message](Order.md#message)
- [deliveryCost](Order.md#deliverycost)
- [totalWeight](Order.md#totalweight)
- [trifleFrom](Order.md#triflefrom)
- [total](Order.md#total)
- [orderTotal](Order.md#ordertotal)
- [discountTotal](Order.md#discounttotal)
- [state](Order.md#state)
- [rmsId](Order.md#rmsid)
- [rmsOrderNumber](Order.md#rmsordernumber)
- [rmsDeliveryDate](Order.md#rmsdeliverydate)
- [rmsDelivered](Order.md#rmsdelivered)
- [customer](Order.md#customer)
- [address](Order.md#address)
- [paid](Order.md#paid)
- [paymentMethod](Order.md#paymentmethod)
- [selfService](Order.md#selfservice)
- [date](Order.md#date)
- [orderDate](Order.md#orderdate)
- [personsCount](Order.md#personscount)
- [deliveryStatus](Order.md#deliverystatus)
- [promotionState](Order.md#promotionstate)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

[BaseModelWithCustomData](BaseModelWithCustomData.md).[customData](BaseModelWithCustomData.md#customdata)

___

### id

• **id**: `string`

___

### shortId

• **shortId**: `string`

___

### dishes

• **dishes**: `Partial`<[`OrderDish`](OrderDish.md)<`T`\>\>[]

___

### dishesCount

• **dishesCount**: `number`

___

### comment

• **comment**: `string`

___

### deliveryDescription

• **deliveryDescription**: `string`

___

### message

• **message**: ``null`` \| `string`

___

### deliveryCost

• **deliveryCost**: `number`

___

### totalWeight

• **totalWeight**: `number`

___

### trifleFrom

• **trifleFrom**: `number`

___

### total

• **total**: `number`

___

### orderTotal

• **orderTotal**: `number`

___

### discountTotal

• **discountTotal**: `number`

___

### state

• **state**: [`OrderState`](../README.md#orderstate)

___

### rmsId

• `Optional` **rmsId**: `string`

___

### rmsOrderNumber

• `Optional` **rmsOrderNumber**: `string`

___

### rmsDeliveryDate

• `Optional` **rmsDeliveryDate**: `string`

___

### rmsDelivered

• `Optional` **rmsDelivered**: `boolean`

___

### customer

• **customer**: ``null`` \| `Partial`<[`Customer`](Customer.md)\>

___

### address

• **address**: ``null`` \| `Partial`<[`Address`](Address.md)\>

___

### paid

• `Optional` **paid**: `boolean`

___

### paymentMethod

• **paymentMethod**: ``null`` \| `Partial`<[`PaymentMethod`](PaymentMethod.md)\>

___

### selfService

• **selfService**: `boolean`

___

### date

• **date**: ``null`` \| `string`

___

### orderDate

• **orderDate**: ``null`` \| `string`

___

### personsCount

• **personsCount**: ``null`` \| `number`

___

### deliveryStatus

• **deliveryStatus**: ``null`` \| `string`

___

### promotionState

• **promotionState**: [`PromotionState`](PromotionState.md)[]
