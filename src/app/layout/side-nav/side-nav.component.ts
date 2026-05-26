import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, TranslateModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  readonly layout = inject(LayoutService);

  navItems = [
    { labelKey: 'NAV.DASHBOARD',  icon: 'dashboard',              route: '/dashboard' },
    { labelKey: 'NAV.INCOME',     icon: 'trending_up',            route: '/income/income-list' },
    { labelKey: 'NAV.EXPENSE',    icon: 'trending_down',          route: '/expense/expense-list' },
    { labelKey: 'NAV.BUDGET',     icon: 'account_balance_wallet', route: '/budget/budget-setting' },
    { labelKey: 'NAV.CATEGORIES', icon: 'category',               route: '/categories' },
    { labelKey: 'NAV.REPORTS',    icon: 'bar_chart',              route: '/reports' },
    { labelKey: 'NAV.HISTORY',    icon: 'history',                route: '/history' },
    { labelKey: 'NAV.PROFILE',    icon: 'person',                 route: '/profile' },
  ];

  userEmail    = sessionStorage.getItem('email') || '';
  userInitial  = this.userEmail.charAt(0).toUpperCase();

  constructor(private router: Router, private authService: AuthService) {}

  navigate(route: string): void {
    this.layout.close();   // close drawer on mobile after navigation
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.layout.close();
    this.router.navigate(['/auth/login']);
  }
}
