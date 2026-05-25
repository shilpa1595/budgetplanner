import { Routes } from '@angular/router';

export const INCOME_ROUTES: Routes = [
  {
    path: 'add-income',
    loadComponent: () =>
      import('./add-income/add-income.component').then(m => m.AddIncomeComponent)
  },
  {
    path: 'income-list',
    loadComponent: () =>
      import('./income-list/income-list.component').then(m => m.IncomeListComponent)
  },
  {
    path: 'edit-income/:id',
    loadComponent: () =>
      import('./edit-income/edit-income.component').then(m => m.EditIncomeComponent)
  },
  { path: '', redirectTo: 'income-list', pathMatch: 'full' }
];
