[@webresto/ng-gql - v1.1.12](../README.md) / [Exports](../modules.md) / NgGqlService

# Class: NgGqlService

## Table of contents

### Constructors

- [constructor](NgGqlService.md#constructor)

### Properties

- [customFields](NgGqlService.md#customfields)
- [rootGroups$](NgGqlService.md#rootgroups$)
- [order$](NgGqlService.md#order$)
- [actions$](NgGqlService.md#actions$)
- [messages$](NgGqlService.md#messages$)
- [orderBus$](NgGqlService.md#orderbus$)

### Methods

- [addCustomField](NgGqlService.md#addcustomfield)
- [getNavigation$](NgGqlService.md#getnavigation$)
- [getMenu$](NgGqlService.md#getmenu$)
- [getDishes$](NgGqlService.md#getdishes$)
- [getOrder](NgGqlService.md#getorder)
- [loadOrderAsCart$](NgGqlService.md#loadorderascart$)
- [getPhone$](NgGqlService.md#getphone$)
- [checkPhone$](NgGqlService.md#checkphone$)
- [getPaymentMethods$](NgGqlService.md#getpaymentmethods$)
- [addDishToOrder$](NgGqlService.md#adddishtoorder$)
- [addToOrder](NgGqlService.md#addtoorder)
- [removeFromOrder](NgGqlService.md#removefromorder)
- [checkOrder](NgGqlService.md#checkorder)
- [sendOrder](NgGqlService.md#sendorder)
- [sendOrder$](NgGqlService.md#sendorder$)
- [checkOrder$](NgGqlService.md#checkorder$)
- [checkPhoneCode$](NgGqlService.md#checkphonecode$)
- [removeDishFromOrder$](NgGqlService.md#removedishfromorder$)
- [setDishAmount$](NgGqlService.md#setdishamount$)
- [setDishComment$](NgGqlService.md#setdishcomment$)
- [customQuery$](NgGqlService.md#customquery$)
- [customMutation$](NgGqlService.md#custommutation$)
- [customSubscribe$](NgGqlService.md#customsubscribe$)
- [queryAndSubscribe](NgGqlService.md#queryandsubscribe)
- [destroy](NgGqlService.md#destroy)

## Constructors

### constructor

• **new NgGqlService**(`apollo`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | [`ApolloService`](ApolloService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |

## Properties

### customFields

• **customFields**: `Object` = `{}`

#### Index signature

▪ [modelName: `string`]: `string`[]

___

### rootGroups$

• **rootGroups$**: `Observable`<{ `slug`: `string` ; `id`: ``null`` \| `string`  }[]\>

___

### order$

• **order$**: `Observable`<[`Order`](../interfaces/Order.md)\>

___

### actions$

• **actions$**: `Observable`<[`Action`](../interfaces/Action.md)\>

___

### messages$

• **messages$**: `Observable`<[`Message`](../interfaces/Message.md)\>

___

### orderBus$

• **orderBus$**: `Observable`<`void` \| () => `void`\>

## Methods

### addCustomField

▸ **addCustomField**(`modelName`, `field`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `field` | `string` |

#### Returns

`void`

___

### getNavigation$

▸ **getNavigation$**(): `Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

#### Returns

`Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

___

### getMenu$

▸ **getMenu$**(`slug`): `Observable`<``null`` \| [`Group`](../interfaces/Group.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `slug` | `undefined` \| `string` \| `string`[] |

#### Returns

`Observable`<``null`` \| [`Group`](../interfaces/Group.md)[]\>

___

### getDishes$

▸ **getDishes$**(`id?`): `Observable`<[`Dish`](../interfaces/Dish.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` \| `string`[] |

#### Returns

`Observable`<[`Dish`](../interfaces/Dish.md)[]\>

___

### getOrder

▸ **getOrder**(`orderId`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### loadOrderAsCart$

▸ **loadOrderAsCart$**(`orderId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`void`

___

### getPhone$

▸ **getPhone$**(`phone`): `Observable`<[`Phone`](../interfaces/Phone.md) \| [`Phone`](../interfaces/Phone.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |

#### Returns

`Observable`<[`Phone`](../interfaces/Phone.md) \| [`Phone`](../interfaces/Phone.md)[]\>

___

### checkPhone$

▸ **checkPhone$**(`phone`): `Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md) \| [`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |

#### Returns

`Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md) \| [`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)[]\>

___

### getPaymentMethods$

▸ **getPaymentMethods$**(`orderId`): `Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

___

### addDishToOrder$

▸ **addDishToOrder$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddToOrderInput`](../modules.md#addtoorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### addToOrder

▸ **addToOrder**(`order`, `loading`, `dish`, `amount?`, `dishModifiers?`, `successCb?`, `errorCb?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `order` | [`Order`](../interfaces/Order.md) | `undefined` |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` |
| `amount` | `number` | `1` |
| `dishModifiers` | [`Modifier`](../interfaces/Modifier.md)[] | `[]` |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` |

#### Returns

`void`

___

### removeFromOrder

▸ **removeFromOrder**(`loading`, `dish`, `amount?`, `orderDishId`, `order`, `successCb?`, `errorCb?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` |
| `amount` | `number` | `1` |
| `orderDishId` | `undefined` \| `number` | `undefined` |
| `order` | [`Order`](../interfaces/Order.md) | `undefined` |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` |

#### Returns

`void`

___

### checkOrder

▸ **checkOrder**(`order`, `successCb?`, `errorCb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderForm`](../modules.md#orderform) |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` |
| `errorCb?` | (`err`: `unknown`) => `void` |

#### Returns

`void`

___

### sendOrder

▸ **sendOrder**(`order`, `successCb?`, `errorCb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderForm`](../modules.md#orderform) |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` |
| `errorCb?` | (`err`: `unknown`) => `void` |

#### Returns

`void`

___

### sendOrder$

▸ **sendOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

___

### checkOrder$

▸ **checkOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

___

### checkPhoneCode$

▸ **checkPhoneCode$**(`data`): `Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CheckPhoneCodeInput`](../interfaces/CheckPhoneCodeInput.md) |

#### Returns

`Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)\>

___

### removeDishFromOrder$

▸ **removeDishFromOrder$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RemoveFromOrderInput`](../modules.md#removefromorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### setDishAmount$

▸ **setDishAmount$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishAmountInput`](../modules.md#setdishamountinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### setDishComment$

▸ **setDishComment$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishCommentInput`](../modules.md#setdishcommentinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### customQuery$

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](../modules.md#valuesorboolean)<`T`\>\> |
| `variables?` | `V` |
| `optionalFields?` | `string`[] |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../modules.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `optionalFields?` | `string`[] |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

___

### customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `optionalFields?`): `Observable`<`Record`<`N`, `T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](../modules.md#valuesorboolean)<`T`\>\> |
| `variables` | `V` |
| `optionalFields?` | `string`[] |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `optionalFields?`): `Observable`<`Record`<`N`, `T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../modules.md#valuesorboolean)<`T`\> |
| `variables` | `V` |
| `optionalFields?` | `string`[] |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

___

### customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](../modules.md#valuesorboolean)<`T`\>\> |
| `variables?` | `V` |
| `optionalFields?` | `string`[] |
| `extra?` | `ExtraSubscriptionOptions` |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../modules.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `optionalFields?` | `string`[] |
| `extra?` | `ExtraSubscriptionOptions` |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

___

### queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `V`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`): `Observable`<`T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `NQuery` | extends `string` |
| `NSubscribe` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameQuery` | `NQuery` |
| `nameSubscribe` | `NSubscribe` |
| `queryObject` | [`ValuesOrBoolean`](../modules.md#valuesorboolean)<`T`\> |
| `uniqueKeyForCompareItem` | keyof `T` |
| `variables?` | `V` |

#### Returns

`Observable`<`T`[]\>

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`
