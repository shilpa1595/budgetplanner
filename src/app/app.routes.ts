import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'',component:HomeComponent, pathMatch: 'full'},
    {
        path:'budget-planner', loadChildren:()=>import('./budget-planner/budget-planner.module').then(m=>m.BudgetPlannerModule)
    },
    {
        path:'user-management', loadChildren:()=>import('./user-management/user-management.module').then(m=>m.UserManagementModule)
    },
    {
        path:'income-expense', loadChildren:()=>import('./income-expense/income-expense.module').then(m=>m.IncomeExpenseModule)
    }
];
