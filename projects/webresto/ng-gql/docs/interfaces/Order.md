# Interface: Order

## Table of contents

### Properties

- [id](./interfaces/Order.md#id)
- [dishes](./interfaces/Order.md#dishes)
- [dishesCount](./interfaces/Order.md#dishescount)
- [comment](./interfaces/Order.md#comment)
- [deliveryDescription](./interfaces/Order.md#deliverydescription)
- [message](./interfaces/Order.md#message)
- [deliveryCost](./interfaces/Order.md#deliverycost)
- [totalWeight](./interfaces/Order.md#totalweight)
- [total](./interfaces/Order.md#total)
- [orderTotal](./interfaces/Order.md#ordertotal)
- [discountTotal](./interfaces/Order.md#discounttotal)
- [state](./interfaces/Order.md#state)
- [rmsId](./interfaces/Order.md#rmsid)
- [rmsOrderNumber](./interfaces/Order.md#rmsordernumber)
- [rmsDeliveryDate](./interfaces/Order.md#rmsdeliverydate)
- [customer](./interfaces/Order.md#customer)
- [address](./interfaces/Order.md#address)
- [paid](./interfaces/Order.md#paid)
- [paymentMethod](./interfaces/Order.md#paymentmethod)
- [customData](./interfaces/Order.md#customdata)

## Properties

### <a id="id" name="id"></a> id

• **id**: `string`

___

### <a id="dishes" name="dishes"></a> dishes

• **dishes**: [`OrderDish`](./interfaces/OrderDish.md)[]

___

### <a id="dishescount" name="dishescount"></a> dishesCount

• **dishesCount**: `number`

___

### <a id="comment" name="comment"></a> comment

• **comment**: ``null`` \| `string`

___

### <a id="deliverydescription" name="deliverydescription"></a> deliveryDescription

• **deliveryDescription**: `string`

___

### <a id="message" name="message"></a> message

• **message**: ``null`` \| `string`

___

### <a id="deliverycost" name="deliverycost"></a> deliveryCost

• **deliveryCost**: `number`

___

### <a id="totalweight" name="totalweight"></a> totalWeight

• **totalWeight**: `number`

___

### <a id="total" name="total"></a> total

• **total**: `number`

___

### <a id="ordertotal" name="ordertotal"></a> orderTotal

• **orderTotal**: `number`

___

### <a id="discounttotal" name="discounttotal"></a> discountTotal

• **discountTotal**: `number`

___

### <a id="state" name="state"></a> state

• **state**: `string`

___

### <a id="rmsid" name="rmsid"></a> rmsId

• `Optional` **rmsId**: `string`

___

### <a id="rmsordernumber" name="rmsordernumber"></a> rmsOrderNumber

• `Optional` **rmsOrderNumber**: `string`

___

### <a id="rmsdeliverydate" name="rmsdeliverydate"></a> rmsDeliveryDate

• `Optional` **rmsDeliveryDate**: `string`

___

### <a id="customer" name="customer"></a> customer

• `Optional` **customer**: [`Customer`](./interfaces/Customer.md)

___

### <a id="address" name="address"></a> address

• `Optional` **address**: [`Address`](./interfaces/Address.md)

___

### <a id="paid" name="paid"></a> paid

• `Optional` **paid**: `boolean`

___

### <a id="paymentmethod" name="paymentmethod"></a> paymentMethod

• `Optional` **paymentMethod**: [`PaymentMethod`](./interfaces/PaymentMethod.md)

___

### <a id="customdata" name="customdata"></a> customData

• `Optional` **customData**: ``null`` \| { `[key: string]`: `string` \| `any`;  }
