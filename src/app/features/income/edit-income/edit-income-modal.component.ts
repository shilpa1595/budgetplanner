import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { IncomeService } from '../income.service';
import { CategorylistService } from '../../../shared/services/categorylist.service';
import { Income } from '../../../core/models/income.model';

@Component({
  selector: 'app-edit-income-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './edit-income-modal.component.html',
  styleUrl: './edit-income-modal.component.scss'
})
export class EditIncomeModalComponent implements OnInit, OnDestroy {
  @Input() income!: Income;
  @Output() saved  = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  incomeCategories: string[] = [];
  isClosing = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private incomeService: IncomeService,
    private categorylistService: CategorylistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    document.body.classList.add('modal-open');

    // Pre-seed with the existing category so the select is never blank on open
    if (this.income.category) {
      this.incomeCategories = [this.income.category];
    }

    this.form = this.fb.group({
      amount:       [this.income.amount,       [Validators.required, Validators.min(1)]],
      category:     [this.income.category,     Validators.required],
      dateOfIncome: [this.income.dateOfIncome?.substring(0, 10) ?? '', Validators.required]
    });

    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.categorylistService.getCategoryList(userId).subscribe({
        next: data => {
          const cats: string[] = Array.isArray(data) ? (data[0]?.income ?? []) : [];
          // Keep the saved category in the list even if it was removed from the master list
          if (this.income.category && !cats.includes(this.income.category)) {
            this.incomeCategories = [this.income.category, ...cats];
          } else {
            this.incomeCategories = cats;
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

    const updated: Income = {
      ...this.income,
      ...this.form.value
    };

    this.incomeService.updateIncome(this.income.id!.toString(), updated).subscribe({
      next: () => {
        this.snackBar.open('Income updated successfully!', 'Close', {
          duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.isClosing = true;
        setTimeout(() => this.saved.emit(), 270);
      },
      error: () => {
        this.isSubmitting = false;
        this.snackBar.open('Error updating income. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  get f() { return this.form.controls; }
}
