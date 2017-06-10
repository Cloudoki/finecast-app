import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Filter pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'currency',
})
export class Currency implements PipeTransform {
  /**
   * Transform float to currency
   */

  formatter: any = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });

  transform(value:number): string {
    if (!value) return null;

    return this.formatter.format(value);
  }
}
