# Class: NgGqlStoreService

## Table of contents

### Constructors

- [constructor](NgGqlStoreService.md#constructor)

### Properties

- [paymentMethods](NgGqlStoreService.md#paymentmethods)
- [user](NgGqlStoreService.md#user)
- [token](NgGqlStoreService.md#token)
- [isAuthenticated$](NgGqlStoreService.md#isauthenticated$)
- [orderHystory](NgGqlStoreService.md#orderhystory)
- [userLocations](NgGqlStoreService.md#userlocations)
- [navBarMenus](NgGqlStoreService.md#navbarmenus)
- [groups](NgGqlStoreService.md#groups)
- [navigation](NgGqlStoreService.md#navigation)
- [order](NgGqlStoreService.md#order)
- [dishes](NgGqlStoreService.md#dishes)

### Methods

- [updateOrder](NgGqlStoreService.md#updateorder)
- [updateDishes](NgGqlStoreService.md#updatedishes)
- [updateMenuGroups](NgGqlStoreService.md#updatemenugroups)
- [updateNavigation](NgGqlStoreService.md#updatenavigation)
- [updatePaymentMethods](NgGqlStoreService.md#updatepaymentmethods)
- [updateUser](NgGqlStoreService.md#updateuser)
- [updateToken](NgGqlStoreService.md#updatetoken)
- [updateOrderHystory](NgGqlStoreService.md#updateorderhystory)
- [updateUserLocations](NgGqlStoreService.md#updateuserlocations)
- [updateNavBarMenus](NgGqlStoreService.md#updatenavbarmenus)

## Constructors

### constructor

• **new NgGqlStoreService**()

## Properties

### paymentMethods

• `Readonly` **paymentMethods**: `Observable`<[`PaymentMethod`](../interfaces/PaymentMethod.md)[]\>

___

### user

• `Readonly` **user**: `BehaviorSubject`<``null`` \| [`User`](../interfaces/User.md)\>

___

### token

• `Readonly` **token**: `Observable`<``null`` \| `string`\>

___

### isAuthenticated$

• `Readonly` **isAuthenticated$**: `Observable`<`string`\>

___

### orderHystory

• `Readonly` **orderHystory**: `Observable`<[`UserOrderHystory`](../interfaces/UserOrderHystory.md)[]\>

___

### userLocations

• `Readonly` **userLocations**: `Observable`<``null`` \| [`UserLocationResponse`](../interfaces/UserLocationResponse.md)\>

___

### navBarMenus

• `Readonly` **navBarMenus**: `Observable`<[`NavBarMenu`](../interfaces/NavBarMenu.md)[]\>

___

### groups

• `Readonly` **groups**: `Observable`<[`Group`](../interfaces/Group.md)[]\>

___

### navigation

• `Readonly` **navigation**: `BehaviorSubject`<``null`` \| [`NavigationBase`](../interfaces/NavigationBase.md)[]\>

___

### order

• `Readonly` **order**: `Observable`<[`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\>\>

___

### dishes

• `Readonly` **dishes**: `Observable`<[`Dish`](../interfaces/Dish.md)[]\>

## Methods

### updateOrder

▸ **updateOrder**<`T`\>(`order`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Order`](../interfaces/Order.md)<[`Dish`](../interfaces/Dish.md)\> |

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
| `user` | ``null`` \| `T` |

#### Returns

`void`

___

### updateToken

▸ **updateToken**(`newToken`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newToken` | ``null`` \| `string` |

#### Returns

`void`

___

### updateOrderHystory

▸ **updateOrderHystory**(`newPart`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPart` | [`UserOrderHystory`](../interfaces/UserOrderHystory.md)[] |

#### Returns

`void`

___

### updateUserLocations

▸ **updateUserLocations**(`newValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | [`UserLocationResponse`](../interfaces/UserLocationResponse.md) |

#### Returns

`void`

___

### updateNavBarMenus

▸ **updateNavBarMenus**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | [`NavBarMenu`](../interfaces/NavBarMenu.md)[] |

#### Returns

`void`
