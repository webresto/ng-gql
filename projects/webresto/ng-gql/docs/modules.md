# @webresto/ng-gql - v1.1.12

## Table of contents

### Classes

- [AddDishToOrderDirective](./classes/AddDishToOrderDirective.md)
- [CheckoutDirective](./classes/CheckoutDirective.md)
- [EventMessage](./classes/EventMessage.md)
- [NgGqlModule](./classes/NgGqlModule.md)
- [NgGqlService](./classes/NgGqlService.md)
- [ApolloService](./classes/ApolloService.md)
- [EventerService](./classes/EventerService.md)
- [NgOrderService](./classes/NgOrderService.md)

### Interfaces

- [Dish](./interfaces/Dish.md)
- [DishTag](./interfaces/DishTag.md)
- [Message](./interfaces/Message.md)
- [Action](./interfaces/Action.md)
- [GroupModifier](./interfaces/GroupModifier.md)
- [Group](./interfaces/Group.md)
- [Image](./interfaces/Image.md)
- [ImageItem](./interfaces/ImageItem.md)
- [OrderModifier](./interfaces/OrderModifier.md)
- [Modifier](./interfaces/Modifier.md)
- [Navigation](./interfaces/Navigation.md)
- [NavigationsMenuItem](./interfaces/NavigationsMenuItem.md)
- [NavigationsOptions](./interfaces/NavigationsOptions.md)
- [OrderDish](./interfaces/OrderDish.md)
- [Order](./interfaces/Order.md)
- [Customer](./interfaces/Customer.md)
- [Address](./interfaces/Address.md)
- [OrderData](./interfaces/OrderData.md)
- [Phone](./interfaces/Phone.md)
- [CheckPhoneCodeInput](./interfaces/CheckPhoneCodeInput.md)
- [CheckPhoneResponse](./interfaces/CheckPhoneResponse.md)
- [CheckResponse](./interfaces/CheckResponse.md)
- [PaymentMethod](./interfaces/PaymentMethod.md)
- [NgGqlConfig](./interfaces/NgGqlConfig.md)

### Variables

- [DishFragments](./modules.md#dishfragments)
- [GroupModifierFragments](./modules.md#groupmodifierfragments)
- [GroupFragments](./modules.md#groupfragments)
- [ImageFragments](./modules.md#imagefragments)
- [ModifierFragments](./modules.md#modifierfragments)
- [NavigationFragments](./modules.md#navigationfragments)
- [OrderDishFragments](./modules.md#orderdishfragments)
- [OrderFragments](./modules.md#orderfragments)
- [PaymentMethodFragments](./modules.md#paymentmethodfragments)

### Type aliases

- [VCriteria](./modules.md#vcriteria)
- [GQLRequestVariables](./modules.md#gqlrequestvariables)
- [AddToOrderInput](./modules.md#addtoorderinput)
- [RemoveFromOrderInput](./modules.md#removefromorderinput)
- [SetDishAmountInput](./modules.md#setdishamountinput)
- [SetDishCommentInput](./modules.md#setdishcommentinput)
- [OrderInput](./modules.md#orderinput)
- [OrderAdditionalFields](./modules.md#orderadditionalfields)
- [OrderForm](./modules.md#orderform)
- [ValuesOrBoolean](./modules.md#valuesorboolean)
- [CartBusEvent](./modules.md#cartbusevent)

### Functions

- [generateQueryString](./modules.md#generatequerystring)
- [isValue](./modules.md#isvalue)

## Variables

### <a id="dishfragments" name="dishfragments"></a> DishFragments

• **DishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`Dish`](./interfaces/Dish.md)\> |

___

### <a id="groupmodifierfragments" name="groupmodifierfragments"></a> GroupModifierFragments

• **GroupModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`GroupModifier`](./interfaces/GroupModifier.md)\> |

___

### <a id="groupfragments" name="groupfragments"></a> GroupFragments

• **GroupFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`Group`](./interfaces/Group.md)\> |

___

### <a id="imagefragments" name="imagefragments"></a> ImageFragments

• **ImageFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`Image`](./interfaces/Image.md)\> |

___

### <a id="modifierfragments" name="modifierfragments"></a> ModifierFragments

• **ModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`Modifier`](./interfaces/Modifier.md)\> |

___

### <a id="navigationfragments" name="navigationfragments"></a> NavigationFragments

• **NavigationFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`Navigation`](./interfaces/Navigation.md)\> |

___

### <a id="orderdishfragments" name="orderdishfragments"></a> OrderDishFragments

• **OrderDishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`OrderDish`](./interfaces/OrderDish.md)\> |

___

### <a id="orderfragments" name="orderfragments"></a> OrderFragments

• **OrderFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | { `id`: `boolean` = true; `dishesCount`: `boolean` = true; `comment`: `boolean` = true; `deliveryDescription`: `boolean` = true; `message`: `boolean` = true; `deliveryCost`: `boolean` = true; `totalWeight`: `boolean` = true; `total`: `boolean` = true; `orderTotal`: `boolean` = true; `discountTotal`: `boolean` = true; `state`: `boolean` = true; `customData`: `boolean` = true; `customer`: `boolean` = true; `address`: `boolean` = true; `rmsId`: `boolean` = true; `rmsOrderNumber`: `boolean` = true; `rmsDeliveryDate`: `boolean` = true; `dishes`: [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`OrderDish`](./interfaces/OrderDish.md)\> = OrderDishFragments.vOb } |
| `vOb.id` | `boolean` |
| `vOb.dishesCount` | `boolean` |
| `vOb.comment` | `boolean` |
| `vOb.deliveryDescription` | `boolean` |
| `vOb.message` | `boolean` |
| `vOb.deliveryCost` | `boolean` |
| `vOb.totalWeight` | `boolean` |
| `vOb.total` | `boolean` |
| `vOb.orderTotal` | `boolean` |
| `vOb.discountTotal` | `boolean` |
| `vOb.state` | `boolean` |
| `vOb.customData` | `boolean` |
| `vOb.customer` | `boolean` |
| `vOb.address` | `boolean` |
| `vOb.rmsId` | `boolean` |
| `vOb.rmsOrderNumber` | `boolean` |
| `vOb.rmsDeliveryDate` | `boolean` |
| `vOb.dishes` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`OrderDish`](./interfaces/OrderDish.md)\> |

___

### <a id="paymentmethodfragments" name="paymentmethodfragments"></a> PaymentMethodFragments

• **PaymentMethodFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](./modules.md#valuesorboolean)<[`PaymentMethod`](./interfaces/PaymentMethod.md)\> |

## Type aliases

### <a id="vcriteria" name="vcriteria"></a> VCriteria

Ƭ **VCriteria**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `criteria` | { `[key: string]`: `any`;  } | Объект Waterline query language |

___

### <a id="gqlrequestvariables" name="gqlrequestvariables"></a> GQLRequestVariables

Ƭ **GQLRequestVariables**: `undefined` \| [`VCriteria`](./modules.md#vcriteria) \| { `[key: string]`: `number` \| `string` \| `Object` \| `boolean` \| ``null`` \| `undefined`;  }

___

### <a id="addtoorderinput" name="addtoorderinput"></a> AddToOrderInput

Ƭ **AddToOrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `orderId?` | `string` |
| `dishId?` | `string` |
| `amount?` | `number` |
| `modifiers?` | [`OrderModifier`](./interfaces/OrderModifier.md)[] |
| `comment?` | `string` |
| `from?` | `string` |
| `replace?` | `boolean` |
| `orderDishId?` | `string` |

___

### <a id="removefromorderinput" name="removefromorderinput"></a> RemoveFromOrderInput

Ƭ **RemoveFromOrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `orderDishId?` | `number` |
| `amount?` | `number` |

___

### <a id="setdishamountinput" name="setdishamountinput"></a> SetDishAmountInput

Ƭ **SetDishAmountInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `orderDishId?` | `number` |
| `amount?` | `number` |

___

### <a id="setdishcommentinput" name="setdishcommentinput"></a> SetDishCommentInput

Ƭ **SetDishCommentInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `orderDishId?` | `number` |
| `comment?` | `string` |

___

### <a id="orderinput" name="orderinput"></a> OrderInput

Ƭ **OrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |
| `paymentMethodId?` | `string` |
| `selfService?` | `boolean` |
| `pickupAddressId?` | `string` |
| `locationId?` | `string` |
| `date?` | `string` |
| `address?` | { `streetId?`: `string` ; `home?`: `string` ; `comment?`: `string` ; `city?`: `string` ; `street?`: `string` ; `housing?`: `string` ; `index?`: `string` ; `entrance?`: `string` ; `floor?`: `string` ; `apartment?`: `string` ; `doorphone?`: `string`  } |
| `address.streetId?` | `string` |
| `address.home?` | `string` |
| `address.comment?` | `string` |
| `address.city?` | `string` |
| `address.street?` | `string` |
| `address.housing?` | `string` |
| `address.index?` | `string` |
| `address.entrance?` | `string` |
| `address.floor?` | `string` |
| `address.apartment?` | `string` |
| `address.doorphone?` | `string` |
| `customer?` | { `phone?`: `string` ; `mail?`: `string` ; `name?`: `string`  } |
| `customer.phone?` | `string` |
| `customer.mail?` | `string` |
| `customer.name?` | `string` |
| `comment?` | `string` \| ``null`` |
| `notifyMethodId?` | `string` |
| `customData?` | `any` |

___

### <a id="orderadditionalfields" name="orderadditionalfields"></a> OrderAdditionalFields

Ƭ **OrderAdditionalFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `selfService` | `boolean` |
| `pickupAddressId?` | `string` |
| `locationId?` | `string` |
| `promocode?` | `string` |
| `deliveryTimeInfo?` | { `deliveryType`: ``"fast"`` \| ``"date-time"`` \| `undefined` ; `deliveryDate`: `string` \| `undefined` ; `deliveryTime`: `string` \| `undefined`  } |
| `deliveryTimeInfo.deliveryType` | ``"fast"`` \| ``"date-time"`` \| `undefined` |
| `deliveryTimeInfo.deliveryDate` | `string` \| `undefined` |
| `deliveryTimeInfo.deliveryTime` | `string` \| `undefined` |

___

### <a id="orderform" name="orderform"></a> OrderForm

Ƭ **OrderForm**: [`Order`](./interfaces/Order.md) & [`OrderAdditionalFields`](./modules.md#orderadditionalfields)

___

### <a id="valuesorboolean" name="valuesorboolean"></a> ValuesOrBoolean

Ƭ **ValuesOrBoolean**<`T`\>: { [K in keyof Partial<T\>]: boolean \| (T[K] extends string \| number \| bigint \| symbol \| boolean \| undefined \| null ? boolean : T[K] extends infer U[] \| undefined \| null ? ValuesOrBoolean<U\> : ValuesOrBoolean<T[K]\>) }

#### Type parameters

| Name |
| :------ |
| `T` |

___

### <a id="cartbusevent" name="cartbusevent"></a> CartBusEvent

Ƭ **CartBusEvent**: { `event`: ``"add"`` ; `data`: [`AddToOrderInput`](./modules.md#addtoorderinput) ; `loading`: `BehaviorSubject`<`boolean`\> ; `order`: [`Order`](./interfaces/Order.md) ; `successCb?`: (`order`: [`Order`](./interfaces/Order.md)) => `void` ; `errorCb?`: (`err`: `unknown`) => `void`  } \| { `event`: ``"remove"`` ; `data`: [`RemoveFromOrderInput`](./modules.md#removefromorderinput) & { `dish`: [`Dish`](./interfaces/Dish.md)  } ; `loading`: `BehaviorSubject`<`boolean`\> ; `order`: [`Order`](./interfaces/Order.md) ; `successCb?`: (`order`: [`Order`](./interfaces/Order.md)) => `void` ; `errorCb?`: (`err`: `unknown`) => `void`  } \| { `event`: ``"check"`` \| ``"order"`` ; `order`: [`OrderForm`](./modules.md#orderform) ; `ordered?`: `BehaviorSubject`<`boolean`\> ; `successCb?`: (`order`: [`CheckResponse`](./interfaces/CheckResponse.md)) => `void` ; `errorCb?`: (`err`: `unknown`) => `void`  } \| { `event`: ``"load"`` ; `orderId`: `string` \| `undefined`  }

## Functions

### <a id="generatequerystring" name="generatequerystring"></a> generateQueryString

▸ **generateQueryString**<`T`, `N`, `V`\>(`options`): `string`

**`function`** generateQueryString Функция - генератор строки запроса к серверу GraphQL.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](./modules.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | объект с данными, необходимыми для формирования запроса, где: |
| `options.name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `options.queryObject` | `T` | объект-источник информации о структуре запрашиваемых данных |
| `options.variables?` | `V` | необязательный объект с переменными, передаваемыми в качестве параметров запроса. В качестве типа    параметров допустимо использовать типы - number, string, object или boolean. |
| `options.optionalFields?` | keyof `V`[] | массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип    (например у параметра указан тип String!, а не String). |

#### Returns

`string`

часть строки запроса к серверу GraphQL для переданной операции N с параметрами? перечисленными в V.
 НЕ ВКЛЮЧАЕТ начало, содержащее ключевое слово query, mutation или subscription

___

### <a id="isvalue" name="isvalue"></a> isValue

▸ **isValue**<`T`\>(`value`): value is NonNullable<T\>

Функция-хелпер для проверки, что переданное значение не является null или undefined.
Может пригодиться в ситуациях, где требуется более сложная проверка, чем при использовании optional chaining (оператора "??"),
либо защиты от ложно-положительных срабатываний при проверке наличия значения
Например :
...
interface Foo {
 value? :number | undefinded
}
...
const a:Foo = {
 value: 0
};
if (a) {
 block_a
 } else {
 block_b
 }.
...
В этом примере block_a не будет выполнен, поскольку приведение к типу boolean значения 0 в результате дает false.
А проверка isValue(a) - вернет true.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| ``null`` \| `T` |

#### Returns

value is NonNullable<T\>
