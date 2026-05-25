import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

/**
 * Automatically shows the global loader spinner when any HTTP request is
 * in flight, and hides it once the request completes (success or error).
 */
export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};
