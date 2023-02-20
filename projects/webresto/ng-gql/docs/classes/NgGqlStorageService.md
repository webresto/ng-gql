# Class: NgGqlStorageService

## Table of contents

### Constructors

- [constructor](NgGqlStorageService.md#constructor)

### Properties

- [order](NgGqlStorageService.md#order)
- [dishes](NgGqlStorageService.md#dishes)
- [menu](NgGqlStorageService.md#menu)
- [navigation](NgGqlStorageService.md#navigation)
- [paymentMethods](NgGqlStorageService.md#paymentmethods)
- [user](NgGqlStorageService.md#user)

### Methods

- [updateOrder](NgGqlStorageService.md#updateorder)
- [updateDishes](NgGqlStorageService.md#updatedishes)
- [updateMenuGroups](NgGqlStorageService.md#updatemenugroups)
- [updateNavigation](NgGqlStorageService.md#updatenavigation)
- [updatePaymentMethods](NgGqlStorageService.md#updatepaymentmethods)
- [updateUser](NgGqlStorageService.md#updateuser)

## Constructors

### constructor

• **new NgGqlStorageService**()

## Properties

### order

• **order**: `Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

___

### dishes

• **dishes**: `Observable`<[`Dish`](../interfaces/Dish.md)[]\>

___

### menu

• **menu**: `Observable`<[`Group`](../interfaces/Group.md)[]\>

___

### navigation

• **navigation**: `Observable`<[`NavigationBase`](../interfaces/NavigationBase.md)[]\>

___

### paymentMethods

• **paymentMethods**: `Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

___

### user

• **user**: `Observable`<[`User`](../interfaces/User.md)\>

## Methods

### updateOrder

▸ **updateOrder**<`T`\>(`order`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md), `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | `T` |

#### Returns

`void`

___

### updateDishes

▸ **updateDishes**<`T`\>(`dishes`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Dish`](../interfaces/Dish.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dishes` | `T`[] |

#### Returns

`void`

___

### updateMenuGroups

▸ **updateMenuGroups**<`T`\>(`menuGroups`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Group`](../interfaces/Group.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `menuGroups` | `T`[] |

#### Returns

`void`

___

### updateNavigation

▸ **updateNavigation**<`T`\>(`navigation`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`NavigationBase`](../interfaces/NavigationBase.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `navigation` | `T`[] |

#### Returns

`void`

___

### updatePaymentMethods

▸ **updatePaymentMethods**<`T`\>(`methods`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaymentMethod`](../interfaces/PaymentMethod.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `methods` | `T`[] |

#### Returns

`void`

___

### updateUser

▸ **updateUser**<`T`\>(`user`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`User`](../interfaces/User.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `T` |

#### Returns

`void`
