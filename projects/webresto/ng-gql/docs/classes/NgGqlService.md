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

## Constructors

### constructor

• **new NgGqlService**(`requestService`, `storage`, `config`, `defaultNavigationFragments`, `defaultMaintenanceFragments`, `defaultGroupFragments`, `defaultDishFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestService` | [`RequestService`](RequestService.md) |
| `storage` | [`NgGqlStoreService`](NgGqlStoreService.md) |
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

**`Method`**

getNavigation$()
Используется для получения массива обьектов навигации для различных компонентов приложения.

**`See`**

NavigationLoader<T>

▸ **getNavigation$**(): `Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

#### Returns

`Observable`<[`Navigation`](../interfaces/Navigation.md)[]\>

**`Method`**

getNavigation$()
Используется для получения массива обьектов навигации для различных компонентов приложения.
Если приложение использует стандартную механику навигации, параметр `options` - не требуется.

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceDish` | [`Dish`](../interfaces/Dish.md) | объект с исходными данными блюда. |

#### Returns

[`Dish`](../interfaces/Dish.md)

новый, дополненный объект с данными блюда.

**`Method`**

addAmountToDish()
Метод-хелпер, используемый для добавления модификаторам блюда параметра amount и установки ему значения, в случае, если они у него имеются.

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phone` | [`Phone`](../interfaces/Phone.md) | Объект с данными номера телефона. |
| `customvOb?` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`PhoneKnowledge`](../interfaces/PhoneKnowledge.md)\> | - |

#### Returns

`Observable`<[`PhoneKnowledge`](../interfaces/PhoneKnowledge.md)[]\>

**`Method`**

isKnownPhone$
Проверяет переданный номер телефона на "знакомость".

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
