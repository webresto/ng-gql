import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { generateUUID } from '../models';
import { isValue } from '@axrl/common';

@Injectable()
export class XDeviceIdInterceptor implements HttpInterceptor {

  constructor(@Inject(DOCUMENT) private document:Document) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    const savedDeviceId = localStorage.getItem('deviceId');
    const deviceId = savedDeviceId ?? generateUUID(this.document.defaultView);
    if (!isValue(savedDeviceId)) {
      localStorage.setItem('deviceId', deviceId);
    }
    return next.handle(request.clone({
      setHeaders: {
        'X-Device-Id': deviceId
      }
    }));
  }
}
