import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../shared/password-mismatch.directive';
import { AuthService } from '../services/auth.service';
import { RegisterPostData } from '../interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private snackBar: MatSnackBar,private router:Router){}
  private registerService = inject(AuthService);
  registerForm = new FormGroup({
    uname: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    cpassword: new FormControl('',[Validators.required])
  },{
    validators:passwordMatchValidator
  });

  onRegister(){
    const postData = {...this.registerForm.value};
    console.log(postData);
    delete postData.cpassword;
    this.registerService.registerUser(postData as RegisterPostData).subscribe(
      {
        next:(response=>{
          console.log(response);
          this.snackBar.open('Data saved successfully!', 'Close', {
            duration: 2000,  // Toast disappears after 3 seconds
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/user-management/login']);
        }),
        error:(err=>{
          console.log(err);
        })
      }
    );
  }
  get uname() {
    return this.registerForm.get('uname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get cpassword() {
    return this.registerForm.get('cpassword');
  }
}
