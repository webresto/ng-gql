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
- [OrderAdditionalFields](README.md#orderadditionalfields)
- [OrderForm](README.md#orderform)
- [ValuesOrBoolean](README.md#valuesorboolean)
- [QueryGenerationParam](README.md#querygenerationparam)

### Variables

- [defaultDishFragments](README.md#defaultdishfragments)
- [DISH\_FRAGMENTS](README.md#dish_fragments)
- [defaultMessageFragments](README.md#defaultmessagefragments)
- [defaultActionFragments](README.md#defaultactionfragments)
- [MESSAGE\_FRAGMENTS](README.md#message_fragments)
- [ACTION\_FRAGMENTS](README.md#action_fragments)
- [defaultGroupModifierFragments](README.md#defaultgroupmodifierfragments)
- [GROUP\_MODIFIER\_FRAGMENTS](README.md#group_modifier_fragments)
- [defaultGroupFragments](README.md#defaultgroupfragments)
- [GROUP\_FRAGMENTS](README.md#group_fragments)
- [defaultImageFragments](README.md#defaultimagefragments)
- [IMAGE\_FRAGMENTS](README.md#image_fragments)
- [defaultMaintenanceFragments](README.md#defaultmaintenancefragments)
- [MAINTENANCE\_FRAGMENTS](README.md#maintenance_fragments)
- [defaultModifierFragments](README.md#defaultmodifierfragments)
- [MODIFIER\_FRAGMENTS](README.md#modifier_fragments)
- [defaultNavigationFragments](README.md#defaultnavigationfragments)
- [NAVIGATION\_FRAGMENTS](README.md#navigation_fragments)
- [defaultOrderDishFragments](README.md#defaultorderdishfragments)
- [ORDER\_DISH\_FRAGMENTS](README.md#order_dish_fragments)
- [defaultOrderFragments](README.md#defaultorderfragments)
- [ORDER\_FRAGMENTS](README.md#order_fragments)
- [defaultPaymentMethodFragments](README.md#defaultpaymentmethodfragments)
- [PAYMENT\_METHOD\_FRAGMENTS](README.md#payment_method_fragments)

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
| `modifiers?` | `Partial`<[`OrderModifier`](interfaces/OrderModifier.md)\>[] \| `Partial`<[`Modifier`](interfaces/Modifier.md)\>[] |
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

Ƭ **SetDishCommentInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `comment?` | `string` |
| `orderDishId` | `number` |

___

### CheckOrderInput

Ƭ **CheckOrderInput**: { `orderId`: `string` ; `paymentMethodId?`: `string` ; `selfService`: `boolean` ; `pickupAddressId?`: `string` ; `locationId?`: `string` ; `date?`: `string` ; `address`: `Partial`<[`Address`](interfaces/Address.md)\> \| ``null`` ; `customer`: `Partial`<[`Customer`](interfaces/Customer.md)\> \| ``null`` ; `comment?`: `string` ; `notifyMethodId?`: `string`  } & `Partial`<[`BaseModelWithCustomData`](interfaces/BaseModelWithCustomData.md)\>

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

Ƭ **ValuesOrBoolean**<`IncomingT`, `ExtT`, `T`\>: { [K in keyof Partial<T\>]: true \| (T[K] extends string \| number \| bigint \| symbol \| boolean \| undefined \| null ? true : T[K] extends (infer U)[] \| undefined \| null ? ValuesOrBoolean<U\> : ValuesOrBoolean<T[K]\>) }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `IncomingT` | `IncomingT` |
| `ExtT` | extends `IncomingT` = `IncomingT` |
| `T` | `ExtT` extends `IncomingT` ? `ExtT` : `never` |

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

### defaultDishFragments

• `Const` **defaultDishFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Dish`](interfaces/Dish.md)\>

___

### DISH\_FRAGMENTS

• `Const` **DISH\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Dish`](interfaces/Dish.md), [`Dish`](interfaces/Dish.md), [`Dish`](interfaces/Dish.md)\>\>

___

### defaultMessageFragments

• `Const` **defaultMessageFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Message`](interfaces/Message.md)\>

___

### defaultActionFragments

• `Const` **defaultActionFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Action`](interfaces/Action.md)\>

___

### MESSAGE\_FRAGMENTS

• `Const` **MESSAGE\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Message`](interfaces/Message.md), [`Message`](interfaces/Message.md), [`Message`](interfaces/Message.md)\>\>

___

### ACTION\_FRAGMENTS

• `Const` **ACTION\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Action`](interfaces/Action.md)<`any`\>, [`Action`](interfaces/Action.md)<`any`\>, [`Action`](interfaces/Action.md)<`any`\>\>\>

___

### defaultGroupModifierFragments

• `Const` **defaultGroupModifierFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`GroupModifier`](interfaces/GroupModifier.md)\>

___

### GROUP\_MODIFIER\_FRAGMENTS

• `Const` **GROUP\_MODIFIER\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`GroupModifier`](interfaces/GroupModifier.md), [`GroupModifier`](interfaces/GroupModifier.md), [`GroupModifier`](interfaces/GroupModifier.md)\>\>

___

### defaultGroupFragments

• `Const` **defaultGroupFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Group`](interfaces/Group.md)\>

___

### GROUP\_FRAGMENTS

• `Const` **GROUP\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Group`](interfaces/Group.md), [`Group`](interfaces/Group.md), [`Group`](interfaces/Group.md)\>\>

___

### defaultImageFragments

• `Const` **defaultImageFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Image`](interfaces/Image.md)\>

___

### IMAGE\_FRAGMENTS

• `Const` **IMAGE\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Image`](interfaces/Image.md), [`Image`](interfaces/Image.md), [`Image`](interfaces/Image.md)\>\>

___

### defaultMaintenanceFragments

• `Const` **defaultMaintenanceFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Maintenance`](interfaces/Maintenance.md)\>

___

### MAINTENANCE\_FRAGMENTS

• `Const` **MAINTENANCE\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Maintenance`](interfaces/Maintenance.md), [`Maintenance`](interfaces/Maintenance.md), [`Maintenance`](interfaces/Maintenance.md)\>\>

___

### defaultModifierFragments

• `Const` **defaultModifierFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Modifier`](interfaces/Modifier.md)\>

___

### MODIFIER\_FRAGMENTS

• `Const` **MODIFIER\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Modifier`](interfaces/Modifier.md), [`Modifier`](interfaces/Modifier.md), [`Modifier`](interfaces/Modifier.md)\>\>

___

### defaultNavigationFragments

• `Const` **defaultNavigationFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Navigation`](interfaces/Navigation.md)\>

___

### NAVIGATION\_FRAGMENTS

• `Const` **NAVIGATION\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Navigation`](interfaces/Navigation.md), [`Navigation`](interfaces/Navigation.md), [`Navigation`](interfaces/Navigation.md)\>\>

___

### defaultOrderDishFragments

• `Const` **defaultOrderDishFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\>

___

### ORDER\_DISH\_FRAGMENTS

• `Const` **ORDER\_DISH\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md), [`OrderDish`](interfaces/OrderDish.md), [`OrderDish`](interfaces/OrderDish.md)\>\>

___

### defaultOrderFragments

• `Const` **defaultOrderFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Order`](interfaces/Order.md)\>

___

### ORDER\_FRAGMENTS

• `Const` **ORDER\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Order`](interfaces/Order.md), [`Order`](interfaces/Order.md), [`Order`](interfaces/Order.md)\>\>

___

### defaultPaymentMethodFragments

• `Const` **defaultPaymentMethodFragments**: [`ValuesOrBoolean`](README.md#valuesorboolean)<[`PaymentMethod`](interfaces/PaymentMethod.md)\>

___

### PAYMENT\_METHOD\_FRAGMENTS

• `Const` **PAYMENT\_METHOD\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`PaymentMethod`](interfaces/PaymentMethod.md), [`PaymentMethod`](interfaces/PaymentMethod.md), [`PaymentMethod`](interfaces/PaymentMethod.md)\>\>

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

• **CartBusEventUpdate**: { `event`: ``"update"`` ; `data`: `ScanFormType`<[`OrderForm`](README.md#orderform)\>[``"value"``]  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventRemove

• **CartBusEventRemove**: { `event`: ``"remove"`` ; `data`: `Omit`<[`RemoveOrSetAmountToDish`](README.md#removeorsetamounttodish), ``"id"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventSetAmountToDish

• **CartBusEventSetAmountToDish**: { `event`: ``"setDishAmount"`` ; `data`: `Omit`<[`RemoveOrSetAmountToDish`](README.md#removeorsetamounttodish), ``"id"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventSetCommentToDish

• **CartBusEventSetCommentToDish**: { `event`: ``"setCommentToDish"`` ; `data`: `Omit`<[`SetDishCommentInput`](README.md#setdishcommentinput), ``"id"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`Order`](interfaces/Order.md)\>

___

### CartBusEventCheck

• **CartBusEventCheck**: { `event`: ``"check"`` ; `data`: `Omit`<[`CheckOrderInput`](README.md#checkorderinput), ``"orderId"``\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`CheckResponse`](interfaces/CheckResponse.md)\>

___

### CartBusEventSend

• **CartBusEventSend**: { `event`: ``"order"`` ; `data`: `string`  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`CheckResponse`](interfaces/CheckResponse.md)\>
