# Interface: Order

## Table of contents

### Properties

- [id](Order.md#id)
- [dishes](Order.md#dishes)
- [dishesCount](Order.md#dishescount)
- [comment](Order.md#comment)
- [deliveryDescription](Order.md#deliverydescription)
- [message](Order.md#message)
- [deliveryCost](Order.md#deliverycost)
- [totalWeight](Order.md#totalweight)
- [total](Order.md#total)
- [orderTotal](Order.md#ordertotal)
- [discountTotal](Order.md#discounttotal)
- [state](Order.md#state)
- [rmsId](Order.md#rmsid)
- [rmsOrderNumber](Order.md#rmsordernumber)
- [rmsDeliveryDate](Order.md#rmsdeliverydate)
- [customer](Order.md#customer)
- [address](Order.md#address)
- [paid](Order.md#paid)
- [paymentMethod](Order.md#paymentmethod)
- [customData](Order.md#customdata)

## Properties

### id

• **id**: `string`

___

### dishes

• **dishes**: [`OrderDish`](OrderDish.md)[]

___

### dishesCount

• **dishesCount**: `number`

___

### comment

• **comment**: ``null`` \| `string`

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

• **state**: `string`

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

### customer

• `Optional` **customer**: [`Customer`](Customer.md)

___

### address

• `Optional` **address**: [`Address`](Address.md)

___

### paid

• `Optional` **paid**: `boolean`

___

### paymentMethod

• `Optional` **paymentMethod**: [`PaymentMethod`](PaymentMethod.md)

___

### customData

• `Optional` **customData**: ``null`` \| { `[key: string]`: `string` \| `any`;  }
