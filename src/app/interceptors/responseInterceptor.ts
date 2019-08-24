import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { isDevMode } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';

import { AuthService } from '../pages/auth/auth.service';
import { LoaderService } from '../ui/loader/loader.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.checkLogged() && this.authService.getCSRFToken()) {
      request = request.clone({
        headers: request.headers
          .set('X-CSRFToken', this.authService.getCSRFToken())
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
      });
    }
    if (isDevMode()) {
      request = request.clone({
        headers: request.headers.set('X-Origin-Domain', window.location.origin), withCredentials: true
      });
    } else {
      request = request.clone({withCredentials: true});
    }

    this.loaderService.updateLoadingState(true);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event && event.type === 4) {
          this.loaderService.updateLoadingState(false);
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // this.checkResponseCode(error);
        this.loaderService.updateLoadingState(false);
        return throwError(error);
      }));
  }

  checkResponseCode(error) {
    if ([401, 403].indexOf(error.status) > -1) {
      alert('Not authorized');
    }
  }
}
