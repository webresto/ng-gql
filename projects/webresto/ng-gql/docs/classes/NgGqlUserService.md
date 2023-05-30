# Class: NgGqlUserService

## Table of contents

### Constructors

- [constructor](NgGqlUserService.md#constructor)

### Methods

- [updateStorageUser](NgGqlUserService.md#updatestorageuser)
- [loadUserOrderHistory$](NgGqlUserService.md#loaduserorderhistory$)
- [getUserLocations$](NgGqlUserService.md#getuserlocations$)
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
- [logout](NgGqlUserService.md#logout)
- [userDelete](NgGqlUserService.md#userdelete)
- [locationCreate](NgGqlUserService.md#locationcreate)
- [locationDelete](NgGqlUserService.md#locationdelete)
- [locationSetDefault](NgGqlUserService.md#locationsetdefault)

## Constructors

### constructor

• **new NgGqlUserService**(`requestService`, `ngGqlStorage`, `_userBus`, `defaultUserOrderHystoryFragments`, `defaultUserFragments`, `defaultuserLocationFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestService` | [`RequestService`](RequestService.md) |
| `ngGqlStorage` | [`NgGqlStorageService`](NgGqlStorageService.md) |
| `_userBus` | [`NgGqlUserBusService`](NgGqlUserBusService.md) |
| `defaultUserOrderHystoryFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`UserOrderHystory`](../interfaces/UserOrderHystory.md)\> |
| `defaultUserFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`User`](../interfaces/User.md)\> |
| `defaultuserLocationFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`UserLocation`](../README.md#userlocation)\> |

## Methods

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

#### Returns

`Observable`<[`UserOrderHystory`](../interfaces/UserOrderHystory.md)[]\>

___

### getUserLocations$

▸ **getUserLocations$**(`options`, `update?`): `Observable`<[`UserLocationResponse`](../interfaces/UserLocationResponse.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `Object` | `undefined` |
| `options.skip` | `number` | `undefined` |
| `options.limit` | `number` | `undefined` |
| `update` | `boolean` | `false` |

#### Returns

`Observable`<[`UserLocationResponse`](../interfaces/UserLocationResponse.md)\>

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

Обновление данных о пользователе

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

### logout

▸ **logout**(`loading?`): `Promise`<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`Response`\>

___

### userDelete

▸ **userDelete**(`otp`, `loading?`): `Promise`<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `otp` | `string` |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`Response`\>

___

### locationCreate

▸ **locationCreate**(`location`, `loading?`): `Promise`<`boolean`\>

Добавить адрес у пользователя

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`InputLocation`](../interfaces/InputLocation.md) |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`boolean`\>

___

### locationDelete

▸ **locationDelete**(`locationId`, `loading?`): `Promise`<`boolean`\>

Удалить сохраненный у пользователя адрес

#### Parameters

| Name | Type |
| :------ | :------ |
| `locationId` | `string` |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`boolean`\>

___

### locationSetDefault

▸ **locationSetDefault**(`locationId`, `loading?`): `Promise`<`boolean`\>

Установить адрес в качестве адреса по-умолчанию

#### Parameters

| Name | Type |
| :------ | :------ |
| `locationId` | `string` |
| `loading?` | `BehaviorSubject`<`boolean`\> |

#### Returns

`Promise`<`boolean`\>
