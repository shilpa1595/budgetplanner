import { Component, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from './profile.service';
import { Profile } from '../../core/models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  userId: string | null = null;

  constructor(private profileService: ProfileService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (this.userId) this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile(this.userId!).subscribe({
      next: response => {
        if (response.length > 0) this.profile = response[0];
      },
      error: err => console.error('Error fetching profile:', err)
    });
  }

  updateProfile(): void {
    if (!this.profile) return;
    this.profileService.updateProfile(this.profile).subscribe({
      next: () => this.snackBar.open('Updated successfully!', 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Failed to update!', 'Close', { duration: 2000 })
    });
  }

  addIncomeSource(): void {
    const newSource = prompt('Enter Income Source');
    if (newSource && this.profile) {
      this.profile.incomeSource.push(newSource);
      this.updateProfile();
    }
  }

  removeIncomeSource(index: number): void {
    this.profile?.incomeSource.splice(index, 1);
    this.updateProfile();
  }

  addIncomeCategory(): void {
    const cat = prompt('Enter Income Category');
    if (cat && this.profile) { this.profile.incomeCategories.push(cat); this.updateProfile(); }
  }

  removeIncomeCategory(index: number): void {
    this.profile?.incomeCategories.splice(index, 1); this.updateProfile();
  }

  addExpenseCategory(): void {
    const cat = prompt('Enter Expense Category');
    if (cat && this.profile) { this.profile.expenseCategories.push(cat); this.updateProfile(); }
  }

  removeExpenseCategory(index: number): void {
    this.profile?.expenseCategories.splice(index, 1); this.updateProfile();
  }

  updateBudget(): void {
    const val = prompt('Enter new monthly budget');
    if (val && !isNaN(parseFloat(val)) && this.profile) {
      this.profile.budgetSettings.monthlyLimit = parseFloat(val);
      this.updateProfile();
    } else {
      this.snackBar.open('Please enter a valid number', 'Close', { duration: 2000 });
    }
  }
}
