import { Component } from '@angular/core';
import { IncomeListComponent } from '../income-expense/income-list/income-list.component';
import { ExpenseListComponent } from '../income-expense/expense-list/expense-list.component';

@Component({
  selector: 'app-reports',
  imports: [IncomeListComponent,ExpenseListComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}
