[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / Order

# Interface: Order

## Table of contents

### Properties

- [address](Order.md#address)
- [comment](Order.md#comment)
- [customData](Order.md#customdata)
- [customer](Order.md#customer)
- [deliveryCost](Order.md#deliverycost)
- [deliveryDescription](Order.md#deliverydescription)
- [discountTotal](Order.md#discounttotal)
- [dishes](Order.md#dishes)
- [dishesCount](Order.md#dishescount)
- [id](Order.md#id)
- [message](Order.md#message)
- [orderTotal](Order.md#ordertotal)
- [paid](Order.md#paid)
- [paymentMethod](Order.md#paymentmethod)
- [rmsDeliveryDate](Order.md#rmsdeliverydate)
- [rmsId](Order.md#rmsid)
- [rmsOrderNumber](Order.md#rmsordernumber)
- [state](Order.md#state)
- [total](Order.md#total)
- [totalWeight](Order.md#totalweight)

## Properties

### address

• `Optional` **address**: [`Address`](Address.md)

#### Defined in

lib/models/order/order.gql.ts:24

___

### comment

• **comment**: ``null`` \| `string`

#### Defined in

lib/models/order/order.gql.ts:11

___

### customData

• `Optional` **customData**: ``null`` \| { [key: string]: `string` \| `any`;  }

#### Defined in

lib/models/order/order.gql.ts:27

___

### customer

• `Optional` **customer**: [`Customer`](Customer.md)

#### Defined in

lib/models/order/order.gql.ts:23

___

### deliveryCost

• **deliveryCost**: `number`

#### Defined in

lib/models/order/order.gql.ts:14

___

### deliveryDescription

• **deliveryDescription**: `string`

#### Defined in

lib/models/order/order.gql.ts:12

___

### discountTotal

• **discountTotal**: `number`

#### Defined in

lib/models/order/order.gql.ts:18

___

### dishes

• **dishes**: [`OrderDish`](OrderDish.md)[]

#### Defined in

lib/models/order/order.gql.ts:9

___

### dishesCount

• **dishesCount**: `number`

#### Defined in

lib/models/order/order.gql.ts:10

___

### id

• **id**: `string`

#### Defined in

lib/models/order/order.gql.ts:8

___

### message

• **message**: ``null`` \| `string`

#### Defined in

lib/models/order/order.gql.ts:13

___

### orderTotal

• **orderTotal**: `number`

#### Defined in

lib/models/order/order.gql.ts:17

___

### paid

• `Optional` **paid**: `boolean`

#### Defined in

lib/models/order/order.gql.ts:25

___

### paymentMethod

• `Optional` **paymentMethod**: [`PaymentMethod`](PaymentMethod.md)

#### Defined in

lib/models/order/order.gql.ts:26

___

### rmsDeliveryDate

• `Optional` **rmsDeliveryDate**: `string`

#### Defined in

lib/models/order/order.gql.ts:22

___

### rmsId

• `Optional` **rmsId**: `string`

#### Defined in

lib/models/order/order.gql.ts:20

___

### rmsOrderNumber

• `Optional` **rmsOrderNumber**: `string`

#### Defined in

lib/models/order/order.gql.ts:21

___

### state

• **state**: `string`

#### Defined in

lib/models/order/order.gql.ts:19

___

### total

• **total**: `number`

#### Defined in

lib/models/order/order.gql.ts:16

___

### totalWeight

• **totalWeight**: `number`

#### Defined in

lib/models/order/order.gql.ts:15
