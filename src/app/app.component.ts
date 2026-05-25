import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// AppComponent is now a thin shell — just a router-outlet.
// Header, SideNav and Loader are handled by MainLayoutComponent
// for authenticated routes, and by individual public screens (login/register).
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'budget-planner';

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    translate.setFallbackLang('en');
    translate.use(savedLang);
  }
}
