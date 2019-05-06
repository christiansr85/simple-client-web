import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core';

import { EmployeesDetailDialogComponent } from './components/employees-detail/employees-detail-dialog.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { EmployeesComponent } from './employees.component';

const COMPONENTS = [
  EmployeesComponent,
  EmployeesTableComponent,
  EmployeesDetailDialogComponent
];

@NgModule({
  imports: [
    FormsModule,
    CoreModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  entryComponents: [
    EmployeesDetailDialogComponent
  ],
  providers: [
  ]
})
export class EmployeesModule { }
