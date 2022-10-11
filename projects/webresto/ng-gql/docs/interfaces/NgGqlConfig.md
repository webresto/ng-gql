# Interface: NgGqlConfig

Обьект с параметрами настройки библиотеки для определенного сервера-API

## Table of contents

### Properties

- [url](NgGqlConfig.md#url)
- [nesting](NgGqlConfig.md#nesting)
- [obsolescence](NgGqlConfig.md#obsolescence)
- [busSubscribeMode](NgGqlConfig.md#bussubscribemode)
- [customFields](NgGqlConfig.md#customfields)
- [orderIdStorageToken](NgGqlConfig.md#orderidstoragetoken)
- [phoneCode](NgGqlConfig.md#phonecode)
- [usePersistCache](NgGqlConfig.md#usepersistcache)
- [apolloCacheConfig](NgGqlConfig.md#apollocacheconfig)

## Properties

### url

• **url**: `string`

URL API сервера GraphQL

___

### nesting

• **nesting**: `number`

Уровень вложенности групп с блюдами друг в друга.

___

### obsolescence

• `Optional` **obsolescence**: `number`

Необязательный параметр.
Определяет период времени (в днях), по истечении которого orderId, сохраненный в localStorage, будет считаться старым и не будет использоваться.

___

### busSubscribeMode

• **busSubscribeMode**: ``"subscribe"`` \| ``"custom"``

Способ подписки на события шины.
При выборе параметра 'subscribe' - библиотека будет автоматически подписываться на события в шине и также автоматически отпишется от нее при завершении работы.
В случае выбора параметра 'custom' - подписка на события и управление ею производится на стороне проекта разработчиком самостоятельно, к примеру, используя asyncPipe.

___

### customFields

• `Optional` **customFields**: `Object`

**`Deprecated`**

Используй InjectionToken нужных моделей для конфигурации объектов запросов.
Можно дополнительно импортировать стандартный объект конфигурации запроса для данной модели, если требуются незначительные изменения.
Например:
```ts
import { NgGqlModule, DISH_FRAGMENTS, defaultDishFragments } from '@webresto/ng-gql';
...
const myDishFragment:ValuesOrBoolean<Dish> = {
                                             здесь описываете ваш объект конфигурации для запроса
                                             };
...
@NgModule({
  ...
  providers: [
               .... ваши провайдеры
                { provide: DISH_FRAGMENTS , useValue: myDishFragment }
           ]
})
export class AppModule {
```

Необязательный объект с дополнительной пользовательской информацией о пользовательских свойствах,
добавленных в базовые модели на стороне конкретного сервера и объявленные в схеме GraphQL на сервере.
В качестве ключей указывается название модели, в качестве значений - объекты,
содержащие часть конфигурации `ValuesOrBoolean` этой модели, отражающую отличия с базовой моделью.

**`See`**

**`Alias`**

ValuesOrBoolean<T>

#### Index signature

▪ [modelName: `string`]: [`ValuesOrBoolean`](../README.md#valuesorboolean)<`unknown`\>

___

### orderIdStorageToken

• `Optional` **orderIdStorageToken**: ``null`` \| `string`

Токен, с которым в localStorage будут храниться id заказов.
Если не задан - используется токен по умолчанию -'${ window.location.host }-orderId'.
Если задан null - корзина не будет загружаться при старте приложения, потоки будут ожидать,
пока в поток `NgOrderService.storageOrderIdToken$` не будет передана строка с токеном.

___

### phoneCode

• **phoneCode**: ``null`` \| `string`

Телефонный код страны

___

### usePersistCache

• `Optional` **usePersistCache**: `boolean`

Параметр, включающий использование persist-кэша.
Если установлен в true - кэш запросов Apollo будет сохраняться и восстанавливаться между сеансами, используя localStorage
Логика работы с хранилищем кэша полностью реализована и инкапусулирована в подключенной библиотеке apollo3-cache-persist.
По умолчанию - true.

___

### apolloCacheConfig

• `Optional` **apolloCacheConfig**: `InMemoryCacheConfig`

Объект с дополнительными параметрами конфигруации InMemoryCache для Apollo-клиента.
При передаче параметров, уже заданных в NgGqlModule, стандартные значения будут заменены значениями, полученными в `apolloCacheConfig`.
