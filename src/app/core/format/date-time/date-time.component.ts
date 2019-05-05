import * as moment from 'moment';

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { DateTimePipe } from './date-time.pipe';

@Component({
  selector: 'date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements OnInit, OnChanges {
  @Input() dateTimeISO: string;

  recent: boolean;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dateTimeISO) {
      this.recent = this.isRecently();
    }
  }

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
