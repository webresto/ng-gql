[@webresto/ng-gql - v1.1.12](README.md) / Exports

# @webresto/ng-gql - v1.1.12

## Table of contents

### Classes

- [AddDishToOrderDirective](classes/AddDishToOrderDirective.md)
- [CheckoutDirective](classes/CheckoutDirective.md)
- [EventMessage](classes/EventMessage.md)
- [NgGqlModule](classes/NgGqlModule.md)
- [NgGqlService](classes/NgGqlService.md)
- [ApolloService](classes/ApolloService.md)
- [EventerService](classes/EventerService.md)
- [NgOrderService](classes/NgOrderService.md)

### Interfaces

- [Dish](interfaces/Dish.md)
- [DishTag](interfaces/DishTag.md)
- [Message](interfaces/Message.md)
- [Action](interfaces/Action.md)
- [GroupModifier](interfaces/GroupModifier.md)
- [Group](interfaces/Group.md)
- [Image](interfaces/Image.md)
- [ImageItem](interfaces/ImageItem.md)
- [OrderModifier](interfaces/OrderModifier.md)
- [Modifier](interfaces/Modifier.md)
- [Navigation](interfaces/Navigation.md)
- [NavigationsMenuItem](interfaces/NavigationsMenuItem.md)
- [NavigationsOptions](interfaces/NavigationsOptions.md)
- [OrderDish](interfaces/OrderDish.md)
- [Order](interfaces/Order.md)
- [Customer](interfaces/Customer.md)
- [Address](interfaces/Address.md)
- [OrderData](interfaces/OrderData.md)
- [Phone](interfaces/Phone.md)
- [CheckPhoneCodeInput](interfaces/CheckPhoneCodeInput.md)
- [CheckPhoneResponse](interfaces/CheckPhoneResponse.md)
- [CheckResponse](interfaces/CheckResponse.md)
- [PaymentMethod](interfaces/PaymentMethod.md)
- [NgGqlConfig](interfaces/NgGqlConfig.md)

### Variables

- [DishFragments](modules.md#dishfragments)
- [GroupModifierFragments](modules.md#groupmodifierfragments)
- [GroupFragments](modules.md#groupfragments)
- [ImageFragments](modules.md#imagefragments)
- [ModifierFragments](modules.md#modifierfragments)
- [NavigationFragments](modules.md#navigationfragments)
- [OrderDishFragments](modules.md#orderdishfragments)
- [OrderFragments](modules.md#orderfragments)
- [PaymentMethodFragments](modules.md#paymentmethodfragments)

### Type aliases

- [VCriteria](modules.md#vcriteria)
- [AddToOrderInput](modules.md#addtoorderinput)
- [RemoveFromOrderInput](modules.md#removefromorderinput)
- [SetDishAmountInput](modules.md#setdishamountinput)
- [SetDishCommentInput](modules.md#setdishcommentinput)
- [OrderInput](modules.md#orderinput)
- [OrderAdditionalFields](modules.md#orderadditionalfields)
- [OrderForm](modules.md#orderform)
- [ValuesOrBoolean](modules.md#valuesorboolean)
- [CartBusEvent](modules.md#cartbusevent)

### Functions

- [generateQueryString](modules.md#generatequerystring)
- [isValue](modules.md#isvalue)

## Variables

### DishFragments

• **DishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Dish`](interfaces/Dish.md)\> |

___

### GroupModifierFragments

• **GroupModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`GroupModifier`](interfaces/GroupModifier.md)\> |

___

### GroupFragments

• **GroupFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Group`](interfaces/Group.md)\> |

___

### ImageFragments

• **ImageFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Image`](interfaces/Image.md)\> |

___

### ModifierFragments

• **ModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Modifier`](interfaces/Modifier.md)\> |

___

### NavigationFragments

• **NavigationFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`Navigation`](interfaces/Navigation.md)\> |

___

### OrderDishFragments

• **OrderDishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> |

___

### OrderFragments

• **OrderFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | { `id`: `boolean` = true; `dishesCount`: `boolean` = true; `comment`: `boolean` = true; `deliveryDescription`: `boolean` = true; `message`: `boolean` = true; `deliveryCost`: `boolean` = true; `totalWeight`: `boolean` = true; `total`: `boolean` = true; `orderTotal`: `boolean` = true; `discountTotal`: `boolean` = true; `state`: `boolean` = true; `customData`: `boolean` = true; `customer`: `boolean` = true; `address`: `boolean` = true; `rmsId`: `boolean` = true; `rmsOrderNumber`: `boolean` = true; `rmsDeliveryDate`: `boolean` = true; `dishes`: [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> = OrderDishFragments.vOb } |
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
| `vOb.dishes` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> |

___

### PaymentMethodFragments

• **PaymentMethodFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](modules.md#valuesorboolean)<[`PaymentMethod`](interfaces/PaymentMethod.md)\> |

## Type aliases

### VCriteria

Ƭ **VCriteria**: `Object`

Обобщенный тип для объекта criteria, передаваемого в качестве параметра для некоторых запросов к серверу GraphQL.
Формируется по правилам Waterline query language.
Подробнее: https://docs.webresto.org/docs/data/criteria/

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `criteria` | { [key: string]: `any`;  } | Объект Waterline query language |

___

### AddToOrderInput

Ƭ **AddToOrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `orderId?` | `string` |
| `dishId?` | `string` |
| `amount?` | `number` |
| `modifiers?` | [`OrderModifier`](interfaces/OrderModifier.md)[] |
| `comment?` | `string` |
| `from?` | `string` |
| `replace?` | `boolean` |
| `orderDishId?` | `string` |

___

### RemoveFromOrderInput

Ƭ **RemoveFromOrderInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `orderDishId?` | `number` |
| `amount?` | `number` |

___

### SetDishAmountInput

Ƭ **SetDishAmountInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `orderDishId?` | `number` |
| `amount?` | `number` |

___

### SetDishCommentInput

Ƭ **SetDishCommentInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `orderDishId?` | `number` |
| `comment?` | `string` |

___

### OrderInput

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

### OrderAdditionalFields

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

### OrderForm

Ƭ **OrderForm**: [`Order`](interfaces/Order.md) & [`OrderAdditionalFields`](modules.md#orderadditionalfields)

___

### ValuesOrBoolean

Ƭ **ValuesOrBoolean**<`T`\>: { [K in keyof Partial<T\>]: boolean \| (T[K] extends string \| number \| bigint \| symbol \| boolean \| undefined \| null ? boolean : T[K] extends infer U[] \| undefined \| null ? ValuesOrBoolean<U\> : ValuesOrBoolean<T[K]\>) }

Тип, описывающий объект-конфигуратор запроса к серверу GraphQL для данных типа T.
Данный обьект будет использоваться в качестве источника информации о требуемых данных при генерации строки-запроса.
Сервер вернет данные только для полей, присутсвующих в этом обьекте, с сохранением структуры по всем уровням вложенности.
В качестве ключей (K) необходимо указать ключи из типа T, данные для которых необходимо получить. Структура возвращаемых данных будет соответствовать структуре, переданной в данном объекте, а не типе Т.
То есть, даже если некие ключи-свойства в типе T указаны как обязательные, их все равно можно не указывать в данном обьекте, но и в возвращаемых API данных эти данные будут отсутствовать.
В качестве значений:
  1. true или T[K] - в случае, если T[K] принадлежит примитивным типам, undefined или null.
  2. Если значение T[K] - "сложный" тип обьекта (НО НЕ МАССИВ!) - вложенный объект, формируемый по аналогичной схеме.
  3. Если значение T[K] - массив элементов некоего типа U - вложенный обьект, формируемый для типа U по аналогичной схеме.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### CartBusEvent

Ƭ **CartBusEvent**: { `event`: ``"add"`` ; `data`: [`AddToOrderInput`](modules.md#addtoorderinput) ; `loading`: `BehaviorSubject`<`boolean`\> ; `order`: [`Order`](interfaces/Order.md) ; `successCb?`: (`order`: [`Order`](interfaces/Order.md)) => `void` ; `errorCb?`: (`err`: `unknown`) => `void`  } \| { `event`: ``"remove"`` ; `data`: [`RemoveFromOrderInput`](modules.md#removefromorderinput) & { `dish`: [`Dish`](interfaces/Dish.md)  } ; `loading`: `BehaviorSubject`<`boolean`\> ; `order`: [`Order`](interfaces/Order.md) ; `successCb?`: (`order`: [`Order`](interfaces/Order.md)) => `void` ; `errorCb?`: (`err`: `unknown`) => `void`  } \| { `event`: ``"check"`` \| ``"order"`` ; `order`: [`OrderForm`](modules.md#orderform) ; `ordered?`: `BehaviorSubject`<`boolean`\> ; `successCb?`: (`order`: [`CheckResponse`](interfaces/CheckResponse.md)) => `void` ; `errorCb?`: (`err`: `unknown`) => `void`  } \| { `event`: ``"load"`` ; `orderId`: `string` \| `undefined`  }

Тип событий, которые отслеживаются в потоке NgGqlService.orderBus$.

## Functions

### generateQueryString

▸ **generateQueryString**<`T`, `N`, `V`\>(`options`): `string`

Функция - генератор строки запроса к серверу GraphQL.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | объект с данными, необходимыми для формирования запроса, где:  name - название операции, объвленное в схеме сервера GraphQL.  queryObject - объект-источник информации о структуре запрашиваемых данных  variables - необязательный объект с переменными, передаваемыми в качестве параметров запроса. В качестве типа    параметров допустимо использовать типы - number, string, object или boolean.  optionalFields - массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип    (например у параметра указан тип String!, а не String). |
| `options.name` | `N` | - |
| `options.queryObject` | `T` | - |
| `options.variables` | `V` | - |
| `options.optionalFields?` | `string`[] | - |

#### Returns

`string`

часть строки запроса к серверу GraphQL для переданной операции N с параметрами? перечисленными в V.
 НЕ ВКЛЮЧАЕТ начало, содержащее ключевое слово query, mutation или subscription

___

### isValue

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
