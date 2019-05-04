import * as MAT from '@angular/material';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const MATERIALS_MODULES = [
  MAT.MatAutocompleteModule,
  MAT.MatLineModule,
  MAT.MatCommonModule,
  MAT.MatAutocompleteModule,
  MAT.MatButtonModule,
  MAT.MatButtonToggleModule,
  MAT.MatCardModule,
  MAT.MatChipsModule,
  MAT.MatCheckboxModule,
  MAT.MatDatepickerModule,
  MAT.MatDialogModule,
  MAT.MatGridListModule,
  MAT.MatIconModule,
  MAT.MatInputModule,
  MAT.MatListModule,
  MAT.MatMenuModule,
  MAT.MatPaginatorModule,
  MAT.MatProgressBarModule,
  MAT.MatProgressSpinnerModule,
  MAT.MatRadioModule,
  MAT.MatSelectModule,
  MAT.MatSidenavModule,
  MAT.MatSliderModule,
  MAT.MatSlideToggleModule,
  MAT.MatSnackBarModule,
  MAT.MatSortModule,
  MAT.MatTabsModule,
  MAT.MatToolbarModule,
  MAT.MatTooltipModule,
  MAT.MatTableModule,
  MAT.MatNativeDateModule,
  MAT.MatExpansionModule
];

@NgModule({
  imports: [CommonModule, ...MATERIALS_MODULES],
  exports: [...MATERIALS_MODULES],
  declarations: [],
})
export class MaterialsModule {
  constructor() {
  }
}
