# Interface: NavigationLoader<T\>

**`Interface`**

NavigationLoader<T>
Интерфейс объекта для потока, в котором происходит загрузка массива обьъектов навигации для прилоржения.

**`Property`**

Объект ValuesOrBoolean для загрузки навигации

**`Property`**

наименование ключа, значение которого является уникальным для запрашиваемых данных (например,'id').
Необходим для работы внутренней вспомогательной функции обновления изначального набора данных актуальными данными, поступившими в рамках подписки.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [nameQuery](NavigationLoader.md#namequery)
- [nameSubscribe](NavigationLoader.md#namesubscribe)
- [queryObject](NavigationLoader.md#queryobject)
- [uniqueKeyForCompareItem](NavigationLoader.md#uniquekeyforcompareitem)

## Properties

### nameQuery

• **nameQuery**: `string`

___

### nameSubscribe

• **nameSubscribe**: `string`

___

### queryObject

• **queryObject**: [`ValuesOrBoolean`](../README.md#valuesorboolean)<`T`, `T`, `T` extends `T` ? `T` : `never`\>

___

### uniqueKeyForCompareItem

• **uniqueKeyForCompareItem**: keyof `T`
