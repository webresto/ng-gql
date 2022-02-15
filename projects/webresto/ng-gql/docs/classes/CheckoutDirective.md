# Class: CheckoutDirective

## Table of contents

### Constructors

- [constructor](./classes/CheckoutDirective.md#constructor)

### Properties

- [orderTotal](./classes/CheckoutDirective.md#ordertotal)
- [bonuses](./classes/CheckoutDirective.md#bonuses)
- [name](./classes/CheckoutDirective.md#name)
- [email](./classes/CheckoutDirective.md#email)
- [phone](./classes/CheckoutDirective.md#phone)
- [phonePaymentSmsCode](./classes/CheckoutDirective.md#phonepaymentsmscode)
- [delivery](./classes/CheckoutDirective.md#delivery)
- [selfService](./classes/CheckoutDirective.md#selfservice)
- [locationId](./classes/CheckoutDirective.md#locationid)
- [street](./classes/CheckoutDirective.md#street)
- [streetId](./classes/CheckoutDirective.md#streetid)
- [home](./classes/CheckoutDirective.md#home)
- [housing](./classes/CheckoutDirective.md#housing)
- [apartment](./classes/CheckoutDirective.md#apartment)
- [entrance](./classes/CheckoutDirective.md#entrance)
- [doorphone](./classes/CheckoutDirective.md#doorphone)
- [floor](./classes/CheckoutDirective.md#floor)
- [paymentMethod](./classes/CheckoutDirective.md#paymentmethod)
- [paymentMethodId](./classes/CheckoutDirective.md#paymentmethodid)
- [personsCount](./classes/CheckoutDirective.md#personscount)
- [comment](./classes/CheckoutDirective.md#comment)
- [callback](./classes/CheckoutDirective.md#callback)
- [date](./classes/CheckoutDirective.md#date)
- [notifyMethodId](./classes/CheckoutDirective.md#notifymethodid)
- [success](./classes/CheckoutDirective.md#success)
- [paymentRedirect](./classes/CheckoutDirective.md#paymentredirect)
- [error](./classes/CheckoutDirective.md#error)
- [isChecking](./classes/CheckoutDirective.md#ischecking)
- [order](./classes/CheckoutDirective.md#order)
- [lastFormChangeKey](./classes/CheckoutDirective.md#lastformchangekey)

### Methods

- [onClick](./classes/CheckoutDirective.md#onclick)
- [ngOnChanges](./classes/CheckoutDirective.md#ngonchanges)
- [checkStreet](./classes/CheckoutDirective.md#checkstreet)
- [preparePhone](./classes/CheckoutDirective.md#preparephone)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new CheckoutDirective**(`orderService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderService` | [`NgOrderService`](./classes/NgOrderService.md) |

## Properties

### <a id="ordertotal" name="ordertotal"></a> orderTotal

• **orderTotal**: `undefined` \| `number`

___

### <a id="bonuses" name="bonuses"></a> bonuses

• **bonuses**: `any`

___

### <a id="name" name="name"></a> name

• **name**: `undefined` \| `string`

___

### <a id="email" name="email"></a> email

• **email**: `undefined` \| `string`

___

### <a id="phone" name="phone"></a> phone

• **phone**: `undefined` \| `string`

___

### <a id="phonepaymentsmscode" name="phonepaymentsmscode"></a> phonePaymentSmsCode

• **phonePaymentSmsCode**: `undefined` \| `string`

___

### <a id="delivery" name="delivery"></a> delivery

• **delivery**: `any`

___

### <a id="selfservice" name="selfservice"></a> selfService

• **selfService**: `undefined` \| `boolean`

___

### <a id="locationid" name="locationid"></a> locationId

• **locationId**: `undefined` \| `string`

___

### <a id="street" name="street"></a> street

• **street**: `undefined` \| `string`

___

### <a id="streetid" name="streetid"></a> streetId

• **streetId**: `undefined` \| `string`

___

### <a id="home" name="home"></a> home

• **home**: `undefined` \| `string`

___

### <a id="housing" name="housing"></a> housing

• **housing**: `undefined` \| `string`

___

### <a id="apartment" name="apartment"></a> apartment

• **apartment**: `undefined` \| `string`

___

### <a id="entrance" name="entrance"></a> entrance

• **entrance**: `undefined` \| `string`

___

### <a id="doorphone" name="doorphone"></a> doorphone

• **doorphone**: `undefined` \| `string`

___

### <a id="floor" name="floor"></a> floor

• **floor**: `undefined` \| `string`

___

### <a id="paymentmethod" name="paymentmethod"></a> paymentMethod

• **paymentMethod**: `undefined` \| [`PaymentMethod`](./interfaces/PaymentMethod.md)

___

### <a id="paymentmethodid" name="paymentmethodid"></a> paymentMethodId

• **paymentMethodId**: `undefined` \| `string`

___

### <a id="personscount" name="personscount"></a> personsCount

• **personsCount**: `number` = `0`

___

### <a id="comment" name="comment"></a> comment

• **comment**: `undefined` \| `string`

___

### <a id="callback" name="callback"></a> callback

• **callback**: `undefined` \| `string`

___

### <a id="date" name="date"></a> date

• **date**: `undefined` \| `string`

___

### <a id="notifymethodid" name="notifymethodid"></a> notifyMethodId

• **notifyMethodId**: `undefined` \| `string`

___

### <a id="success" name="success"></a> success

• **success**: `EventEmitter`<`string`\>

___

### <a id="paymentredirect" name="paymentredirect"></a> paymentRedirect

• **paymentRedirect**: `EventEmitter`<`string`\>

___

### <a id="error" name="error"></a> error

• **error**: `EventEmitter`<`string`\>

___

### <a id="ischecking" name="ischecking"></a> isChecking

• **isChecking**: `EventEmitter`<`boolean`\>

___

### <a id="order" name="order"></a> order

• **order**: `undefined` \| ``null`` \| [`Order`](./interfaces/Order.md)

___

### <a id="lastformchangekey" name="lastformchangekey"></a> lastFormChangeKey

• **lastFormChangeKey**: `undefined` \| `string`

## Methods

### <a id="onclick" name="onclick"></a> onClick

▸ **onClick**(): `void`

#### Returns

`void`

___

### <a id="ngonchanges" name="ngonchanges"></a> ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

___

### <a id="checkstreet" name="checkstreet"></a> checkStreet

▸ **checkStreet**(): `void`

#### Returns

`void`

___

### <a id="preparephone" name="preparephone"></a> preparePhone

▸ **preparePhone**(`phone`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `undefined` \| `string` |

#### Returns

`string`
