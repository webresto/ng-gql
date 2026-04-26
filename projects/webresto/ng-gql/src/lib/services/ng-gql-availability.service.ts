import {Injectable} from '@angular/core';
import {Observable, fromEvent, map, merge, of, shareReplay, startWith} from 'rxjs';

@Injectable()
export class NgGqlAvailabilityService {
  readonly isApiUnavailable$: Observable<boolean>;

  constructor() {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      this.isApiUnavailable$ = merge(
        fromEvent(window, 'online').pipe(map(() => false)),
        fromEvent(window, 'offline').pipe(map(() => true)),
      ).pipe(
        startWith(!navigator.onLine),
        shareReplay(1),
      );
    } else {
      this.isApiUnavailable$ = of(false);
    }
  }
}
