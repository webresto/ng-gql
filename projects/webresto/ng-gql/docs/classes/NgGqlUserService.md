# Class: NgGqlUserService

## Table of contents

### Constructors

- [constructor](NgGqlUserService.md#constructor)

### Methods

- [registration](NgGqlUserService.md#registration)
- [otpRequest](NgGqlUserService.md#otprequest)
- [login](NgGqlUserService.md#login)
- [getUser](NgGqlUserService.md#getuser)
- [captchaGetJob](NgGqlUserService.md#captchagetjob)

## Constructors

### constructor

• **new NgGqlUserService**(`ngGqlService`, `ngGqlStorage`, `config`, `defaultActionFragments`, `defaultMessageFragments`, `defaultCaptchaGetJobFragments`, `defaultUserFragments`, `defaultOTPResponceFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `ngGqlStorage` | [`NgGqlStorageService`](NgGqlStorageService.md) |
| `config` | [`NgGqlConfig`](../interfaces/NgGqlConfig.md) |
| `defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Action`](../interfaces/Action.md)<`any`\>\> |
| `defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Message`](../interfaces/Message.md)\> |
| `defaultCaptchaGetJobFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`User`](../interfaces/User.md)\> |
| `defaultUserFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`User`](../interfaces/User.md)\> |
| `defaultOTPResponceFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`OTPResponse`](../interfaces/OTPResponse.md)\> |

## Methods

### registration

▸ **registration**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RegistrationPayload`](../README.md#registrationpayload) |

#### Returns

`void`

___

### otpRequest

▸ **otpRequest**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OTPRequestPayload`](../interfaces/OTPRequestPayload.md) |

#### Returns

`void`

___

### login

▸ **login**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`LoginPayload`](../interfaces/LoginPayload.md) |

#### Returns

`void`

___

### getUser

▸ **getUser**(`userId`): `Observable`<[`User`](../interfaces/User.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Observable`<[`User`](../interfaces/User.md)[]\>

___

### captchaGetJob

▸ **captchaGetJob**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

`void`
