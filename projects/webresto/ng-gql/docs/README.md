# @webresto/ng-gql

## Table of contents

### Interfaces

- [BaseModelWithCustomData](interfaces/BaseModelWithCustomData.md)
- [Customer](interfaces/Customer.md)
- [Phone](interfaces/Phone.md)
- [PhoneKnowledge](interfaces/PhoneKnowledge.md)
- [CheckPhoneCodeInput](interfaces/CheckPhoneCodeInput.md)
- [CheckPhoneResponse](interfaces/CheckPhoneResponse.md)
- [Dish](interfaces/Dish.md)
- [DishTag](interfaces/DishTag.md)
- [Message](interfaces/Message.md)
- [Action](interfaces/Action.md)
- [GroupModifier](interfaces/GroupModifier.md)
- [Group](interfaces/Group.md)
- [Image](interfaces/Image.md)
- [ImageItem](interfaces/ImageItem.md)
- [Maintenance](interfaces/Maintenance.md)
- [OrderModifier](interfaces/OrderModifier.md)
- [Modifier](interfaces/Modifier.md)
- [NavigationBase](interfaces/NavigationBase.md)
- [NavigationLoader](interfaces/NavigationLoader.md)
- [Navigation](interfaces/Navigation.md)
- [NavigationsMenuItemBase](interfaces/NavigationsMenuItemBase.md)
- [NavigationsMenuItem](interfaces/NavigationsMenuItem.md)
- [NavigationsOptions](interfaces/NavigationsOptions.md)
- [NgGqlConfig](interfaces/NgGqlConfig.md)
- [OrderDish](interfaces/OrderDish.md)
- [Order](interfaces/Order.md)
- [Address](interfaces/Address.md)
- [CheckResponse](interfaces/CheckResponse.md)
- [PaymentMethod](interfaces/PaymentMethod.md)

### Functions

- [deepClone](README.md#deepclone)
- [generateQueryString](README.md#generatequerystring)
- [isValue](README.md#isvalue)
- [isEqualItems](README.md#isequalitems)

### Type Aliases

- [DiscountType](README.md#discounttype)
- [VCriteria](README.md#vcriteria)
- [GQLRequestVariables](README.md#gqlrequestvariables)
- [StorageOrderTokenEvent](README.md#storageordertokenevent)
- [StorageOrderTokenSetOrderId](README.md#storageordertokensetorderid)
- [StorageOrderTokenRemoveOrderId](README.md#storageordertokenremoveorderid)
- [OrderState](README.md#orderstate)
- [AddToOrderInput](README.md#addtoorderinput)
- [RemoveOrSetAmountToDish](README.md#removeorsetamounttodish)
- [SetDishCommentInput](README.md#setdishcommentinput)
- [CheckOrderInput](README.md#checkorderinput)
- [OrderInput](README.md#orderinput)
- [OrderAdditionalFields](README.md#orderadditionalfields)
- [OrderForm](README.md#orderform)
- [ValuesOrBoolean](README.md#valuesorboolean)
- [QueryGenerationParam](README.md#querygenerationparam)

### Variables

- [DishFragments](README.md#dishfragments)
- [MessageOrActionGql](README.md#messageoractiongql)
- [GroupModifierFragments](README.md#groupmodifierfragments)
- [GroupFragments](README.md#groupfragments)
- [ImageFragments](README.md#imagefragments)
- [MaintenanceFragment](README.md#maintenancefragment)
- [ModifierFragments](README.md#modifierfragments)
- [NavigationFragments](README.md#navigationfragments)
- [OrderDishFragments](README.md#orderdishfragments)
- [OrderFragments](README.md#orderfragments)
- [PaymentMethodFragments](README.md#paymentmethodfragments)

### Classes

- [EventMessage](classes/EventMessage.md)
- [ApolloService](classes/ApolloService.md)
- [NgGqlService](classes/NgGqlService.md)
- [NgOrderService](classes/NgOrderService.md)

### Events

- [CartBusEvent](README.md#cartbusevent)
- [CartBusEventBase](README.md#cartbuseventbase)
- [CartBusEventAdd](README.md#cartbuseventadd)
- [CartBusEventUpdate](README.md#cartbuseventupdate)
- [CartBusEventRemove](README.md#cartbuseventremove)
- [CartBusEventSetAmountToDish](README.md#cartbuseventsetamounttodish)
- [CartBusEventSetCommentToDish](README.md#cartbuseventsetcommenttodish)
- [CartBusEventCheck](README.md#cartbuseventcheck)
- [CartBusEventSend](README.md#cartbuseventsend)

## Functions

### deepClone

▸ **deepClone**<`T`\>(`source`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` |  |

#### Returns

`T`

___

### generateQueryString

▸ **generateQueryString**<`T`, `N`, `V`\>(`options`): `string`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](README.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.name` | `N` |  |
| `options.queryObject` | `T` |  |
| `options.variables?` | `V` |  |
| `options.requiredFields?` | keyof `V`[] |  |
| `options.fieldsTypeMap?` | `Map`<keyof `V`, `string`\> |  |

#### Returns

`string`

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
| `value` | `undefined` \| ``null`` \| `T` |

#### Returns

value is NonNullable<T\>

___

### isEqualItems

▸ **isEqualItems**<`T`\>(`a`, `b`): `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` |  |
| `b` | `T` | - |

#### Returns

`boolean`

## Type Aliases

### DiscountType

Ƭ **DiscountType**: ``"FIXED"`` \| ``"PERCENT"``

___

### VCriteria

Ƭ **VCriteria**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `criteria` | { `[key: string]`: `any`;  } |  |

___

### GQLRequestVariables

Ƭ **GQLRequestVariables**: `undefined` \| [`VCriteria`](README.md#vcriteria) \| { `[key: string]`: `number` \| `string` \| `Object` \| `boolean` \| ``null`` \| `undefined`;  }

___

### StorageOrderTokenEvent

Ƭ **StorageOrderTokenEvent**: [`StorageOrderTokenSetOrderId`](README.md#storageordertokensetorderid) \| [`StorageOrderTokenRemoveOrderId`](README.md#storageordertokenremoveorderid)

___

### StorageOrderTokenSetOrderId

Ƭ **StorageOrderTokenSetOrderId**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `event` | ``"setOrderId"`` |
| `data` | { `orderId`: `string` ; `alternativeToken?`: `string`  } |
| `data.orderId` | `string` |
| `data.alternativeToken?` | `string` |

___

### StorageOrderTokenRemoveOrderId

Ƭ **StorageOrderTokenRemoveOrderId**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `event` | ``"removeOrderId"`` |

___

### OrderState

Ƭ **OrderState**: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"``

___

### AddToOrderInput

Ƭ **AddToOrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |
| `dishId` | `string` |
| `amount?` | `number` |
| `modifiers?` | [`OrderModifier`](interfaces/OrderModifier.md)[] |
| `comment?` | `string` |
| `replace?` | `boolean` |
| `orderDishId?` | `number` |

___

### RemoveOrSetAmountToDish

Ƭ **RemoveOrSetAmountToDish**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `orderDishId?` | `number` |
| `amount?` | `number` |
| `id` | `string` |

___

### SetDishCommentInput

Ƭ **SetDishCommentInput**<`T`\>: `T` extends [`Dish`](interfaces/Dish.md) ? { `id?`: `string` ; `comment?`: `string` ; `dish`: [`Dish`](interfaces/Dish.md)  } : { `id?`: `string` ; `comment?`: `string` ; `orderDishId?`: `number`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Dish`](interfaces/Dish.md) \| `number` |

___

### CheckOrderInput

Ƭ **CheckOrderInput**: { `orderId`: `string` ; `paymentMethodId?`: `string` ; `selfService`: `boolean` ; `pickupAddressId?`: `string` ; `locationId?`: `string` ; `date?`: `string` ; `address`: [`Address`](interfaces/Address.md) \| ``null`` ; `customer`: [`Customer`](interfaces/Customer.md) \| ``null`` ; `comment?`: `string` ; `notifyMethodId?`: `string`  } & `Partial`<[`BaseModelWithCustomData`](interfaces/BaseModelWithCustomData.md)\>

___

### OrderInput

Ƭ **OrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

___

### OrderAdditionalFields

Ƭ **OrderAdditionalFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `selfService` | `boolean` |
| `pickupAddressId?` | `string` |
| `locationId?` | `string` |
| `promocode?` | `string` |
| `deliveryTimeInfo?` | { `deliveryType`: ``"fast"`` \| ``"date-time"`` \| `undefined` ; `deliveryDate`: `string` \| `undefined` ; `deliveryTime`: `string` \| `undefined`  } |
| `deliveryTimeInfo.deliveryType` | ``"fast"`` \| ``"date-time"`` \| `undefined` |
| `deliveryTimeInfo.deliveryDate` | `string` \| `undefined` |
| `deliveryTimeInfo.deliveryTime` | `string` \| `undefined` |

___

### OrderForm

Ƭ **OrderForm**: [`Order`](interfaces/Order.md) & [`OrderAdditionalFields`](README.md#orderadditionalfields)

___

### ValuesOrBoolean

Ƭ **ValuesOrBoolean**<`T`\>: { [K in keyof Partial<T\>]: true \| (T[K] extends string \| number \| bigint \| symbol \| boolean \| undefined \| null ? true : T[K] extends (infer U)[] \| undefined \| null ? ValuesOrBoolean<U\> : ValuesOrBoolean<T[K]\>) }

#### Type parameters

| Name |
| :------ |
| `T` |

___

### QueryGenerationParam

Ƭ **QueryGenerationParam**<`V`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `V` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `requiredFields?` | keyof `V`[] |  |
| `fieldsTypeMap?` | `Map`<keyof `V`, `string`\> |  |

## Variables

### DishFragments

• `Const` **DishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Dish`](interfaces/Dish.md)\> |

___

### MessageOrActionGql

• `Const` **MessageOrActionGql**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messageVob` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Message`](interfaces/Message.md)\> |
| `actionVob` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Action`](interfaces/Action.md)\> |

___

### GroupModifierFragments

• `Const` **GroupModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`GroupModifier`](interfaces/GroupModifier.md)\> |

___

### GroupFragments

• `Const` **GroupFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Group`](interfaces/Group.md)\> |

___

### ImageFragments

• `Const` **ImageFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Image`](interfaces/Image.md)\> |

___

### MaintenanceFragment

• `Const` **MaintenanceFragment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Maintenance`](interfaces/Maintenance.md)\> |

___

### ModifierFragments

• `Const` **ModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Modifier`](interfaces/Modifier.md)\> |

___

### NavigationFragments

• `Const` **NavigationFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Navigation`](interfaces/Navigation.md)\> |

___

### OrderDishFragments

• `Const` **OrderDishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> |

___

### OrderFragments

• `Const` **OrderFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Order`](interfaces/Order.md)\> |

___

### PaymentMethodFragments

• `Const` **PaymentMethodFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`PaymentMethod`](interfaces/PaymentMethod.md)\> |

## Events

### CartBusEvent

• **CartBusEvent**: [`CartBusEventAdd`](README.md#cartbuseventadd) \| [`CartBusEventUpdate`](README.md#cartbuseventupdate) \| [`CartBusEventRemove`](README.md#cartbuseventremove) \| [`CartBusEventSetAmountToDish`](README.md#cartbuseventsetamounttodish) \| [`CartBusEventSetCommentToDish`](README.md#cartbuseventsetcommenttodish) \| [`CartBusEventCheck`](README.md#cartbuseventcheck) \| [`CartBusEventSend`](README.md#cartbuseventsend)

___

### CartBusEventBase

• **CartBusEventBase**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `successCb?` | (`result`: `T`) => `void` |  |
| `errorCb?` | (`err`: `unknown`) => `void` |  |
| `loading?` | `BehaviorSubject`<`boolean`\> |  |

___

### CartBusEventAdd

• **CartBusEventAdd**: { `event`: ``"add"`` ; `data`: `Omit`<[`AddToOrderInput`](README.md#addtoorderinput), ``"orderId"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventUpdate

• **CartBusEventUpdate**: { `event`: ``"update"`` ; `data`: [`Order`](interfaces/Order.md)  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventRemove

• **CartBusEventRemove**: { `event`: ``"remove"`` ; `data`: `Omit`<[`RemoveOrSetAmountToDish`](README.md#removeorsetamounttodish), ``"id"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventSetAmountToDish

• **CartBusEventSetAmountToDish**: { `event`: ``"setDishAmount"`` ; `data`: `Omit`<[`RemoveOrSetAmountToDish`](README.md#removeorsetamounttodish), ``"id"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventSetCommentToDish

• **CartBusEventSetCommentToDish**: { `event`: ``"setCommentToDish"`` ; `data`: `Omit`<[`SetDishCommentInput`](README.md#setdishcommentinput)<[`Dish`](interfaces/Dish.md)\>, ``"id"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventCheck

• **CartBusEventCheck**: { `event`: ``"check"`` ; `data`: [`OrderForm`](README.md#orderform)  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`CheckResponse`](interfaces/CheckResponse.md)\>

___

### CartBusEventSend

• **CartBusEventSend**: { `event`: ``"order"`` ; `data`: `string`  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`CheckResponse`](interfaces/CheckResponse.md)\>
