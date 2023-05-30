# Class: NgGqlService

## Table of contents

### Constructors

- [constructor](NgGqlService.md#constructor)

### Properties

- [rootGroups$](NgGqlService.md#rootgroups$)

### Methods

- [getNgGqlConfig](NgGqlService.md#getnggqlconfig)
- [updateInitGroupSlug](NgGqlService.md#updateinitgroupslug)
- [getNavigation$](NgGqlService.md#getnavigation$)
- [getMaintenance$](NgGqlService.md#getmaintenance$)
- [addAmountToDish](NgGqlService.md#addamounttodish)
- [getMenu$](NgGqlService.md#getmenu$)
- [getDishes$](NgGqlService.md#getdishes$)
- [isKnownPhone$](NgGqlService.md#isknownphone$)
- [phoneKnowledgeGetCode$](NgGqlService.md#phoneknowledgegetcode$)
- [phoneKnowledgeSetCode$](NgGqlService.md#phoneknowledgesetcode$)
- [destroy](NgGqlService.md#destroy)
- [customQuery$](NgGqlService.md#customquery$)
- [customMutation$](NgGqlService.md#custommutation$)
- [customSubscribe$](NgGqlService.md#customsubscribe$)
- [queryAndSubscribe](NgGqlService.md#queryandsubscribe)

## Constructors

### constructor

• **new NgGqlService**(`requestService`, `storage`, `config`, `defaultNavigationFragments`, `defaultMaintenanceFragments`, `defaultGroupFragments`, `defaultDishFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestService` | [`RequestService`](RequestService.md) |
| `storage` | [`NgGqlStorageService`](NgGqlStorageService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `defaultNavigationFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Navigation`](../interfaces/Navigation.md)\> |
| `defaultMaintenanceFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Maintenance`](../interfaces/Maintenance.md)\> |
| `defaultGroupFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Group`](../interfaces/Group.md)\> |
| `defaultDishFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Dish`](../interfaces/Dish.md)\> |

## Properties

### rootGroups$

• `Readonly` **rootGroups$**: `Observable`<{ `concept`: `string` ; `groups`: [`PartialGroupNullable`](../README.md#partialgroupnullable)[]  }\>

## Methods

### getNgGqlConfig

▸ **getNgGqlConfig**(): [`NgGqlConfig`](../interfaces/NgGqlConfig.md)

#### Returns

[`NgGqlConfig`](../interfaces/NgGqlConfig.md)

___

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

**`Method`**

getNavigation$()
Используется для получения массива обьектов навигации для различных компонентов приложения.

**`See`**

NavigationLoader<T>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`NavigationBase`](../interfaces/NavigationBase.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`NavigationLoader`](../interfaces/NavigationLoader.md)<`T`\> | объект NavigationLoader. Обязателен, при использовании нестандартной схемы навигации в приложении. |

#### Returns

`Observable`<`T`[]\>

▸ **getNavigation$**(): `Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

**`Method`**

getNavigation$()
Используется для получения массива обьектов навигации для различных компонентов приложения.
Если приложение использует стандартную механику навигации, параметр `options` - не требуется.

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

**`Method`**

addAmountToDish()
Метод-хелпер, используемый для добавления модификаторам блюда параметра amount и установки ему значения, в случае, если они у него имеются.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceDish` | [`Dish`](../interfaces/Dish.md) | объект с исходными данными блюда. |

#### Returns

[`Dish`](../interfaces/Dish.md)

новый, дополненный объект с данными блюда.

___

### getMenu$

▸ **getMenu$**(`slug`): `Observable`<`undefined` \| ``null`` \| `Partial`<[`Group`](../interfaces/Group.md)\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `slug` | `undefined` \| `string` \| `string`[] |

#### Returns

`Observable`<`undefined` \| ``null`` \| `Partial`<[`Group`](../interfaces/Group.md)\>[]\>

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

▸ **isKnownPhone$**(`phone`, `customvOb?`): `Observable`<[`PhoneKnowledge`](../interfaces/PhoneKnowledge.md)[]\>

**`Method`**

isKnownPhone$
Проверяет переданный номер телефона на "знакомость".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phone` | [`Phone`](../interfaces/Phone.md) | Объект с данными номера телефона. |
| `customvOb?` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`PhoneKnowledge`](../interfaces/PhoneKnowledge.md)\> | - |

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

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

___

### customQuery$

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

@deprecated. Use RequestService methods instead

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `N` | extends `string` |
| `V` | extends `OperationVariables` = [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `paramOptions?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`V`\> |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

___

### customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `paramOptions?`): `Observable`<`Record`<`N`, `T`\>\>

@deprecated. Use RequestService methods instead

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |
| `variables` | `V` |
| `paramOptions?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`V`\> |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

___

### customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

@deprecated. Use RequestService methods instead

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `paramOptions?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`V`\> |
| `extra?` | `ExtraSubscriptionOptions` |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

___

### queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `paramOptions?`): `Observable`<`T`[]\>

@deprecated. Use RequestService methods instead

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `NQuery` | extends `string` |
| `NSubscribe` | extends `string` |
| `VQ` | extends `OperationVariables` = [`GQLRequestVariables`](../README.md#gqlrequestvariables) |
| `VS` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameQuery` | `NQuery` |
| `nameSubscribe` | `NSubscribe` |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |
| `uniqueKeyForCompareItem` | keyof `T` |
| `variables?` | `Object` |
| `variables.query?` | `VQ` |
| `variables.subscribe?` | `VS` |
| `paramOptions?` | `Object` |
| `paramOptions.query?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`VQ`\> |
| `paramOptions.subscribe?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`VS`\> |

#### Returns

`Observable`<`T`[]\>
