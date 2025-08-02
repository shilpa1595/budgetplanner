import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../shared/services/loader.service';

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
  private loader = inject(LoaderService); // Assuming you have a loader service
  constructor(private snackBar:MatSnackBar){}
  onLogin(){
    const {email,password} = this.login;
    this.loader.show(); // Show the loader
    this.authService.getUserDetails(email,password).subscribe({
      next: response=>{
        if(response.length >= 1){
          const user = response[0]; // Get the first matched user
          setTimeout(() => {
             this.loader.hide(); // Hide the loader
              // ✅ Store user ID and email in session storage
            sessionStorage.setItem('userId', user.id.toString());
            sessionStorage.setItem('email',email);
             this.router.navigate(['./budget-planner/dashboard']);
          }, 3000);
        }else{
          this.snackBar.open('No record Found', 'Close', {
            duration: 3000,  // Toast disappears after 3 seconds
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      },error: err=>{
        this.loader.hide(); // Hide the loader
        this.snackBar.open('Login failed', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    })
  }
}
