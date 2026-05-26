import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { IncomeService } from '../income.service';
import { CategorylistService } from '../../../shared/services/categorylist.service';
import { Income } from '../../../core/models/income.model';

@Component({
  selector: 'app-add-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.scss'
})
export class AddIncomeComponent implements OnInit {
  addIncomeForm!: FormGroup;
  incomeCategories: string[] = [];
  userId: string | null = null;

  constructor(
    private incomeService: IncomeService,
    private categorylistService: CategorylistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.addIncomeForm = new FormGroup({
      amount:      new FormControl('', [Validators.required]),
      category:    new FormControl('', [Validators.required]),
      dateOfIncome: new FormControl('', [Validators.required]),
      userEmail:   new FormControl(sessionStorage.getItem('email') || '', [Validators.required])
    });
    this.loadCategories();
  }

  loadCategories(): void {
    if (!this.userId) return;
    this.categorylistService.getCategoryList(this.userId).subscribe({
      next: data => {
        if (Array.isArray(data)) this.incomeCategories = data[0]?.income || [];
      }
    });
  }

  addData(): void {
    if (this.addIncomeForm.invalid) return;
    const incomeData: Income = {
      ...this.addIncomeForm.value,
      userEmail: sessionStorage.getItem('email') || ''
    };
    this.incomeService.addIncome(incomeData).subscribe({
      next: () => {
        this.snackBar.open('Income added successfully!', 'Close', {
          duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.addIncomeForm.reset();
        this.addIncomeForm.patchValue({ userEmail: sessionStorage.getItem('email') || '' });
      },
      error: () => {
        this.snackBar.open('Failed to add income. Try again!', 'Close', { duration: 2000 });
      }
    });
  }
}
