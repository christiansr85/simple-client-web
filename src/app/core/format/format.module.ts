import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core';
import { DateTimeModule } from './date-time/date-time.module';
import { LangModule } from './lang/lang.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [ DateTimeModule, LangModule, CommonModule],
  exports: [DateTimeModule],
  declarations: [],
})
export class FormatModule {}
