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

• **new NgGqlUserBusService**(`ngGqlService`, `ngGqlStorage`, `defaultActionFragments`, `defaultMessageFragments`, `defaultCaptchaGetJobFragments`, `defaultUserFragments`, `defaultOTPResponceFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `ngGqlStorage` | [`NgGqlStorageService`](NgGqlStorageService.md) |
| `defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Action`](../interfaces/Action.md)<`any`\>\> |
| `defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Message`](../interfaces/Message.md)\> |
| `defaultCaptchaGetJobFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`User`](../interfaces/User.md)\> |
| `defaultUserFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`User`](../interfaces/User.md)\> |
| `defaultOTPResponceFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`OTPResponse`](../interfaces/OTPResponse.md)\> |

## Properties

### userBus$

• `Readonly` **userBus$**: `Observable`<() => `void` \| () => `void`\>

## Methods

### emitToBus

▸ **emitToBus**<`T`, `P`, `R`\>(`data`): `Promise`<`R`\>

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
| `data.loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`R`\>
