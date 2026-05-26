import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { IncomeService } from '../income.service';
import { Income } from '../../../core/models/income.model';
import { EditIncomeModalComponent } from '../edit-income/edit-income-modal.component';

@Component({
  selector: 'app-income-list',
  standalone: true,
  imports: [FormsModule, RouterLink, DecimalPipe, DatePipe, EditIncomeModalComponent, TranslateModule],
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.scss'
})
export class IncomeListComponent implements OnInit {
  incomes: Income[] = [];
  filteredIncomes: Income[] = [];
  selectedMonth = '';
  userEmail: string = sessionStorage.getItem('email') || '';
  totalIncome = 0;
  editingIncome: Income | null = null;

  constructor(private incomeService: IncomeService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setDefaultMonth();
    this.fetchIncomes();
  }

  setDefaultMonth(): void {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth = `${today.getFullYear()}-${month}`;
  }

  fetchIncomes(): void {
    this.incomeService.getIncomes(this.userEmail).subscribe({
      next: data => {
        this.incomes = data;
        this.filterByMonth();
      },
      error: err => console.error('Error fetching incomes:', err)
    });
  }

  filterByMonth(): void {
    if (!this.selectedMonth) {
      this.filteredIncomes = [...this.incomes];
    } else {
      const [year, month] = this.selectedMonth.split('-');
      this.filteredIncomes = this.incomes.filter(income => {
        const d = new Date(income.dateOfIncome);
        return d.getFullYear() === +year && (d.getMonth() + 1) === +month;
      });
    }
    this.totalIncome = this.filteredIncomes.reduce((sum, i) => sum + parseFloat(i.amount.toString()), 0);
  }

  openEditModal(income: Income): void {
    this.editingIncome = income;
  }

  onModalClosed(): void {
    this.editingIncome = null;
  }

  onModalSaved(): void {
    this.editingIncome = null;
    this.fetchIncomes();
  }

  deleteIncome(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this income?')) {
      this.incomeService.deleteIncome(id.toString()).subscribe({
        next: () => {
          this.snackBar.open('Income deleted successfully!', 'Close', {
            duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'
          });
          this.fetchIncomes();
        },
        error: () => {
          this.snackBar.open('Error deleting income!', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
