import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialsModule } from './material';
import { FormatModule } from './format/format.module';

const MODULES = [
  TranslateModule,
  MaterialsModule,
  FlexLayoutModule,
  BrowserAnimationsModule,
  FormatModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class CoreModule { }
