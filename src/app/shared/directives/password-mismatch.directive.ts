import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Cross-field validator — checks password === cpassword.
 * Apply at FormGroup level.
 *
 * Usage:
 *   this.form = new FormGroup({ ... }, { validators: passwordMatchValidator });
 *
 * Template error check:
 *   <span *ngIf="form.errors?.['passwordMismatch']">Passwords do not match</span>
 */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('cpassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};
