# @webresto/ng-gql

## Table of contents

### Variables

- [ORDERID\_FACTORY\_FN](README.md#orderid_factory_fn)
- [IMAGE\_FRAGMENTS](README.md#image_fragments)
- [MESSAGE\_FRAGMENTS](README.md#message_fragments)
- [ACTION\_FRAGMENTS](README.md#action_fragments)
- [MAINTENANCE\_FRAGMENTS](README.md#maintenance_fragments)
- [MODIFIER\_FRAGMENTS](README.md#modifier_fragments)
- [DISH\_FRAGMENTS](README.md#dish_fragments)
- [GROUP\_FRAGMENTS](README.md#group_fragments)
- [GROUP\_MODIFIER\_FRAGMENTS](README.md#group_modifier_fragments)
- [ORDER\_FRAGMENTS](README.md#order_fragments)
- [ORDER\_DISH\_FRAGMENTS](README.md#order_dish_fragments)
- [PAYMENT\_METHOD\_FRAGMENTS](README.md#payment_method_fragments)
- [NAVIGATION\_FRAGMENTS](README.md#navigation_fragments)
- [PHONE\_FRAGMENT](README.md#phone_fragment)
- [OTP\_RESPONSE\_FRAGMENTS](README.md#otp_response_fragments)
- [USER\_DEVICES\_FRAGMENTS](README.md#user_devices_fragments)
- [USER\_LOCATION\_FRAGMENTS](README.md#user_location_fragments)
- [BONUS\_PROGRAM\_FRAGMENTS](README.md#bonus_program_fragments)
- [USER\_BONUS\_PROGRAM\_FRAGMENTS](README.md#user_bonus_program_fragments)
- [CAPTCHA\_GET\_JOB\_FRAGMENTS](README.md#captcha_get_job_fragments)
- [USER\_FRAGMENTS](README.md#user_fragments)
- [USER\_ORDER\_HYSTORY\_FRAGMENTS](README.md#user_order_hystory_fragments)

### Interfaces

- [BaseModelWithCustomData](interfaces/BaseModelWithCustomData.md)
- [CaptchaJob](interfaces/CaptchaJob.md)
- [CaptchaTask](interfaces/CaptchaTask.md)
- [CaptchaJobPayload](interfaces/CaptchaJobPayload.md)
- [Captcha](interfaces/Captcha.md)
- [Customer](interfaces/Customer.md)
- [Phone](interfaces/Phone.md)
- [PhoneKnowledge](interfaces/PhoneKnowledge.md)
- [CheckPhoneCodeInput](interfaces/CheckPhoneCodeInput.md)
- [CheckPhoneResponse](interfaces/CheckPhoneResponse.md)
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
- [NavigationBase](interfaces/NavigationBase.md)
- [NavigationLoader](interfaces/NavigationLoader.md)
- [Navigation](interfaces/Navigation.md)
- [NavigationsMenuItemBase](interfaces/NavigationsMenuItemBase.md)
- [NavigationsMenuItem](interfaces/NavigationsMenuItem.md)
- [NavigationsOptions](interfaces/NavigationsOptions.md)
- [NgGqlConfig](interfaces/NgGqlConfig.md)
- [SendOrderInput](interfaces/SendOrderInput.md)
- [OrderDish](interfaces/OrderDish.md)
- [Order](interfaces/Order.md)
- [Address](interfaces/Address.md)
- [AddToOrderInput](interfaces/AddToOrderInput.md)
- [RemoveOrSetAmountToDish](interfaces/RemoveOrSetAmountToDish.md)
- [SetDishCommentInput](interfaces/SetDishCommentInput.md)
- [CheckOrderInput](interfaces/CheckOrderInput.md)
- [CheckResponse](interfaces/CheckResponse.md)
- [OrderAdditionalFields](interfaces/OrderAdditionalFields.md)
- [PaymentMethod](interfaces/PaymentMethod.md)
- [BaseResponse](interfaces/BaseResponse.md)
- [RestorePasswordPayload](interfaces/RestorePasswordPayload.md)
- [Response](interfaces/Response.md)
- [UserResponse](interfaces/UserResponse.md)
- [OTPRequestPayload](interfaces/OTPRequestPayload.md)
- [OTPResponse](interfaces/OTPResponse.md)
- [LogoutPayload](interfaces/LogoutPayload.md)
- [User](interfaces/User.md)
- [BonusProgram](interfaces/BonusProgram.md)
- [UserBonusProgram](interfaces/UserBonusProgram.md)
- [UserBonusTransaction](interfaces/UserBonusTransaction.md)
- [UserDevice](interfaces/UserDevice.md)
- [InputLocation](interfaces/InputLocation.md)
- [UserLocation](interfaces/UserLocation.md)
- [UserLocationResponse](interfaces/UserLocationResponse.md)
- [OneTimePassword](interfaces/OneTimePassword.md)
- [UserOrderHystory](interfaces/UserOrderHystory.md)
- [QueryGenerationParam](interfaces/QueryGenerationParam.md)

### Type Aliases

- [DiscountType](README.md#discounttype)
- [VCriteria](README.md#vcriteria)
- [GQLRequestVariables](README.md#gqlrequestvariables)
- [PartialGroupNullable](README.md#partialgroupnullable)
- [OrderState](README.md#orderstate)
- [OrderForm](README.md#orderform)
- [LoginPayload](README.md#loginpayload)
- [RegistrationPayload](README.md#registrationpayload)
- [UpdateUserDataPayload](README.md#updateuserdatapayload)
- [ValuesOrBoolean](README.md#valuesorboolean)
- [UserBusEventType](README.md#userbuseventtype)
- [UserBusEvent](README.md#userbusevent)

### Classes

- [EventMessage](classes/EventMessage.md)
- [GenerateUUIDHelper](classes/GenerateUUIDHelper.md)
- [NqGqlLocalStorageWrapper](classes/NqGqlLocalStorageWrapper.md)
- [ApolloService](classes/ApolloService.md)
- [NgGqlStorageService](classes/NgGqlStorageService.md)
- [NgGqlUserBusService](classes/NgGqlUserBusService.md)
- [NgGqlUserService](classes/NgGqlUserService.md)
- [NgGqlService](classes/NgGqlService.md)
- [NgOrderService](classes/NgOrderService.md)

### Functions

- [generateQueryString](README.md#generatequerystring)
- [generateUUID](README.md#generateuuid)

### Events

- [CartBusEvent](README.md#cartbusevent)
- [CartBusEventBase](interfaces/CartBusEventBase.md)
- [CartBusEventAdd](interfaces/CartBusEventAdd.md)
- [CartBusEventUpdate](interfaces/CartBusEventUpdate.md)
- [CartBusEventRemove](interfaces/CartBusEventRemove.md)
- [CartBusEventSetAmountToDish](interfaces/CartBusEventSetAmountToDish.md)
- [CartBusEventSetCommentToDish](interfaces/CartBusEventSetCommentToDish.md)
- [CartBusEventCheck](interfaces/CartBusEventCheck.md)
- [CartBusEventSend](interfaces/CartBusEventSend.md)

## Variables

### ORDERID\_FACTORY\_FN

• `Const` **ORDERID\_FACTORY\_FN**: `InjectionToken`<() => `string`\>

Метод для генерации orderId

___

### IMAGE\_FRAGMENTS

• `Const` **IMAGE\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Image`](interfaces/Image.md)\>\>

InjectionToken с объектом ValuesOrBoolean<Image>, используемым в запросе Image с сервера.

___

### MESSAGE\_FRAGMENTS

• `Const` **MESSAGE\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Message`](interfaces/Message.md)\>\>

InjectionToken с объектом ValuesOrBoolean<Message>, используемым в запросе Message с сервера.

___

### ACTION\_FRAGMENTS

• `Const` **ACTION\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Action`](interfaces/Action.md)<`any`\>\>\>

InjectionToken с объектом ValuesOrBoolean<Action>, используемым в запросе Action с сервера.

___

### MAINTENANCE\_FRAGMENTS

• `Const` **MAINTENANCE\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Maintenance`](interfaces/Maintenance.md)\>\>

InjectionToken с объектом ValuesOrBoolean<Maintenance>, используемым в запросе Maintenance с сервера.

___

### MODIFIER\_FRAGMENTS

• `Const` **MODIFIER\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Modifier`](interfaces/Modifier.md)<[`Dish`](interfaces/Dish.md)\>\>\>

InjectionToken с объектом ValuesOrBoolean<Modifier>, используемым в запросе Modifier с сервера.

___

### DISH\_FRAGMENTS

• `Const` **DISH\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Dish`](interfaces/Dish.md)\>\>

InjectionToken с объектом ValuesOrBoolean<Dish>, используемым в запросе блюд.

___

### GROUP\_FRAGMENTS

• `Const` **GROUP\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Group`](interfaces/Group.md)\>\>

InjectionToken с объектом ValuesOrBoolean<Group>, используемым в запросе Group с сервера.

___

### GROUP\_MODIFIER\_FRAGMENTS

• `Const` **GROUP\_MODIFIER\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`GroupModifier`](interfaces/GroupModifier.md)<[`Dish`](interfaces/Dish.md)\>\>\>

InjectionToken с объектом ValuesOrBoolean<GroupModifier>, используемым в запросе GroupModifier с сервера.

___

### ORDER\_FRAGMENTS

• `Const` **ORDER\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Order`](interfaces/Order.md)<[`Dish`](interfaces/Dish.md)\>\>\>

InjectionToken с объектом ValuesOrBoolean<Order>, используемым в запросе Order с сервера.

___

### ORDER\_DISH\_FRAGMENTS

• `Const` **ORDER\_DISH\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`OrderDish`](interfaces/OrderDish.md)<[`Dish`](interfaces/Dish.md)\>\>\>

InjectionToken с объектом ValuesOrBoolean<OrderDish>, используемым в запросе OrderDish с сервера.

___

### PAYMENT\_METHOD\_FRAGMENTS

• `Const` **PAYMENT\_METHOD\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`PaymentMethod`](interfaces/PaymentMethod.md)\>\>

InjectionToken с объектом ValuesOrBoolean<PaymentMethod>, используемым в запросе PaymentMethod с сервера.

___

### NAVIGATION\_FRAGMENTS

• `Const` **NAVIGATION\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Navigation`](interfaces/Navigation.md)\>\>

InjectionToken с объектом ValuesOrBoolean<Navigation>, используемым в запросе Navigation с сервера.

___

### PHONE\_FRAGMENT

• `Const` **PHONE\_FRAGMENT**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`Phone`](interfaces/Phone.md)\>\>

InjectionToken с объектом ValuesOrBoolean<Phone>.

___

### OTP\_RESPONSE\_FRAGMENTS

• `Const` **OTP\_RESPONSE\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`OTPResponse`](interfaces/OTPResponse.md)\>\>

InjectionToken с объектом ValuesOrBoolean<OTPResponse>.

___

### USER\_DEVICES\_FRAGMENTS

• `Const` **USER\_DEVICES\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`UserDevice`](interfaces/UserDevice.md)\>\>

InjectionToken с объектом ValuesOrBoolean<UserDevice>.

___

### USER\_LOCATION\_FRAGMENTS

• `Const` **USER\_LOCATION\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`UserLocation`](interfaces/UserLocation.md)\>\>

InjectionToken с объектом ValuesOrBoolean<UserLocation>.

___

### BONUS\_PROGRAM\_FRAGMENTS

• `Const` **BONUS\_PROGRAM\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`BonusProgram`](interfaces/BonusProgram.md)\>\>

InjectionToken с объектом ValuesOrBoolean<BonusProgram>.

___

### USER\_BONUS\_PROGRAM\_FRAGMENTS

• `Const` **USER\_BONUS\_PROGRAM\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`UserBonusProgram`](interfaces/UserBonusProgram.md)\>\>

InjectionToken с объектом ValuesOrBoolean<UserBonusProgram>.

___

### CAPTCHA\_GET\_JOB\_FRAGMENTS

• `Const` **CAPTCHA\_GET\_JOB\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`CaptchaJob`](interfaces/CaptchaJob.md)<`string`\>\>\>

InjectionToken с объектом ValuesOrBoolean<CaptchaJob>.

___

### USER\_FRAGMENTS

• `Const` **USER\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`User`](interfaces/User.md)\>\>

InjectionToken с объектом ValuesOrBoolean<User>.

___

### USER\_ORDER\_HYSTORY\_FRAGMENTS

• `Const` **USER\_ORDER\_HYSTORY\_FRAGMENTS**: `InjectionToken`<[`ValuesOrBoolean`](README.md#valuesorboolean)<[`UserOrderHystory`](interfaces/UserOrderHystory.md)\>\>

InjectionToken с объектом ValuesOrBoolean<UserOrderHystory>.

## Type Aliases

### DiscountType

Ƭ **DiscountType**: ``"FIXED"`` \| ``"PERCENT"``

___

### VCriteria

Ƭ **VCriteria**: `Object`

**`Alias`**

VCriteria
Обобщенный тип для объекта criteria, передаваемого в качестве параметра для некоторых запросов к серверу GraphQL.
Формируется по правилам Waterline query language.
Подробнее: https://docs.webresto.org/docs/data/criteria/

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `criteria` | { `[key: string]`: `any`;  } | Объект Waterline query language |

___

### GQLRequestVariables

Ƭ **GQLRequestVariables**: [`VCriteria`](README.md#vcriteria) \| { `[key: string]`: `number` \| `string` \| `Object` \| `boolean` \| ``null`` \| `undefined`;  }

**`Alias`**

GQLRequestVariables
Тип, описывающий необязательный обьект переменных-параметров запроса к серверу GraphQL API, ключи которого , описаны для запроса в схеме GraphQL сервера, с соответствующими им значениями.
В качестве ключей выступают строки, соответствующие названиям параметров.
Значения - соответствующие им значения, при этом значения должны принадлежать типам number, string, object или boolean

___

### PartialGroupNullable

Ƭ **PartialGroupNullable**: `Pick`<[`Group`](interfaces/Group.md), ``"slug"``\> & { `id`: `string` \| ``null``  }

___

### OrderState

Ƭ **OrderState**: ``"CART"`` \| ``"CHECKOUT"`` \| ``"PAYMENT"`` \| ``"ORDER"``

**`Alias`**

OrderState
Возможные состояния заказа.
 `CART` - начальное состояние заказа
 `CHECKOUT` - заказ проверен и готов к оформлению.
В заказе еще возможны изменения, но после любых изменений требуется повторно выполнять проверку.

**`See`**

'NgOrderService.checkOrder'
 `PAYMENT` - заказ переходит в это состояние при выборе онлайн оплаты или через внутреннюю платежную систему (бонусами и т.п.),
	Состояние сохраняется, пока оплата не будет завершена, после чего заказ перейдет в состояние `ORDER`.
 `ORDER` - заказ успешно оформлен. Это финальный статус и он не подразумевает, что заказ также был доставлен.
	Данные о выполненной доставке могут быть получены от RMS (`Order.rmsDelivered`).

___

### OrderForm

Ƭ **OrderForm**: [`Order`](interfaces/Order.md) & [`OrderAdditionalFields`](interfaces/OrderAdditionalFields.md)

___

### LoginPayload

Ƭ **LoginPayload**: `Omit`<[`RestorePasswordPayload`](interfaces/RestorePasswordPayload.md), ``"password"`` \| ``"otp"``\> & { `phone?`: [`Phone`](interfaces/Phone.md) ; `password?`: `string` ; `otp?`: `string`  }

___

### RegistrationPayload

Ƭ **RegistrationPayload**: `Omit`<[`LoginPayload`](README.md#loginpayload), ``"otp"``\> & { `phone?`: [`Phone`](interfaces/Phone.md) ; `otp`: `string` ; `firstName?`: `string` ; `lastName?`: `string` ; `customFields?`: { `[key: string]`: `string` \| `any` \| ``null``;  }  }

___

### UpdateUserDataPayload

Ƭ **UpdateUserDataPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `firstName` | `string` |
| `lastName` | `string` |
| `birthday` | `string` |
| `customData` | `any` |
| `customFields` | `any` |

___

### ValuesOrBoolean

Ƭ **ValuesOrBoolean**<`T`\>: { [K in keyof T]?: true \| (T[K] extends Observable<unknown\> \| AbstractControl<unknown\> ? never : T[K] extends string \| number \| bigint \| symbol \| boolean \| undefined \| null ? true : T[K] extends (infer U)[] \| undefined \| null ? ValuesOrBoolean<U\> : ValuesOrBoolean<T[K]\>) }

**`Alias`**

ValuesOrBoolean<T>

Тип, описывающий объект-конфигуратор запроса к серверу GraphQL для данных типа T.
Данный обьект будет использоваться в качестве источника информации о требуемых данных при генерации строки-запроса.
Сервер вернет данные только для полей, присутсвующих в этом обьекте, с сохранением структуры по всем уровням вложенности.
В качестве ключей (K) необходимо указать ключи из типа T, данные для которых необходимо получить.
Ключи, значения которых являются любыми развновидностями Observable или AbstractControl (все виды реактивных форм Ангуляр) - не принимаются.
Структура возвращаемых данных будет соответствовать структуре, переданной в данном объекте, а не типе Т.
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

### UserBusEventType

Ƭ **UserBusEventType**: ``"OTPRequest"`` \| ``"login"`` \| ``"UpdateUserData"`` \| ``"RestorePassword"`` \| ``"AddDishFavor"`` \| ``"captchaGetJob"`` \| ``"registrationApp"`` \| ``"logout"`` \| ``"userDelete"`` \| ``"locationCreate"`` \| ``"locationDelete"``

___

### UserBusEvent

Ƭ **UserBusEvent**: { `errorCb`: (`err`: `unknown`) => `void` ; `loading?`: `BehaviorSubject`<`boolean`\>  } & `UserBusEventMixin`<``"captchaGetJob"``, [`CaptchaJobPayload`](interfaces/CaptchaJobPayload.md), [`CaptchaJob`](interfaces/CaptchaJob.md)<`any`\>\> \| `UserBusEventMixin`<``"registrationApp"``, [`RegistrationPayload`](README.md#registrationpayload), [`UserResponse`](interfaces/UserResponse.md)\> \| `UserBusEventMixin`<``"OTPRequest"``, [`OTPRequestPayload`](interfaces/OTPRequestPayload.md), [`OTPResponse`](interfaces/OTPResponse.md)\> \| `UserBusEventMixin`<``"login"``, [`LoginPayload`](README.md#loginpayload), [`UserResponse`](interfaces/UserResponse.md)\> \| `UserBusEventMixin`<``"UpdateUserData"``, [`UpdateUserDataPayload`](README.md#updateuserdatapayload), [`UserResponse`](interfaces/UserResponse.md)\> \| `UserBusEventMixin`<``"RestorePassword"``, [`RestorePasswordPayload`](interfaces/RestorePasswordPayload.md), [`UserResponse`](interfaces/UserResponse.md)\> \| `UserBusEventMixin`<``"AddDishFavor"``, `string`, `boolean`\> \| `UserBusEventMixin`<``"logout"``, ``null``, [`Response`](interfaces/Response.md)\> \| `UserBusEventMixin`<``"userDelete"``, `string`, [`Response`](interfaces/Response.md)\> \| `UserBusEventMixin`<``"locationCreate"``, [`InputLocation`](interfaces/InputLocation.md), `boolean`\> \| `UserBusEventMixin`<``"locationDelete"``, `string`, `boolean`\>

## Functions

### generateQueryString

▸ **generateQueryString**<`T`, `N`, `GQLRequestVariables`\>(`options`): `string`

**`Function`**

generateQueryString()
Функция - генератор строки запроса к серверу GraphQL.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``null`` \| `string` \| `number` \| `bigint` \| `boolean` \| {} \| `Symbol` |
| `N` | extends `string` |
| `GQLRequestVariables` | `GQLRequestVariables` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | объект с данными, необходимыми для формирования запроса, где: |
| `options.name` | `N` | название операции, объвленное в схеме сервера GraphQL. |
| `options.queryObject` | `T` | объект-источник информации о структуре запрашиваемых данных |
| `options.variables?` | `GQLRequestVariables` | необязательный объект с переменными, передаваемыми в качестве параметров запроса. В качестве типа параметров допустимо использовать типы - number, string, object или boolean. |
| `options.requiredFields?` | keyof `GQLRequestVariables`[] | необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`. (например у параметра указан тип String!, а не String). |
| `options.fieldsTypeMap?` | `Map`<keyof `GQLRequestVariables`, `string`\> | необязательный объект Map, в качестве ключей содержащий названия параметров запроса, а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL. ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный. |

#### Returns

`string`

часть строки запроса к серверу GraphQL для переданной операции N с параметрами? перечисленными в V.
 НЕ ВКЛЮЧАЕТ начало, содержащее ключевое слово query, mutation или subscription

___

### generateUUID

▸ **generateUUID**(`win`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `win` | ``null`` \| `Window` & typeof `globalThis` |

#### Returns

`string`

## Events

### CartBusEvent

Ƭ **CartBusEvent**: [`CartBusEventAdd`](interfaces/CartBusEventAdd.md) \| [`CartBusEventUpdate`](interfaces/CartBusEventUpdate.md) \| [`CartBusEventRemove`](interfaces/CartBusEventRemove.md) \| [`CartBusEventSetAmountToDish`](interfaces/CartBusEventSetAmountToDish.md) \| [`CartBusEventSetCommentToDish`](interfaces/CartBusEventSetCommentToDish.md) \| [`CartBusEventCheck`](interfaces/CartBusEventCheck.md) \| [`CartBusEventSend`](interfaces/CartBusEventSend.md)

**`Alias`**

CartBusEvent
Тип, описывающий события, которые отслеживаются в потоке NgGqlService.orderBus$.

___

• **CartBusEventBase**<`T`\>: `Object`

CartBusEventBase Базовый интерфейс событий в шине событий

#### Type parameters

| Name |
| :------ |
| `T` |

• **CartBusEventAdd**: `Object`

CartBusEventAdd
Добавление в заказ (корзину).

• **CartBusEventUpdate**: `Object`

CartBusEventUpdate
Обновление данных в заказе? НЕ связанных с блюдами.

• **CartBusEventRemove**: `Object`

CartBusEventRemove
Удаление блюда из заказа (корзины).

• **CartBusEventSetAmountToDish**: `Object`

CartBusEventSetToDish
Установить количество порций или комментарий для блюда
Данные необходимого блюда и требуемое количество указываются в

**`Field`**

data

• **CartBusEventSetCommentToDish**: `Object`

CartBusEventSetToDish
Установить количество порций или комментарий для блюда
Данные необходимого блюда и требуемое количество указываются в

**`Field`**

data

• **CartBusEventCheck**: `Object`

CartBusEventCheck
Отправка заказа на проверку перед оформлением.

• **CartBusEventSend**: `Object`

CartBusEventSend
Отправка заказа на оформление
