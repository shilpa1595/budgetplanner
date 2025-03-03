import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../user-management/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  constructor(public authService:AuthService){}
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/user-management/login']);
  }
}
