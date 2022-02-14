[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / NgGqlService

# Class: NgGqlService

## Table of contents

### Constructors

- [constructor](NgGqlService.md#constructor)

### Properties

- [\_cartBus$](NgGqlService.md#_cartbus$)
- [\_cartBusSubscription$](NgGqlService.md#_cartbussubscription$)
- [\_navigationData$](NgGqlService.md#_navigationdata$)
- [\_orderLoader$](NgGqlService.md#_orderloader$)
- [actions$](NgGqlService.md#actions$)
- [cartBus$](NgGqlService.md#cartbus$)
- [customFields](NgGqlService.md#customfields)
- [dishes$](NgGqlService.md#dishes$)
- [loadedMenu$](NgGqlService.md#loadedmenu$)
- [messages$](NgGqlService.md#messages$)
- [order$](NgGqlService.md#order$)
- [orderLoader$](NgGqlService.md#orderloader$)
- [rootGroups$](NgGqlService.md#rootgroups$)

### Methods

- [\_getOrder$](NgGqlService.md#_getorder$)
- [addCustomField](NgGqlService.md#addcustomfield)
- [addDishToOrder$](NgGqlService.md#adddishtoorder$)
- [addToOrder](NgGqlService.md#addtoorder)
- [checkOrder](NgGqlService.md#checkorder)
- [checkOrder$](NgGqlService.md#checkorder$)
- [checkPhone$](NgGqlService.md#checkphone$)
- [checkPhoneCode$](NgGqlService.md#checkphonecode$)
- [customMutation$](NgGqlService.md#custommutation$)
- [customQuery$](NgGqlService.md#customquery$)
- [customSubscribe$](NgGqlService.md#customsubscribe$)
- [destroy](NgGqlService.md#destroy)
- [getDishes$](NgGqlService.md#getdishes$)
- [getMenu$](NgGqlService.md#getmenu$)
- [getNavigation$](NgGqlService.md#getnavigation$)
- [getOrder](NgGqlService.md#getorder)
- [getPaymentMethods$](NgGqlService.md#getpaymentmethods$)
- [getPhone$](NgGqlService.md#getphone$)
- [loadOrderAsCart$](NgGqlService.md#loadorderascart$)
- [queryAndSubscribe](NgGqlService.md#queryandsubscribe)
- [removeDishFromOrder$](NgGqlService.md#removedishfromorder$)
- [removeFromOrder](NgGqlService.md#removefromorder)
- [sendOrder](NgGqlService.md#sendorder)
- [sendOrder$](NgGqlService.md#sendorder$)
- [setDishAmount$](NgGqlService.md#setdishamount$)
- [setDishComment$](NgGqlService.md#setdishcomment$)

## Constructors

### constructor

• **new NgGqlService**(`apollo`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | [`ApolloService`](ApolloService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |

#### Defined in

lib/ng-gql.service.ts:44

## Properties

### \_cartBus$

• `Private` **\_cartBus$**: `EventEmitter`<[`CartBusEvent`](../modules.md#cartbusevent)\>

#### Defined in

lib/ng-gql.service.ts:337

___

### \_cartBusSubscription$

• `Private` **\_cartBusSubscription$**: `undefined` \| `Subscription`

#### Defined in

lib/ng-gql.service.ts:431

___

### \_navigationData$

• `Private` **\_navigationData$**: `Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

#### Defined in

lib/ng-gql.service.ts:65

___

### \_orderLoader$

• `Private` **\_orderLoader$**: `BehaviorSubject`<`undefined` \| ``null`` \| `string`\>

#### Defined in

lib/ng-gql.service.ts:103

___

### actions$

• **actions$**: `Observable`<[`Action`](../interfaces/Action.md)\>

#### Defined in

lib/ng-gql.service.ts:136

___

### cartBus$

• **cartBus$**: `Observable`<`void` \| () => `void`\>

#### Defined in

lib/ng-gql.service.ts:339

___

### customFields

• **customFields**: `Object` = `{}`

#### Index signature

▪ [modelName: `string`]: `string`[]

#### Defined in

lib/ng-gql.service.ts:42

___

### dishes$

• `Private` **dishes$**: `BehaviorSubject`<``null`` \| [`Dish`](../interfaces/Dish.md)[]\>

#### Defined in

lib/ng-gql.service.ts:163

___

### loadedMenu$

• `Private` **loadedMenu$**: `Observable`<{ `groupIdsBySlug`: { [key: string]: `string`;  } ; `groupsById`: { [key: string]: [`Group`](../interfaces/Group.md);  }  }\>

#### Defined in

lib/ng-gql.service.ts:165

___

### messages$

• **messages$**: `Observable`<[`Message`](../interfaces/Message.md)\>

#### Defined in

lib/ng-gql.service.ts:149

___

### order$

• **order$**: `Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/ng-gql.service.ts:110

___

### orderLoader$

• `Private` **orderLoader$**: `Observable`<`undefined` \| `string`\>

#### Defined in

lib/ng-gql.service.ts:104

___

### rootGroups$

• **rootGroups$**: `Observable`<{ `id`: ``null`` \| `string` ; `slug`: `string`  }[]\>

#### Defined in

lib/ng-gql.service.ts:73

## Methods

### \_getOrder$

▸ `Private` **_getOrder$**(`orderId`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/ng-gql.service.ts:319

___

### addCustomField

▸ **addCustomField**(`modelName`, `field`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `field` | `string` |

#### Returns

`void`

#### Defined in

lib/ng-gql.service.ts:56

___

### addDishToOrder$

▸ **addDishToOrder$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddToOrderInput`](../modules.md#addtoorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/ng-gql.service.ts:480

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

#### Defined in

lib/ng-gql.service.ts:490

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

#### Defined in

lib/ng-gql.service.ts:534

___

### checkOrder$

▸ **checkOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Defined in

lib/ng-gql.service.ts:560

___

### checkPhone$

▸ **checkPhone$**(`phone`): `Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md) \| [`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |

#### Returns

`Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md) \| [`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)[]\>

#### Defined in

lib/ng-gql.service.ts:452

___

### checkPhoneCode$

▸ **checkPhoneCode$**(`data`): `Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CheckPhoneCodeInput`](../interfaces/CheckPhoneCodeInput.md) |

#### Returns

`Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)\>

#### Defined in

lib/ng-gql.service.ts:568

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

#### Defined in

lib/ng-gql.service.ts:624

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

#### Defined in

lib/ng-gql.service.ts:625

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

#### Defined in

lib/ng-gql.service.ts:606

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

#### Defined in

lib/ng-gql.service.ts:607

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

#### Defined in

lib/ng-gql.service.ts:641

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

#### Defined in

lib/ng-gql.service.ts:642

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

lib/ng-gql.service.ts:694

___

### getDishes$

▸ **getDishes$**(`id?`): `Observable`<[`Dish`](../interfaces/Dish.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` \| `string`[] |

#### Returns

`Observable`<[`Dish`](../interfaces/Dish.md)[]\>

#### Defined in

lib/ng-gql.service.ts:287

___

### getMenu$

▸ **getMenu$**(`slug`): `Observable`<``null`` \| [`Group`](../interfaces/Group.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `slug` | `undefined` \| `string` \| `string`[] |

#### Returns

`Observable`<``null`` \| [`Group`](../interfaces/Group.md)[]\>

#### Defined in

lib/ng-gql.service.ts:261

___

### getNavigation$

▸ **getNavigation$**(): `Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

#### Returns

`Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

#### Defined in

lib/ng-gql.service.ts:69

___

### getOrder

▸ **getOrder**(`orderId`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/ng-gql.service.ts:327

___

### getPaymentMethods$

▸ **getPaymentMethods$**(`orderId`): `Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

#### Defined in

lib/ng-gql.service.ts:468

___

### getPhone$

▸ **getPhone$**(`phone`): `Observable`<[`Phone`](../interfaces/Phone.md) \| [`Phone`](../interfaces/Phone.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |

#### Returns

`Observable`<[`Phone`](../interfaces/Phone.md) \| [`Phone`](../interfaces/Phone.md)[]\>

#### Defined in

lib/ng-gql.service.ts:433

___

### loadOrderAsCart$

▸ **loadOrderAsCart$**(`orderId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

lib/ng-gql.service.ts:331

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

#### Defined in

lib/ng-gql.service.ts:660

___

### removeDishFromOrder$

▸ **removeDishFromOrder$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RemoveFromOrderInput`](../modules.md#removefromorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/ng-gql.service.ts:582

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

#### Defined in

lib/ng-gql.service.ts:516

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

#### Defined in

lib/ng-gql.service.ts:543

___

### sendOrder$

▸ **sendOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Defined in

lib/ng-gql.service.ts:552

___

### setDishAmount$

▸ **setDishAmount$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishAmountInput`](../modules.md#setdishamountinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/ng-gql.service.ts:590

___

### setDishComment$

▸ **setDishComment$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishCommentInput`](../modules.md#setdishcommentinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

#### Defined in

lib/ng-gql.service.ts:598
