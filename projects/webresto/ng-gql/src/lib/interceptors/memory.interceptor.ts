import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { filter, map } from 'rxjs';
import { isValue } from '@axrl/common';
import type { Observable } from 'rxjs';

@Injectable()
export class MemoryInterceptor implements HttpInterceptor {
  constructor() {}
  private memory: Record<string, Observable<HttpEvent<any>>> = {};

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const memoryName = JSON.stringify(request);
    const clone = request.clone({});

    if (!isValue(this.memory[memoryName])) {
      this.memory[memoryName] = next.handle(clone);
    }
    return this.memory[memoryName].pipe(
      map((event) => {
        if (event.type == 2) {
          delete this.memory[memoryName];
        }
        return event;
      })
    );
  }
}
