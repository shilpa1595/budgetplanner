import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncomeService } from '../income.service';
import { Income } from '../../../core/models/income.model';

@Component({
  selector: 'app-edit-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-income.component.html',
  styleUrl: './edit-income.component.scss'
})
export class EditIncomeComponent implements OnInit {
  updateIncomeForm!: FormGroup;
  incomeId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private incomeService: IncomeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.incomeId = id;
        this.loadIncomeData();
      } else {
        this.router.navigate(['/income/income-list']);
      }
    });
  }

  initForm(): void {
    this.updateIncomeForm = this.fb.group({
      amount:      ['', [Validators.required, Validators.min(1)]],
      category:    ['', Validators.required],
      dateOfIncome: ['', Validators.required]
    });
  }

  loadIncomeData(): void {
    this.incomeService.getIncomeById(this.incomeId).subscribe({
      next: income => { if (income) this.updateIncomeForm.patchValue(income); },
      error: err => console.error('Error fetching income:', err)
    });
  }

  updateIncome(): void {
    if (this.updateIncomeForm.invalid) return;
    const updatedIncome: Income = { ...this.updateIncomeForm.value, id: +this.incomeId };
    this.incomeService.updateIncome(this.incomeId, updatedIncome).subscribe({
      next: () => {
        this.snackBar.open('Income updated successfully!', 'Close', {
          duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.router.navigate(['/income/income-list']);
      },
      error: err => console.error('Error updating income', err)
    });
  }
}
