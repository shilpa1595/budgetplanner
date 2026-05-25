import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes — auth
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Protected routes — wrapped in MainLayoutComponent shell
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      // Default redirect to dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'income',
        loadChildren: () =>
          import('./features/income/income.routes').then(m => m.INCOME_ROUTES)
      },
      {
        path: 'expense',
        loadChildren: () =>
          import('./features/expense/expense.routes').then(m => m.EXPENSE_ROUTES)
      },
      {
        path: 'budget',
        loadChildren: () =>
          import('./features/budget/budget.routes').then(m => m.BUDGET_ROUTES)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes').then(m => m.CATEGORIES_ROUTES)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.routes').then(m => m.REPORTS_ROUTES)
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./features/history/history.routes').then(m => m.HISTORY_ROUTES)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES)
      }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'auth/login' }
];
