import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsettingComponent } from './budgetsetting/budgetsetting.component';

const routes: Routes = [
    { path:'budget-setting', component:BudgetsettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
