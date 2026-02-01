import { Inject, Injectable } from '@angular/core';
import { createSubject } from '@axrl/common';
import { BehaviorSubject, Observable, interval, of, timer } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { NG_GQL_CONFIG, NgGqlConfig } from '../models';

@Injectable()
export class NgGqlAvailabilityService {
    private _isApiUnavailable = createSubject<boolean>(false);

    /**
     * Observable that emits true when the API is confirmed unavailable, and false when it recovers.
     */
    readonly isApiUnavailable$ = this._isApiUnavailable.asObservable();

    private _checkIntervalSubscription: any = null;

    constructor(@Inject(NG_GQL_CONFIG) private _config: NgGqlConfig) { }

    /**
     * Marks the API as unavailable and starts the recovery check loop.
     */
    setUnavailable(): void {
        if (this._isApiUnavailable.value) {
            return;
        }

        console.warn('API marked as unavailable. Starting health checks.');
        this._isApiUnavailable.next(true);
        this._startHealthCheck();
    }

    /**
     * Marks the API as available and stops the recovery check loop.
     */
    setAvailable(): void {
        if (!this._isApiUnavailable.value) {
            return;
        }

        console.log('API recovered. Stopping health checks.');
        this._isApiUnavailable.next(false);
        this._stopHealthCheck();
    }

    private _startHealthCheck(): void {
        if (this._checkIntervalSubscription) {
            return;
        }

        // Check every 5 seconds
        this._checkIntervalSubscription = interval(5000)
            .pipe(
                switchMap(() => this._checkConnection())
            )
            .subscribe(isAvailable => {
                if (isAvailable) {
                    this.setAvailable();
                }
            });
    }

    private _stopHealthCheck(): void {
        if (this._checkIntervalSubscription) {
            this._checkIntervalSubscription.unsubscribe();
            this._checkIntervalSubscription = null;
        }
    }

    /**
     * Performs a simple check to see if the API is reachable.
     * We will try to fetch the GraphQL endpoint with a simple query or just a HEAD request if possible.
     * Since this is GraphQL, a GET with a simple query like usage of schema or just checking if the server responds 
     * to a bad request with proper json is enough.
     * 
     * However, `fetch` to the endpoint is the simplest "is network alive" check.
     */
    private _checkConnection(): Observable<boolean> {
        // We can try to fetch the URL. If it fails with a network error, it's still down.
        // If it returns 400 (Bad Request) because we didn't send a query, it means the server IS UP.
        return new Observable<boolean>(observer => {
            fetch(this._config.url, { method: 'POST', body: JSON.stringify({ query: "{ __typename }" }), headers: { 'Content-Type': 'application/json' } })
                .then(() => {
                    observer.next(true);
                    observer.complete();
                })
                .catch(() => {
                    observer.next(false);
                    observer.complete();
                });
        });
    }
}
