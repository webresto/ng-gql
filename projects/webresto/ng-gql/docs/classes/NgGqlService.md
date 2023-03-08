# Class: NgGqlService

## Table of contents

### Constructors

- [constructor](NgGqlService.md#constructor)

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
- [customQuery$](NgGqlService.md#customquery$)
- [customMutation$](NgGqlService.md#custommutation$)
- [customSubscribe$](NgGqlService.md#customsubscribe$)
- [queryAndSubscribe](NgGqlService.md#queryandsubscribe)
- [destroy](NgGqlService.md#destroy)

### Properties

- [rootGroups$](NgGqlService.md#rootgroups$)

## Constructors

### constructor

• **new NgGqlService**(`apollo`, `storage`, `config`, `defaultNavigationFragments`, `defaultMaintenanceFragments`, `defaultGroupFragments`, `defaultDishFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | [`ApolloService`](ApolloService.md) |
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

**`Interface`**

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

### customQuery$

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

**`Method`**

customQuery$() для выполнения запросов типа "query" к серверу API GraphQL

**`See`**

**`Alias`**

ValuesOrBoolean<T>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Object` | Тип запрашиваемых данных, по которому построен объект |
| `N` | extends `string` | Строка-название операции из схемы сервера GraphQL. |
| `V` | extends `OperationVariables` = [`GQLRequestVariables`](../README.md#gqlrequestvariables) | = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> | объект-источник информации о структуре запрашиваемых данных в виде обьекта, реализующего интерфейс ValuesOrBoolean<T>. |
| `variables?` | `V` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса. Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера. В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean. Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в requiredFields, чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `paramOptions?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`V`\> | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

- Observable поток с результатом получения данных от сервера в формате объекта с одним ключом N (название операции), значение которого - непосредственно запрошенные данные
 в виде одиночного объекта либо массива.

___

### customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `paramOptions?`): `Observable`<`Record`<`N`, `T`\>\>

**`Method`**

customMutation$() для выполнения запросов типа "mutation" к серверу API GraphQL

**`See`**

**`Alias`**

ValuesOrBoolean<T>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Object` | Тип мутируемых данных, по которому построен объект |
| `N` | extends `string` | Строка-название операции из схемы сервера GraphQL. |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) | = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |  |
| `variables` | `V` | обязательный - объект с переменными, которые будут использованы в качестве параметров запроса. Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера. В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean. Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields, чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `paramOptions?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`V`\> | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

- Observable поток с результатом выполнения операции в формате объекта с одним ключом N (название операции), значение которого - непосредственно результат операции.

___

### customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

**`Method`**

customSubscribe$() для выполнения запросов типа "subscription" к серверу API GraphQL

**`See`**

 - 
 - this.queryAndSubscribe

**`Alias`**

ValuesOrBoolean<T>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Object` | Тип данных, на обновление которых производится подписка и по которому построен объект |
| `N` | extends `string` | Строка-название операции из схемы сервера GraphQL. |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) | = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |  |
| `variables?` | `V` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса. Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера. В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean. Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields, чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `paramOptions?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`V`\> | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |
| `extra?` | `ExtraSubscriptionOptions` | - |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

- Observable поток с данными типа T, которые будут поступать в рамках сделанной подписки.
ВАЖНО! В потоке будут поступать только обновления для данных, на которые сделана подписка.
Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
В ситуациях, где требуется получить некие данные и подписаться на обновления для них, также можно для удобства использовать метод queryAndSubscribe.

___

### queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `paramOptions?`): `Observable`<`T`[]\>

**`Method`**

queryAndSubscribe()
Метод, объединяющий получение неких первоначальных данных и подписку на их обновление.

**`See`**

**`Alias`**

ValuesOrBoolean<T>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `NQuery` | extends `string` |
| `NSubscribe` | extends `string` |
| `VQ` | extends `OperationVariables` = [`GQLRequestVariables`](../README.md#gqlrequestvariables) |
| `VS` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameQuery` | `NQuery` | название операции типа "query" - запроса данных, объвленное в схеме сервера GraphQL. |
| `nameSubscribe` | `NSubscribe` | название операции типа "subscription", объвленное в схеме сервера GraphQL для запрашиваемых данных. |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> | объект-источник информации о структуре запрашиваемых данных, на которые происходит подписка, реализующий интерфейс ValuesOrBoolean<T>. |
| `uniqueKeyForCompareItem` | keyof `T` | наименование ключа, значение которого является уникальным для запрашиваемых данных (например,'id'). Необходим для работы внутренней вспомогательной функции обновления изначального набора данных актуальными данными, поступившими в рамках подписки. |
| `variables?` | `Object` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса. Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера. В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean. Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields, чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `variables.query?` | `VQ` | - |
| `variables.subscribe?` | `VS` | - |
| `paramOptions?` | `Object` | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |
| `paramOptions.query?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`VQ`\> | - |
| `paramOptions.subscribe?` | [`QueryGenerationParam`](../interfaces/QueryGenerationParam.md)<`VS`\> | - |

#### Returns

`Observable`<`T`[]\>

- Observable поток с данными, которые будут поступать в рамках сделанной подписки.
Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка.
Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

## Properties

### rootGroups$

• **rootGroups$**: `Observable`<{ `concept`: `string` ; `groups`: [`PartialGroupNullable`](../README.md#partialgroupnullable)[]  }\>
