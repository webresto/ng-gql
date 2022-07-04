# Class: NgGqlService

## Table of contents

### Constructors

- [constructor](NgGqlService.md#constructor)

### Methods

- [updateInitGroupSlug](NgGqlService.md#updateinitgroupslug)
- [getNavigation$](NgGqlService.md#getnavigation$)
- [getMaintenance$](NgGqlService.md#getmaintenance$)
- [addAmountToDish](NgGqlService.md#addamounttodish)
- [getMenu$](NgGqlService.md#getmenu$)
- [getDishes$](NgGqlService.md#getdishes$)
- [isKnownPhone$](NgGqlService.md#isknownphone$)
- [phoneKnowledgeGetCode$](NgGqlService.md#phoneknowledgegetcode$)
- [phoneKnowledgeSetCode$](NgGqlService.md#phoneknowledgesetcode$)
- [customQuery$](NgGqlService.md#customquery$)
- [customMutation$](NgGqlService.md#custommutation$)
- [customSubscribe$](NgGqlService.md#customsubscribe$)
- [queryAndSubscribe](NgGqlService.md#queryandsubscribe)
- [destroy](NgGqlService.md#destroy)

### Properties

- [rootGroups$](NgGqlService.md#rootgroups$)

## Constructors

### constructor

• **new NgGqlService**(`apollo`, `config`, `defaultNavigationFragments`, `defaultMaintenanceFragments`, `defaultGroupFragments`, `defaultDishFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | [`ApolloService`](ApolloService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `defaultNavigationFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Navigation`](../interfaces/Navigation.md), [`Navigation`](../interfaces/Navigation.md), [`Navigation`](../interfaces/Navigation.md)\> |
| `defaultMaintenanceFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Maintenance`](../interfaces/Maintenance.md), [`Maintenance`](../interfaces/Maintenance.md), [`Maintenance`](../interfaces/Maintenance.md)\> |
| `defaultGroupFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Group`](../interfaces/Group.md), [`Group`](../interfaces/Group.md), [`Group`](../interfaces/Group.md)\> |
| `defaultDishFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Dish`](../interfaces/Dish.md), [`Dish`](../interfaces/Dish.md), [`Dish`](../interfaces/Dish.md)\> |

## Methods

### updateInitGroupSlug

▸ **updateInitGroupSlug**(`initGroupSlug`, `concept`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `initGroupSlug` | `string` |
| `concept` | `string` |

#### Returns

`void`

___

### getNavigation$

▸ **getNavigation$**<`T`\>(`options`): `Observable`<`T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`NavigationBase`](../interfaces/NavigationBase.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`NavigationLoader`](../interfaces/NavigationLoader.md)<`T`\> |  |

#### Returns

`Observable`<`T`[]\>

▸ **getNavigation$**(): `Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

#### Returns

`Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

___

### getMaintenance$

▸ **getMaintenance$**(): `Observable`<[`Maintenance`](../interfaces/Maintenance.md)\>

#### Returns

`Observable`<[`Maintenance`](../interfaces/Maintenance.md)\>

___

### addAmountToDish

▸ **addAmountToDish**(`sourceDish`): [`Dish`](../interfaces/Dish.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceDish` | [`Dish`](../interfaces/Dish.md) |  |

#### Returns

[`Dish`](../interfaces/Dish.md)

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

### isKnownPhone$

▸ **isKnownPhone$**(`phone`): `Observable`<[`PhoneKnowledge`](../interfaces/PhoneKnowledge.md)[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phone` | [`Phone`](../interfaces/Phone.md) |  |

#### Returns

`Observable`<[`PhoneKnowledge`](../interfaces/PhoneKnowledge.md)[]\>

___

### phoneKnowledgeGetCode$

▸ **phoneKnowledgeGetCode$**(`phone`): `Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | [`Phone`](../interfaces/Phone.md) |

#### Returns

`Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)[]\>

___

### phoneKnowledgeSetCode$

▸ **phoneKnowledgeSetCode$**(`data`): `Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CheckPhoneCodeInput`](../interfaces/CheckPhoneCodeInput.md) |

#### Returns

`Observable`<[`CheckPhoneResponse`](../interfaces/CheckPhoneResponse.md)\>

___

### customQuery$

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` |  |
| `N` | extends `string` |  |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |  |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` |  |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`, `T`, `T` extends `T` ? `T` : `never`\> |  |
| `variables?` | `V` |  |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> |  |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

___

### customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `paramOptions?`): `Observable`<`Record`<`N`, `T`\>\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` |  |
| `N` | extends `string` |  |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |  |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` |  |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`, `T`, `T` extends `T` ? `T` : `never`\> |  |
| `variables` | `V` |  |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> |  |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

___

### customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` |  |
| `N` | extends `string` |  |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |  |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` |  |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`, `T`, `T` extends `T` ? `T` : `never`\> |  |
| `variables?` | `V` |  |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> |  |
| `extra?` | `ExtraSubscriptionOptions` | - |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

___

### queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `paramOptions?`): `Observable`<`T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `NQuery` | extends `string` |
| `NSubscribe` | extends `string` |
| `VQ` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |
| `VS` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameQuery` | `NQuery` |  |
| `nameSubscribe` | `NSubscribe` |  |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`, `T`, `T` extends `T` ? `T` : `never`\> |  |
| `uniqueKeyForCompareItem` | keyof `T` |  |
| `variables?` | `Object` |  |
| `variables.query?` | `VQ` | - |
| `variables.subscribe?` | `VS` | - |
| `paramOptions?` | `Object` |  |
| `paramOptions.query?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`VQ`\> | - |
| `paramOptions.subscribe?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`VS`\> | - |

#### Returns

`Observable`<`T`[]\>

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

## Properties

### rootGroups$

• **rootGroups$**: `Observable`<{ `concept`: `string` ; `groups`: `PartialGroupNullable`[]  }\>
