# Class: StorageWrapper

## Table of contents

### Constructors

- [constructor](StorageWrapper.md#constructor)

### Methods

- [setOrderId](StorageWrapper.md#setorderid)
- [removeOrderId](StorageWrapper.md#removeorderid)
- [setToStorage](StorageWrapper.md#settostorage)
- [removeFromStorage](StorageWrapper.md#removefromstorage)
- [startStorageEventFactory](StorageWrapper.md#startstorageeventfactory)
- [getOrderId](StorageWrapper.md#getorderid)
- [updateStorageOrderIdToken](StorageWrapper.md#updatestorageorderidtoken)
- [destroy](StorageWrapper.md#destroy)

### Properties

- [storageOrderIdToken$](StorageWrapper.md#storageorderidtoken$)

## Constructors

### constructor

• **new StorageWrapper**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |

## Methods

### setOrderId

▸ **setOrderId**(`orderId`, `storageOrderIdToken?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `string` |  |
| `storageOrderIdToken?` | `string` |  |

#### Returns

`void`

___

### removeOrderId

▸ **removeOrderId**(`newOrderId?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newOrderId?` | `string` |

#### Returns

`void`

___

### setToStorage

▸ **setToStorage**(`key`, `orderId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `orderId` | `string` |

#### Returns

`void`

___

### removeFromStorage

▸ **removeFromStorage**(`key`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`void`

___

### startStorageEventFactory

▸ **startStorageEventFactory**(`key`): `StorageEvent`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`StorageEvent`

___

### getOrderId

▸ **getOrderId**(`storageOrderIdToken`, `storageOrderId?`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageOrderIdToken` | `string` |
| `storageOrderId?` | `string` |

#### Returns

`undefined` \| `string`

___

### updateStorageOrderIdToken

▸ **updateStorageOrderIdToken**(`newToken`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newToken` | `string` |  |

#### Returns

`void`

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

## Properties

### storageOrderIdToken$

• **storageOrderIdToken$**: `Observable`<`string`\>
