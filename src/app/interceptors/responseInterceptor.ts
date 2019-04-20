import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';

import {AuthService} from '../pages/auth/auth.service';
import {AUTH_PATHS} from '../pages/auth/auth';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.checkLogged() && this.authService.getCSRFToken()) {
            console.log('X-CSRFToken => ', this.authService.getCSRFToken());
            request = request.clone({withCredentials: true, headers: request.headers.set('X-CSRFToken', this.authService.getCSRFToken())});
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // this.checkResponseCode(error);

                return throwError(error);
            }));
    }

    checkResponseCode(error) {
        if ([401, 403].indexOf(error.status) > -1) {
            alert('Not authorized');
        }
    }
}
