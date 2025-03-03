import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '../interfaces/expense';

declare var bootstrap: any; // Required for Bootstrap 5 modals

@Component({
  selector: 'app-expense-list',
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
 expense: any[] = [];
 filteredExpense:any[] = [];
 selectedMonth: string ='';
 userEmail:string = sessionStorage.getItem('email') || '';
 totalExpense:number = 0;
 selectedExpense:Expense | null = null;
 constructor(private expenseService:ExpenseService, private snackBar: MatSnackBar){}

 ngOnInit(): void {
  this.setDefaultMonth();
  this.fetchExpense();
}
setDefaultMonth(){
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth()+1).toString().padStart(2,'0');
  this.selectedMonth = `${year}-${month}`;
}
fetchExpense(){
  if (!this.userEmail) {
    console.error('User not logged in');
    return;
  }
  this.expenseService.getExpenses(this.userEmail).subscribe({
    next:(data)=>{
      this.expense = data;
      this.filterByMonth();
      this.calculateTotalIncome();
    },
    error: (err) => console.error('Error fetching incomes:', err)
  });
}
  filterByMonth(){
    if(!this.selectedMonth){
      this.filteredExpense = [this.expense];
    }else{
      const[year,month] = this.selectedMonth.split('-');
      this.filteredExpense = this.expense.filter(expense =>{
        const expenseDate = new Date(expense.dateOfExpense);

        return(
          expenseDate.getFullYear() === parseInt(year) &&
          (expenseDate.getMonth()+1) === parseInt(month)
        )
      })
    }
    this.calculateTotalIncome(); // Update total when filtering
  }
  calculateTotalIncome(){

  }
  deleteExpense(id:number){
    if(confirm("Are you sure you want to delete this income?")){
      this.expenseService.deleteExpense(id.toString()).subscribe(
        ()=>{
        this.snackBar.open('Income deleted successfully!', 'Close',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'center'
        })
        this.fetchExpense();
      },
      (error)=>{
        this.snackBar.open('Error deleting income!', 'Close',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'center'
        })
      }
    );
    }
  }

  openEditModal(expense: Expense): void {
    this.selectedExpense = { ...expense };
    console.log(this.selectedExpense);
  }

  saveExpense(): void {
    if (!this.selectedExpense) return;

    this.expenseService.updateExpense(this.selectedExpense).subscribe(() => {
      this.snackBar.open('Expense updated successfully!', 'Close', { duration: 3000 });
      this.loadExpenses();
      this.selectedExpense = null; // Close modal
    });
  }

  loadExpenses(): void {
    if (!this.userEmail) return;

    this.expenseService.getExpenses(this.userEmail).subscribe((data) => {
      this.expense = data;
      this.filterByMonth();
    });
  }
}
