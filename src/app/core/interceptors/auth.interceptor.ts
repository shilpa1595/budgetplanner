import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Attaches the logged-in user's email as an X-User-Email header on every
 * outgoing HTTP request, so the backend can identify the caller.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const email = sessionStorage.getItem('email');
  const userId = sessionStorage.getItem('userId');

  if (email || userId) {
    const cloned = req.clone({
      setHeaders: {
        ...(email ? { 'X-User-Email': email } : {}),
        ...(userId ? { 'X-User-Id': userId } : {})
      }
    });
    return next(cloned);
  }

  return next(req);
};
