import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatIconModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'budget-planner';
}
