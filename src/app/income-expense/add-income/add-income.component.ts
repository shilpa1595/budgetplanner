import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeService } from '../services/income.service';
import { Income } from '../interfaces/income';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-income',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.scss'
})
export class AddIncomeComponent {
  private incomeService = inject(IncomeService);
  addIncomeForm!: FormGroup;

  constructor(private snackBar: MatSnackBar,private router:Router){}
  ngOnInit(): void {
  this.addIncomeForm = new FormGroup({
    amount: new FormControl('',[Validators.required]),
    source: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    dateOfIncome: new FormControl('',[Validators.required]),
    userEmail: new FormControl(sessionStorage.getItem('email') || '', [Validators.required])
  })
  }
  addData(){
    console.log(this.addIncomeForm.value); 
    const formData = this.addIncomeForm.value;

    const incomeData = {
      ...formData,  // Spread form data
      userEmail: sessionStorage.getItem('email') || ''  // Ensure userEmail is included
    };

    this.incomeService.addIncome(incomeData as Income).subscribe({
      next: () => {
        this.snackBar.open('Income added successfully!', 'Close', {
          duration: 2000,  // Toast disappears after 3 seconds
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
          // ✅ Reset form after successful submission
        this.addIncomeForm.reset();

        // ✅ Reset email field since it's pre-filled
        this.addIncomeForm.patchValue({
          userEmail: sessionStorage.getItem('email') || ''
        });
      },
      error: () => {
        this.snackBar.open('Failed to add income. Try again!', 'Close', {
          duration: 2000,  // Toast disappears after 3 seconds
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    })

  }

}
