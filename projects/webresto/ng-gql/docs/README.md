# @webresto/ng-gql

## Table of contents

### Classes

- [AddDishToOrderDirective](classes/AddDishToOrderDirective.md)
- [CheckoutDirective](classes/CheckoutDirective.md)
- [EventMessage](classes/EventMessage.md)
- [NgGqlModule](classes/NgGqlModule.md)
- [ApolloService](classes/ApolloService.md)
- [EventerService](classes/EventerService.md)
- [NgGqlService](classes/NgGqlService.md)
- [NgOrderService](classes/NgOrderService.md)

### Events

- [CartBusEvent](README.md#cartbusevent)
- [CartBusEventBase](README.md#cartbuseventbase)
- [CartBusEventAdd](README.md#cartbuseventadd)
- [CartBusEventRemove](README.md#cartbuseventremove)
- [CartBusEventSetAmountToDish](README.md#cartbuseventsetamounttodish)
- [CartBusEventSetCommentToDish](README.md#cartbuseventsetcommenttodish)
- [CartBusEventCheckSend](README.md#cartbuseventchecksend)

### Interfaces

- [Dish](interfaces/Dish.md)
- [DishTag](interfaces/DishTag.md)
- [Message](interfaces/Message.md)
- [Action](interfaces/Action.md)
- [GroupModifier](interfaces/GroupModifier.md)
- [Group](interfaces/Group.md)
- [Image](interfaces/Image.md)
- [ImageItem](interfaces/ImageItem.md)
- [Maintenance](interfaces/Maintenance.md)
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

- [DishFragments](README.md#dishfragments)
- [MessageOrActionGql](README.md#messageoractiongql)
- [GroupModifierFragments](README.md#groupmodifierfragments)
- [GroupFragments](README.md#groupfragments)
- [ImageFragments](README.md#imagefragments)
- [maintenanceFragment](README.md#maintenancefragment)
- [ModifierFragments](README.md#modifierfragments)
- [NavigationFragments](README.md#navigationfragments)
- [OrderDishFragments](README.md#orderdishfragments)
- [OrderFragments](README.md#orderfragments)
- [PaymentMethodFragments](README.md#paymentmethodfragments)

### Type aliases

- [VCriteria](README.md#vcriteria)
- [GQLRequestVariables](README.md#gqlrequestvariables)
- [OrderState](README.md#orderstate)
- [AddToOrderInput](README.md#addtoorderinput)
- [RemoveOrSetAmountToDish](README.md#removeorsetamounttodish)
- [SetDishCommentInput](README.md#setdishcommentinput)
- [OrderInput](README.md#orderinput)
- [OrderAdditionalFields](README.md#orderadditionalfields)
- [OrderForm](README.md#orderform)
- [ValuesOrBoolean](README.md#valuesorboolean)
- [QueryGenerationParam](README.md#querygenerationparam)

### Functions

- [generateQueryString](README.md#generatequerystring)
- [isValue](README.md#isvalue)

## Events

### CartBusEvent

• **CartBusEvent**: [`CartBusEventAdd`](README.md#cartbuseventadd) \| [`CartBusEventRemove`](README.md#cartbuseventremove) \| [`CartBusEventSetAmountToDish`](README.md#cartbuseventsetamounttodish) \| [`CartBusEventSetCommentToDish`](README.md#cartbuseventsetcommenttodish) \| [`CartBusEventCheckSend`](README.md#cartbuseventchecksend)

**`alias`** CartBusEvent

___

### CartBusEventBase

• **CartBusEventBase**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Order`](interfaces/Order.md) \| [`OrderForm`](README.md#orderform) = [`Order`](interfaces/Order.md) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | `T` | Заказ, с которым выполнется операция |
| `successCb?` | (`result`: `T` extends [`OrderForm`](README.md#orderform) ? [`CheckResponse`](interfaces/CheckResponse.md) : [`Order`](interfaces/Order.md)) => `void` | Пользовательский callback, который дополнительно будет выполнен в случае успешной операции |
| `errorCb?` | (`err`: `unknown`) => `void` | Пользовательский callback, будет который дополнительно  выполнен в случае успешной операции |

___

### CartBusEventAdd

• **CartBusEventAdd**: { `event`: ``"add"`` ; `data`: [`AddToOrderInput`](README.md#addtoorderinput) ; `loading`: `BehaviorSubject`<`boolean`\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)

___

### CartBusEventRemove

• **CartBusEventRemove**: { `event`: ``"remove"`` ; `data`: [`RemoveOrSetAmountToDish`](README.md#removeorsetamounttodish) ; `loading`: `BehaviorSubject`<`boolean`\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)

___

### CartBusEventSetAmountToDish

• **CartBusEventSetAmountToDish**: { `event`: ``"setDishAmount"`` ; `data`: [`RemoveOrSetAmountToDish`](README.md#removeorsetamounttodish) ; `loading`: `BehaviorSubject`<`boolean`\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)

___

### CartBusEventSetCommentToDish

• **CartBusEventSetCommentToDish**: { `event`: ``"setCommentToDish"`` ; `data`: [`SetDishCommentInput`](README.md#setdishcommentinput) ; `loading`: `BehaviorSubject`<`boolean`\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)

___

### CartBusEventCheckSend

• **CartBusEventCheckSend**: { `event`: ``"check"`` \| ``"order"`` ; `ordered?`: `BehaviorSubject`<`boolean`\>  } & [`CartBusEventBase`](README.md#cartbuseventbase)<[`OrderForm`](README.md#orderform)\>

## Variables

### DishFragments

• `Const` **DishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Dish`](interfaces/Dish.md)\> |

___

### MessageOrActionGql

• `Const` **MessageOrActionGql**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messageVob` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Message`](interfaces/Message.md)\> |
| `actionVob` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Action`](interfaces/Action.md)\> |

___

### GroupModifierFragments

• `Const` **GroupModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`GroupModifier`](interfaces/GroupModifier.md)\> |

___

### GroupFragments

• `Const` **GroupFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Group`](interfaces/Group.md)\> |

___

### ImageFragments

• `Const` **ImageFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Image`](interfaces/Image.md)\> |

___

### maintenanceFragment

• `Const` **maintenanceFragment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Maintenance`](interfaces/Maintenance.md)\> |

___

### ModifierFragments

• `Const` **ModifierFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Modifier`](interfaces/Modifier.md)\> |

___

### NavigationFragments

• `Const` **NavigationFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Navigation`](interfaces/Navigation.md)\> |

___

### OrderDishFragments

• `Const` **OrderDishFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)\> |

___

### OrderFragments

• `Const` **OrderFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`Order`](interfaces/Order.md)\> |

___

### PaymentMethodFragments

• `Const` **PaymentMethodFragments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vOb` | [`ValuesOrBoolean`](README.md#valuesorboolean)<[`PaymentMethod`](interfaces/PaymentMethod.md)\> |

## Type aliases

### VCriteria

Ƭ **VCriteria**: `Object`

**`alias`** VCriteria
Обобщенный тип для объекта criteria, передаваемого в качестве параметра для некоторых запросов к серверу GraphQL.
Формируется по правилам Waterline query language.
Подробнее: https://docs.webresto.org/docs/data/criteria/

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `criteria` | { `[key: string]`: `any`;  } | Объект Waterline query language |

___

### GQLRequestVariables

Ƭ **GQLRequestVariables**: `undefined` \| [`VCriteria`](README.md#vcriteria) \| { `[key: string]`: `number` \| `string` \| `Object` \| `boolean` \| ``null`` \| `undefined`;  }

**`alias`** GQLRequestVariables
Тип, описывающий необязательный обьект переменных-параметров запроса к серверу GraphQL API, ключи которого , описанным для запроса в схеме GraphQL сервера с соответствующими им значениями.
В качестве ключей выступают строки, соответствующие названиям параметров.
Значения - соответствующие им значения, при этом значения должны принадлежать типам number, string, object или boolean

___

### OrderState

Ƭ **OrderState**: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"``

**`alias`** OrderState
Возможные состояния заказа.
 `CART` - начальное состояние заказа
 `CHECKOUT` - заказ проверен и готов к оформлению.
В заказе еще возможны изменения, но после любых изменений требуется повторно выполнять проверку.

**`see`** 'NgOrderService.checkOrder'
 `PAYMENT` - заказ переходит в это состояние при выборе онлайн оплаты или через внутреннюю платежную систему (бонусами и т.п.),
Состояние сохраняется, пока оплата не будет завершена, после чего заказ перейдет в состояние `ORDER`.
 `ORDER` - заказ успешно оформлен. Это финальный статус и он не подразумевает, что заказ также был доставлен.
Данные о выполненной доставке могут быть получены от RMS (`Order.rmsDelivered`).

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

### RemoveOrSetAmountToDish

Ƭ **RemoveOrSetAmountToDish**: `Object`

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
| `selfService` | `boolean` |
| `pickupAddressId?` | `string` |
| `locationId?` | `string` |
| `date?` | `string` |
| `address` | [`Address`](interfaces/Address.md) \| ``null`` |
| `customer` | [`Customer`](interfaces/Customer.md) \| ``null`` |
| `comment?` | `string` |
| `notifyMethodId?` | `string` |
| `customData` | `any` \| ``null`` |

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

Ƭ **OrderForm**: [`Order`](interfaces/Order.md) & [`OrderAdditionalFields`](README.md#orderadditionalfields)

___

### ValuesOrBoolean

Ƭ **ValuesOrBoolean**<`T`\>: { [K in keyof Partial<T\>]: true \| (T[K] extends string \| number \| bigint \| symbol \| boolean \| undefined \| null ? true : T[K] extends infer U[] \| undefined \| null ? ValuesOrBoolean<U\> : ValuesOrBoolean<T[K]\>) }

**`alias`** ValuesOrBoolean<T>

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

### QueryGenerationParam

Ƭ **QueryGenerationParam**<`V`\>: `Object`

Объект настройки генерации части строки запроса с описанием типов параметров операции.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `optionalFields?` | keyof `V`[] | Необязательный массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип (например у параметра указан тип String!, а не String). ВАЖНО! КРОМЕ ключей, для которых названия типов передаются в `fieldsTypeMap`. |
| `fieldsTypeMap?` | `Map`<keyof `V`, `string`\> | Необязательный объект Map, в качестве ключей содержащий названия параметров запроса, а в качестве значения - строки-названия соответствующих им типов, определенных в схеме сервера GraphQL. ВАЖНО! Строка также должна включать символ "!", если в схеме параметр определен как необязательный. |

## Functions

### generateQueryString

▸ **generateQueryString**<`T`, `N`, `V`\>(`options`): `string`

**`function`** generateQueryString
Функция - генератор строки запроса к серверу GraphQL.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `V` | [`GQLRequestVariables`](README.md#gqlrequestvariables) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | объект с данными, необходимыми для формирования запроса, где: |
| `options.name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `options.queryObject` | `T` | объект-источник информации о структуре запрашиваемых данных |
| `options.variables?` | `V` | необязательный объект с переменными, передаваемыми в качестве параметров запроса. В качестве типа    параметров допустимо использовать типы - number, string, object или boolean. |
| `options.optionalFields?` | keyof `V`[] | необязательный массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.    (например у параметра указан тип String!, а не String). |
| `options.fieldsTypeMap?` | `Map`<keyof `V`, `string`\> | необязательный объект Map, в качестве ключей содержащий названия параметров запроса, а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL. ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как необязательный. |

#### Returns

`string`

часть строки запроса к серверу GraphQL для переданной операции N с параметрами? перечисленными в V.
 НЕ ВКЛЮЧАЕТ начало, содержащее ключевое слово query, mutation или subscription

___

### isValue

▸ **isValue**<`T`\>(`value`): value is NonNullable<T\>

**`function`** isValue

Функция-хелпер для проверки, что переданное значение не является null или undefined.
Может пригодиться в ситуациях, где требуется более сложная проверка, чем при использовании optional chaining (оператора "??"),
либо защиты от ложно-положительных срабатываний при проверке наличия значения
Например :

```typescript
   interface Foo {
   value? :number | undefinded
   }
   const a:Foo = {
     value: 0
   };
   if (a) {
    <block_a>
   } else {
     <block_b>
    };
```

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
