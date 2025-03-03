import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login = {
    email:'',
    password:''
  }
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor(private snackBar:MatSnackBar){}
  onLogin(){
    const {email,password} = this.login;
    this.authService.getUserDetails(email,password).subscribe({
      next: response=>{
        if(response.length >= 1){
          const user = response[0]; // Get the first matched user

      // ✅ Store user ID and email in session storage
      sessionStorage.setItem('userId', user.id.toString());
          sessionStorage.setItem('email',email);
          this.router.navigate(['./budget-planner/dashboard']);
        }else{
          this.snackBar.open('No record Found', 'Close', {
            duration: 3000,  // Toast disappears after 3 seconds
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      }
    })
  }
}
