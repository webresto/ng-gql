import {isValue, objectEntries, objectKeys} from '@axrl/common';

/**
 * @alias VCriteria
 * Обобщенный тип для объекта criteria, передаваемого в качестве параметра для некоторых запросов к серверу GraphQL.
 * Формируется по правилам Waterline query language.
 * Подробнее: https://docs.webresto.org/docs/data/criteria/
 */
export type VCriteria = {
  /** Объект Waterline query language*/
  criteria: Record<string, any>;
};

/**
 * @alias GQLRequestVariables
 * Тип, описывающий необязательный обьект переменных-параметров запроса к серверу GraphQL API, ключи которого , описаны для запроса в схеме GraphQL сервера, с соответствующими им значениями.
 * В качестве ключей выступают строки, соответствующие названиям параметров.
 * Значения - соответствующие им значения, при этом значения должны принадлежать типам number, string, object или boolean
 *
 */
export type GQLRequestVariables =
  | Record<string, number | string | Object | boolean | null | undefined>
  | VCriteria;

function makeFieldList<T extends {} | string | boolean | number | bigint | Symbol | null, V>(
  source: T,
  name: string,
  indent: number = 1,
  variables?: V,
): string {
  const indentString = new Array<string>(indent * 2).fill(' ').join('');
  const isObjectWithProperties =
    typeof source === 'object' && isValue(source) && objectKeys(source).length > 0;

  return `${name}${
    indent === 1 && variables
      ? `(${objectKeys(variables)
          .filter(key => isValue(variables[key]))
          .map(key => `${String(key)}:$${String(key)}`)
          .join(',')})`
      : ''
  } ${isObjectWithProperties ? '  {\n' : ''} ${indentString}${
    isObjectWithProperties
      ? objectEntries(source)
          .filter(entry => typeof entry[1] !== 'function' && entry[0] !== '__typename')
          .map(([entry0, entry1]) =>
            typeof entry1 === 'object' && entry1 !== undefined && entry1 !== null
              ? makeFieldList(
                  Array.isArray(entry1) && (<Array<unknown>>entry1)[0]
                    ? (<Array<string | number | bigint | boolean | {} | unknown[] | Symbol | null>>(
                        entry1
                      ))[0]
                    : entry1,
                  String(entry0),
                  indent + 1,
                )
              : typeof entry1 === 'string' && (<string>entry1).includes('Fragment')
              ? `${String(entry0)} : {...${entry1}}`
              : String(entry0),
          )
          .join(`,\n  ${indentString}`)
      : ''
  }\n${indentString} ${isObjectWithProperties ? '}' : ''}      `;
}

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
export function generateQueryString<
  T extends {} | string | boolean | number | bigint | Symbol | null,
  N extends `${string}`,
  GQLRequestVariables,
>(options: {
  name: N;
  queryObject: T;
  variables?: GQLRequestVariables;
  requiredFields?: (keyof GQLRequestVariables)[];
  fieldsTypeMap?: Map<keyof GQLRequestVariables, string>;
}) {
  const {name, queryObject, variables} = options;

  const getGqlType = <K extends keyof GQLRequestVariables>(
    key: K,
    value: GQLRequestVariables[K],
    optionalField: boolean = false,
    fieldsTypeMap?: Map<keyof GQLRequestVariables, string>,
  ): string => {
    switch (true) {
      case isValue(fieldsTypeMap) && fieldsTypeMap.has(key):
        return fieldsTypeMap?.get(key)!;
      case typeof value === 'number':
        return optionalField ? 'Int!' : 'Int';
      case typeof value === 'string':
        return optionalField ? 'String!' : 'String';
      case typeof value === 'boolean':
        return optionalField ? 'Boolean!' : 'Boolean';
      case typeof value === 'object':
        return optionalField ? 'Json!' : 'Json';
      default:
        throw new Error('Параметр должен принадлежать типам number, string, object или boolean');
    }
  };
  return ` load${name[0].toUpperCase() + name.slice(1)} ${
    isValue(variables)
      ? `(${objectKeys(variables)
          .filter(key => isValue(variables[key]))
          .map(k => {
            const key = <keyof GQLRequestVariables>k;

            return `$${String(key)}:${getGqlType(
              key,
              variables[key],
              options.requiredFields && options.requiredFields.includes(key),
              options.fieldsTypeMap,
            )}`;
          })
          .join(',')})`
      : ''
  } {\n${makeFieldList(queryObject, name, 1, variables)}\n}`;
}
