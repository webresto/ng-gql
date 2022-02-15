# Class: ApolloService

## Table of contents

### Constructors

- [constructor](./classes/ApolloService.md#constructor)

### Methods

- [watchQuery](./classes/ApolloService.md#watchquery)
- [query](./classes/ApolloService.md#query)
- [mutate](./classes/ApolloService.md#mutate)
- [subscribe](./classes/ApolloService.md#subscribe)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new ApolloService**(`apollo`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | `Apollo` |

## Methods

### <a id="watchquery" name="watchquery"></a> watchQuery

▸ **watchQuery**<`TData`, `TVariables`\>(`options`): `Observable`<`ApolloQueryResult`<`TData`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TData` | `TData` |
| `TVariables` | `EmptyObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `WatchQueryOptions`<`TVariables`, `TData`\> |

#### Returns

`Observable`<`ApolloQueryResult`<`TData`\>\>

___

### <a id="query" name="query"></a> query

▸ **query**<`T`, `V`\>(`options`): `Observable`<`ApolloQueryResult`<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `EmptyObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `QueryOptions`<`V`, `T`\> |

#### Returns

`Observable`<`ApolloQueryResult`<`T`\>\>

___

### <a id="mutate" name="mutate"></a> mutate

▸ **mutate**<`T`, `V`\>(`options`): `Observable`<`FetchResult`<`T`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `EmptyObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `MutationOptions`<`T`, `V`, `DefaultContext`, `ApolloCache`<`any`\>\> |

#### Returns

`Observable`<`FetchResult`<`T`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>\>\>

___

### <a id="subscribe" name="subscribe"></a> subscribe

▸ **subscribe**<`T`, `V`\>(`options`, `extra?`): `Observable`<`FetchResult`<`T`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `EmptyObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `SubscriptionOptions`<`V`, `T`\> |
| `extra?` | `ExtraSubscriptionOptions` |

#### Returns

`Observable`<`FetchResult`<`T`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>\>\>
