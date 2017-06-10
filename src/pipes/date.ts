import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Filter pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  /**
   * Transform date-like to local date string
   */

  options:object = { year: 'numeric', month: 'long', day: 'numeric' };

  transform(value): string {
    if (!value) return null;
    else if(typeof value != "object") value = new Date(value);

    return value.toLocaleString('en-US', this.options);
  }
}
