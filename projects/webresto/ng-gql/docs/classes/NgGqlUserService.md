# Class: NgGqlUserService

## Table of contents

### Constructors

- [constructor](NgGqlUserService.md#constructor)

### Methods

- [registration](NgGqlUserService.md#registration)

## Constructors

### constructor

• **new NgGqlUserService**(`ngGqlService`, `ngGqlStorage`, `defaultActionFragments`, `defaultMessageFragments`, `defaultUserFragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGqlService` | [`NgGqlService`](NgGqlService.md) |
| `ngGqlStorage` | [`NgGqlStorageService`](NgGqlStorageService.md) |
| `defaultActionFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Action`](../interfaces/Action.md)<`any`\>\> |
| `defaultMessageFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`Message`](../interfaces/Message.md)\> |
| `defaultUserFragments` | [`ValuesOrBoolean`](../README.md#valuesorboolean)<[`User`](../interfaces/User.md)\> |

## Methods

### registration

▸ **registration**(`data`): `Observable`<`Record`<``"registration"``, [`RegistrationUserResponse`](../interfaces/RegistrationUserResponse.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RegistrationPayload`](../interfaces/RegistrationPayload.md) |

#### Returns

`Observable`<`Record`<``"registration"``, [`RegistrationUserResponse`](../interfaces/RegistrationUserResponse.md)\>\>
