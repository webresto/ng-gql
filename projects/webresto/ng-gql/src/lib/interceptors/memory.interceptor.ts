import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {isValue} from '@axrl/common';
import type {Observable} from 'rxjs';
import {map} from 'rxjs';

@Injectable()
export class MemoryInterceptor implements HttpInterceptor {
  private memory: Record<string, Observable<HttpEvent<any>>> = {};
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const memoryName = JSON.stringify(request);
    const clone = request.clone({});

    if (!isValue(this.memory[memoryName])) {
      this.memory[memoryName] = next.handle(clone);
    }
    return this.memory[memoryName].pipe(
      map(event => {
        if (event.type == 2) {
          delete this.memory[memoryName];
        }
        return event;
      }),
    );
  }
}
