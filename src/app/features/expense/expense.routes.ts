import { Routes } from '@angular/router';

export const EXPENSE_ROUTES: Routes = [
  {
    path: 'add-expense',
    loadComponent: () =>
      import('./add-expense/add-expense.component').then(m => m.AddExpenseComponent)
  },
  {
    path: 'expense-list',
    loadComponent: () =>
      import('./expense-list/expense-list.component').then(m => m.ExpenseListComponent)
  },
  { path: '', redirectTo: 'expense-list', pathMatch: 'full' }
];
