import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ReportsComponent } from './reports/reports.component';

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
    },
    {
        path:'budget', loadChildren:()=>import('./budget/budget.module').then(m=>m.BudgetModule)
    },
    {
        path:'category', component:CategoryComponent
    },
    {
        path:'reports', component:ReportsComponent
    }
];
