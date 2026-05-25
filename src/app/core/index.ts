// Core barrel — import from here instead of deep paths
// Angular 19 standalone: no NgModule, just re-exports

// Guards
export { authGuard } from './guards/auth.guard';

// Services
export { AuthService } from './services/auth.service';
export { LoaderService } from './services/loader.service';

// Interceptors
export { authInterceptor } from './interceptors/auth.interceptor';
export { loaderInterceptor } from './interceptors/loader.interceptor';

// Models
export * from './models/user.model';
export * from './models/income.model';
export * from './models/expense.model';
export * from './models/budget.model';
export * from './models/profile.model';
