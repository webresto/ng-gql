import { isValue } from '@axrl/common';

type StringKeysType = {
  [ key: string ]: number | string | object | boolean | null | undefined;
};

/**
 * @alias VCriteria
 * Обобщенный тип для объекта criteria, передаваемого в качестве параметра для некоторых запросов к серверу GraphQL.
 * Формируется по правилам Waterline query language.
 * Подробнее: https://docs.webresto.org/docs/data/criteria/
*/
export type VCriteria = {
  /** Объект Waterline query language*/
  criteria: {
    [ key: string ]: any;
  };
};

type FieldTypes = Object | number | bigint | Symbol | string | boolean | null | undefined;

/**
 * @alias GQLRequestVariables
 * Тип, описывающий необязательный обьект переменных-параметров запроса к серверу GraphQL API, ключи которого , описаны для запроса в схеме GraphQL сервера, с соответствующими им значениями.
 * В качестве ключей выступают строки, соответствующие названиям параметров.
 * Значения - соответствующие им значения, при этом значения должны принадлежать типам number, string, object или boolean
 *
 */
export type GQLRequestVariables = VCriteria | {
  [ key: string ]: number | string | Object | boolean | null | undefined;
};

/**
 * @function generateQueryString()
 * Функция - генератор строки запроса к серверу GraphQL.
 * @param options - объект с данными, необходимыми для формирования запроса, где:
 * @param options.name - название операции, объвленное в схеме сервера GraphQL.
 * @param options.queryObject - объект-источник информации о структуре запрашиваемых данных
 * @param options.variables - необязательный объект с переменными, передаваемыми в качестве параметров запроса. В качестве типа
 *    параметров допустимо использовать типы - number, string, object или boolean.
 * @param options.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
 * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
 *    (например у параметра указан тип String!, а не String).
 * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
 * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
 * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
 * @returns часть строки запроса к серверу GraphQL для переданной операции N с параметрами? перечисленными в V.
 *  НЕ ВКЛЮЧАЕТ начало, содержащее ключевое слово query, mutation или subscription
 */
export function generateQueryString<T extends object, N extends `${ string }`, GQLRequestVariables>(options: {
  name: N,
  queryObject: T,
  variables?: GQLRequestVariables,
  requiredFields?: (keyof GQLRequestVariables)[];
  fieldsTypeMap?: Map<keyof GQLRequestVariables, string>;
}) {
  const { name, queryObject, variables } = options;
  const makeFieldList = <T extends object, V>(source: T, name: string, indent: number = 1, variables?: V): string => {
    const indentString = new Array<string>(indent * 2).fill(' ').join('');
    return `${ name }${ indent === 1 && variables ? `(${ (<(keyof V)[]> Object.keys(variables)).filter(
      key => isValue(variables[ key ])
    ).map(
      key => `${ String(key) }:$${ String(key) }`
    ).join(',')
      })` : '' } {\n  ${ indentString }${ Object.entries(source).
        filter(
          (entry): entry is [ string, FieldTypes ] => typeof entry[ 1 ] !== 'function' && entry[ 0 ] !== '__typename'
        ).
        map(
          entry => typeof entry[ 1 ] === 'object' && entry[ 1 ] !== undefined && entry[ 1 ] !== null ?
            makeFieldList(
              Array.isArray(entry[ 1 ]) && entry[ 1 ][ 0 ] ? entry[ 1 ][ 0 ] : entry[ 1 ], entry[ 0 ], indent + 1
            ) :
            typeof entry[ 1 ] === 'string' && entry[ 1 ].includes('Fragment') ?
              `${ entry[ 0 ] } : {...${ entry[ 1 ] }}` :
              String(entry[ 0 ])
        ).join(
          `,\n  ${ indentString }`
        )
      }\n${ indentString }}
      `;
  };
  const getGqlType = <K extends keyof GQLRequestVariables>(key: K, value: GQLRequestVariables[ K ], optionalField: boolean = false, fieldsTypeMap?: Map<keyof GQLRequestVariables, string>): string => {
    switch (true) {
      case isValue(fieldsTypeMap) && fieldsTypeMap.has(key): return fieldsTypeMap?.get(key)!;
      case typeof value === 'number': return optionalField ? 'Int!' : 'Int';
      case typeof value === 'string': return optionalField ? 'String!' : "String";
      case typeof value === 'boolean': return optionalField ? 'Boolean!' : 'Boolean';
      case typeof value === 'object': return optionalField ? 'Json!' : 'Json';
      default: throw new Error('Параметр должен принадлежать типам number, string, object или boolean');
    }
  };
  return ` load${ name[ 0 ].toUpperCase() + name.slice(1) } ${ variables ? `(${ (<(keyof GQLRequestVariables)[]> Object.keys(variables)).filter(
    key => isValue(variables[ key ])
  ).map(
    key => `$${ String(key) }:${ getGqlType(key, variables[ key ], options.requiredFields && options.requiredFields.includes(key), options.fieldsTypeMap) }`
  ).join(',')
    })` : '' } {\n${ makeFieldList(queryObject, name, 1, variables) }\n}`;
}