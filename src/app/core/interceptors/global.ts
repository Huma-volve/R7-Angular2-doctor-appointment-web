import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const spinner = inject(NgxSpinnerService);
  let accessToken = '';
  // Get token only if running in browser
  if (isPlatformBrowser(platformId)) {
    accessToken = localStorage.getItem('accessToken') || '';
  }
  // Show loader
  spinner.show();
  // Clone request and add BaseURL + Authorization
  const modifiedReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
    setHeaders: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return next(modifiedReq).pipe(finalize(() => spinner.hide()));
};
