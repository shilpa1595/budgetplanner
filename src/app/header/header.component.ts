import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../user-management/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf, CommonModule,     // <-- Needed for pipes like uppercase
    TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentLang = 'en';
  private router = inject(Router);
  
  constructor (
    public authService:AuthService,
    private translate: TranslateService
  ) {
      this.currentLang = this.translate.getCurrentLang() || 'en';
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/user-management/login']);
  }


  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
