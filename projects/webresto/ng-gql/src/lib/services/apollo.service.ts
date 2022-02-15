import {Injectable} from '@angular/core';
import type {ApolloQueryResult, QueryOptions, MutationOptions, FetchResult, SubscriptionOptions} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';
import type {ExtraSubscriptionOptions, WatchQueryOptions, EmptyObject} from 'apollo-angular/types';
import {catchError, filter, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor (private apollo: Apollo) {}

  watchQuery<TData, TVariables = EmptyObject>(options: WatchQueryOptions<TVariables, TData>) {
    return this.apollo.watchQuery<TData, TVariables>(options).valueChanges.pipe(
      catchError(
        error => of(null)
      ),
      filter((value): value is ApolloQueryResult<TData> => !!value),
    );
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>) {
    return this.apollo.query<T, V>(options).pipe(
      catchError(
        error => of(null)
      ),
      filter((value): value is ApolloQueryResult<T> => !!value),
    );
  };

  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>) {
    return this.apollo.mutate<T, V>(options).pipe(
      catchError(
        error => of(null)
      ),
      filter((value): value is FetchResult<T> => !!value),
    );
  };

  subscribe<T, V = EmptyObject>(options: SubscriptionOptions<V, T>, extra?: ExtraSubscriptionOptions) {
    return this.apollo.subscribe<T, V>(options, extra).pipe(
      catchError(
        error => of(null)
      ),
      filter((value): value is FetchResult<T> => !!value),
    );
  }
}
