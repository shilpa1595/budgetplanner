import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  isCollapsed = true;

  navItems = [
    { label: 'Dashboard',   icon: 'dashboard',      route: '/dashboard' },
    { label: 'Income',      icon: 'trending_up',    route: '/income/income-list' },
    { label: 'Expense',     icon: 'trending_down',  route: '/expense/expense-list' },
    { label: 'Budget',      icon: 'account_balance_wallet', route: '/budget/budget-setting' },
    { label: 'Categories',  icon: 'category',       route: '/categories' },
    { label: 'Reports',     icon: 'bar_chart',      route: '/reports' },
    { label: 'History',     icon: 'history',        route: '/history' },
    { label: 'Profile',     icon: 'person',         route: '/profile' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
