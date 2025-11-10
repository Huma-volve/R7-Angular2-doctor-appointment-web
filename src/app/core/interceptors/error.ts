import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toastr.error(error.error?.message || 'Unexpected error', `Error ${error.status}`);
      if (error.status === 401) {
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
