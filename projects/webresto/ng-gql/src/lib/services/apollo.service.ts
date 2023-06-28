import { Inject, Injectable } from '@angular/core';
import type {
  MutationOptions,
  OperationVariables,
  QueryOptions,
  SubscriptionOptions,
} from '@apollo/client/core';
import { isValue } from '@axrl/common';
import {
  Apollo,
  ExtraSubscriptionOptions,
  WatchQueryOptions,
} from 'apollo-angular';
import type { EmptyObject } from 'apollo-angular/types';
import { catchError, map, throwError } from 'rxjs';
import type { NgGqlConfig } from '../models';

@Injectable()
export class ApolloService {
  constructor(
    private apollo: Apollo,
    @Inject('NG_GQL_CONFIG') private config: NgGqlConfig
  ) {}

  watchQuery<TData, TVariables extends OperationVariables = EmptyObject>(
    options: WatchQueryOptions<TVariables, TData>
  ) {
    return this.apollo.watchQuery<TData, TVariables>(options).valueChanges.pipe(
      map((data) => {
        if (isValue(data.error) || isValue(data.errors)) {
          throw new Error(JSON.stringify(data.error || data.errors));
        } else {
          return data;
        }
      }),
      catchError((error) => {
        console.log(error);
        if (this.config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      })
    );
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>) {
    return this.apollo.query<T, V>(options).pipe(
      map((data) => {
        if (isValue(data.error) || isValue(data.errors)) {
          throw new Error(JSON.stringify(data.error || data.errors));
        } else {
          return data;
        }
      }),
      catchError((error) => {
        console.log(error);
        if (this.config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      })
    );
  }

  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>) {
    return this.apollo.mutate<T, V>(options).pipe(
      catchError((error) => {
        console.log(error);
        if (this.config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      })
    );
  }

  subscribe<T, V = EmptyObject>(
    options: SubscriptionOptions<V, T>,
    extra?: ExtraSubscriptionOptions
  ) {
    return this.apollo.subscribe<T, V>(options, extra).pipe(
      map((data) => {
        if (isValue(data.errors)) {
          throw new Error(JSON.stringify(data.errors));
        } else {
          return data;
        }
      }),
      catchError((error) => {
        console.log(error);
        if (this.config.debugMode) {
          alert(error);
        }
        return throwError(() => error);
      })
    );
  }
}
