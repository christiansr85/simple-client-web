import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core';
import { EmployeesService } from 'src/app/services';

import { EmployeesComponent } from './employees.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';

const COMPONENTS = [
  EmployeesComponent,
  EmployeesTableComponent
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
  providers: [
      EmployeesService
  ]
})
export class EmployeesModule { }
