import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from '../expense.service';
import { Expense } from '../../../core/models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  selectedMonth = '';
  userEmail: string = sessionStorage.getItem('email') || '';
  totalExpense = 0;
  selectedExpense: Expense | null = null;

  constructor(private expenseService: ExpenseService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setDefaultMonth();
    this.fetchExpenses();
  }

  setDefaultMonth(): void {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth = `${today.getFullYear()}-${month}`;
  }

  fetchExpenses(): void {
    if (!this.userEmail) return;
    this.expenseService.getExpenses(this.userEmail).subscribe({
      next: data => {
        this.expenses = data;
        this.filterByMonth();
      },
      error: err => console.error('Error fetching expenses:', err)
    });
  }

  filterByMonth(): void {
    if (!this.selectedMonth) {
      this.filteredExpenses = [...this.expenses];
    } else {
      const [year, month] = this.selectedMonth.split('-');
      this.filteredExpenses = this.expenses.filter(e => {
        const d = new Date(e.dateOfExpense);
        return d.getFullYear() === +year && (d.getMonth() + 1) === +month;
      });
    }
    this.totalExpense = this.filteredExpenses.reduce((sum, e) => sum + +e.amount, 0);
  }

  deleteExpense(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id.toString()).subscribe({
        next: () => {
          this.snackBar.open('Expense deleted!', 'Close', { duration: 3000 });
          this.fetchExpenses();
        },
        error: () => this.snackBar.open('Error deleting expense!', 'Close', { duration: 3000 })
      });
    }
  }

  openEditModal(expense: Expense): void {
    this.selectedExpense = { ...expense };
  }

  saveExpense(): void {
    if (!this.selectedExpense) return;
    this.expenseService.updateExpense(this.selectedExpense).subscribe({
      next: () => {
        this.snackBar.open('Expense updated!', 'Close', { duration: 3000 });
        this.selectedExpense = null;
        this.fetchExpenses();
      }
    });
  }
}
