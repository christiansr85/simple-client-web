import { NgModule } from '@angular/core';
import { MaterialsModule } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MaterialsModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  exports: [
    MaterialsModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
