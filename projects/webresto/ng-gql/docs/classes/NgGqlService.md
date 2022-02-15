# Class: NgGqlService

## Table of contents

### Constructors

- [constructor](./classes/NgGqlService.md#constructor)

### Properties

- [customFields](./classes/NgGqlService.md#customfields)
- [rootGroups$](./classes/NgGqlService.md#rootgroups$)
- [order$](./classes/NgGqlService.md#order$)
- [actions$](./classes/NgGqlService.md#actions$)
- [messages$](./classes/NgGqlService.md#messages$)
- [orderBus$](./classes/NgGqlService.md#orderbus$)

### Methods

- [addCustomField](./classes/NgGqlService.md#addcustomfield)
- [getNavigation$](./classes/NgGqlService.md#getnavigation$)
- [getMenu$](./classes/NgGqlService.md#getmenu$)
- [getDishes$](./classes/NgGqlService.md#getdishes$)
- [getOrder](./classes/NgGqlService.md#getorder)
- [loadOrderAsCart$](./classes/NgGqlService.md#loadorderascart$)
- [getPhone$](./classes/NgGqlService.md#getphone$)
- [checkPhone$](./classes/NgGqlService.md#checkphone$)
- [getPaymentMethods$](./classes/NgGqlService.md#getpaymentmethods$)
- [addDishToOrder$](./classes/NgGqlService.md#adddishtoorder$)
- [addToOrder](./classes/NgGqlService.md#addtoorder)
- [removeFromOrder](./classes/NgGqlService.md#removefromorder)
- [checkOrder](./classes/NgGqlService.md#checkorder)
- [sendOrder](./classes/NgGqlService.md#sendorder)
- [sendOrder$](./classes/NgGqlService.md#sendorder$)
- [checkOrder$](./classes/NgGqlService.md#checkorder$)
- [checkPhoneCode$](./classes/NgGqlService.md#checkphonecode$)
- [removeDishFromOrder$](./classes/NgGqlService.md#removedishfromorder$)
- [setDishAmount$](./classes/NgGqlService.md#setdishamount$)
- [setDishComment$](./classes/NgGqlService.md#setdishcomment$)
- [customQuery$](./classes/NgGqlService.md#customquery$)
- [customMutation$](./classes/NgGqlService.md#custommutation$)
- [customSubscribe$](./classes/NgGqlService.md#customsubscribe$)
- [queryAndSubscribe](./classes/NgGqlService.md#queryandsubscribe)
- [destroy](./classes/NgGqlService.md#destroy)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new NgGqlService**(`apollo`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | [`ApolloService`](./classes/ApolloService.md) |
| `config` | [`NgGqlConfig`](./interfaces/NgGqlConfig.md) |

## Properties

### <a id="customfields" name="customfields"></a> customFields

• **customFields**: `Object` = `{}`

#### Index signature

▪ [modelName: `string`]: `string`[]

___

### <a id="rootgroups$" name="rootgroups$"></a> rootGroups$

• **rootGroups$**: `Observable`<{ `slug`: `string` ; `id`: ``null`` \| `string`  }[]\>

___

### <a id="order$" name="order$"></a> order$

• **order$**: `Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="actions$" name="actions$"></a> actions$

• **actions$**: `Observable`<[`Action`](./interfaces/Action.md)\>

___

### <a id="messages$" name="messages$"></a> messages$

• **messages$**: `Observable`<[`Message`](./interfaces/Message.md)\>

___

### <a id="orderbus$" name="orderbus$"></a> orderBus$

• **orderBus$**: `Observable`<`void` \| () => `void`\>

## Methods

### <a id="addcustomfield" name="addcustomfield"></a> addCustomField

▸ **addCustomField**(`modelName`, `field`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `field` | `string` |

#### Returns

`void`

___

### <a id="getnavigation$" name="getnavigation$"></a> getNavigation$

▸ **getNavigation$**(): `Observable`<[`Navigation`](./interfaces/Navigation.md)[]\>

#### Returns

`Observable`<[`Navigation`](./interfaces/Navigation.md)[]\>

___

### <a id="getmenu$" name="getmenu$"></a> getMenu$

▸ **getMenu$**(`slug`): `Observable`<``null`` \| [`Group`](./interfaces/Group.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `slug` | `undefined` \| `string` \| `string`[] |

#### Returns

`Observable`<``null`` \| [`Group`](./interfaces/Group.md)[]\>

___

### <a id="getdishes$" name="getdishes$"></a> getDishes$

▸ **getDishes$**(`id?`): `Observable`<[`Dish`](./interfaces/Dish.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` \| `string`[] |

#### Returns

`Observable`<[`Dish`](./interfaces/Dish.md)[]\>

___

### <a id="getorder" name="getorder"></a> getOrder

▸ **getOrder**(`orderId`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="loadorderascart$" name="loadorderascart$"></a> loadOrderAsCart$

▸ **loadOrderAsCart$**(`orderId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `undefined` \| `string` |

#### Returns

`void`

___

### <a id="getphone$" name="getphone$"></a> getPhone$

▸ **getPhone$**(`phone`): `Observable`<[`Phone`](./interfaces/Phone.md) \| [`Phone`](./interfaces/Phone.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |

#### Returns

`Observable`<[`Phone`](./interfaces/Phone.md) \| [`Phone`](./interfaces/Phone.md)[]\>

___

### <a id="checkphone$" name="checkphone$"></a> checkPhone$

▸ **checkPhone$**(`phone`): `Observable`<[`CheckPhoneResponse`](./interfaces/CheckPhoneResponse.md) \| [`CheckPhoneResponse`](./interfaces/CheckPhoneResponse.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phone` | `string` |

#### Returns

`Observable`<[`CheckPhoneResponse`](./interfaces/CheckPhoneResponse.md) \| [`CheckPhoneResponse`](./interfaces/CheckPhoneResponse.md)[]\>

___

### <a id="getpaymentmethods$" name="getpaymentmethods$"></a> getPaymentMethods$

▸ **getPaymentMethods$**(`orderId`): `Observable`<[`PaymentMethod`](./interfaces/PaymentMethod.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`Observable`<[`PaymentMethod`](./interfaces/PaymentMethod.md)[]\>

___

### <a id="adddishtoorder$" name="adddishtoorder$"></a> addDishToOrder$

▸ **addDishToOrder$**(`data`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddToOrderInput`](./modules.md#addtoorderinput) |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="addtoorder" name="addtoorder"></a> addToOrder

▸ **addToOrder**(`order`, `loading`, `dish`, `amount?`, `dishModifiers?`, `successCb?`, `errorCb?`): `void`

**`method`** addToOrder
Используется для отправки в шину события добавления блюда.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `order` | [`Order`](./interfaces/Order.md) | `undefined` | Заказ, с которым выполнется операция |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](./interfaces/Dish.md) | `undefined` | добавляемое блюдо |
| `amount` | `number` | `1` | количество |
| `dishModifiers` | [`Modifier`](./interfaces/Modifier.md)[] | `[]` | выбранные пользователем модификаторы блюда |
| `successCb?` | (`order`: [`Order`](./interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### <a id="removefromorder" name="removefromorder"></a> removeFromOrder

▸ **removeFromOrder**(`loading`, `dish`, `amount?`, `orderDishId`, `order`, `successCb?`, `errorCb?`): `void`

**`method`** removeFromOrder
Используется для отправки в шину события удаления блюда из корзины

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loading` | `BehaviorSubject`<`boolean`\> | `undefined` | BehaviorSubject блюда, отслеживающий состояние выполняемого действия. |
| `dish` | [`Dish`](./interfaces/Dish.md) | `undefined` | добавляемое блюдо |
| `amount` | `number` | `1` | количество |
| `orderDishId` | `undefined` \| `number` | `undefined` | id блюда в корзине |
| `order` | [`Order`](./interfaces/Order.md) | `undefined` | Заказ, с которым выполнется операция |
| `successCb?` | (`order`: [`Order`](./interfaces/Order.md)) => `void` | `undefined` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | `undefined` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### <a id="checkorder" name="checkorder"></a> checkOrder

▸ **checkOrder**(`order`, `successCb?`, `errorCb?`): `void`

**`method`** checkOrder
Используется для отправки в шину события обязательной проверки заказа перед оформлением.
Метод необходимо вызывать после того, как пользователь полностью заполнил в заказе все необходимые данные и далее после каждого вносимого в форму изменения, при условии, что в форме все необходимые данные заполнены.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`OrderForm`](./modules.md#orderform) | Проверяемый заказ |
| `successCb?` | (`order`: [`CheckResponse`](./interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### <a id="sendorder" name="sendorder"></a> sendOrder

▸ **sendOrder**(`order`, `successCb?`, `errorCb?`): `void`

**`method`** sendOrder
Используется для отправки в шину события оформления заказа.
Метод необходимо вызывать только после успешной предварительной проверки заказа в методе checkOrder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`OrderForm`](./modules.md#orderform) | Оформляемый заказ |
| `successCb?` | (`order`: [`CheckResponse`](./interfaces/CheckResponse.md)) => `void` | -Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

#### Returns

`void`

___

### <a id="sendorder$" name="sendorder$"></a> sendOrder$

▸ **sendOrder$**(`data`): `Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](./modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

___

### <a id="checkorder$" name="checkorder$"></a> checkOrder$

▸ **checkOrder$**(`data`): `Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OrderInput`](./modules.md#orderinput) |

#### Returns

`Observable`<[`CheckResponse`](./interfaces/CheckResponse.md)\>

___

### <a id="checkphonecode$" name="checkphonecode$"></a> checkPhoneCode$

▸ **checkPhoneCode$**(`data`): `Observable`<[`CheckPhoneResponse`](./interfaces/CheckPhoneResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CheckPhoneCodeInput`](./interfaces/CheckPhoneCodeInput.md) |

#### Returns

`Observable`<[`CheckPhoneResponse`](./interfaces/CheckPhoneResponse.md)\>

___

### <a id="removedishfromorder$" name="removedishfromorder$"></a> removeDishFromOrder$

▸ **removeDishFromOrder$**(`data`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RemoveFromOrderInput`](./modules.md#removefromorderinput) |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="setdishamount$" name="setdishamount$"></a> setDishAmount$

▸ **setDishAmount$**(`data`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishAmountInput`](./modules.md#setdishamountinput) |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="setdishcomment$" name="setdishcomment$"></a> setDishComment$

▸ **setDishComment$**(`data`): `Observable`<[`Order`](./interfaces/Order.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SetDishCommentInput`](./modules.md#setdishcommentinput) |

#### Returns

`Observable`<[`Order`](./interfaces/Order.md)\>

___

### <a id="customquery$" name="customquery$"></a> customQuery$

▸ **customQuery$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`): `Observable`<`Record`<`N`, `T` \| `T`[]\>\>

**`method`** customQuery$ для выполнения запросов типа "query" к серверу API GraphQL

**`see`** ValuesOrBoolean<T>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\>\> | объект-источник информации о структуре запрашиваемых данных.  Для совместимости может передаваться в виде:    1. Обьекта, реализующего тип ValuesOrBoolean<T>.    2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения. |
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
| `V` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `optionalFields?` | keyof `V`[] |

#### Returns

`Observable`<`Record`<`N`, `T` \| `T`[]\>\>

___

### <a id="custommutation$" name="custommutation$"></a> customMutation$

▸ **customMutation$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables`, `optionalFields?`): `Observable`<`Record`<`N`, `T`\>\>

**`method`** customMutation$ для выполнения запросов типа "mutation" к серверу API GraphQL

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\>\> | объект-источник информации о структуре запрашиваемых данных.  Для совместимости может передаваться в виде:     1. Обьекта, реализующего тип ValuesOrBoolean<T>.     2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.     @see ValuesOrBoolean<T> |
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
| `V` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\> |
| `variables` | `V` |
| `optionalFields?` | keyof `V`[] |

#### Returns

`Observable`<`Record`<`N`, `T`\>\>

___

### <a id="customsubscribe$" name="customsubscribe$"></a> customSubscribe$

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

**`method`** customSubscribe$ для выполнения запросов типа "subscription" к серверу API GraphQL

**`see`** queryAndSubscribe

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `queryObject` | `Record`<`N`, [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\>\> | объект-источник информации о структуре данных, на которые происходит подписка.   Для совместимости может передаваться в виде:     1. Обьекта, реализующего тип ValuesOrBoolean<T>.     2. Обьекта с ключом, соответствующим названию выполняемой операции N и объектом, реализующим тип ValuesOrBoolean<T>, в качестве значения.     @see ValuesOrBoolean<T> |
| `variables?` | `V` | необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в optionalFields,  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса. |
| `optionalFields?` | keyof `V`[] | необязательный - массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип    (например у параметра указан тип String!, а не String). |
| `extra?` | `ExtraSubscriptionOptions` | - |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

- Observable поток с данными, которые будут поступать в рамках сделанной подписки.
Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка.
Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
В ситуациях, где требуется получить некие данные и подписаться на обновления для них, также можно для удобства использовать метод queryAndSubscribe.

▸ **customSubscribe$**<`T`, `N`, `V`\>(`name`, `queryObject`, `variables?`, `optionalFields?`, `extra?`): `Observable`<`Record`<`N`, `T`\>[`N`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `queryObject` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\> |
| `variables?` | `V` |
| `optionalFields?` | keyof `V`[] |
| `extra?` | `ExtraSubscriptionOptions` |

#### Returns

`Observable`<`Record`<`N`, `T`\>[`N`]\>

___

### <a id="queryandsubscribe" name="queryandsubscribe"></a> queryAndSubscribe

▸ **queryAndSubscribe**<`T`, `NQuery`, `NSubscribe`, `VQ`, `VS`\>(`nameQuery`, `nameSubscribe`, `queryObject`, `uniqueKeyForCompareItem`, `variables?`, `optionalFields?`): `Observable`<`T`[]\>

**`method`** queryAndSubscribe
Метод, объединяющий получение неких первоначальных данных и подписку на их обнровление.

**`see`** ValuesOrBoolean<T>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `NQuery` | extends `string` |
| `NSubscribe` | extends `string` |
| `VQ` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |
| `VS` | `VQ` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameQuery` | `NQuery` | название операции типа "query" - запроса данных, объвленное в схеме сервера GraphQL. |
| `nameSubscribe` | `NSubscribe` | название операции типа "subscription", объвленное в схеме сервера GraphQL  для запрашиваемых данных. |
| `queryObject` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\> | объект-источник информации о структуре запрашиваемых данных, на которые происходит подписка в виде обьекта, реализующего тип ValuesOrBoolean<T>. |
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
| `VQ` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |
| `VS` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameQuery` | `NQuery` |
| `nameSubscribe` | `NSubscribe` |
| `queryObject` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<`T`\> |
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

### <a id="destroy" name="destroy"></a> destroy

▸ **destroy**(): `void`

#### Returns

`void`
