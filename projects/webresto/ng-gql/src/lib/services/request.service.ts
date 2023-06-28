import { Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client';
import { deepClone, isValue } from '@axrl/common';
import type { ExtraSubscriptionOptions } from 'apollo-angular';
import { gql } from 'apollo-angular';
import type { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs';
import type { GQLRequestVariables, ValuesOrBoolean } from '../models';
import { generateQueryString } from '../models';
import { ApolloService } from './apollo.service';

/**
 * Объект настройки генерации части строки запроса с описанием типов параметров операции.
 */
export interface QueryGenerationParam<V> {
  /**
   * Необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
   * (например у параметра указан тип String!, а не String).
   * ВАЖНО! КРОМЕ ключей, для которых названия типов передаются в `fieldsTypeMap`.
   */
  requiredFields?: (keyof V)[];

  /**
   * Необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
   * а в качестве значения - строки-названия соответствующих им типов, определенных в схеме сервера GraphQL.
   * ВАЖНО! Строка также должна включать символ "!", если в схеме параметр определен как обязательный.
   */
  fieldsTypeMap?: Map<keyof V, string>;
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private apollo: ApolloService) {}

  /**
   * @method customQuery$() для выполнения запросов типа "query" к серверу API GraphQL
   * @typeParam T Тип запрашиваемых данных, по которому построен объект @param queryObject.
   * @typeParam N Строка-название операции из схемы сервера GraphQL.
   * @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
   * @param name - название операции, объвленное в схеме сервера GraphQL.
   * @param queryObject - объект-источник информации о структуре запрашиваемых данных в виде обьекта, реализующего интерфейс ValuesOrBoolean<T>.
   * @see @alias ValuesOrBoolean<T>
   *
   * @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
   *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
   *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
   *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как необязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
   *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
   * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
   * @param options.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
   * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
   *    (например у параметра указан тип String!, а не String).
   * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
   * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
   * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
   *
   * @returns - Observable поток с результатом получения данных от сервера в формате объекта с одним ключом N (название операции), значение которого - непосредственно запрошенные данные
   *  в виде одиночного объекта либо массива.
   **/
  customQuery$<
    T extends {},
    N extends `${string}`,
    V extends OperationVariables = GQLRequestVariables
  >(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables?: V,
    paramOptions?: QueryGenerationParam<V>
  ): Observable<Record<N, T | T[]>> {
    return this.apollo
      .watchQuery<Record<N, T | T[]>, V>({
        query: gql`query ${generateQueryString({
          name,
          queryObject,
          variables,
          requiredFields: paramOptions?.requiredFields,
          fieldsTypeMap: paramOptions?.fieldsTypeMap,
        })}`,
        variables,
      })
      .pipe(
        map((res) => (res.error || res.errors ? null : res.data)),
        filter((data): data is Record<N, T | T[]> => !!data)
      );
  }

  /**
   * @method customMutation$() для выполнения запросов типа "mutation" к серверу API GraphQL
   * @typeParam T Тип мутируемых данных, по которому построен объект @param queryObject
   * @typeParam N Строка-название операции из схемы сервера GraphQL.
   * @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
   * @param name - название операции, объвленное в схеме сервера GraphQL.
   * @param queryObject - объект-источник информации о структуре запрашиваемых данных в виде обьекта, реализующего интерфейс ValuesOrBoolean<T>.
   * @see @alias ValuesOrBoolean<T>
   * @param variables - обязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
   *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
   *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
   *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
   *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
   * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
   * @param options.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
   * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
   *    (например у параметра указан тип String!, а не String).
   * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
   * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
   * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
   *
   * @returns - Observable поток с результатом выполнения операции в формате объекта с одним ключом N (название операции), значение которого - непосредственно результат операции.
   **/
  customMutation$<T extends {}, N extends `${string}`, V = GQLRequestVariables>(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables: V,
    paramOptions?: QueryGenerationParam<V>
  ): Observable<Record<N, T>> {
    return this.apollo
      .mutate<Record<N, T>, V>({
        mutation: gql`mutation ${generateQueryString({
          name,
          queryObject,
          variables,
          requiredFields: paramOptions?.requiredFields,
          fieldsTypeMap: paramOptions?.fieldsTypeMap,
        })}`,
        variables,
      })
      .pipe(
        map((result) => (isValue(result) ? result.data : null)),
        filter((res): res is Record<N, T> => !!res)
      );
  }

  /**
   * @method customSubscribe$() для выполнения запросов типа "subscription" к серверу API GraphQL
   * @typeParam T Тип данных, на обновление которых производится подписка и по которому построен объект @param queryObject
   * @typeParam N Строка-название операции из схемы сервера GraphQL.
   * @typeParam V = GQLRequestVariables Описание типа объекта с переменными для выполнения операции, описанными в схеме сервера GraphQL.
   * @param name - название операции, объвленное в схеме сервера GraphQL.
   * @param queryObject - объект-источник информации о структуре данных, на которые происходит подписка, реализующий интерфейс ValuesOrBoolean<T>.
   * @see @alias ValuesOrBoolean<T>
   * @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
   *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
   *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
   *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
   *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
   * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
   * @param options.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
   * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
   *    (например у параметра указан тип String!, а не String).
   * @param options.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
   * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
   * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
   *
   * @returns - Observable поток с данными типа T, которые будут поступать в рамках сделанной подписки.
   * ВАЖНО! В потоке будут поступать только обновления для данных, на которые сделана подписка.
   * Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
   * В ситуациях, где требуется получить некие данные и подписаться на обновления для них, также можно для удобства использовать метод queryAndSubscribe.
   * @see this.queryAndSubscribe
   **/
  customSubscribe$<
    T extends {},
    N extends `${string}`,
    V = GQLRequestVariables
  >(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables?: V,
    paramOptions?: QueryGenerationParam<V>,
    extra?: ExtraSubscriptionOptions
  ): Observable<Record<N, T>[N]> {
    const q = generateQueryString({
      name,
      queryObject,
      variables,
      requiredFields: paramOptions?.requiredFields,
      fieldsTypeMap: paramOptions?.fieldsTypeMap,
    });
    return this.apollo
      .subscribe<Record<N, T>, V>(
        { query: gql`subscription ${q}`, variables },
        extra
      )
      .pipe(
        map((result) => result.data),
        filter((res): res is Record<N, T> => !!res),
        map((res) => res[name])
      );
  }

  /**
   * @method queryAndSubscribe()
   * Метод, объединяющий получение неких первоначальных данных и подписку на их обновление.
   * @param nameQuery - название операции типа "query" - запроса данных, объвленное в схеме сервера GraphQL.
   * @param nameSubscribe - название операции типа "subscription", объвленное в схеме сервера GraphQL  для запрашиваемых данных.
   * @param queryObject - объект-источник информации о структуре запрашиваемых данных, на которые происходит подписка, реализующий интерфейс ValuesOrBoolean<T>.
   * @see @alias ValuesOrBoolean<T>
   * @param uniqueKeyForCompareItem - наименование ключа, значение которого является уникальным для запрашиваемых данных (например,'id').
   * Необходим для работы внутренней вспомогательной функции обновления изначального набора данных актуальными данными, поступившими в рамках подписки.
   * @param variables - необязательный - объект с переменными, которые будут использованы в качестве параметров запроса.
   *  Названия ключей в объекте должны соответствовать названиям параметров, объявленным в GrapQL-схеме сервера.
   *  В качестве типа значений у параметров допустимо использовать типы - number, string, object или boolean.
   *  Если в GrapQL-схеме на сервере какие-то из параметров отмечены как обязательные, то названия этих ключей требуется дополнительно передать в requiredFields,
   *  чтобы генератор строки запроса сделал соответствующие отметки о типе в результирующей строке запроса.
   * @param paramOptions - необязательный - Обект настройки генерации части строки запроса с описанием типов параметров операции.
   * @param paramOptions.requiredFields - необязательный массив названий ключей параметров запроса, для которых в схеме был установлен обязательный тип
   * КРОМЕ ключей, для которых названия типов передаются в `options.fieldsTypeMap`.
   *    (например у параметра указан тип String!, а не String).
   * @param paramOptions.fieldsTypeMap - необязательный объект Map, в качестве ключей содержащий названия параметров запроса,
   * а в качестве значения - строку с названием его типа, определенного в схеме сервера GraphQL.
   * ВАЖНО! - строка также должна включать символ "!", если в схеме параметр определен как обязательный.
   * @returns - Observable поток с данными, которые будут поступать в рамках сделанной подписки.
   * Важно! В потоке будут поступать только обновления для данных, на которые сделана подписка.
   * Начальные данные в этом потоке не поступают - их требуется получать отдельно (например, используя метод customQuery$).
   **/
  queryAndSubscribe<
    T extends {},
    NQuery extends `${string}`,
    NSubscribe extends `${string}`,
    VQ extends OperationVariables = Exclude<
      GQLRequestVariables,
      'query' | 'subscribe'
    >,
    VS = Exclude<GQLRequestVariables, 'query' | 'subscribe'>
  >(
    nameQuery: NQuery,
    nameSubscribe: NSubscribe,
    queryObject: ValuesOrBoolean<T>,
    uniqueKeyForCompareItem: keyof T,
    variables?: {
      query?: VQ;
      subscribe?: VS;
    },
    paramOptions?: {
      query?: QueryGenerationParam<VQ>;
      subscribe?: QueryGenerationParam<VS>;
    }
  ): Observable<T[]> {
    const updateFn: (store: T | T[], subscribeValue: T) => T[] = (
      store,
      newValue
    ) => {
      const array = Array.isArray(store) ? store : [store];
      const findItem = array.find(
        (item) =>
          newValue[uniqueKeyForCompareItem] === item[uniqueKeyForCompareItem]
      );
      if (findItem) {
        Object.assign(findItem, newValue);
        return array;
      } else {
        return [...array, newValue];
      }
    };

    const apolloQueryOptions = {
      query: gql`query ${generateQueryString<ValuesOrBoolean<T>, NQuery, VQ>({
        name: nameQuery,
        queryObject,
        variables: variables?.query,
        requiredFields: paramOptions?.query?.requiredFields,
        fieldsTypeMap: paramOptions?.query?.fieldsTypeMap,
      })}`,
      variables: variables?.query,
    };

    return this.apollo
      .watchQuery<Record<NQuery, T | T[]>, VQ>(apolloQueryOptions)
      .pipe(
        map((res) => {
          return res.error ?? res.data;
        }),
        filter((data): data is Record<NQuery, T | T[]> => !!data),
        switchMap((result) =>
          this.customSubscribe$<T, NSubscribe, VS>(
            nameSubscribe,
            queryObject,
            variables?.subscribe,
            paramOptions?.subscribe
          ).pipe(
            startWith(null),
            map((updatedValue) => {
              const store: T | T[] = deepClone(result[nameQuery]);
              const final = isValue(updatedValue)
                ? updateFn(store, deepClone(updatedValue))
                : Array.isArray(store)
                ? store
                : <T[]>[store];

              return final;
            })
          )
        )
      );
  }
}
