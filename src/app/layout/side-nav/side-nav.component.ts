import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  readonly layout = inject(LayoutService);

  navItems = [
    { label: 'Dashboard',  icon: 'dashboard',              route: '/dashboard' },
    { label: 'Income',     icon: 'trending_up',            route: '/income/income-list' },
    { label: 'Expense',    icon: 'trending_down',          route: '/expense/expense-list' },
    { label: 'Budget',     icon: 'account_balance_wallet', route: '/budget/budget-setting' },
    { label: 'Categories', icon: 'category',               route: '/categories' },
    { label: 'Reports',    icon: 'bar_chart',              route: '/reports' },
    { label: 'History',    icon: 'history',                route: '/history' },
    { label: 'Profile',    icon: 'person',                 route: '/profile' },
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
