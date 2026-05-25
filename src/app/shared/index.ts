// Shared barrel — import from here across all features
// Angular 19 standalone: no SharedModule, just re-exports

// Components
export { LoaderComponent }         from './components/loader/loader.component';
export { ConfirmDialogComponent }  from './components/confirm-dialog/confirm-dialog.component';
export { EmptyStateComponent }     from './components/empty-state/empty-state.component';

// Directives
export { passwordMatchValidator }  from './directives/password-mismatch.directive';

// Pipes
export { CurrencyFormatPipe }      from './pipes/currency-format.pipe';
