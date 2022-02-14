[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / ApolloService

# Class: ApolloService

## Table of contents

### Constructors

- [constructor](ApolloService.md#constructor)

### Methods

- [mutate](ApolloService.md#mutate)
- [query](ApolloService.md#query)
- [subscribe](ApolloService.md#subscribe)
- [watchQuery](ApolloService.md#watchquery)

## Constructors

### constructor

• **new ApolloService**(`apollo`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apollo` | `Apollo` |

#### Defined in

lib/services/apollo.service.ts:12

## Methods

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

#### Defined in

lib/services/apollo.service.ts:32

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

#### Defined in

lib/services/apollo.service.ts:23

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

#### Defined in

lib/services/apollo.service.ts:41

___

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

#### Defined in

lib/services/apollo.service.ts:14
