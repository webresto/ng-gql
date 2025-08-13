import {DOCUMENT} from '@angular/common';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {isValue} from '@axrl/common';
import type {Observable} from 'rxjs';
import {generateUUID} from '../models';

@Injectable()
export class XDeviceIdInterceptor implements HttpInterceptor {
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const savedDeviceId = localStorage.getItem('restocore-deviceId');
    const deviceId = savedDeviceId ?? generateUUID(this._document.defaultView);
    if (!isValue(savedDeviceId)) {
      localStorage.setItem('restocore-deviceId', deviceId);
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
