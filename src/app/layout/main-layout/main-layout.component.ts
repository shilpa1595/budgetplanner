import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

/**
 * MainLayoutComponent — shell for all authenticated routes.
 *
 * Used as a parent route wrapper in app.routes.ts:
 *
 *   {
 *     path: '',
 *     component: MainLayoutComponent,
 *     canActivate: [authGuard],
 *     children: [
 *       { path: 'dashboard', loadComponent: () => DashboardComponent },
 *       { path: 'income',    loadChildren: () => INCOME_ROUTES },
 *       ...
 *     ]
 *   }
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent, HeaderComponent, LoaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {}
