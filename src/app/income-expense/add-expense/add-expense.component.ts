import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Expense } from '../interfaces/expense';
import { ExpenseService } from '../services/expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategorylistService } from '../../shared/categorylist.service';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {
  addExpenseForm!:FormGroup;
  expenseCategories: string[] = [];
  userId: string | null = null; 
  categorieslist: any[] = [];
  constructor(private fb:FormBuilder, private expenseService:ExpenseService, private snackBar: MatSnackBar,
    private categorylistService:CategorylistService
  ){}

  ngOnInit(){
    this.userId = sessionStorage.getItem('userId');
    this.addExpenseForm = this.fb.group({
      amount:['',[Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      dateOfExpense: ['', Validators.required],
      paymentMode: ['', Validators.required],
      description: ['']
    });
    this.categoriesList();

  }
  addData(){
    if(this.addExpenseForm.invalid){
      return;
    }

    const newExpense:Expense = {
      ...this.addExpenseForm.value,
      userEmail:sessionStorage.getItem('email') || ''
    };

    this.expenseService.addExpense(newExpense).subscribe({
      next:()=>{
        this.snackBar.open("Data Added Successfully",'close',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'center'
        })
         this.addExpenseForm.reset();
      },
      error:()=>{
        this.snackBar.open('Error adding expense. Try again!', 'Close', { duration: 3000 });
      }

    });
    
  }

  categoriesList() {
  this.categorylistService.getCategoryList(this.userId!).subscribe({
    next: (data) => {
      console.log(data);
      if (Array.isArray(data)) {
      this.categorieslist = data;
      this.expenseCategories = data[0]?.expense || [];
    } else {
      console.error('Expected array but got:', typeof data);
    }
    },
    error:()=>{}
  });
  }

}
