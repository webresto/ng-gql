import {DOCUMENT} from '@angular/common';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {isValue} from '@axrl/common';
import type {Observable} from 'rxjs';
import {generateUUID} from '../models';

@Injectable()
export class XDeviceIdInterceptor implements HttpInterceptor {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const savedDeviceId = localStorage.getItem('deviceId');
    const deviceId = savedDeviceId ?? generateUUID(this.document.defaultView);
    if (!isValue(savedDeviceId)) {
      localStorage.setItem('deviceId', deviceId);
    }
    return next.handle(
      request.clone({
        setHeaders: {
          'X-Device-Id': deviceId,
        },
      }),
    );
  }
}
