import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Generic empty-state component — replaces scattered noDataFound boolean flags.
 *
 * Usage:
 *   <app-empty-state
 *     icon="💸"
 *     title="No expenses yet"
 *     message="Add your first expense to get started.">
 *   </app-empty-state>
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() icon = '📭';
  @Input() title = 'No data found';
  @Input() message = '';
}
