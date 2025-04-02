import { Component } from '@angular/core';
import { CategorylistService } from '../../shared/categorylist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor } from '@angular/common';
import { BudgetService } from '../../shared/budget.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget } from '../interfaces/budget';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-budgetsetting',
  imports: [NgFor,ReactiveFormsModule,MatProgressBarModule],
  templateUrl: './budgetsetting.component.html',
  styleUrl: './budgetsetting.component.scss'
})
export class BudgetsettingComponent {
  categorieslist: any = {}; 
  userId: string | null = null; 
  selectedCategory: string = '';
  setBudgetForm!:FormGroup;
  budgets: Budget[] = [];

  constructor(private fb:FormBuilder,private CategorylistService:CategorylistService, public snackBar: MatSnackBar,private budgetService:BudgetService){
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
        })
      },
      error:()=>{
        this.snackBar.open('Error adding expense. Try again!', 'Close', { duration: 3000 });
      }
    });

    // Reset form
  this.setBudgetForm.reset({ limit: 0 });
  }

  showBudgetList(){
    this.budgetService.getBudgetList().subscribe({
      next:(data)=>{
        this.budgets = data;
        console.log(this.budgets);
      }
    })
  }
}
