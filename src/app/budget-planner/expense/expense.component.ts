import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm:any;
  selectedMonth:any;
  
  janExpense: any[] = [
    {expenseType:'Rent', expenseAmount:5000},
    {expenseType:'Groceries', expenseAmount:1500},
  ];
  FebExpense: any[] = [
    {expenseType:'Rent', expenseAmount:5000},
    {expenseType:'Utilities', expenseAmount:2000},
  ];
  MarchExpense: any[] = [
    {expenseType:'Groceries', expenseAmount:1000},
    {expenseType:'Utilities', expenseAmount:2000},
  ];

  monthSelected:boolean= false;

constructor(private router: Router, private fb: FormBuilder){
  this.selectedMonth = new Date().toLocaleString('default',{month:'long'});
}

ngOnInit():void{
  this.expenseForm = this.fb.group({
    month:['',Validators.required],
    expenseType:['',Validators.required],
    expenseAmount:['',Validators.required]
  })
}
  onSubmitExpense(){
    if(this.expenseForm.valid){
      const newExpense = this.expenseForm.value;
      this.getFilteredExpense().push(newExpense);
      this.expenseForm.reset();
    }

  }
  getFilteredExpense(){
    switch(this.selectedMonth){
      case 'January':
        return this.janExpense;
      case 'February':
        return this.FebExpense;
      case 'March':
        return this.MarchExpense;
        default:
        return [];
    }
  }
  onChange(event:any){
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpense();
  }
  calculateTotalExpense(month:string):number{
    return this.getFilteredExpense().reduce((acc,curr) => acc+curr.expenseAmount,0);
  }
  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }
  saveForm(){
    console.log("data saved");
  }
}
