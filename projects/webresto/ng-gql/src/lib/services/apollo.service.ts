import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { WatchQueryOptions, ExtraSubscriptionOptions, EmptyObject } from 'apollo-angular/types';
import { QueryOptions, MutationOptions, SubscriptionOptions } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(private apollo: Apollo) { }

  watchQuery<TData, TVariables = EmptyObject>(options: WatchQueryOptions<TVariables, TData>) {
    return this.apollo.watchQuery<TData, TVariables>(options);
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>) {
    return this.apollo.query<T, V>(options);
  };

  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>) {
    return this.apollo.mutate<T, V>(options);
  };

  subscribe<T, V = EmptyObject>(options: SubscriptionOptions<V, T>, extra?: ExtraSubscriptionOptions) {
    return this.apollo.subscribe<T, V>(options, extra);
  }
}
