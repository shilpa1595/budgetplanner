import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIncomeComponent } from './add-income/add-income.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

const routes: Routes = [
  {path:'add-income',component:AddIncomeComponent},
  {path:'income-list',component:IncomeListComponent},
  {path:'edit-income/:id',component:EditIncomeComponent},
  {path:'add-expense',component:AddExpenseComponent},
  {path:'expense-list',component:ExpenseListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeExpenseRoutingModule { }
