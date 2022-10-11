# Class: StorageWrapper

Класс, в который вынесена логика работы с хранилищем localStorage.
Ключевая необходимость использования этого класса вместо работы с хранилищем напрямую - методы StorageWrapper также инициируют отправку
браузерного события 'storage' в объекте window В ТЕКУЩЕЙ ВКЛАДКЕ БРАУЗЕРА.
Это важно, поскольку стандартные методы работы со Storage иницируют StorageEvent только для ДРУГИХ ВКЛАДОК браузера и не происходят в самой
вкладке, где произошли изменения.

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

**`Method`**

setOrderId()

**`Interface`**

`NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `string` | id Заказа, который требуется сохранить в localStorage с ключом |
| `storageOrderIdToken?` | `string` | необязательный альтернативный токен для сохранения orderId в localstorage.  Также все последующие операции в localStorage данными заказа начнут использовать этот токен, т.к. обновится внутренняя подписка информации об используемом токене. |

#### Returns

`void`

___

### removeOrderId

▸ **removeOrderId**(`newOrderId?`): `void`

**`Method`**

removeOrderId()
Удаляет сохраненный в localStorage id заказа.

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

**`Method`**

getOrderId()

**`Interface`**

`NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageOrderIdToken` | `string` |
| `storageOrderId?` | `string` |

#### Returns

`undefined` \| `string`

Возвращает orderId, сохраненный ранее в localStorage с ключом

___

### updateStorageOrderIdToken

▸ **updateStorageOrderIdToken**(`newToken`): `void`

**`Method`**

updateStorageOrderIdToken()
Реализация "мульткорзины".
Предназначен для переключения между корзинами, каждая из которых хранятся в localStorage со своим токеном.
Предназначен для переключения потоков с

#### Parameters

| Name | Type |
| :------ | :------ |
| `newToken` | `string` |

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
