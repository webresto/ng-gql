# Interface: QueryGenerationParam\<V\>

Объект настройки генерации части строки запроса с описанием типов параметров операции.

## Type parameters

| Name |
| :------ |
| `V` |

## Table of contents

### Properties

- [requiredFields](QueryGenerationParam.md#requiredfields)
- [fieldsTypeMap](QueryGenerationParam.md#fieldstypemap)

## Properties

### requiredFields

• `Optional` **requiredFields**: keyof `V`[]

Необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
(например у параметра указан тип String!, а не String).
ВАЖНО! КРОМЕ ключей, для которых названия типов передаются в `fieldsTypeMap`.

___

### fieldsTypeMap

• `Optional` **fieldsTypeMap**: `Map`\<keyof `V`, `string`\>

Необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
а в качестве значения - строки-названия соответствующих им типов, определенных в схеме сервера GraphQL.
ВАЖНО! Строка также должна включать символ "!", если в схеме параметр определен как обязательный.
