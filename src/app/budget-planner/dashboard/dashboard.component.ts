import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncomeService } from '../../income-expense/services/income.service';
import { ExpenseService } from '../../income-expense/services/expense.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../income-expense/interfaces/transaction';

  @Component({
    selector: 'app-dashboard',
    imports: [RouterLink,CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
  })
  export class DashboardComponent implements OnInit  { 

    totalIncome = 0;
    totalExpense = 0;
    currentMonthIncome = 0;
    currentMonthExpense = 0;
    transactions: Transaction[] = []; // Unified transaction list

    currentMonth: number = new Date().getMonth(); // 0-based: July = 6
    currentYear: number = new Date().getFullYear();
    userEmail:string = sessionStorage.getItem('email') || '';
    currentMonthName: string = '';

    isFound:boolean = false;

    constructor(
      private incomeService: IncomeService,
      private expenseService: ExpenseService
    ){
      
    }

    ngOnInit():void{
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      this.currentMonthName = monthNames[this.currentMonth].toUpperCase(); // JULY

      this.loadIncome();
      this.loadExpense();
    }

    loadIncome(){
     this.incomeService.getIncomes(this.userEmail).subscribe(data => {
        this.totalIncome = data.reduce((sum, item) => sum + item.amount, 0);

        const currentMonthIncome = data
          .filter(item => {
            const date = new Date(item.dateOfIncome); // ✅ use correct key
            return (
              date.getMonth() === this.currentMonth &&
              date.getFullYear() === this.currentYear
            );
          })
          this.currentMonthIncome =currentMonthIncome.reduce((sum, item) => {
            const cleanAmount = Number(item.amount.toString().replace(/,/g, ''));
            return sum + cleanAmount;
          }, 0);

          // Push current month income transactions
        const incomeTransactions: Transaction[] = currentMonthIncome.map(item => ({
          type: 'income',
          amount: Number(item.amount.toString().replace(/,/g, '')),
          category: item.category,
          date: item.dateOfIncome,
        }));

        this.transactions.push(...incomeTransactions);
        this.sortTransactionsByDate();

        // ✅ Set isFound if transactions found
        if (incomeTransactions.length > 0) {
          this.isFound = true;
        }
      });
    }
    
    loadExpense(){
      this.expenseService.getExpenses(this.userEmail).subscribe(data => {
        this.totalExpense = data.reduce((sum, item) => sum + item.amount, 0);

        const currentMonthExpense = data
          .filter(item => {
            const date = new Date(item.dateOfExpense); // ✅ use correct key
            return (
              date.getMonth() === this.currentMonth &&
              date.getFullYear() === this.currentYear
            );
          })
         this.currentMonthExpense = currentMonthExpense.reduce((sum, item) => {
            const cleanAmount = Number(item.amount.toString().replace(/,/g, ''));
            return sum + cleanAmount;
          }, 0);

          // Push current month expense transactions
        const expenseTransactions: Transaction[] = currentMonthExpense.map(item => ({
          type: 'expense',
          amount: Number(item.amount.toString().replace(/,/g, '')),
          category: item.category,
          date: item.dateOfExpense,
        }));

        this.transactions.push(...expenseTransactions);
        this.sortTransactionsByDate();
        // ✅ Set isFound if transactions found
        if (expenseTransactions.length > 0) {
          this.isFound = true;
        }
      });
    }

    sortTransactionsByDate() {
      this.transactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

get total(): number {
  return this.currentMonthIncome - this.currentMonthExpense;
}

abs(value: number): number {
  return Math.abs(value);
}
  }
