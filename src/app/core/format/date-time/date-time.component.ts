import * as moment from 'moment';

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { DateTimePipe } from './date-time.pipe';

/**
 * Handles datetimes in order to display in a more human friendly format (at least, the more recent datetimes).
 */
@Component({
  selector: 'date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements OnInit, OnChanges {

  /**
   * The source datetime in ISO format.
   */
  @Input() dateTimeISO: string;

  /**
   * Flag which indicates if the datetime is recent or not.
   */
  recent: boolean;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dateTimeISO) {
      this.recent = this.isRecently();
    }
  }

  /**
   * Says if a datetime is recent or not. It's recent if the datetime value
   * is a today datetime, a tomorrow or a yesterday one.
   */
  isRecently(): boolean {
    const today: boolean = moment.utc(this.dateTimeISO).format('L') === moment.utc().format('L');
    const yesterday: boolean =
      moment.utc(this.dateTimeISO).format('L') ===
      moment
        .utc()
        .subtract(1, 'days')
        .format('L');
    const tomorrow: boolean =
      moment.utc(this.dateTimeISO).format('L') ===
      moment
        .utc()
        .add(1, 'days')
        .format('L');
    const recently: boolean = today || yesterday || tomorrow;
    return recently;
  }
}
