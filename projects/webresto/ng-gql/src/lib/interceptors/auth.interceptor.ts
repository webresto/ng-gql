import { NgGqlUserService, NgGqlStorageService } from './../services';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { exhaustMap } from 'rxjs';
import { isValue } from '@axrl/common';
import type { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private ngGqlUser: NgGqlUserService,
    private storage: NgGqlStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const body = request?.body;
    const operationName =
      isValue(body) && 'operationName' in body && isValue(body.operationName)
        ? body.operationName
        : '';

    return operationName === 'loadLogin' ||
      operationName === 'loadRestorePassword'
      ? next.handle(request)
      : this.ngGqlUser.getToken$().pipe(
          exhaustMap((userToken) => {
            if (isValue(userToken)) {
              const payloadEncoded = userToken.split('.')[1];
              try {
                const payload = JSON.parse(atob(payloadEncoded));
                if (Date.now() / 1000 > payload.exp) {
                  this.storage.updateToken(null);
                  return next.handle(request);
                } else {
                  return next.handle(
                    request.clone({
                      setHeaders: {
                        authorization: userToken,
                      },
                    })
                  );
                }
              } catch (error) {
                this.storage.updateToken(null);
                return next.handle(request);
              }
            } else {
              return next.handle(request);
            }
          })
        );
  }
}
