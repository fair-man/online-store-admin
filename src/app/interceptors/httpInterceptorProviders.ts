import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ResponseInterceptor } from './responseInterceptor';
import { ApiPrefixInterceptor } from './apiPrefixInterceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true}
];
