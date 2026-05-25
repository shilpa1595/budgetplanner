import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts a raw amount value (string or number, possibly with commas)
 * into a clean number, then formats it as Indian currency.
 *
 * Replaces all scattered:  Number(item.amount.toString().replace(/,/g, ''))
 *
 * Usage in template:
 *   {{ income.amount | currencyFormat }}          → ₹23,866.00
 *   {{ income.amount | currencyFormat:'USD' }}    → $23,866.00
 *   {{ income.amount | currencyFormat:'INR':true }}  → 23,866  (no symbol)
 */
@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    currency = 'INR',
    noSymbol = false
  ): string {
    if (value === null || value === undefined || value === '') return '—';

    // Strip commas that may exist in stored string values e.g. "23,866"
    const clean = Number(value.toString().replace(/,/g, ''));

    if (isNaN(clean)) return '—';

    if (noSymbol) {
      return clean.toLocaleString('en-IN');
    }

    return clean.toLocaleString('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
}
