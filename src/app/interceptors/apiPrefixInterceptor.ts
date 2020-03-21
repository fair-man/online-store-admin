import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { isDevMode } from '@angular/core';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!/^(http|https):/i.test(request.url)) {
            if (isDevMode()) {
                request = request.clone({url: environment.apiPrefix + request.url});
            } else {
                request = request.clone({url: environment.host + environment.apiPrefix + request.url});
            }
        }
        return next.handle(request);
    }
}
