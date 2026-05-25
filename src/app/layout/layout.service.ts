import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly sideNavOpen = signal(false);

  toggle(): void { this.sideNavOpen.update(v => !v); }
  close(): void  { this.sideNavOpen.set(false); }
  open(): void   { this.sideNavOpen.set(true); }
}
