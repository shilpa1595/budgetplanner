import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncomeService } from '../services/income.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-income-list',
  imports: [FormsModule,NgFor,RouterLink, NgIf],
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.scss'
})
export class IncomeListComponent {
  incomes: any[] = []; // Stores all income records
  filteredIncomes: any[] = []; // Stores filtered income records
  selectedMonth: string = ''; // Stores selected month
  userEmail: string = sessionStorage.getItem('email') || ''; // Logged-in user email
  totalIncome: number = 0; // Stores total income amount

  constructor(private incomeService: IncomeService, private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.setDefaultMonth();
    this.fetchIncomes();
  }
  setDefaultMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    this.selectedMonth = `${year}-${month}`; // Format YYYY-MM
  }
  fetchIncomes(){
    const userEmail = sessionStorage.getItem('email'); // Get logged-in user email
    if (!userEmail) {
      console.error('User not logged in');
      return;
    }
    this.incomeService.getIncomes(this.userEmail).subscribe({
      next: (data) => {
        // Filter incomes for the logged-in user
        this.incomes = data;
        // this.filteredIncomes = [...this.incomes]; // Show all incomes initially
        this.filterByMonth();
        this.calculateTotalIncome(); // Calculate total initially
      },
      error: (err) => console.error('Error fetching incomes:', err)
    });
  }
  filterByMonth() {
    if (!this.selectedMonth) {
      this.filteredIncomes = [...this.incomes]; // Show all if no month selected
    } else {
      const [year, month] = this.selectedMonth.split('-'); // Extract year and month

      this.filteredIncomes = this.incomes.filter(income => {
        const incomeDate = new Date(income.dateOfIncome);
        return (
          incomeDate.getFullYear() === parseInt(year) &&
          (incomeDate.getMonth() + 1) === parseInt(month) // Months are 0-based
        );
      });
    }

    this.calculateTotalIncome(); // Update total when filtering
  }

  calculateTotalIncome() {
    this.totalIncome = this.filteredIncomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
  }
  deleteIncome(id: number) {
    if(confirm("Are you sure you want to delete this income?")){
      this.incomeService.deleteIncome(id.toString()).subscribe(
        ()=>{
        this.snackBar.open('Income deleted successfully!', 'Close',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'center'
        })
        this.fetchIncomes();
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
}
