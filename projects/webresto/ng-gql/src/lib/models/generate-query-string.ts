/** Обобщенный тип для объекта criteria, передаваемого в качестве параметра для некоторых запросов к серверу GraphQL.
 * Формируется по правилам Waterline query language. 
 * Подробнее: https://docs.webresto.org/docs/data/criteria/
*/
export type VCriteria = {
  /** Объект Waterline query language*/
  criteria: {
    [key: string]: any;
  };
};

type FieldTypes = Object | number | bigint | Symbol | string | boolean | null | undefined;

/** Функция - генератор строки запроса к серверу GraphQL.
 * @param options - объект с данными, необходимыми для формирования запроса, где:
 *  name - название операции, объвленное в схеме сервера GraphQL.
 *  queryObject - объект-источник информации о структуре запрашиваемых данных
 *  variables - необязательный объект с переменными, передаваемыми в качестве параметров запроса. В качестве типа 
 *    параметров допустимо использовать типы - number, string, object или boolean. 
 *  optionalFields - массив названий ключей параметров запроса, для которых в схеме был установлен необязательный тип  
 *    (например у параметра указан тип String!, а не String).
 * @returns часть строки запроса к серверу GraphQL для переданной операции N с параметрами? перечисленными в V. 
 *  НЕ ВКЛЮЧАЕТ начало, содержащее ключевое слово query, mutation или subscription 
 */
export function generateQueryString<T, N extends `${string}`, V = unknown>(options: {
  name: N,
  queryObject: T,
  variables: V,
  optionalFields?: string[];
}) {
  const { name, queryObject, variables } = options;
  const makeFieldList = <T, V>(source: T, name: string, indent: number = 1, variables?: V): string => {
    const indentString = new Array<string>(indent * 2).fill(' ').join('');
    return `${name}${indent === 1 && variables ? `(${(<(keyof V)[]>Object.keys(variables)).map(
      key => `${key}:$${key}`
    ).join(',')
      })` : ''} {\n  ${indentString}${Object.entries(source).
        filter(
          (entry): entry is [string, FieldTypes] => typeof entry[1] !== 'function'
        ).
        map(
          entry => typeof entry[1] === 'object' && entry[1] !== undefined && entry[1] !== null ?
            makeFieldList(
              Array.isArray(entry[1]) && entry[1][0] ? entry[1][0] : entry[1], entry[0], indent + 1
            ) :
            typeof entry[1] === 'string' && entry[1].includes('Fragment') ?
              `${entry[0]} : {...${entry[1]}}` :
              String(entry[0])
        ).join(
          `,\n  ${indentString}`
        )
      }\n${indentString}}
      `;
  };
  const getGqlType = (value: FieldTypes, optionalField: boolean = false): string => {
    switch (typeof value) {
      case 'number': return optionalField ? 'Int!' : 'Int';
      case 'string': return optionalField ? 'String!' : "String";
      case 'boolean': return optionalField ? 'Boolean!' : 'Boolean';
      case 'object': return optionalField ? 'Json!' : 'Json';
      default: throw new Error('Параметр должен принадлежать типам number, string, object или boolean');
    }
  };
  return ` load${name[0].toUpperCase() + name.slice(1)} ${variables ? `(${(<(keyof V)[]>Object.keys(variables)).map(
    key => `$${key}:${getGqlType(variables[key], options.optionalFields && options.optionalFields.includes(String(key)))}`
  ).join(',')
    })` : ''} {\n${makeFieldList(queryObject, name, 1, variables)}\n}`;
}