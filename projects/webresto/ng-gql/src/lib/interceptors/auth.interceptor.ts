import { NgGqlUserService } from './../services/ng-gql-user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { isValue } from '@axrl/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private ngGqlUser: NgGqlUserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.ngGqlUser.getToken$().pipe(
      exhaustMap((userToken) => {
        if (isValue(userToken)) {
          const payloadEncoded = userToken.split('.')[1];
          try {
            const payload = JSON.parse(atob(payloadEncoded));
            if (Date.now() / 1000 > payload.exp) {
              this.ngGqlUser.updateStorageToken(null);
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
            this.ngGqlUser.updateStorageToken(null);
            return next.handle(request);
          }
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
