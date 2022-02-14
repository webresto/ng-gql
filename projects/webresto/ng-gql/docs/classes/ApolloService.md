[@webresto/ng-gql - v1.1.12](../README.md) / [Exports](../modules.md) / ApolloService

# Class: ApolloService

## Table of contents

### Constructors

- [constructor](ApolloService.md#constructor)

### Methods

- [watchQuery](ApolloService.md#watchquery)
- [query](ApolloService.md#query)
- [mutate](ApolloService.md#mutate)
- [subscribe](ApolloService.md#subscribe)

## Constructors

### constructor

• **new ApolloService**(`apollo`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | `Apollo` |

## Methods

### watchQuery

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

### query

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

### mutate

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

### subscribe

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
