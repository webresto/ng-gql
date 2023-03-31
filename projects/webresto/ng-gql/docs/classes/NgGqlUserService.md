# Class: NgGqlUserService

## Table of contents

### Constructors

- [constructor](NgGqlUserService.md#constructor)

### Methods

- [loadUser$](NgGqlUserService.md#loaduser$)
- [updateStorageUser](NgGqlUserService.md#updatestorageuser)
- [loadUserOrderHistory$](NgGqlUserService.md#loaduserorderhistory$)
- [getUser$](NgGqlUserService.md#getuser$)
- [getToken$](NgGqlUserService.md#gettoken$)
- [addDishFavor](NgGqlUserService.md#adddishfavor)
- [updateUserData](NgGqlUserService.md#updateuserdata)
- [captchaGetJob](NgGqlUserService.md#captchagetjob)
- [getCaptchaSolution](NgGqlUserService.md#getcaptchasolution)
- [registrationApp](NgGqlUserService.md#registrationapp)
- [otpRequest](NgGqlUserService.md#otprequest)
- [login](NgGqlUserService.md#login)
- [restorePassword](NgGqlUserService.md#restorepassword)
- [logout$](NgGqlUserService.md#logout$)
- [userDelete$](NgGqlUserService.md#userdelete$)
- [locationCreate$](NgGqlUserService.md#locationcreate$)
- [locationDelete$](NgGqlUserService.md#locationdelete$)

## Constructors

### constructor

• **new NgGqlUserService**(`ngGqlService`, `ngGqlStorage`, `_userBus`, `defaultUserOrderHystoryFragments`, `defaultUserFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `ngGqlStorage` | [`NgGqlStorageService`](NgGqlStorageService.md) |
| `_userBus` | `NgGqlUserBusService` |
| `defaultUserOrderHystoryFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`UserOrderHystory`](../interfaces/UserOrderHystory.md)\> |
| `defaultUserFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`User`](../interfaces/User.md)\> |

## Methods

### loadUser$

▸ **loadUser$**(): `Observable`<``null`` \| [`User`](../interfaces/User.md)\>

#### Returns

`Observable`<``null`` \| [`User`](../interfaces/User.md)\>

___

### updateStorageUser

▸ **updateStorageUser**(`newUser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newUser` | ``null`` \| [`User`](../interfaces/User.md) |

#### Returns

`void`

___

### loadUserOrderHistory$

▸ **loadUserOrderHistory$**(`options`): `Observable`<[`UserOrderHystory`](../interfaces/UserOrderHystory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.skip` | `number` |
| `options.limit` | `number` |
| `options.sort` | `string` |

#### Returns

`Observable`<[`UserOrderHystory`](../interfaces/UserOrderHystory.md)[]\>

___

### getUser$

▸ **getUser$**(): `Observable`<``null`` \| [`User`](../interfaces/User.md)\>

#### Returns

`Observable`<``null`` \| [`User`](../interfaces/User.md)\>

___

### getToken$

▸ **getToken$**(): `Observable`<``null`` \| `string`\>

#### Returns

`Observable`<``null`` \| `string`\>

___

### addDishFavor

▸ **addDishFavor**(`dishId`, `loading?`): `Promise`<`boolean`\>

Добавляет блюдо в избранное

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishId` | `string` |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`boolean`\>

___

### updateUserData

▸ **updateUserData**(`data`, `loading?`): `Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

Добавляет блюдо в избранное

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`UpdateUserDataPayload`](../README.md#updateuserdatapayload) |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<[`UserResponse`](../interfaces/UserResponse.md)\>

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

### logout$

▸ **logout$**(`loading?`): `Promise`<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`Response`\>

___

### userDelete$

▸ **userDelete$**(`otp`, `loading?`): `Promise`<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `otp` | `string` |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`Response`\>

___

### locationCreate$

▸ **locationCreate$**(`location`, `loading?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`InputLocation`](../interfaces/InputLocation.md) |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`boolean`\>

___

### locationDelete$

▸ **locationDelete$**(`locationId`, `loading?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `locationId` | `string` |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`boolean`\>
