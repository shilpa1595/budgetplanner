// Angular 19 — Standalone Architecture
// No NgModule needed. Core is just a folder convention.
// Services use providedIn: 'root'
// Guards are functional (CanActivateFn)
// Interceptors are functional (HttpInterceptorFn)
// Both are registered in app.config.ts via provideHttpClient(withInterceptors([...]))
//
// This file exists only as documentation. Safe to delete.
export {};
