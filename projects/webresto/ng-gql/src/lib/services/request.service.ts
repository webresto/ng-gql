import { EventEmitter, Inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client';
import { deepClone, isValue } from '@axrl/common';
import type { ExtraSubscriptionOptions } from 'apollo-angular';
import { gql } from 'apollo-angular';
import type { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  mergeWith,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import type { Action, GQLRequestVariables, Message, ValuesOrBoolean } from '../models';
import { ACTION_FRAGMENTS, MESSAGE_FRAGMENTS, generateQueryString } from '../models';
import { ApolloService } from './apollo.service';

/**
 * Configuration object for generating part of the query string with a description of operation parameter types.
 */
export interface QueryGenerationParam<V> {
  /**
   * Optional array of query parameter key names for which a mandatory type was set in the schema
   * (e.g., the parameter type is String! instead of String).
   * IMPORTANT! EXCEPT for keys for which type names are passed in `fieldsTypeMap`.
   */
  requiredFields?: Array<keyof V>;

  /**
   * Optional Map object containing query parameter names as keys,
   * and strings representing their corresponding types defined in the GraphQL server schema as values.
   * IMPORTANT! The string must also include the "!" symbol if the parameter is defined as mandatory in the schema.
   */
  fieldsTypeMap?: Map<keyof V, string>;
}

@Injectable()
export class RequestService {
  private _eventMessage: EventEmitter<Partial<Message>> = new EventEmitter();
  private _eventAction: EventEmitter<Partial<Action>> = new EventEmitter();

  /**
   * Observable stream that will receive events for the current order in the checkout process, implying some actions on the frontend side performed by the user
   * (navigating to the payment page or, for example, opening a dialog box with a promotional dish offer, promotions, etc.)
   * To get the stream, use the method @method this.getActionEmitter()
   * To send custom messages to the stream, use @method this.emitActionEvent()
   */
  private readonly _actions$ = this.customSubscribe$<Action, 'action'>(
    'action',
    this._defaultActionFragments,
  ).pipe(
    mergeWith(this._eventAction.asObservable()),
    distinctUntilKeyChanged('id'),
    shareReplay(1),
  );

  /**
   * Observable stream that will receive informational messages for the current order (dish added/removed/order placed).
   * To get the stream, use the method @method this.getMessageEmitter()
   * To send custom messages to the stream, use @method this.emitMessageEvent()
   */
  private readonly _messages$ = this.customSubscribe$<Message, 'message'>(
    'message',
    this._defaultMessageFragments,
  ).pipe(
    mergeWith(this._eventMessage.asObservable()),
    distinctUntilKeyChanged('id'),
    shareReplay(1),
  );

  constructor(
    private _apollo: ApolloService,
    @Inject(ACTION_FRAGMENTS)
    private _defaultActionFragments: ValuesOrBoolean<Action>,
    @Inject(MESSAGE_FRAGMENTS)
    private _defaultMessageFragments: ValuesOrBoolean<Message>,
  ) { }

  emitMessageEvent(message: Partial<Message>): void {
    this._eventMessage.emit(message);
  }
  emitActionEvent(action: Partial<Action>): void {
    this._eventAction.emit(action);
  }

  getMessageEmitter(): Observable<Partial<Message>> {
    return this._messages$;
  }

  getActionEmitter(): Observable<Partial<Action>> {
    return this._actions$;
  }

  /**
   * @method customQuery$() for executing "query" type requests to the GraphQL API server
   * @typeParam T Type of requested data, based on which the object @param queryObject is built.
   * @typeParam N String name of the operation from the GraphQL server schema.
   * @typeParam V = GQLRequestVariables Description of the object type with variables for executing the operation, described in the GraphQL server schema.
   * @param name - operation name declared in the GraphQL server schema.
   * @param queryObject - source object for information about the structure of requested data in the form of an object implementing the ValuesOrBoolean<T> interface.
   * @see @alias ValuesOrBoolean<T>
   *
   * @param variables - optional - object with variables that will be used as request parameters.
   *  Key names in the object must correspond to parameter names declared in the server's GraphQL schema.
   *  Allowed value types for parameters are number, string, object, or boolean.
   *  If some parameters are marked as optional in the server's GraphQL schema, these key names need to be additionally passed in requiredFields,
   *  so that the query string generator makes appropriate type markings in the resulting query string.
   * @param paramOptions - optional - Configuration object for generating part of the query string with a description of operation parameter types.
   * @param options.requiredFields - optional array of query parameter key names for which a mandatory type was set in the schema
   * EXCEPT for keys for which type names are passed in `options.fieldsTypeMap`.
   *    (e.g., the parameter type is String! instead of String).
   * @param options.fieldsTypeMap - optional Map object containing query parameter names as keys,
   * and a string with the name of its type defined in the GraphQL server schema as a value.
   * IMPORTANT! - the string must also include the "!" symbol if the parameter is defined as mandatory in the schema.
   *
   * @returns - Observable stream with the result of receiving data from the server in the form of an object with one key N (operation name), the value of which is the directly requested data
   *  as a single object or an array.
   **/
  customQuery$<
    T extends {},
    N extends `${string}`,
    V extends OperationVariables = GQLRequestVariables,
  >(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables?: V,
    paramOptions?: QueryGenerationParam<V> & {
      fetchPolicy?: import('@apollo/client/core').WatchQueryFetchPolicy;
      errorPolicy?: import('@apollo/client/core').ErrorPolicy;
      context?: any;
    },
  ): Observable<Record<N, T | T[]>> {
    return this._apollo
      .watchQuery<Record<N, T | T[]>, V>({
        query: gql`query ${generateQueryString({
          name,
          queryObject,
          variables,
          requiredFields: paramOptions?.requiredFields,
          fieldsTypeMap: paramOptions?.fieldsTypeMap,
        })}`,
        variables,
        fetchPolicy: paramOptions?.fetchPolicy ?? 'cache-first',
        errorPolicy: paramOptions?.errorPolicy,
        context: paramOptions?.context,
      })
      .pipe(
        map(res => (res.error || res.errors ? null : res.data)),
        filter((data): data is Record<N, T | T[]> => !!data),
      );
  }

  /**
   * @method customMutation$() for executing "mutation" type requests to the GraphQL API server
   * @typeParam T Type of mutated data, based on which the object @param queryObject is built
   * @typeParam N String name of the operation from the GraphQL server schema.
   * @typeParam V = GQLRequestVariables Description of the object type with variables for executing the operation, described in the GraphQL server schema.
   * @param name - operation name declared in the GraphQL server schema.
   * @param queryObject - source object for information about the structure of requested data in the form of an object implementing the ValuesOrBoolean<T> interface.
   * @see @alias ValuesOrBoolean<T>
   * @param variables - mandatory - object with variables that will be used as request parameters.
   *  Key names in the object must correspond to parameter names declared in the server's GraphQL schema.
   *  Allowed value types for parameters are number, string, object, or boolean.
   *  If some parameters are marked as mandatory in the server's GraphQL schema, these key names need to be additionally passed in requiredFields,
   *  so that the query string generator makes appropriate type markings in the resulting query string.
   * @param paramOptions - optional - Configuration object for generating part of the query string with a description of operation parameter types.
   * @param options.requiredFields - optional array of query parameter key names for which a mandatory type was set in the schema
   * EXCEPT for keys for which type names are passed in `options.fieldsTypeMap`.
   *    (e.g., the parameter type is String! instead of String).
   * @param options.fieldsTypeMap - optional Map object containing query parameter names as keys,
   * and a string with the name of its type defined in the GraphQL server schema as a value.
   * IMPORTANT! - the string must also include the "!" symbol if the parameter is defined as mandatory in the schema.
   *
   * @returns - Observable stream with the result of operation execution in the form of an object with one key N (operation name), the value of which is the direct result of the operation.
   **/
  customMutation$<T extends {}, N extends `${string}`, V = GQLRequestVariables>(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables: V,
    paramOptions?: QueryGenerationParam<V>,
  ): Observable<Record<N, T>> {
    return this._apollo
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
        map(result => (isValue(result) ? result.data : null)),
        filter((res): res is Record<N, T> => !!res),
      );
  }

  /**
   * @method customSubscribe$() for executing "subscription" type requests to the GraphQL API server
   * @typeParam T Type of data for which subscription for updates is made and based on which the object @param queryObject is built
   * @typeParam N String name of the operation from the GraphQL server schema.
   * @typeParam V = GQLRequestVariables Description of the object type with variables for executing the operation, described in the GraphQL server schema.
   * @param name - operation name declared in the GraphQL server schema.
   * @param queryObject - source object for information about the structure of data subscribed to, implementing the ValuesOrBoolean<T> interface.
   * @see @alias ValuesOrBoolean<T>
   * @param variables - optional - object with variables that will be used as request parameters.
   *  Key names in the object must correspond to parameter names declared in the server's GraphQL schema.
   *  Allowed value types for parameters are number, string, object, or boolean.
   *  If some parameters are marked as mandatory in the server's GraphQL schema, these key names need to be additionally passed in requiredFields,
   *  so that the query string generator makes appropriate type markings in the resulting query string.
   * @param paramOptions - optional - Configuration object for generating part of the query string with a description of operation parameter types.
   * @param options.requiredFields - optional array of query parameter key names for which a mandatory type was set in the schema
   * EXCEPT for keys for which type names are passed in `options.fieldsTypeMap`.
   *    (e.g., the parameter type is String! instead of String).
   * @param options.fieldsTypeMap - optional Map object containing query parameter names as keys,
   * and a string with the name of its type defined in the GraphQL server schema as a value.
   * IMPORTANT! - the string must also include the "!" symbol if the parameter is defined as mandatory in the schema.
   *
   * @returns - Observable stream with data of type T that will arrive within the made subscription.
   * IMPORTANT! Only updates for data subscribed to will arrive in the stream.
   * Initial data does not arrive in this stream - it needs to be obtained separately (e.g., using the customQuery$ method).
   * In situations where it is required to get some data and subscribe to updates for it, the queryAndSubscribe method can also be used for convenience.
   * @see this.queryAndSubscribe
   **/
  customSubscribe$<T extends {}, N extends `${string}`, V = GQLRequestVariables>(
    name: N,
    queryObject: ValuesOrBoolean<T>,
    variables?: V,
    paramOptions?: QueryGenerationParam<V>,
    extra?: ExtraSubscriptionOptions,
  ): Observable<Record<N, T>[N]> {
    const q = generateQueryString({
      name,
      queryObject,
      variables,
      requiredFields: paramOptions?.requiredFields,
      fieldsTypeMap: paramOptions?.fieldsTypeMap,
    });
    return this._apollo
      .subscribe<Record<N, T>, V>({ query: gql`subscription ${q}`, variables }, extra)
      .pipe(
        map(result => result.data),
        filter((res): res is Record<N, T> => !!res),
        map(res => res[name]),
      );
  }

  /**
   * @method queryAndSubscribe()
   * Method combining retrieval of some initial data and subscription to their updates.
   * @param nameQuery - name of the "query" type operation - data request, declared in the GraphQL server schema.
   * @param nameSubscribe - name of the "subscription" type operation, declared in the GraphQL server schema for the requested data.
   * @param queryObject - source object for information about the structure of requested data to which subscription is made, implementing the ValuesOrBoolean<T> interface.
   * @see @alias ValuesOrBoolean<T>
   * @param uniqueKeyForCompareItem - name of the key whose value is unique for the requested data (e.g., 'id').
   * Required for the operation of the internal helper function to update the initial data set with actual data received within the subscription.
   * @param variables - optional - object with variables that will be used as request parameters.
   *  Key names in the object must correspond to parameter names declared in the server's GraphQL schema.
   *  Allowed value types for parameters are number, string, object, or boolean.
   *  If some parameters are marked as mandatory in the server's GraphQL schema, these key names need to be additionally passed in requiredFields,
   *  so that the query string generator makes appropriate type markings in the resulting query string.
   * @param paramOptions - optional - Configuration object for generating part of the query string with a description of operation parameter types.
   * @param paramOptions.requiredFields - optional array of query parameter key names for which a mandatory type was set in the schema
   * EXCEPT for keys for which type names are passed in `options.fieldsTypeMap`.
   *    (e.g., the parameter type is String! instead of String).
   * @param paramOptions.fieldsTypeMap - optional Map object containing query parameter names as keys,
   * and a string with the name of its type defined in the GraphQL server schema as a value.
   * IMPORTANT! - the string must also include the "!" symbol if the parameter is defined as mandatory in the schema.
   * @returns - Observable stream with data that will arrive within the made subscription.
   * Important! Only updates for data subscribed to will arrive in the stream.
   * Initial data does not arrive in this stream - it needs to be obtained separately (e.g., using the customQuery$ method).
   **/
  queryAndSubscribe<
    T extends {},
    NQuery extends `${string}`,
    NSubscribe extends `${string}`,
    VQ extends OperationVariables = Exclude<GQLRequestVariables, 'query' | 'subscribe'>,
    VS = Exclude<GQLRequestVariables, 'query' | 'subscribe'>,
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
    },
  ): Observable<T[]> {
    const updateFn: (store: T | T[], subscribeValue: T) => T[] = (store, newValue) => {
      const array = Array.isArray(store) ? store : [store];
      const findItem = array.find(
        item => newValue[uniqueKeyForCompareItem] === item[uniqueKeyForCompareItem],
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

    return this._apollo.watchQuery<Record<NQuery, T | T[]>, VQ>(apolloQueryOptions).pipe(
      map(res => {
        return res.error ?? res.data;
      }),
      filter((data): data is Record<NQuery, T | T[]> => !!data),
      switchMap(result =>
        this.customSubscribe$<T, NSubscribe, VS>(
          nameSubscribe,
          queryObject,
          variables?.subscribe,
          paramOptions?.subscribe,
        ).pipe(
          startWith(null),
          map(updatedValue => {
            const store: T | T[] = deepClone(result[nameQuery]);
            const final = isValue(updatedValue)
              ? updateFn(store, deepClone(updatedValue))
              : Array.isArray(store)
                ? store
                : <T[]>[store];

            return final;
          }),
        ),
      ),
    );
  }
}
