[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / CheckoutDirective

# Class: CheckoutDirective

## Table of contents

### Constructors

- [constructor](CheckoutDirective.md#constructor)

### Properties

- [apartment](CheckoutDirective.md#apartment)
- [bonuses](CheckoutDirective.md#bonuses)
- [callback](CheckoutDirective.md#callback)
- [comment](CheckoutDirective.md#comment)
- [date](CheckoutDirective.md#date)
- [delivery](CheckoutDirective.md#delivery)
- [doorphone](CheckoutDirective.md#doorphone)
- [email](CheckoutDirective.md#email)
- [entrance](CheckoutDirective.md#entrance)
- [error](CheckoutDirective.md#error)
- [floor](CheckoutDirective.md#floor)
- [home](CheckoutDirective.md#home)
- [housing](CheckoutDirective.md#housing)
- [isChecking](CheckoutDirective.md#ischecking)
- [lastFormChangeKey](CheckoutDirective.md#lastformchangekey)
- [locationId](CheckoutDirective.md#locationid)
- [name](CheckoutDirective.md#name)
- [notifyMethodId](CheckoutDirective.md#notifymethodid)
- [order](CheckoutDirective.md#order)
- [orderTotal](CheckoutDirective.md#ordertotal)
- [paymentMethod](CheckoutDirective.md#paymentmethod)
- [paymentMethodId](CheckoutDirective.md#paymentmethodid)
- [paymentRedirect](CheckoutDirective.md#paymentredirect)
- [personsCount](CheckoutDirective.md#personscount)
- [phone](CheckoutDirective.md#phone)
- [phonePaymentSmsCode](CheckoutDirective.md#phonepaymentsmscode)
- [selfService](CheckoutDirective.md#selfservice)
- [street](CheckoutDirective.md#street)
- [streetId](CheckoutDirective.md#streetid)
- [success](CheckoutDirective.md#success)

### Methods

- [checkStreet](CheckoutDirective.md#checkstreet)
- [ngOnChanges](CheckoutDirective.md#ngonchanges)
- [onClick](CheckoutDirective.md#onclick)
- [preparePhone](CheckoutDirective.md#preparephone)

## Constructors

### constructor

• **new CheckoutDirective**(`orderService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderService` | [`NgOrderService`](NgOrderService.md) |

#### Defined in

lib/directives/checkout.directive.ts:44

## Properties

### apartment

• **apartment**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:25

___

### bonuses

• **bonuses**: `any`

#### Defined in

lib/directives/checkout.directive.ts:13

___

### callback

• **callback**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:33

___

### comment

• **comment**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:32

___

### date

• **date**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:34

___

### delivery

• **delivery**: `any`

#### Defined in

lib/directives/checkout.directive.ts:18

___

### doorphone

• **doorphone**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:27

___

### email

• **email**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:15

___

### entrance

• **entrance**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:26

___

### error

• **error**: `EventEmitter`<`string`\>

#### Defined in

lib/directives/checkout.directive.ts:38

___

### floor

• **floor**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:28

___

### home

• **home**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:23

___

### housing

• **housing**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:24

___

### isChecking

• **isChecking**: `EventEmitter`<`boolean`\>

#### Defined in

lib/directives/checkout.directive.ts:39

___

### lastFormChangeKey

• **lastFormChangeKey**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:42

___

### locationId

• **locationId**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:20

___

### name

• **name**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:14

___

### notifyMethodId

• **notifyMethodId**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:35

___

### order

• **order**: `undefined` \| ``null`` \| [`Order`](../interfaces/Order.md)

#### Defined in

lib/directives/checkout.directive.ts:41

___

### orderTotal

• **orderTotal**: `undefined` \| `number`

#### Defined in

lib/directives/checkout.directive.ts:12

___

### paymentMethod

• **paymentMethod**: `undefined` \| [`PaymentMethod`](../interfaces/PaymentMethod.md)

#### Defined in

lib/directives/checkout.directive.ts:29

___

### paymentMethodId

• **paymentMethodId**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:30

___

### paymentRedirect

• **paymentRedirect**: `EventEmitter`<`string`\>

#### Defined in

lib/directives/checkout.directive.ts:37

___

### personsCount

• **personsCount**: `number` = `0`

#### Defined in

lib/directives/checkout.directive.ts:31

___

### phone

• **phone**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:16

___

### phonePaymentSmsCode

• **phonePaymentSmsCode**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:17

___

### selfService

• **selfService**: `undefined` \| `boolean`

#### Defined in

lib/directives/checkout.directive.ts:19

___

### street

• **street**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:21

___

### streetId

• **streetId**: `undefined` \| `string`

#### Defined in

lib/directives/checkout.directive.ts:22

___

### success

• **success**: `EventEmitter`<`string`\>

#### Defined in

lib/directives/checkout.directive.ts:36

## Methods

### checkStreet

▸ **checkStreet**(): `void`

#### Returns

`void`

#### Defined in

lib/directives/checkout.directive.ts:141

___

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Defined in

lib/directives/checkout.directive.ts:137

___

### onClick

▸ **onClick**(): `void`

#### Returns

`void`

#### Defined in

lib/directives/checkout.directive.ts:67

___

### preparePhone

▸ **preparePhone**(`phone`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `undefined` \| `string` |

#### Returns

`string`

#### Defined in

lib/directives/checkout.directive.ts:205
