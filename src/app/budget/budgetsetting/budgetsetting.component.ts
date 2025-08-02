import { Component } from '@angular/core';
import { CategorylistService } from '../../shared/categorylist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor, NgIf } from '@angular/common';
import { BudgetService } from '../../shared/budget.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget } from '../interfaces/budget';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ExpenseService } from '../../income-expense/services/expense.service';

@Component({
  selector: 'app-budgetsetting',
  imports: [NgFor,ReactiveFormsModule,MatProgressBarModule,NgIf],
  templateUrl: './budgetsetting.component.html',
  styleUrl: './budgetsetting.component.scss'
})
export class BudgetsettingComponent {
  categorieslist: any = {}; 
  userId: string | null = null; 
  selectedCategory: string = '';
  setBudgetForm!:FormGroup;
  budgets: Budget[] = [];
  uniqueCategoryBudgets: any[] = [];
  userEmail:string = sessionStorage.getItem('email') || '';
  Math = Math;  // expose Math to the template
  noDataFound:boolean = false;

  constructor(private fb:FormBuilder,
    private CategorylistService:CategorylistService,
    public snackBar: MatSnackBar,
    private budgetService:BudgetService,
    private expenseService:ExpenseService,){
  }
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
console.log("User ID:", this.userId);

    if (this.userId) {
      this.categoriesList();
      this.showBudgetList();
    } else {
      console.log("User not logged in");
    }

    this.setBudgetForm = this.fb.group({
      limit: ['', Validators.required],
    });
  }
  categoriesList(){
    this.CategorylistService.getCategoryList(this.userId!).subscribe({
      next:(data)=>{
        this.categorieslist = data;
        console.log(this.categorieslist);
      },
      error:(err)=>console.error('Error fetching categories:', err)
    });
  }
  setBudget(categoryName: string){
    console.log(categoryName);
    this.selectedCategory = categoryName;
  }
  saveBudget(){
    if(this.setBudgetForm.invalid){
      return;
    }
    const limit = this.setBudgetForm.value.limit;
   

     const newBudget = {
      userId:sessionStorage.getItem('userId') || '',
      categories: [
        {
          name: this.selectedCategory,
          budget: {
            limit: limit,
            spent: 0,
          },
        },
      ],
    };
    this.budgetService.setExpenseBudget(newBudget).subscribe({
      next:()=>{
        this.snackBar.open("Data Added Successfully",'close',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'center'
        });
        this.showBudgetList();
      },
      error:()=>{
        this.snackBar.open('Error adding expense. Try again!', 'Close', { duration: 3000 });
      }
    });

    // Reset form
  this.setBudgetForm.reset({ limit: 0 });
  }

  showBudgetList() {
  // Get both budgets and expenses
  this.budgetService.getBudgetList(this.userEmail).subscribe({
    next: (budgetData) => {
      if (budgetData.length > 0){
        this.noDataFound = false;
      this.expenseService.getExpenses(this.userEmail).subscribe({
        next: (expenseData) => {
          const userId = sessionStorage.getItem('userId');
          const userEmail = sessionStorage.getItem('email'); // store email when logging in

          // Filter only current user's expenses
          const userExpenses = expenseData.filter(
            (exp: any) => exp.userEmail === userEmail
          );

          const map = new Map<string, { name: string; limit: number; spent: number }>();

          // Iterate over all budgets for the current user
          budgetData
            .filter((b: any) => b.userId === userId)
            .forEach((budgetItem: any) => {
              budgetItem.categories.forEach((cat: any) => {
                // Sum all expenses for this category
               const spent = userExpenses
              .filter(
                (exp: any) =>
                  exp.category.toLowerCase() === cat.name.toLowerCase()
              )
              .reduce((total: number, exp: any) => total + Number(exp.amount), 0);

                // Store category data
                map.set(cat.name, {
                  name: cat.name,
                  limit: cat.budget.limit,
                  spent: spent,
                });
              });
            });

          // Convert map to array
          this.uniqueCategoryBudgets = Array.from(map.values());
          console.log('Unique Category Budgets:', this.uniqueCategoryBudgets);
        },
      });
    }else{
      this.noDataFound = true;
    }
    },
    error: (err) => {
      console.error('Error fetching budget list:', err);
      this.snackBar.open('Error fetching budget list. Try again!', 'Close', { duration: 3000 });
    }
  });
}


  isBudgetSet(categoryName: string): boolean {
    return this.uniqueCategoryBudgets.some(cat => cat.name === categoryName);
  }

  getProgress(spent: number, limit: number): number {
  if (spent <= 0) {
    return 0;
  }
  // If spent > limit, show full bar (100%)
  return Math.min((spent / limit) * 100, 100);
}

getProgressColor(spent: number, limit: number): 'warn' | 'primary' {
  // 'warn' = red, 'primary' = green (you can override primary to green in CSS)
  return spent > limit ? 'warn' : 'primary';
}

  
}
