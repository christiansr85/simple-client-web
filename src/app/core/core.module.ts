import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialsModule } from './material';

@NgModule({
  imports: [
    TranslateModule,
    MaterialsModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  exports: [
    TranslateModule,
    MaterialsModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
