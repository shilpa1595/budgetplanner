import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncomeService } from '../income/income.service';
import { ExpenseService } from '../expense/expense.service';
import { Transaction } from '../../core/models/income.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe, TitleCasePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedMonth = '';
  filterType: 'all' | 'income' | 'expense' = 'all';
  userEmail: string = sessionStorage.getItem('email') || '';
  totalIncome = 0;
  totalExpense = 0;
  isLoading = true;

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.setDefaultMonth();
    this.loadAll();
  }

  setDefaultMonth(): void {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth = `${today.getFullYear()}-${month}`;
  }

  loadAll(): void {
    this.isLoading = true;
    let incomeLoaded = false;
    let expenseLoaded = false;
    const incomes: Transaction[] = [];
    const expenses: Transaction[] = [];

    const tryFinish = () => {
      if (incomeLoaded && expenseLoaded) {
        this.allTransactions = [...incomes, ...expenses].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.applyFilters();
        this.isLoading = false;
      }
    };

    this.incomeService.getIncomes(this.userEmail).subscribe({
      next: data => {
        data.forEach(item => incomes.push({
          type: 'income',
          amount: Number(item.amount.toString().replace(/,/g, '')),
          category: item.category,
          date: item.dateOfIncome
        }));
        incomeLoaded = true; tryFinish();
      },
      error: () => { incomeLoaded = true; tryFinish(); }
    });

    this.expenseService.getExpenses(this.userEmail).subscribe({
      next: data => {
        data.forEach(item => expenses.push({
          type: 'expense',
          amount: Number(item.amount.toString().replace(/,/g, '')),
          category: item.category,
          date: item.dateOfExpense
        }));
        expenseLoaded = true; tryFinish();
      },
      error: () => { expenseLoaded = true; tryFinish(); }
    });
  }

  applyFilters(): void {
    let result = [...this.allTransactions];

    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-');
      result = result.filter(t => {
        const d = new Date(t.date);
        return d.getFullYear() === +year && (d.getMonth() + 1) === +month;
      });
    }

    if (this.filterType !== 'all') {
      result = result.filter(t => t.type === this.filterType);
    }

    this.filteredTransactions = result;
    this.totalIncome  = result.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    this.totalExpense = result.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  }
}
