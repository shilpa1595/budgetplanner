import { Component } from '@angular/core';
import { CategorylistService } from '../shared/categorylist.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [NgFor,CommonModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categorieslist: any = {}; 
  userId: string | null = null; 
  newIncomeCategory = '';
  newExpenseCategory = '';

  constructor(private CategorylistService:CategorylistService, public snackBar: MatSnackBar){
  }
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
console.log("User ID:", this.userId);

    if (this.userId) {
      this.categoriesList();
    } else {
      console.log("User not logged in");
    }
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

  updateDetails(){
    if(this.categorieslist){
     this.CategorylistService.updateCategory(this.categorieslist[0].id, this.categorieslist[0]).subscribe({
      next:()=>{
        this.snackBar.open('updated successfully!', 'Close', {
          duration: 2000,  // Toast disappears after 3 seconds
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error:()=>{
        this.snackBar.open('Faild to update!', 'Close', {
          duration: 2000,  // Toast disappears after 3 seconds
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
     });
    }
  }
  addIncomeCategory(){
    if(!this.newIncomeCategory.trim()) return;

    if (!this.categorieslist[0]) return;

    if(this.categorieslist[0].income.includes(this.newIncomeCategory)){
      this.snackBar.open('Category Already Exists !', 'close', { duration: 2000 });
      return;
    }
    this.categorieslist[0].income.push(this.newIncomeCategory);
    this.updateDetails();
    this.newIncomeCategory = ''; // Reset input field
  }
  removeIncomeCategory(index: number){
    if (!this.categorieslist[0]) return;
    this.categorieslist[0].income.splice(index, 1);
    this.updateDetails();  // Persist changes
  }

  addExpenseCategory(){
    if(!this.newExpenseCategory.trim()) return;

    if (!this.categorieslist[0]) return;

    if(this.categorieslist[0].expense.includes(this.newExpenseCategory)){
      this.snackBar.open('Category Already Exists !', 'close', { duration: 2000 });
      return;
    }
    this.categorieslist[0].expense.push(this.newExpenseCategory);
    this.updateDetails();
    this.newExpenseCategory = ''; // Reset input field
  }
  
  removeExpenseCategory(index: number){
 if (!this.categorieslist[0]) return;
    this.categorieslist[0].expense.splice(index, 1);
    this.updateDetails();  // Persist changes
  }
}
