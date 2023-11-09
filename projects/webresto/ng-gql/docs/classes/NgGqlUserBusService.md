# Class: NgGqlUserBusService

Отсюда выполняются запросы к API через шину событий.
Сервис NgGqlUserService содержит методы для отправки событий каждого вида в отдельности,
используя для этого единственный универсальный метод сервиса NgGqlUserBusService.

## Table of contents

### Constructors

- [constructor](NgGqlUserBusService.md#constructor)

### Properties

- [userBus$](NgGqlUserBusService.md#userbus$)

### Methods

- [emitToBus](NgGqlUserBusService.md#emittobus)

## Constructors

### constructor

• **new NgGqlUserBusService**(`_requestService`, `_storage`, `_defaultActionFragments`, `_defaultMessageFragments`, `_defaultCaptchaGetJobFragments`, `_defaultUserFragments`, `_defaultOTPResponceFragments`): [`NgGqlUserBusService`](NgGqlUserBusService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_requestService` | [`RequestService`](RequestService.md) |
| `_storage` | [`NgGqlStoreService`](NgGqlStoreService.md) |
| `_defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`Action`](../interfaces/Action.md)\<`any`\>\> |
| `_defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`Message`](../interfaces/Message.md)\> |
| `_defaultCaptchaGetJobFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`User`](../interfaces/User.md)\> |
| `_defaultUserFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`User`](../interfaces/User.md)\> |
| `_defaultOTPResponceFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)\<[`OTPResponse`](../interfaces/OTPResponse.md)\> |

#### Returns

[`NgGqlUserBusService`](NgGqlUserBusService.md)

## Properties

### userBus$

• `Readonly` **userBus$**: `Observable`\<() => `void` \| () => `void`\>

## Methods

### emitToBus

▸ **emitToBus**\<`T`, `P`, `R`\>(`data`): `Promise`\<`R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`UserBusEventType`](../README.md#userbuseventtype) |
| `P` | extends ``null`` \| `string` \| [`CaptchaJobPayload`](../interfaces/CaptchaJobPayload.md) \| [`InputLocation`](../interfaces/InputLocation.md) \| [`RestorePasswordPayload`](../interfaces/RestorePasswordPayload.md) \| [`LoginPayload`](../README.md#loginpayload) \| [`RegistrationPayload`](../README.md#registrationpayload) \| [`UpdateUserDataPayload`](../README.md#updateuserdatapayload) \| [`OTPRequestPayload`](../interfaces/OTPRequestPayload.md) |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.type` | `T` |
| `data.payload` | `P` |
| `data.loading?` | `BehaviorSubject`\<`boolean`\> |

#### Returns

`Promise`\<`R`\>
