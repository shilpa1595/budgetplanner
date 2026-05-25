// ⚠️ LEGACY FILE — superseded by core/services/loader.service.ts
// Will be removed in Phase 5. BehaviorSubject import path fixed.
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
