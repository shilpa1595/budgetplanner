import { Component } from '@angular/core';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../services/profile.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  imports: [NgFor,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile:any= null;
  userId: string | null = null; 

  constructor(private profileService:ProfileService, public snackBar: MatSnackBar){}

  ngOnInit(): void {
    //this.userId = sessionStorage.getItem('userId');
    this.userId = sessionStorage.getItem('userId');
console.log("User ID:", this.userId);

    if (this.userId) {
      this.loadProfile();
    } else {
      console.log("User not logged in");
    }
  }

  loadProfile():void{
    this.profileService.getProfile(this.userId!).subscribe(
      (response:any)=>{
        if(response.length > 0){
          this.profile = response[0];
          console.log(response[0]);
        }else{
          console.log("Profile not found");
        }
      },
      error=>{
        console.error("Error fetching profile:", error);
      }
    )
  }

  updateProfile(){
    if(this.profile){
      this.profileService.updateProfile(this.profile).subscribe({
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
  // Income Source
  addIncomeSource(){
    const newSource = prompt("Enter Income source");
    if(newSource && this.profile){
      this.profile.incomeSource.push(newSource);
      this.updateProfile();  // Persist changes
    }
  }
  removeIncomeSource(index:number){
    this.profile.incomeSource.splice(index,1);
    this.updateProfile();  // Persist changes
  }

  // Income category
  addIncomeCategory(){
    const newIncomeCategory = prompt("Enter Income Category");
    if(newIncomeCategory && this.profile){
      this.profile.incomeCategories.push(newIncomeCategory);
      this.updateProfile();
    }
    
  }
  removeIncomeCategory(index:number){
    this.profile.incomeCategories.splice(index,1);
    this.updateProfile();
  }

  // Expense Category
  addExpenseCategory(){
    const newExpCategory = prompt("Enter Expense Category");
    if(newExpCategory && this.profile){
      this.profile.expenseCategories.push(newExpCategory);
      this.updateProfile();
    }
  }
  removeExpenseCategory(index:number){
    this.profile.expenseCategories.splice(index,1);
    this.updateProfile();
  }


  updateBudget(){
    const newBudget = prompt("Enter new budget");
    if((newBudget && !isNaN(parseFloat(newBudget))) && this.profile){
      this.profile.budgetSettings.monthlyLimit = parseFloat(newBudget);
      this.updateProfile();
    }else{
      this.snackBar.open("Please Enter valid number","close",{
        duration:2000,
        horizontalPosition:"center",
        verticalPosition:"top"
      })

      
    }
  }


}
