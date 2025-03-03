import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginform:any;
  registerForm:any;
  activeForm:'login' | 'register' = 'login';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.loginform = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
    this.registerForm = this.fb.group({
      uname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }

  toggleForm(form:'login' | 'register'){
    this.activeForm = form;
  }
  login(){
    debugger;
    // if(this.loginform.valid){
    //  console.log("Login Info....", this.loginform.value);
      if(this.loginform.get('email')?.value == 's@gmail.com' && this.loginform.get('password')?.value === 'test'){
        this.router.navigate(['/budget-planner/dashboard'])
      }
      else
      {
        this.snackBar.open('Wrong credentials', 'close', {duration:3000,  horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,});
      }
    // }else{
    //   this.snackBar.open('invalid email or password', 'close', {duration:3000,  horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,});
    // }
  }
  register(){
    if(this.registerForm.valid){
      console.log("register Info....", this.registerForm.value);
      setTimeout(()=>{
        window.location.reload();
      },2000)
      this.router.navigate(['/budget-planner/login'])
     }else{
       this.snackBar.open('Please Fill in all fields correctly!', 'close', {duration:3000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,});
     }
  }
  

}
