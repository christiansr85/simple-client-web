import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatter pipe for datetimes used along the @see DateTimeComponent .
 */
@Pipe({
  name: 'datetimeformat',
})
export class DateTimePipe implements PipeTransform {
  static DEFAULT_DATE_FORMATS = {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'MM/DD/YYYY',
    l: 'M/D/YYYY',
    LL: 'MMMM Do YYYY',
    ll: 'MMM D YYYY',
    LLL: 'MMMM Do YYYY LT',
    lll: 'MMM D YYYY LT',
    LLLL: 'dddd, MMMM Do YYYY LT',
    llll: 'ddd, MMM D YYYY LT',
  };

  transform(value: any, format: string = ''): string {
    const momentDate = moment(value).locale('es');
    if (format === 'calendar') {
      return momentDate.calendar();
    } else {
      return momentDate.isValid() ? momentDate.format(format) : value;
    }
  }
}
