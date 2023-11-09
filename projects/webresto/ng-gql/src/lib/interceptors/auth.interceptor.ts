import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {isValue} from '@axrl/common';
import type {Observable} from 'rxjs';
import {exhaustMap} from 'rxjs';
import {NgGqlStoreService, NgGqlUserService} from './../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _ngGqlUser: NgGqlUserService,
    private _storage: NgGqlStoreService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const body = request?.body;
    const operationName =
      isValue(body) && 'operationName' in body && isValue(body.operationName)
        ? body.operationName
        : '';

    return operationName === 'loadLogin' || operationName === 'loadRestorePassword'
      ? next.handle(request)
      : this._ngGqlUser.getToken$().pipe(
          exhaustMap(userToken => {
            if (isValue(userToken)) {
              const payloadEncoded = userToken.split('.')[1];
              try {
                const payload = JSON.parse(atob(payloadEncoded));
                if (Date.now() / 1000 > payload.exp) {
                  this._storage.updateToken(null);
                  return next.handle(request);
                } else {
                  return next.handle(
                    request.clone({
                      setHeaders: {
                        authorization: userToken,
                      },
                    }),
                  );
                }
              } catch (error) {
                this._storage.updateToken(null);
                return next.handle(request);
              }
            } else {
              return next.handle(request);
            }
          }),
        );
  }
}
