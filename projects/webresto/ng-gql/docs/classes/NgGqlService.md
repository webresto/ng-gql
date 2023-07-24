# Class: NgGqlService

## Table of contents

### Constructors

- [constructor](NgGqlService.md#constructor)

### Methods

- [getNgGqlConfig](NgGqlService.md#getnggqlconfig)
- [getNavigation$](NgGqlService.md#getnavigation$)
- [getNavigationPoints](NgGqlService.md#getnavigationpoints)
- [getStartMenuSlug](NgGqlService.md#getstartmenuslug)
- [getMaintenance$](NgGqlService.md#getmaintenance$)
- [getGroup](NgGqlService.md#getgroup)
- [addAmountToDish](NgGqlService.md#addamounttodish)
- [getDishes$](NgGqlService.md#getdishes$)
- [getNavBarMenu](NgGqlService.md#getnavbarmenu)
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

## Methods

### getNgGqlConfig

▸ **getNgGqlConfig**(): [`NgGqlConfig`](../interfaces/NgGqlConfig.md)

#### Returns

[`NgGqlConfig`](../interfaces/NgGqlConfig.md)

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

### getNavigationPoints

▸ **getNavigationPoints**(`slug`): `Observable`<[`NavigationsMenuItem`](../interfaces/NavigationsMenuItem.md)[]\>

Список ссылок для необходимого раздела навигации

#### Parameters

| Name | Type |
| :------ | :------ |
| `slug` | `string` |

#### Returns

`Observable`<[`NavigationsMenuItem`](../interfaces/NavigationsMenuItem.md)[]\>

___

### getStartMenuSlug

▸ **getStartMenuSlug**(): `Observable`<[`string`[], `undefined` \| `string`]\>

Возвращает ссылку на страницу, которая будет стартовой для меню

#### Returns

`Observable`<[`string`[], `undefined` \| `string`]\>

___

### getMaintenance$

▸ **getMaintenance$**(): `Observable`<[`Maintenance`](../interfaces/Maintenance.md)\>

#### Returns

`Observable`<[`Maintenance`](../interfaces/Maintenance.md)\>

___

### getGroup

▸ **getGroup**(`slug`, `concept?`): `Observable`<[`Group`](../interfaces/Group.md)\>

Внутренний метод, используемый для загрузки основного - "корневого" списка групп.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `slug` | `string` | `undefined` | init- slug. Либо принимается извне через внутренний поток `initGroupSlug$`, либо формируется на основании данных в массиве Navigation[], загруженном на старте приложения. Чтобы обновлять значение в `initGroupSlug$` используется метод `updateInitGroupSlug` |
| `concept` | `string` | `'origin'` | - |

#### Returns

`Observable`<[`Group`](../interfaces/Group.md)\>

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

### getDishes$

▸ **getDishes$**(`ids`): `Observable`<[`Dish`](../interfaces/Dish.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`Observable`<[`Dish`](../interfaces/Dish.md)[]\>

___

### getNavBarMenu

▸ **getNavBarMenu**(`concept?`, `topLevelGroupId?`): `Observable`<[`NavbarMenuLink`](../README.md#navbarmenulink)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept?` | `string` |
| `topLevelGroupId?` | `string` |

#### Returns

`Observable`<[`NavbarMenuLink`](../README.md#navbarmenulink)[]\>

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
