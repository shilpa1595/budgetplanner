import { Component, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategorylistService } from '../../shared/categorylist.service';
import { Categories } from '../../core/models/budget.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categorieslist: Categories[] = [];
  userId: string | null = null;
  newIncomeCategory = '';
  newExpenseCategory = '';

  constructor(
    private categorylistService: CategorylistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (this.userId) this.loadCategories();
  }

  loadCategories(): void {
    this.categorylistService.getCategoryList(this.userId!).subscribe({
      next: data => { this.categorieslist = data; },
      error: err => console.error('Error fetching categories:', err)
    });
  }

  updateDetails(): void {
    if (!this.categorieslist[0]?.id) return;
    this.categorylistService.updateCategory(this.categorieslist[0].id!, this.categorieslist[0]).subscribe({
      next: () => this.snackBar.open('Updated successfully!', 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Failed to update!', 'Close', { duration: 2000 })
    });
  }

  addIncomeCategory(): void {
    if (!this.newIncomeCategory.trim() || !this.categorieslist[0]) return;
    if (this.categorieslist[0].income.includes(this.newIncomeCategory)) {
      this.snackBar.open('Category already exists!', 'Close', { duration: 2000 }); return;
    }
    this.categorieslist[0].income.push(this.newIncomeCategory);
    this.updateDetails();
    this.newIncomeCategory = '';
  }

  removeIncomeCategory(index: number): void {
    if (!this.categorieslist[0]) return;
    this.categorieslist[0].income.splice(index, 1);
    this.updateDetails();
  }

  addExpenseCategory(): void {
    if (!this.newExpenseCategory.trim() || !this.categorieslist[0]) return;
    if (this.categorieslist[0].expense.includes(this.newExpenseCategory)) {
      this.snackBar.open('Category already exists!', 'Close', { duration: 2000 }); return;
    }
    this.categorieslist[0].expense.push(this.newExpenseCategory);
    this.updateDetails();
    this.newExpenseCategory = '';
  }

  removeExpenseCategory(index: number): void {
    if (!this.categorieslist[0]) return;
    this.categorieslist[0].expense.splice(index, 1);
    this.updateDetails();
  }
}
