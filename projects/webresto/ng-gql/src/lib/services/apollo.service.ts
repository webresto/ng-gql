import {Inject, Injectable} from '@angular/core';
import type {
  ApolloQueryResult,
  FetchResult,
  OperationVariables,
  QueryOptions,
  SubscriptionOptions,
} from '@apollo/client/core';
import {isValue} from '@axrl/common';
import {Apollo} from 'apollo-angular';
import type {
  EmptyObject,
  ExtraSubscriptionOptions,
  MutationOptions,
  MutationResult,
  WatchQueryOptions,
} from 'apollo-angular/types';
import {Observable, catchError, map, throwError} from 'rxjs';
import {NG_GQL_CONFIG, NgGqlConfig} from '../models';

@Injectable()
export class ApolloService {
  constructor(
    private _apollo: Apollo,
    @Inject(NG_GQL_CONFIG) private _config: NgGqlConfig,
  ) {}

  watchQuery<TData, TVariables extends OperationVariables = EmptyObject>(
    options: WatchQueryOptions<TVariables, TData>,
  ): Observable<ApolloQueryResult<TData>> {
    return this._apollo.watchQuery<TData, TVariables>(options).valueChanges.pipe(
      map(data => {
        if (isValue(data.error) || isValue(data.errors)) {
          throw new Error(JSON.stringify(data.error || data.errors));
        } else {
          return data;
        }
      }),
      catchError(error => {
        console.log(error);
        if (this._config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      }),
    );
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>): Observable<ApolloQueryResult<T>> {
    return this._apollo.query<T, V>(options).pipe(
      map(data => {
        if (isValue(data.error) || isValue(data.errors)) {
          throw new Error(JSON.stringify(data.error || data.errors));
        } else {
          return data;
        }
      }),
      catchError(error => {
        console.log(error);
        if (this._config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      }),
    );
  }

  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>): Observable<MutationResult<T>> {
    return this._apollo.mutate<T, V>(options).pipe(
      catchError(error => {
        console.log(error);
        if (this._config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      }),
    );
  }

  subscribe<T, V = EmptyObject>(
    options: SubscriptionOptions<V, T>,
    extra?: ExtraSubscriptionOptions,
  ): Observable<FetchResult<T>> {
    return this._apollo.subscribe<T, V>(options, extra).pipe(
      map(data => {
        if (isValue(data.errors)) {
          throw new Error(JSON.stringify(data.errors));
        } else {
          return data;
        }
      }),
      catchError(error => {
        console.log(error);
        if (this._config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      }),
    );
  }
}
