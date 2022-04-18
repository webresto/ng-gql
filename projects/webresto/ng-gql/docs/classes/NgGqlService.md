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
- [dishes$](NgGqlService.md#dishes$)

## Constructors

### constructor

• **new NgGqlService**(`apollo`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | [`ApolloService`](ApolloService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |

## Methods

### updateInitGroupSlug

▸ **updateInitGroupSlug**(`initGroupSlug`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `initGroupSlug` | `string` |

#### Returns

`void`

___

### getNavigation$

▸ **getNavigation$**<`T`\>(`options`): `Observable`<`T`[]\>

**`method`** getNavigation$
Используется для получения массива обьектов навигации для различных компонентов приложения.

**`see`** NavigationLoader<T>

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

**`method`** getNavigation$
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

**`method`** addAmountToDish
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

**`method`** isKnownPhone$
Проверяет переданный номер телефона на "знакомость".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phone` | [`Phone`](../interfaces/Phone.md) | Объект с данными номера телефона. |

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

**`method`** customQuery$ для выполнения запросов типа "query" к серверу API GraphQL

**`see`** ValuesOrBoolean<T>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | Тип запрашиваемых данных, по которому построен объект @see `queryObject`. |
| `N` | extends `string` | Строка-название операции из схемы сервера GraphQL. |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) | = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\>\> | объект-источник информации о структуре запрашиваемых данных.  Для совместимости может передаваться в виде:    1. Обьекта, реализующего тип ValuesOrBoolean<T>.    2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения. |
| `variables?` | `V` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в requiredFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

- Observable поток с результатом получения данных от сервера в формате объекта с одним ключом N (название операции), значение которого - непосредственно запрошенные данные
 в виде одиночного объекта либо массива.

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

___

### customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `paramOptions?`): `Observable`<`Record`<`N`, `T`\>\>

**`method`** customMutation$ для выполнения запросов типа "mutation" к серверу API GraphQL

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | Тип мутируемых данных, по которому построен объект @see `queryObject`. |
| `N` | extends `string` | Строка-название операции из схемы сервера GraphQL. |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) | = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> | объект-источник информации о структуре запрашиваемых данных.  Для совместимости может передаваться в виде:     1. Обьекта, реализующего тип ValuesOrBoolean<T>.     2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.     @see ValuesOrBoolean<T> |
| `variables` | `V` | обязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

- Observable поток с результатом выполнения операции в формате объекта с одним ключом N (название операции), значение которого - непосредственно результат операции.

___

### customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

**`method`** customSubscribe$ для выполнения запросов типа "subscription" к серверу API GraphQL

**`see`** queryAndSubscribe

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | Тип данных, на обновление которых производится подписка и по которому построен объект @see `queryObject`. |
| `N` | extends `string` | Строка-название операции из схемы сервера GraphQL. |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) | = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\>\> | объект-источник информации о структуре данных, на которые происходит подписка.   Для совместимости может передаваться в виде:     1. Обьекта, реализующего тип ValuesOrBoolean<T>.     2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.     @see ValuesOrBoolean<T> |
| `variables?` | `V` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |
| `extra?` | `ExtraSubscriptionOptions` | - |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

- Observable поток с данными типа T, которые будут поступать в рамках сделанной подписки.
ВАЖНО! В потоке будут поступать только обновления для данных, на которые сделана подписка.
Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
В ситуациях, где требуется получить некие данные и подписаться на обновления для них, также можно для удобства использовать метод queryAndSubscribe.

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`V`\> |
| `extra?` | `ExtraSubscriptionOptions` |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

___

### queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `paramOptions?`): `Observable`<`T`[]\>

**`method`** queryAndSubscribe
Метод, объединяющий получение неких первоначальных данных и подписку на их обновление.

**`see`** ValuesOrBoolean<T>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `NQuery` | extends `string` |
| `NSubscribe` | extends `string` |
| `VQ` | [`GQLRequestVariables`](../README.md#gqlrequestvariables) |
| `VS` | `VQ` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameQuery` | `NQuery` | название операции типа "query" - запроса данных, объвленное в схеме сервера GraphQL. |
| `nameSubscribe` | `NSubscribe` | название операции типа "subscription", объвленное в схеме сервера GraphQL  для запрашиваемых данных. |
| `queryObject` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\> | объект-источник информации о структуре запрашиваемых данных, на которые происходит подписка в виде обьекта, реализующего тип ValuesOrBoolean<T>. |
| `uniqueKeyForCompareItem` | keyof `T` | наименование ключа, значение которого является уникальным для запрашиваемых данных (например,'id'). Необходим для работы внутренней вспомогательной функции обновления изначального набора данных актуальными данными, поступившими в рамках подписки. |
| `variables?` | `VQ` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `paramOptions?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`VQ`\> | необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции. |

#### Returns

`Observable`<`T`[]\>

- Observable поток с данными, которые будут поступать в рамках сделанной подписки.
Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка.
Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).

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
| `paramOptions.query?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`VQ`\> |
| `paramOptions.subscribe?` | [`QueryGenerationParam`](../README.md#querygenerationparam)<`VS`\> |

#### Returns

`Observable`<`T`[]\>

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

## Properties

### rootGroups$

• **rootGroups$**: `Observable`<{ `slug`: `string` ; `id`: ``null`` \| `string`  }[]\>

___

### dishes$

• **dishes$**: `Observable`<[`Dish`](../interfaces/Dish.md)[]\>
