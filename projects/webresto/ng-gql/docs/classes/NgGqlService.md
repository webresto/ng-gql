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
| `data` | [`AddToOrderInput`](../README.md#addtoorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### addToOrder

▸ **addToOrder**(`order`, `loading`, `dish`, `amount?`, `dishModifiers?`, `successCb?`, `errorCb?`): `void`

**`method`** addToOrder
Используется для отправки в шину события добавления блюда.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `order` | [`Order`](../interfaces/Order.md) | `undefined` | Заказ, с которым выполнется операция |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` | добавляемое блюдо |
| `amount` | `number` | `1` | количество |
| `dishModifiers` | [`Modifier`](../interfaces/Modifier.md)[] | `[]` | выбранные пользователем модификаторы блюда |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### removeFromOrder

▸ **removeFromOrder**(`loading`, `dish`, `amount?`, `orderDishId`, `order`, `successCb?`, `errorCb?`): `void`

**`method`** removeFromOrder
Используется для отправки в шину события удаления блюда из корзины

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](../interfaces/Dish.md) | `undefined` | добавляемое блюдо |
| `amount` | `number` | `1` | количество |
| `orderDishId` | `undefined` \| `number` | `undefined` | id блюда в корзине |
| `order` | [`Order`](../interfaces/Order.md) | `undefined` | Заказ, с которым выполнется операция |
| `successCb?` | (`order`: [`Order`](../interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### checkOrder

▸ **checkOrder**(`order`, `successCb?`, `errorCb?`): `void`

**`method`** checkOrder
Используется для отправки в шину события обязательной проверки заказа перед оформлением.
Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`OrderForm`](../README.md#orderform) | Проверяемый заказ |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### sendOrder

▸ **sendOrder**(`order`, `successCb?`, `errorCb?`): `void`

**`method`** sendOrder
Используется для отправки в шину события оформления заказа.
Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`OrderForm`](../README.md#orderform) | Оформляемый заказ |
| `successCb?` | (`order`: [`CheckResponse`](../interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### sendOrder$

▸ **sendOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../README.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

___

### checkOrder$

▸ **checkOrder$**(`data`): `Observable`<[`CheckResponse`](../interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](../README.md#orderinput) |

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
| `data` | [`RemoveFromOrderInput`](../README.md#removefromorderinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### setDishAmount$

▸ **setDishAmount$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishAmountInput`](../README.md#setdishamountinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### setDishComment$

▸ **setDishComment$**(`data`): `Observable`<[`Order`](../interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishCommentInput`](../README.md#setdishcommentinput) |

#### Returns

`Observable`<[`Order`](../interfaces/Order.md)\>

___

### customQuery$

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

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
| `variables?` | `V` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `optionalFields?` | keyof `V`[] | необязательный - массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип    (например у параметра указан тип String!, а не String). |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

- Observable поток с результатом получения данных от сервера в формате объекта с одним ключом N (название операции), значение которого - непосредственно запрошенные данные
 в виде одиночного объекта либо массива.

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

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
| `optionalFields?` | keyof `V`[] |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

___

### customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `optionalFields?`): `Observable`<`Record`<`N`, `T`\>\>

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
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`\>\> | объект-источник информации о структуре запрашиваемых данных.  Для совместимости может передаваться в виде:     1. Обьекта, реализующего тип ValuesOrBoolean<T>.     2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.     @see ValuesOrBoolean<T> |
| `variables` | `V` | обязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `optionalFields?` | keyof `V`[] | необязательный - массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип    (например у параметра указан тип String!, а не String). |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

- Observable поток с результатом выполнения операции в формате объекта с одним ключом N (название операции), значение которого - непосредственно результат операции.

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `optionalFields?`): `Observable`<`Record`<`N`, `T`\>\>

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
| `variables` | `V` |
| `optionalFields?` | keyof `V`[] |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

___

### customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

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
| `variables?` | `V` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `optionalFields?` | keyof `V`[] | необязательный - массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип    (например у параметра указан тип String!, а не String). |
| `extra?` | `ExtraSubscriptionOptions` | - |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

- Observable поток с данными типа T, которые будут поступать в рамках сделанной подписки.
Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка.
Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
В ситуациях, где требуется получить некие данные и подписаться на обновления для них, также можно для удобства использовать метод queryAndSubscribe.

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

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
| `optionalFields?` | keyof `V`[] |
| `extra?` | `ExtraSubscriptionOptions` |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

___

### queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `optionalFields?`): `Observable`<`T`[]\>

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
| `variables?` | `VQ` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `optionalFields?` | keyof `VQ`[] | необязательный - массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип    (например у параметра указан тип String!, а не String). |

#### Returns

`Observable`<`T`[]\>

- Observable поток с данными, которые будут поступать в рамках сделанной подписки.
Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка.
Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `optionalFields?`): `Observable`<`T`[]\>

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
| `optionalFields?` | `Object` |
| `optionalFields.query?` | keyof `VQ`[] |
| `optionalFields.subscribe?` | keyof `VS`[] |

#### Returns

`Observable`<`T`[]\>

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`
