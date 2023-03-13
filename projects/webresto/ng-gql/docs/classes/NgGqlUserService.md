# Class: NgGqlUserService

## Table of contents

### Constructors

- [constructor](NgGqlUserService.md#constructor)

### Methods

- [registrationApp$](NgGqlUserService.md#registrationapp$)
- [registrationApp](NgGqlUserService.md#registrationapp)
- [otpRequest$](NgGqlUserService.md#otprequest$)
- [otpRequest](NgGqlUserService.md#otprequest)
- [login$](NgGqlUserService.md#login$)
- [login](NgGqlUserService.md#login)
- [restorePassword$](NgGqlUserService.md#restorepassword$)
- [restorePassword](NgGqlUserService.md#restorepassword)
- [getUser$](NgGqlUserService.md#getuser$)
- [captchaGetJob$](NgGqlUserService.md#captchagetjob$)
- [captchaGetJob](NgGqlUserService.md#captchagetjob)
- [getCaptchaSolution](NgGqlUserService.md#getcaptchasolution)

### Properties

- [userBus$](NgGqlUserService.md#userbus$)

## Constructors

### constructor

• **new NgGqlUserService**(`ngGqlService`, `ngGqlStorage`, `defaultActionFragments`, `defaultMessageFragments`, `defaultCaptchaGetJobFragments`, `defaultUserFragments`, `defaultOTPResponceFragments`)

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

## Methods

### registrationApp$

▸ **registrationApp$**(`data`): `Observable`<[`UserResponse`](../interfaces/UserResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RegistrationPayload`](../README.md#registrationpayload) |

#### Returns

`Observable`<[`UserResponse`](../interfaces/UserResponse.md)\>

___

### registrationApp

▸ **registrationApp**(`data`, `loading?`): `Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RegistrationPayload`](../README.md#registrationpayload) |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

___

### otpRequest$

▸ **otpRequest$**(`data`): `Observable`<[`OTPResponse`](../interfaces/OTPResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OTPRequestPayload`](../interfaces/OTPRequestPayload.md) |

#### Returns

`Observable`<[`OTPResponse`](../interfaces/OTPResponse.md)\>

___

### otpRequest

▸ **otpRequest**(`data`, `loading?`): `Promise`<[`OTPResponse`](../interfaces/OTPResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OTPRequestPayload`](../interfaces/OTPRequestPayload.md) |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<[`OTPResponse`](../interfaces/OTPResponse.md)\>

___

### login$

▸ **login$**(`data`): `Observable`<[`UserResponse`](../interfaces/UserResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`LoginPayload`](../README.md#loginpayload) |

#### Returns

`Observable`<[`UserResponse`](../interfaces/UserResponse.md)\>

___

### login

▸ **login**(`data`, `loading?`): `Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`LoginPayload`](../README.md#loginpayload) |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

___

### restorePassword$

▸ **restorePassword$**(`data`): `Observable`<[`UserResponse`](../interfaces/UserResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RestorePasswordPayload`](../interfaces/RestorePasswordPayload.md) |

#### Returns

`Observable`<[`UserResponse`](../interfaces/UserResponse.md)\>

___

### restorePassword

▸ **restorePassword**(`data`, `loading?`): `Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RestorePasswordPayload`](../interfaces/RestorePasswordPayload.md) |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

___

### getUser$

▸ **getUser$**(`userId`): `Observable`<[`User`](../interfaces/User.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Observable`<[`User`](../interfaces/User.md)[]\>

___

### captchaGetJob$

▸ **captchaGetJob$**<`T`\>(`data`): `Observable`<[`CaptchaJob`](../interfaces/CaptchaJob.md)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`CaptchaTask`](../interfaces/CaptchaTask.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CaptchaJobPayload`](../interfaces/CaptchaJobPayload.md) |

#### Returns

`Observable`<[`CaptchaJob`](../interfaces/CaptchaJob.md)<`T`\>\>

___

### captchaGetJob

▸ **captchaGetJob**<`T`\>(`label`, `loading?`): `Promise`<[`CaptchaJob`](../interfaces/CaptchaJob.md)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`CaptchaTask`](../interfaces/CaptchaTask.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<[`CaptchaJob`](../interfaces/CaptchaJob.md)<`T`\>\>

___

### getCaptchaSolution

▸ **getCaptchaSolution**(`task`): `Promise`<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`CaptchaTask`](../interfaces/CaptchaTask.md) |

#### Returns

`Promise`<`bigint`\>

## Properties

### userBus$

• **userBus$**: `Observable`<`void` \| () => `void`\>
