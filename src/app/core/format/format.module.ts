import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateTimeModule } from './date-time/date-time.module';

@NgModule({
  imports: [
    DateTimeModule,
    CommonModule
  ],
  exports: [DateTimeModule],
  declarations: [],
})
export class FormatModule { }
