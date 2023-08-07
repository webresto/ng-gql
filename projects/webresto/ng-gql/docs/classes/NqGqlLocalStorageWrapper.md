# Class: NqGqlLocalStorageWrapper

Класс, в который вынесена логика работы с хранилищем localStorage.
Ключевая необходимость использования этого класса вместо работы с хранилищем напрямую - методы StorageWrapper также инициируют отправку
браузерного события 'storage' в объекте window В ТЕКУЩЕЙ ВКЛАДКЕ БРАУЗЕРА.
Это важно, поскольку стандартные методы работы со Storage иницируют StorageEvent только для ДРУГИХ ВКЛАДОК браузера и не происходят в самой
вкладке, где произошли изменения.

## Table of contents

### Constructors

- [constructor](NqGqlLocalStorageWrapper.md#constructor)

### Properties

- [storageOrderIdToken$](NqGqlLocalStorageWrapper.md#storageorderidtoken$)

### Methods

- [setOrderId](NqGqlLocalStorageWrapper.md#setorderid)
- [removeOrderId](NqGqlLocalStorageWrapper.md#removeorderid)
- [setToStorage](NqGqlLocalStorageWrapper.md#settostorage)
- [removeFromStorage](NqGqlLocalStorageWrapper.md#removefromstorage)
- [startStorageEventFactory](NqGqlLocalStorageWrapper.md#startstorageeventfactory)
- [getOrderId](NqGqlLocalStorageWrapper.md#getorderid)
- [updateStorageOrderIdToken](NqGqlLocalStorageWrapper.md#updatestorageorderidtoken)
- [destroy](NqGqlLocalStorageWrapper.md#destroy)

## Constructors

### constructor

• **new NqGqlLocalStorageWrapper**(`config`, `orderIdFactoryFn`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `orderIdFactoryFn` | () => `string` |

## Properties

### storageOrderIdToken$

• **storageOrderIdToken$**: `Observable`<`string`\>

## Methods

### setOrderId

▸ **setOrderId**(`orderId`, `storageOrderIdToken?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderId` | `string` | id Заказа, который требуется сохранить в localStorage с ключом `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId'). Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp). Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся. Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней). |
| `storageOrderIdToken?` | `string` | необязательный альтернативный токен для сохранения orderId в localstorage. Также все последующие операции в localStorage данными заказа начнут использовать этот токен, т.к. обновится внутренняя подписка информации об используемом токене. |

#### Returns

`void`

**`Method`**

setOrderId()

___

### removeOrderId

▸ **removeOrderId**(`newOrderId?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newOrderId?` | `string` |

#### Returns

`void`

**`Method`**

removeOrderId()
Удаляет сохраненный в localStorage id заказа.

___

### setToStorage

▸ **setToStorage**(`key`, `orderId`, `emitEvent?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | ключ, с которым данные будут записаны в Storage |
| `orderId` | `string` | `undefined` | сохраняемое значение |
| `emitEvent` | `boolean` | `true` | требуется ли создавать StorageEvent для подписчиков об изменении значения |

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

▸ **getOrderId**(`storageOrderIdToken`, `storageOrderId?`, `generateNew?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `storageOrderIdToken` | `string` | `undefined` |
| `storageOrderId?` | `string` | `undefined` |
| `generateNew` | `boolean` | `false` |

#### Returns

`string`

Возвращает orderId, сохраненный ранее в localStorage с ключом  `NgGqlConfig.orderIdStorageToken` (по умолчанию -'${ window.location.host }-orderId').
Id хранится в виде обьекта, содержащего помимо савмого id также временную метку создания записи (в виде unix-timestamp).
Старые orderId не используются - метод вернет `undefined`, в API будет запрошен новый заказ, а данные в localStorage обновятся.
Значение считается устаревшим, если с момента его добавления прошло больше времени, чем указано в `NgGqlConfig.obsolescence` (по умолчанию - 14 дней).

**`Method`**

getOrderId()

___

### updateStorageOrderIdToken

▸ **updateStorageOrderIdToken**(`newToken`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newToken` | `string` |

#### Returns

`void`

**`Method`**

updateStorageOrderIdToken()
Реализация "мульткорзины".
Предназначен для переключения между корзинами, каждая из которых хранятся в localStorage со своим токеном.
Предназначен для переключения потоков с

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`
