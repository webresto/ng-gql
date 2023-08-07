# Class: RequestService

## Table of contents

### Constructors

- [constructor](RequestService.md#constructor)

### Methods

- [emitMessageEvent](RequestService.md#emitmessageevent)
- [emitActionEvent](RequestService.md#emitactionevent)
- [getMessageEmitter](RequestService.md#getmessageemitter)
- [getActionEmitter](RequestService.md#getactionemitter)
- [customQuery$](RequestService.md#customquery$)
- [customMutation$](RequestService.md#custommutation$)
- [customSubscribe$](RequestService.md#customsubscribe$)
- [queryAndSubscribe](RequestService.md#queryandsubscribe)

## Constructors

### constructor

• **new RequestService**(`apollo`, `defaultActionFragments`, `defaultMessageFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | [`ApolloService`](ApolloService.md) |
| `defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Action`](../interfaces/Action.md)<`any`\>\> |
| `defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Message`](../interfaces/Message.md)\> |

## Methods

### emitMessageEvent

▸ **emitMessageEvent**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Partial`<[`Message`](../interfaces/Message.md)\> |

#### Returns

`void`

___

### emitActionEvent

▸ **emitActionEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `Partial`<[`Action`](../interfaces/Action.md)<`any`\>\> |

#### Returns

`void`

___

### getMessageEmitter

▸ **getMessageEmitter**(): `Observable`<[`Message`](../interfaces/Message.md) \| `Partial`<[`Message`](../interfaces/Message.md)\>\>

#### Returns

`Observable`<[`Message`](../interfaces/Message.md) \| `Partial`<[`Message`](../interfaces/Message.md)\>\>

___

### getActionEmitter

▸ **getActionEmitter**(): `Observable`<[`Action`](../interfaces/Action.md)<`any`\> \| `Partial`<[`Action`](../interfaces/Action.md)<`any`\>\>\>

#### Returns

`Observable`<[`Action`](../interfaces/Action.md)<`any`\> \| `Partial`<[`Action`](../interfaces/Action.md)<`any`\>\>\>

___

### customQuery$

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

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

**`Method`**

customQuery$() для выполнения запросов типа "query" к серверу API GraphQL

**`See`**

**`Alias`**

ValuesOrBoolean<T>

___

### customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `paramOptions?`): `Observable`<`Record`<`N`, `T`\>\>

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

**`Method`**

customMutation$() для выполнения запросов типа "mutation" к серверу API GraphQL

**`See`**

**`Alias`**

ValuesOrBoolean<T>

___

### customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `paramOptions?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

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

**`Method`**

customSubscribe$() для выполнения запросов типа "subscription" к серверу API GraphQL

**`See`**

 - 
 - this.queryAndSubscribe

**`Alias`**

ValuesOrBoolean<T>

___

### queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `paramOptions?`): `Observable`<`T`[]\>

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

**`Method`**

queryAndSubscribe()
Метод, объединяющий получение неких первоначальных данных и подписку на их обновление.

**`See`**

**`Alias`**

ValuesOrBoolean<T>
