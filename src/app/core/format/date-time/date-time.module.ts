import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time.component';
import { DateTimePipe } from './date-time.pipe';
import { NgModule } from '@angular/core';

const DATE_TIME_COMPONENT = [DateTimeComponent, DateTimePipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...DATE_TIME_COMPONENT],
  exports: [...DATE_TIME_COMPONENT],
})
export class DateTimeModule {}
