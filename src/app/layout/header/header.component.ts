import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentLang = 'en';
  private router = inject(Router);

  constructor(
    public authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.getCurrentLang() || 'en';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
