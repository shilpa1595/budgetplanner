import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterPostData } from '../../../core/models/user.model';
import { passwordMatchValidator } from '../../../shared/directives/password-mismatch.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private registerService = inject(AuthService);
  currentLang = 'en';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') || this.translate.getCurrentLang() || 'en';
  }

  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  registerForm = new FormGroup({
    uname:     new FormControl('', [Validators.required]),
    email:     new FormControl('', [Validators.required, Validators.email]),
    password:  new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator });

  onRegister(): void {
    const postData = { ...this.registerForm.value };
    delete postData.cpassword;
    this.registerService.registerUser(postData as RegisterPostData).subscribe({
      next: () => {
        this.snackBar.open('Registered successfully!', 'Close', {
          duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.router.navigate(['/auth/login']);
      },
      error: err => console.error(err)
    });
  }

  get uname()     { return this.registerForm.get('uname'); }
  get email()     { return this.registerForm.get('email'); }
  get password()  { return this.registerForm.get('password'); }
  get cpassword() { return this.registerForm.get('cpassword'); }
}
