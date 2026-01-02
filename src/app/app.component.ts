import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatIconModule,HeaderComponent,LoaderComponent],
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
