import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATETIME_FORMATS, MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { TranslateModule } from '@ngx-translate/core';

import { FormatModule } from './format/format.module';
import { MaterialsModule } from './material';

const MODULES = [
  TranslateModule,
  MaterialsModule,
  FlexLayoutModule,
  BrowserAnimationsModule,
  FormatModule,
  MatMomentDatetimeModule,
  MatDatetimepickerModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  providers: [
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'L',
          monthInput: 'MMMM',
          timeInput: 'LT',
          datetimeInput: 'L LT'
        },
        display: {
          dateInput: 'L',
          monthInput: 'MMMM',
          datetimeInput: 'L LT',
          timeInput: 'LT',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
          popupHeaderDateLabel: 'ddd, DD MMM'
        }
      }
    }
  ]
})
export class CoreModule { }
