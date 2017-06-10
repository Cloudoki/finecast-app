import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Filter pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class Filter implements PipeTransform {
  /**
   * Filters key:value based
   */
  transform(items: any[], field : string, value : any): any[] {
    if (!items) return [];
    
    return items.filter(it => it[field] == value);
  }
}
