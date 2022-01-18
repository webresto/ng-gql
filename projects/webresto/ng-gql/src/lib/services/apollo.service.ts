import { Injectable } from '@angular/core';
import { Apollo,QueryRef } from 'apollo-angular';
import { WatchQueryOptions, ExtraSubscriptionOptions, EmptyObject } from 'apollo-angular/types';
import { QueryOptions, MutationOptions, ApolloQueryResult, SubscriptionOptions, FetchResult } from '@apollo/client/core';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(private apollo:Apollo) { }

  watchQuery<TData, TVariables = EmptyObject>(options: WatchQueryOptions<TVariables, TData>): QueryRef<TData, TVariables> {
    return this.apollo.watchQuery(options);
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>): Observable<ApolloQueryResult<T>> {
    return this.apollo.query(options);
  };

  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>): Observable<FetchResult<T>> {
    return this.apollo.mutate(options);
  };

  subscribe<T, V = EmptyObject>(options: SubscriptionOptions<V, T>, extra?: ExtraSubscriptionOptions): Observable<FetchResult<T>> {
    return this.apollo.subscribe(options,extra);
  }
}
