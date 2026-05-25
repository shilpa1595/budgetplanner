import { Routes } from '@angular/router';

export const BUDGET_ROUTES: Routes = [
  {
    path: 'budget-setting',
    loadComponent: () =>
      import('./budget-setting/budget-setting.component').then(m => m.BudgetSettingComponent)
  },
  { path: '', redirectTo: 'budget-setting', pathMatch: 'full' }
];
