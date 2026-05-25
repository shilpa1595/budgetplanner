import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BudgetService } from '../../../shared/budget.service';
import { CategorylistService } from '../../../shared/categorylist.service';
import { ExpenseService } from '../../expense/expense.service';
import { Categories } from '../../../core/models/budget.model';

@Component({
  selector: 'app-budget-setting',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './budget-setting.component.html',
  styleUrl: './budget-setting.component.scss'
})
export class BudgetSettingComponent implements OnInit {
  categorieslist: Categories[] = [];
  userId: string | null = null;
  selectedCategory = '';
  setBudgetForm!: FormGroup;
  uniqueCategoryBudgets: any[] = [];
  userEmail: string = sessionStorage.getItem('email') || '';
  noDataFound = false;
  Math = Math;

  constructor(
    private fb: FormBuilder,
    private categorylistService: CategorylistService,
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.setBudgetForm = this.fb.group({ limit: ['', Validators.required] });
    if (this.userId) {
      this.loadCategories();
      this.showBudgetList();
    }
  }

  loadCategories(): void {
    this.categorylistService.getCategoryList(this.userId!).subscribe({
      next: data => { this.categorieslist = data; },
      error: err => console.error('Error fetching categories:', err)
    });
  }

  setBudget(categoryName: string): void {
    this.selectedCategory = categoryName;
  }

  saveBudget(): void {
    if (this.setBudgetForm.invalid) return;
    const newBudget = {
      userId: this.userId || '',
      categories: [{ name: this.selectedCategory, budget: { limit: this.setBudgetForm.value.limit, spent: 0 } }]
    };
    this.budgetService.setExpenseBudget(newBudget).subscribe({
      next: () => {
        this.snackBar.open('Budget saved!', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.showBudgetList();
        this.setBudgetForm.reset({ limit: 0 });
      },
      error: () => this.snackBar.open('Error saving budget. Try again!', 'Close', { duration: 3000 })
    });
  }

  showBudgetList(): void {
    this.budgetService.getBudgetList(this.userEmail).subscribe({
      next: budgetData => {
        if (budgetData.length === 0) { this.noDataFound = true; return; }
        this.noDataFound = false;
        this.expenseService.getExpenses(this.userEmail).subscribe({
          next: expenseData => {
            const userExpenses = expenseData.filter(e => e.userEmail === this.userEmail);
            const map = new Map<string, { name: string; limit: number; spent: number }>();
            budgetData
              .filter((b: any) => b.userId === this.userId)
              .forEach((item: any) => {
                item.categories.forEach((cat: any) => {
                  const spent = userExpenses
                    .filter(e => e.category.toLowerCase() === cat.name.toLowerCase())
                    .reduce((sum, e) => sum + +e.amount, 0);
                  map.set(cat.name, { name: cat.name, limit: cat.budget.limit, spent });
                });
              });
            this.uniqueCategoryBudgets = Array.from(map.values());
          }
        });
      },
      error: err => console.error('Error fetching budget list:', err)
    });
  }

  isBudgetSet(categoryName: string): boolean {
    return this.uniqueCategoryBudgets.some(c => c.name === categoryName);
  }

  getProgress(spent: number, limit: number): number {
    return spent <= 0 ? 0 : Math.min((spent / limit) * 100, 100);
  }

  getProgressColor(spent: number, limit: number): 'warn' | 'primary' {
    return spent > limit ? 'warn' : 'primary';
  }
}
