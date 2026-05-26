import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IncomeListComponent } from '../income/income-list/income-list.component';
import { ExpenseListComponent } from '../expense/expense-list/expense-list.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, IncomeListComponent, ExpenseListComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  isIncomeSelected = false;
}
