import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const spinner = inject(NgxSpinnerService);

  let userToken = '';
  if (isPlatformBrowser(platformId)) {
    userToken = localStorage.getItem('userToken') || '';
  }

  spinner.show();

  // Skip spinner for static assets
  if (req.url.startsWith('assets/')) {
    return next(req).pipe(finalize(() => spinner.hide()));
  }

  const clonedReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
    setHeaders: {
      Authorization: userToken ? `Bearer ${userToken}` : '',
    },
  });

  return next(clonedReq).pipe(finalize(() => spinner.hide()));
};
