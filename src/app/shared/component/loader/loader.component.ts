// ⚠️ LEGACY FILE — superseded by shared/components/loader/loader.component.ts
// Will be removed in Phase 5. Import path fixed to avoid compile errors.
import { Component } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading$.subscribe(status => {
      this.isLoading = status;
    });
  }
  

}
