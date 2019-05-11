import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core';

import { EmployeeComponent, EmployeesComponent, EmployeesDetailComponent, EmployeesTableComponent } from './components';

const COMPONENTS = [
  EmployeesComponent,
  EmployeesTableComponent,
  EmployeeComponent,
  EmployeesDetailComponent
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class EmployeesModule { }
