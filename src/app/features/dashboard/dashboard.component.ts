import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IncomeService } from '../income/income.service';
import { ExpenseService } from '../expense/expense.service';
import { Transaction } from '../../core/models/income.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, DecimalPipe, DatePipe, TranslateModule],
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
    private expenseService: ExpenseService,
    private translate: TranslateService
  ) {}

  private activeLang = 'en';

  ngOnInit(): void {
    this.activeLang = localStorage.getItem('lang') || 'en';
    this.updateMonthName();
    this.translate.onLangChange.subscribe(event => {
      this.activeLang = event.lang;
      this.updateMonthName();
    });
    this.loadIncome();
    this.loadExpense();
  }

  private updateMonthName(): void {
    const lang = this.activeLang;
    const locale = lang === 'mr' ? 'mr-IN' : 'en-IN';
    this.currentMonthName = new Intl.DateTimeFormat(locale, { month: 'long' })
      .format(new Date(this.currentYear, this.currentMonth))
      .toUpperCase();
  }

  loadIncome(): void {
    this.incomeService.getIncomes(this.userEmail).subscribe(data => {
      this.totalIncome = data.reduce((sum, item) => sum + Number(item.amount.toString().replace(/,/g, '')), 0);

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
      this.totalExpense = data.reduce((sum, item) => sum + Number(item.amount.toString().replace(/,/g, '')), 0);

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

  get userName(): string {
    const email = sessionStorage.getItem('email') || '';
    return email.split('@')[0] || 'there';
  }

  get spendingPercent(): number {
    if (this.currentMonthIncome === 0) return 0;
    return Math.min(Math.round((this.currentMonthExpense / this.currentMonthIncome) * 100), 100);
  }

  get savingsRate(): number {
    if (this.currentMonthIncome === 0) return 0;
    return Math.max(0, Math.round(((this.currentMonthIncome - this.currentMonthExpense) / this.currentMonthIncome) * 100));
  }
}
