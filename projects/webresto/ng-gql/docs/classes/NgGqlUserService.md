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
- [getCaptchaSolution](NgGqlUserService.md#getcaptchasolution)

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

▸ **registration**(`data`, `successCb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RegistrationPayload`](../README.md#registrationpayload) |
| `successCb?` | (`result`: `Record`<``"registration"``, [`RegistrationUserResponse`](../interfaces/RegistrationUserResponse.md)\>) => `void` |

#### Returns

`void`

___

### otpRequest

▸ **otpRequest**(`data`, `successCb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OTPRequestPayload`](../interfaces/OTPRequestPayload.md) |
| `successCb?` | (`result`: `Record`<``"OTPRequest"``, [`OTPResponse`](../interfaces/OTPResponse.md)\>) => `void` |

#### Returns

`void`

___

### login

▸ **login**(`data`, `successCb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`LoginPayload`](../interfaces/LoginPayload.md) |
| `successCb?` | (`result`: `Record`<``"login"``, [`RegistrationUserResponse`](../interfaces/RegistrationUserResponse.md)\>) => `void` |

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

▸ **captchaGetJob**<`T`\>(`label`, `successCb?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`CaptchaTask`](../interfaces/CaptchaTask.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `successCb?` | (`result`: `Record`<``"captchaGetJob"``, [`CaptchaJob`](../interfaces/CaptchaJob.md)<`T`\>\>) => `void` |

#### Returns

`void`

___

### getCaptchaSolution

▸ **getCaptchaSolution**(`task`): `Promise`<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`CaptchaTask`](../interfaces/CaptchaTask.md) |

#### Returns

`Promise`<`bigint`\>
