import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Expense } from '../interfaces/expense';
import { ExpenseService } from '../services/expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {
  addExpenseForm!:FormGroup;

  constructor(private fb:FormBuilder, private expenseService:ExpenseService, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.addExpenseForm = this.fb.group({
      amount:['',[Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      dateOfExpense: ['', Validators.required],
      paymentMode: ['', Validators.required],
      description: ['']
    });
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
      },
      error:()=>{
        this.snackBar.open('Error adding expense. Try again!', 'Close', { duration: 3000 });
      }

    });
    
  }
}
