import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from '../expense.service';
import { CategorylistService } from '../../../shared/categorylist.service';
import { Expense } from '../../../core/models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent implements OnInit {
  addExpenseForm!: FormGroup;
  expenseCategories: string[] = [];
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private categorylistService: CategorylistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.addExpenseForm = this.fb.group({
      amount:       ['', [Validators.required, Validators.min(0)]],
      category:     ['', Validators.required],
      dateOfExpense:['', Validators.required],
      paymentMode:  ['', Validators.required],
      description:  ['']
    });
    this.loadCategories();
  }

  loadCategories(): void {
    if (!this.userId) return;
    this.categorylistService.getCategoryList(this.userId).subscribe({
      next: data => {
        if (Array.isArray(data)) this.expenseCategories = data[0]?.expense || [];
      }
    });
  }

  addData(): void {
    if (this.addExpenseForm.invalid) return;
    const newExpense: Expense = {
      ...this.addExpenseForm.value,
      userEmail: sessionStorage.getItem('email') || ''
    };
    this.expenseService.addExpense(newExpense).subscribe({
      next: () => {
        this.snackBar.open('Expense added successfully!', 'Close', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.addExpenseForm.reset();
      },
      error: () => {
        this.snackBar.open('Error adding expense. Try again!', 'Close', { duration: 3000 });
      }
    });
  }
}
