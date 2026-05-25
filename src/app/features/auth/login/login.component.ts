import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslateModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  login = { email: '', password: '' };
  currentLang = 'en';

  private authService = inject(AuthService);
  private router      = inject(Router);
  private loader      = inject(LoaderService);

  constructor(
    private snackBar: MatSnackBar,
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

  onLogin(): void {
    const { email, password } = this.login;
    this.loader.show();
    this.authService.getUserDetails(email, password).subscribe({
      next: response => {
        if (response.length >= 1) {
          const user = response[0];
          setTimeout(() => {
            this.loader.hide();
            sessionStorage.setItem('userId', user.id.toString());
            sessionStorage.setItem('email', email);
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          this.loader.hide();
          this.snackBar.open('No record found', 'Close', {
            duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'
          });
        }
      },
      error: () => {
        this.loader.hide();
        this.snackBar.open('Login failed', 'Close', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'
        });
      }
    });
  }
}
