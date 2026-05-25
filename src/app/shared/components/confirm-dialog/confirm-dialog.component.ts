import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable confirmation dialog — replaces all raw browser confirm() calls.
 *
 * Usage in template:
 *   <app-confirm-dialog
 *     [visible]="showConfirm"
 *     message="Are you sure you want to delete this?"
 *     (confirmed)="onDelete()"
 *     (cancelled)="showConfirm = false">
 *   </app-confirm-dialog>
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmLabel = 'Yes, Delete';
  @Input() cancelLabel = 'Cancel';
  @Input() danger = true;          // true = red confirm button, false = primary

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
