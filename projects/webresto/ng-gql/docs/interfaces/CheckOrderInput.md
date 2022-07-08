# Interface: CheckOrderInput

## Hierarchy

- `Partial`<[`BaseModelWithCustomData`](BaseModelWithCustomData.md)\>

  ↳ **`CheckOrderInput`**

## Table of contents

### Properties

- [customData](CheckOrderInput.md#customdata)
- [orderId](CheckOrderInput.md#orderid)
- [paymentMethodId](CheckOrderInput.md#paymentmethodid)
- [selfService](CheckOrderInput.md#selfservice)
- [pickupAddressId](CheckOrderInput.md#pickupaddressid)
- [locationId](CheckOrderInput.md#locationid)
- [date](CheckOrderInput.md#date)
- [address](CheckOrderInput.md#address)
- [customer](CheckOrderInput.md#customer)
- [comment](CheckOrderInput.md#comment)
- [notifyMethodId](CheckOrderInput.md#notifymethodid)

## Properties

### customData

• `Optional` **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }

#### Inherited from

Partial.customData

___

### orderId

• **orderId**: `string`

___

### paymentMethodId

• `Optional` **paymentMethodId**: `string`

___

### selfService

• **selfService**: `boolean`

___

### pickupAddressId

• `Optional` **pickupAddressId**: `string`

___

### locationId

• `Optional` **locationId**: `string`

___

### date

• `Optional` **date**: `string`

___

### address

• **address**: ``null`` \| `Partial`<[`Address`](Address.md)\>

___

### customer

• **customer**: ``null`` \| `Partial`<[`Customer`](Customer.md)\>

___

### comment

• `Optional` **comment**: `string`

___

### notifyMethodId

• `Optional` **notifyMethodId**: `string`
