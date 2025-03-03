import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeService } from '../services/income.service';
import { Income } from '../interfaces/income';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-income',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-income.component.html',
  styleUrl: './edit-income.component.scss'
})
export class EditIncomeComponent {
  updateIncomeForm!:FormGroup;
  incomeId!: string;

  constructor(private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private incomeService:IncomeService,public snackBar:MatSnackBar){}

  ngOnInit(){
    // this.incomeId = +this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(params=>{
      const idParam = params.get('id');
      console.log("ID from route:", idParam); // Debugging
      if (idParam) {
        this.incomeId = idParam; // Convert to number
        this.loadIncomeData(); // Call function to fetch income
      } else {
        console.error("Income ID is missing in the route!");
        this.router.navigate(['/income-expense/income-list']); // Redirect if ID is missing
      }
    });
    this.initForm();
  }
  initForm() {
    this.updateIncomeForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      source: ['', Validators.required],
      category: ['', Validators.required],
      dateOfIncome: ['', Validators.required]
    })
  }
  loadIncomeData(){
    this.incomeService.getIncomeById((this.incomeId).toString()).subscribe({
      next:(income)=>{
        if(income){
          this.updateIncomeForm.patchValue(income)
        }
      },
      error:(err)=>console.error("Error fetching income:",err)
    });
  }
  updateIncome(){
    if(this.updateIncomeForm.invalid) return;

    const updatedIncome : Income = {...this.updateIncomeForm.value, id:(this.incomeId).toString()};
    
    this.incomeService.updateIncome((this.incomeId).toString(),updatedIncome).subscribe({
      next:()=>{
        this.snackBar.open('Income updated successfully!', 'Close', {
          duration: 2000,  // Toast disappears after 3 seconds
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/income-expense/income-list']);
      },
      error:(err)=>console.error("Error updating income",err)
    });
  }
}
