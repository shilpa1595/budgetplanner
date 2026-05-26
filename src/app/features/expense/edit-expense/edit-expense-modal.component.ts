import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseService } from '../expense.service';
import { CategorylistService } from '../../../shared/services/categorylist.service';
import { Expense } from '../../../core/models/expense.model';

@Component({
  selector: 'app-edit-expense-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './edit-expense-modal.component.html',
  styleUrl: './edit-expense-modal.component.scss'
})
export class EditExpenseModalComponent implements OnInit, OnDestroy {
  @Input() expense!: Expense;
  @Output() saved  = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  expenseCategories: string[] = [];
  isClosing = false;
  isSubmitting = false;

  readonly paymentModes = ['Cash', 'UPI', 'Credit Card', 'Bank Transfer'];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private categorylistService: CategorylistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    document.body.classList.add('modal-open');

    // Pre-seed with the existing category so the select is never blank on open
    if (this.expense.category) {
      this.expenseCategories = [this.expense.category];
    }

    this.form = this.fb.group({
      amount:        [this.expense.amount,                              [Validators.required, Validators.min(1)]],
      category:      [this.expense.category,                           Validators.required],
      paymentMode:   [this.expense.paymentMode,                        Validators.required],
      dateOfExpense: [this.expense.dateOfExpense?.substring(0, 10) ?? '', Validators.required],
      description:   [this.expense.description ?? '']
    });

    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.categorylistService.getCategoryList(userId).subscribe({
        next: data => {
          const cats: string[] = Array.isArray(data) ? (data[0]?.expense ?? []) : [];
          // Keep the saved category in the list even if it was removed from the master list
          if (this.expense.category && !cats.includes(this.expense.category)) {
            this.expenseCategories = [this.expense.category, ...cats];
          } else {
            this.expenseCategories = cats;
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }

  @HostListener('document:keydown.escape')
  close(): void {
    if (this.isClosing) return;
    this.isClosing = true;
    setTimeout(() => this.closed.emit(), 270);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;

    const updated: Expense = { ...this.expense, ...this.form.value };

    this.expenseService.updateExpense(updated).subscribe({
      next: () => {
        this.snackBar.open('Expense updated successfully!', 'Close', {
          duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.isClosing = true;
        setTimeout(() => this.saved.emit(), 270);
      },
      error: () => {
        this.isSubmitting = false;
        this.snackBar.open('Error updating expense. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  get f() { return this.form.controls; }
}
