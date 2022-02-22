# Class: CheckoutDirective

## Table of contents

### Constructors

- [constructor](CheckoutDirective.md#constructor)

### Properties

- [orderTotal](CheckoutDirective.md#ordertotal)
- [bonuses](CheckoutDirective.md#bonuses)
- [name](CheckoutDirective.md#name)
- [email](CheckoutDirective.md#email)
- [phone](CheckoutDirective.md#phone)
- [phonePaymentSmsCode](CheckoutDirective.md#phonepaymentsmscode)
- [delivery](CheckoutDirective.md#delivery)
- [selfService](CheckoutDirective.md#selfservice)
- [locationId](CheckoutDirective.md#locationid)
- [street](CheckoutDirective.md#street)
- [streetId](CheckoutDirective.md#streetid)
- [home](CheckoutDirective.md#home)
- [housing](CheckoutDirective.md#housing)
- [apartment](CheckoutDirective.md#apartment)
- [entrance](CheckoutDirective.md#entrance)
- [doorphone](CheckoutDirective.md#doorphone)
- [floor](CheckoutDirective.md#floor)
- [paymentMethod](CheckoutDirective.md#paymentmethod)
- [paymentMethodId](CheckoutDirective.md#paymentmethodid)
- [personsCount](CheckoutDirective.md#personscount)
- [comment](CheckoutDirective.md#comment)
- [callback](CheckoutDirective.md#callback)
- [date](CheckoutDirective.md#date)
- [notifyMethodId](CheckoutDirective.md#notifymethodid)
- [order](CheckoutDirective.md#order)
- [success](CheckoutDirective.md#success)
- [paymentRedirect](CheckoutDirective.md#paymentredirect)
- [error](CheckoutDirective.md#error)
- [isChecking](CheckoutDirective.md#ischecking)
- [lastFormChangeKey](CheckoutDirective.md#lastformchangekey)
- [OrderFormChange](CheckoutDirective.md#orderformchange)

### Methods

- [onClick](CheckoutDirective.md#onclick)
- [ngOnChanges](CheckoutDirective.md#ngonchanges)
- [checkStreet](CheckoutDirective.md#checkstreet)
- [preparePhone](CheckoutDirective.md#preparephone)

## Constructors

### constructor

• **new CheckoutDirective**(`orderService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderService` | [`NgOrderService`](NgOrderService.md) |

## Properties

### orderTotal

• **orderTotal**: `undefined` \| `number`

___

### bonuses

• **bonuses**: `any`

___

### name

• **name**: `undefined` \| `string`

___

### email

• **email**: `undefined` \| `string`

___

### phone

• **phone**: `undefined` \| `string`

___

### phonePaymentSmsCode

• **phonePaymentSmsCode**: `undefined` \| `string`

___

### delivery

• **delivery**: `any`

___

### selfService

• **selfService**: `boolean` = `false`

___

### locationId

• **locationId**: `undefined` \| `string`

___

### street

• **street**: `undefined` \| `string`

___

### streetId

• **streetId**: `undefined` \| `string`

___

### home

• **home**: `undefined` \| `string`

___

### housing

• **housing**: `undefined` \| `string`

___

### apartment

• **apartment**: `undefined` \| `string`

___

### entrance

• **entrance**: `undefined` \| `string`

___

### doorphone

• **doorphone**: `undefined` \| `string`

___

### floor

• **floor**: `undefined` \| `string`

___

### paymentMethod

• **paymentMethod**: `undefined` \| [`PaymentMethod`](../interfaces/PaymentMethod.md)

___

### paymentMethodId

• **paymentMethodId**: `undefined` \| `string`

___

### personsCount

• **personsCount**: `number` = `0`

___

### comment

• **comment**: `undefined` \| `string`

___

### callback

• **callback**: `undefined` \| `string`

___

### date

• **date**: `undefined` \| `string`

___

### notifyMethodId

• **notifyMethodId**: `undefined` \| `string`

___

### order

• **order**: `undefined` \| [`Order`](../interfaces/Order.md)

___

### success

• **success**: `EventEmitter`<`string`\>

___

### paymentRedirect

• **paymentRedirect**: `EventEmitter`<`string`\>

___

### error

• **error**: `EventEmitter`<`unknown`\>

___

### isChecking

• **isChecking**: `EventEmitter`<`boolean`\>

___

### lastFormChangeKey

• **lastFormChangeKey**: `undefined` \| `string`

___

### OrderFormChange

• **OrderFormChange**: `BehaviorSubject`<``null`` \| `SimpleChanges`\>

## Methods

### onClick

▸ **onClick**(): `void`

#### Returns

`void`

___

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

___

### checkStreet

▸ **checkStreet**(): `void`

#### Returns

`void`

___

### preparePhone

▸ **preparePhone**(`phone`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `undefined` \| `string` |

#### Returns

`string`
