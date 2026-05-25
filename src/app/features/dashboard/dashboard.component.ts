import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IncomeService } from '../income/income.service';
import { ExpenseService } from '../expense/expense.service';
import { Transaction } from '../../core/models/income.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalIncome = 0;
  totalExpense = 0;
  currentMonthIncome = 0;
  currentMonthExpense = 0;
  transactions: Transaction[] = [];

  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  userEmail: string = sessionStorage.getItem('email') || '';
  currentMonthName = '';
  isFound = false;

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.currentMonthName = monthNames[this.currentMonth].toUpperCase();
    this.loadIncome();
    this.loadExpense();
  }

  loadIncome(): void {
    this.incomeService.getIncomes(this.userEmail).subscribe(data => {
      this.totalIncome = data.reduce((sum, item) => sum + item.amount, 0);

      const current = data.filter(item => {
        const d = new Date(item.dateOfIncome);
        return d.getMonth() === this.currentMonth && d.getFullYear() === this.currentYear;
      });

      this.currentMonthIncome = current.reduce((sum, item) => {
        return sum + Number(item.amount.toString().replace(/,/g, ''));
      }, 0);

      const txns: Transaction[] = current.map(item => ({
        type: 'income',
        amount: Number(item.amount.toString().replace(/,/g, '')),
        category: item.category,
        date: item.dateOfIncome,
      }));
      this.transactions.push(...txns);
      this.sortTransactions();
      if (txns.length > 0) this.isFound = true;
    });
  }

  loadExpense(): void {
    this.expenseService.getExpenses(this.userEmail).subscribe(data => {
      this.totalExpense = data.reduce((sum, item) => sum + item.amount, 0);

      const current = data.filter(item => {
        const d = new Date(item.dateOfExpense);
        return d.getMonth() === this.currentMonth && d.getFullYear() === this.currentYear;
      });

      this.currentMonthExpense = current.reduce((sum, item) => {
        return sum + Number(item.amount.toString().replace(/,/g, ''));
      }, 0);

      const txns: Transaction[] = current.map(item => ({
        type: 'expense',
        amount: Number(item.amount.toString().replace(/,/g, '')),
        category: item.category,
        date: item.dateOfExpense,
      }));
      this.transactions.push(...txns);
      this.sortTransactions();
      if (txns.length > 0) this.isFound = true;
    });
  }

  sortTransactions(): void {
    this.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  get total(): number {
    return this.currentMonthIncome - this.currentMonthExpense;
  }

  abs(value: number): number {
    return Math.abs(value);
  }
}
