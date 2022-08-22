import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import type { ExtraSubscriptionOptions, MutationResult, WatchQueryOptions } from 'apollo-angular';
import type { ApolloQueryResult, FetchResult, QueryOptions, SubscriptionOptions, MutationOptions } from '@apollo/client/core';
import { catchError, filter, of, map } from 'rxjs';
import { EmptyObject } from 'apollo-angular/types';
import { isValue } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(private apollo: Apollo) { }

  watchQuery<TData, TVariables = EmptyObject>(options: WatchQueryOptions<TVariables, TData>) {
    return this.apollo.watchQuery<TData, TVariables>(options).valueChanges.pipe(
      map(data => {
        if (isValue(data.error) || isValue(data.errors)) {
          throw new Error(JSON.stringify(data.error || data.errors));
        } else {
          return data;
        }
      }),
      catchError(
        error => {
          console.log(error);
          return of(null);
        }),
      filter((value): value is ApolloQueryResult<TData> => !!value),
    );
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>) {
    return this.apollo.query<T, V>(options).pipe(
      map(data => {
        if (isValue(data.error) || isValue(data.errors)) {
          throw new Error(JSON.stringify(data.error || data.errors));
        } else {
          return data;
        }
      }),
      catchError(
        error => {
          console.log(error);
          return of(null);
        }),
      filter((value): value is ApolloQueryResult<T> => !!value),
    );
  };

  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>) {
    return this.apollo.mutate<T, V>(options).pipe(
      map(data => {
        if ( isValue(data.errors)) {
          throw new Error(JSON.stringify(data.errors));
        } else {
          return data;
        }
      }),
      catchError(
        error => {
          console.log(error);
          return of(null);
        }),
      filter((value): value is MutationResult<T> => !!value),

    );
  };

  subscribe<T, V = EmptyObject>(options: SubscriptionOptions<V, T>, extra?: ExtraSubscriptionOptions) {
    return this.apollo.subscribe<T, V>(options, extra).pipe(
      map(data => {
        if (isValue(data.errors)) {
          throw new Error(JSON.stringify(data.errors));
        } else {
          return data;
        }
      }),
      catchError(
        error => {
          console.log(error);
          return of(null);
        }),
      filter((value): value is FetchResult<T> => !!value),
    );
  }
}
