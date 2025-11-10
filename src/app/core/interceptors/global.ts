import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const id = inject(PLATFORM_ID);
  const spinner = inject(NgxSpinnerService);
  let userToken = '';
  if (isPlatformBrowser(id)) {
    userToken = localStorage.getItem('userToken') || '';
  }

  spinner.show();

  if (req.url.includes('/assets/')) {
    return next(req).pipe(finalize(() => spinner.hide()));
  }

  const myReq = req.clone({
    url: environment.apiBaseUrl + req.url,
    setHeaders: {
      Authorization: userToken ? `Bearer ${userToken}` : '',
    },
  });

  return next(myReq).pipe(finalize(() => spinner.hide()));
};
