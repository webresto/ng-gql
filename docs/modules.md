[@webresto/ng-gql](README.md) / Exports

# @webresto/ng-gql

## Table of contents

### Classes

- [AddDishToOrderDirective](classes/AddDishToOrderDirective.md)
- [ApolloService](classes/ApolloService.md)
- [CheckoutDirective](classes/CheckoutDirective.md)
- [EventMessage](classes/EventMessage.md)
- [EventerService](classes/EventerService.md)
- [NgGqlModule](classes/NgGqlModule.md)
- [NgGqlService](classes/NgGqlService.md)
- [NgOrderService](classes/NgOrderService.md)

### Interfaces

- [Action](interfaces/Action.md)
- [Address](interfaces/Address.md)
- [CheckPhoneCodeInput](interfaces/CheckPhoneCodeInput.md)
- [CheckPhoneResponse](interfaces/CheckPhoneResponse.md)
- [CheckResponse](interfaces/CheckResponse.md)
- [Customer](interfaces/Customer.md)
- [Dish](interfaces/Dish.md)
- [DishTag](interfaces/DishTag.md)
- [Group](interfaces/Group.md)
- [GroupModifier](interfaces/GroupModifier.md)
- [Image](interfaces/Image.md)
- [ImageItem](interfaces/ImageItem.md)
- [Message](interfaces/Message.md)
- [Modifier](interfaces/Modifier.md)
- [Navigation](interfaces/Navigation.md)
- [NavigationsMenuItem](interfaces/NavigationsMenuItem.md)
- [NavigationsOptions](interfaces/NavigationsOptions.md)
- [NgGqlConfig](interfaces/NgGqlConfig.md)
- [Order](interfaces/Order.md)
- [OrderData](interfaces/OrderData.md)
- [OrderDish](interfaces/OrderDish.md)
- [OrderModifier](interfaces/OrderModifier.md)
- [PaymentMethod](interfaces/PaymentMethod.md)
- [Phone](interfaces/Phone.md)

### Type aliases

- [AddToOrderInput](modules.md#addtoorderinput)
- [CartBusEvent](modules.md#cartbusevent)
- [OrderAdditionalFields](modules.md#orderadditionalfields)
- [OrderForm](modules.md#orderform)
- [OrderInput](modules.md#orderinput)
- [RemoveFromOrderInput](modules.md#removefromorderinput)
- [SetDishAmountInput](modules.md#setdishamountinput)
- [SetDishCommentInput](modules.md#setdishcommentinput)
- [VCriteria](modules.md#vcriteria)
- [ValuesOrBoolean](modules.md#valuesorboolean)

### Variables

- [DishFragments](modules.md#dishfragments)
- [GroupFragments](modules.md#groupfragments)
- [GroupModifierFragments](modules.md#groupmodifierfragments)
- [ImageFragments](modules.md#imagefragments)
- [ModifierFragments](modules.md#modifierfragments)
- [NavigationFragments](modules.md#navigationfragments)
- [OrderDishFragments](modules.md#orderdishfragments)
- [OrderFragments](modules.md#orderfragments)
- [PaymentMethodFragments](modules.md#paymentmethodfragments)

### Functions

- [generateQueryString](modules.md#generatequerystring)
- [isValue](modules.md#isvalue)

## Type aliases

### AddToOrderInput

Ƭ **AddToOrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | `number` |
| `comment?` | `string` |
| `dishId?` | `string` |
| `from?` | `string` |
| `modifiers?` | [`OrderModifier`](interfaces/OrderModifier.md)[] |
| `orderDishId?` | `string` |
| `orderId?` | `string` |
| `replace?` | `boolean` |

#### Defined in

lib/models/order/order.gql.ts:57

___

### CartBusEvent

Ƭ **CartBusEvent**: { `data`: [`AddToOrderInput`](modules.md#addtoorderinput) ; `event`: ``"add"`` ; `loading`: `BehaviorSubject`<`boolean`\> ; `order`: [`Order`](interfaces/Order.md) ; `errorCb?`: (`err`: `unknown`) => `void` ; `successCb?`: (`order`: [`Order`](interfaces/Order.md)) => `void`  } \| { `data`: [`RemoveFromOrderInput`](modules.md#removefromorderinput) & { `dish`: [`Dish`](interfaces/Dish.md)  } ; `event`: ``"remove"`` ; `loading`: `BehaviorSubject`<`boolean`\> ; `order`: [`Order`](interfaces/Order.md) ; `errorCb?`: (`err`: `unknown`) => `void` ; `successCb?`: (`order`: [`Order`](interfaces/Order.md)) => `void`  } \| { `event`: ``"check"`` \| ``"order"`` ; `order`: [`OrderForm`](modules.md#orderform) ; `ordered?`: `BehaviorSubject`<`boolean`\> ; `errorCb?`: (`err`: `unknown`) => `void` ; `successCb?`: (`check`: [`CheckResponse`](interfaces/CheckResponse.md)) => `void`  } \| { `event`: ``"load"`` ; `orderId`: `string` \| `undefined`  }

#### Defined in

lib/ng-gql.service.ts:12

___

### OrderAdditionalFields

Ƭ **OrderAdditionalFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deliveryTimeInfo?` | { `deliveryDate`: `string` \| `undefined` ; `deliveryTime`: `string` \| `undefined` ; `deliveryType`: ``"fast"`` \| ``"date-time"`` \| `undefined`  } |
| `deliveryTimeInfo.deliveryDate` | `string` \| `undefined` |
| `deliveryTimeInfo.deliveryTime` | `string` \| `undefined` |
| `deliveryTimeInfo.deliveryType` | ``"fast"`` \| ``"date-time"`` \| `undefined` |
| `locationId?` | `string` |
| `pickupAddressId?` | `string` |
| `promocode?` | `string` |
| `selfService` | `boolean` |

#### Defined in

lib/models/order/order.gql.ts:168

___

### OrderForm

Ƭ **OrderForm**: [`Order`](interfaces/Order.md) & [`OrderAdditionalFields`](modules.md#orderadditionalfields)

#### Defined in

lib/models/order/order.gql.ts:180

___

### OrderInput

Ƭ **OrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address?` | { `apartment?`: `string` ; `city?`: `string` ; `comment?`: `string` ; `doorphone?`: `string` ; `entrance?`: `string` ; `floor?`: `string` ; `home?`: `string` ; `housing?`: `string` ; `index?`: `string` ; `street?`: `string` ; `streetId?`: `string`  } |
| `address.apartment?` | `string` |
| `address.city?` | `string` |
| `address.comment?` | `string` |
| `address.doorphone?` | `string` |
| `address.entrance?` | `string` |
| `address.floor?` | `string` |
| `address.home?` | `string` |
| `address.housing?` | `string` |
| `address.index?` | `string` |
| `address.street?` | `string` |
| `address.streetId?` | `string` |
| `comment?` | `string` \| ``null`` |
| `customData?` | `any` |
| `customer?` | { `mail?`: `string` ; `name?`: `string` ; `phone?`: `string`  } |
| `customer.mail?` | `string` |
| `customer.name?` | `string` |
| `customer.phone?` | `string` |
| `date?` | `string` |
| `locationId?` | `string` |
| `notifyMethodId?` | `string` |
| `orderId` | `string` |
| `paymentMethodId?` | `string` |
| `pickupAddressId?` | `string` |
| `selfService?` | `boolean` |

#### Defined in

lib/models/order/order.gql.ts:86

___

### RemoveFromOrderInput

Ƭ **RemoveFromOrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | `number` |
| `id?` | `string` |
| `orderDishId?` | `number` |

#### Defined in

lib/models/order/order.gql.ts:68

___

### SetDishAmountInput

Ƭ **SetDishAmountInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | `number` |
| `id?` | `string` |
| `orderDishId?` | `number` |

#### Defined in

lib/models/order/order.gql.ts:74

___

### SetDishCommentInput

Ƭ **SetDishCommentInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `comment?` | `string` |
| `id?` | `string` |
| `orderDishId?` | `number` |

#### Defined in

lib/models/order/order.gql.ts:80

___

### VCriteria

Ƭ **VCriteria**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `criteria` | { [key: string]: `any`;  } |

#### Defined in

lib/models/generate-query-string.ts:1

___

### ValuesOrBoolean

Ƭ **ValuesOrBoolean**<`T`\>: { [K in keyof Partial<T\>]: boolean \| (T[K] extends string \| number \| bigint \| symbol \| boolean \| undefined \| null ? boolean : T[K] extends infer U[] \| undefined \| null ? ValuesOrBoolean<U\> : ValuesOrBoolean<T[K]\>) }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

lib/models/values-or-boolean.ts:1

## Variables

### DishFragments

• **DishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Dish`](interfaces/Dish.md)\> |

#### Defined in

lib/models/dish/dish.gql.ts:36

___

### GroupFragments

• **GroupFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Group`](interfaces/Group.md)\> |

#### Defined in

lib/models/group/group.gql.ts:20

___

### GroupModifierFragments

• **GroupModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`GroupModifier`](interfaces/GroupModifier.md)\> |

#### Defined in

lib/models/group-modifier/group-modifier.gql.ts:15

___

### ImageFragments

• **ImageFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Image`](interfaces/Image.md)\> |

#### Defined in

lib/models/image/image.gql.ts:15

___

### ModifierFragments

• **ModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Modifier`](interfaces/Modifier.md)\> |

#### Defined in

lib/models/modifier/modifier.gql.ts:22

___

### NavigationFragments

• **NavigationFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Navigation`](interfaces/Navigation.md)\> |

#### Defined in

lib/models/navigation/navigation.gql.ts:29

___

### OrderDishFragments

• **OrderDishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> |

#### Defined in

lib/models/order-dish/order-dish.gql.ts:23

___

### OrderFragments

• **OrderFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | { `address`: `boolean` = true; `comment`: `boolean` = true; `customData`: `boolean` = true; `customer`: `boolean` = true; `deliveryCost`: `boolean` = true; `deliveryDescription`: `boolean` = true; `discountTotal`: `boolean` = true; `dishes`: [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> = OrderDishFragments.vOb; `dishesCount`: `boolean` = true; `id`: `boolean` = true; `message`: `boolean` = true; `orderTotal`: `boolean` = true; `rmsDeliveryDate`: `boolean` = true; `rmsId`: `boolean` = true; `rmsOrderNumber`: `boolean` = true; `state`: `boolean` = true; `total`: `boolean` = true; `totalWeight`: `boolean` = true } |
| `vOb.address` | `boolean` |
| `vOb.comment` | `boolean` |
| `vOb.customData` | `boolean` |
| `vOb.customer` | `boolean` |
| `vOb.deliveryCost` | `boolean` |
| `vOb.deliveryDescription` | `boolean` |
| `vOb.discountTotal` | `boolean` |
| `vOb.dishes` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> |
| `vOb.dishesCount` | `boolean` |
| `vOb.id` | `boolean` |
| `vOb.message` | `boolean` |
| `vOb.orderTotal` | `boolean` |
| `vOb.rmsDeliveryDate` | `boolean` |
| `vOb.rmsId` | `boolean` |
| `vOb.rmsOrderNumber` | `boolean` |
| `vOb.state` | `boolean` |
| `vOb.total` | `boolean` |
| `vOb.totalWeight` | `boolean` |

#### Defined in

lib/models/order/order.gql.ts:145

___

### PaymentMethodFragments

• **PaymentMethodFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`PaymentMethod`](interfaces/PaymentMethod.md)\> |

#### Defined in

lib/models/payment-method/payment-method.gql.ts:14

## Functions

### generateQueryString

▸ **generateQueryString**<`T`, `N`, `V`\>(`options`): `string`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.name` | `N` |
| `options.optionalFields?` | `string`[] |
| `options.queryObject` | `T` |
| `options.variables` | `V` |

#### Returns

`string`

#### Defined in

lib/models/generate-query-string.ts:9

___

### isValue

▸ **isValue**<`T`\>(`value`): value is NonNullable<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

value is NonNullable<T\>

#### Defined in

lib/models/is-value.ts:1
