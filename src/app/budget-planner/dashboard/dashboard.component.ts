import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule,CommonModule,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  lastMonthsIncome = ['January:$1000','February:$1500','March:$2000'];
  currentMonthIncome = '$2000';

  lastMonthsExpense = ['January:$1000','February:$1500','March:$2000'];
  currentMonthExpense = '$2000';

  todoTransactions = [
    {description:"Pay Electricity Bill"},
    {description:"Buy Groceries"},
    {description:"College Fees"},
    {description:"Book Trip"}
  ]
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;
  constructor(private router : Router){}
  onIncome(){
    this.router.navigate(['/budget-planner/income'])
  }
  onExpense(){
    this.router.navigate(['/budget-planner/expense'])
  }
  onTodo(){
    this.router.navigate(['/budget-planner/todo'])
  }

  get currentMonthSavings() : number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
