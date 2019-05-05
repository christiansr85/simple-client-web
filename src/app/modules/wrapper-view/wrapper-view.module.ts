import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core';

import { EmployeesModule } from '../employees/employees.module';
import { WrapperViewRoutingModule } from './wrapper-view-routing.module';
import { WrapperViewComponent } from './wrapper-view.component';


@NgModule({
    imports: [
        FormsModule,
        CoreModule,
        WrapperViewRoutingModule,
        EmployeesModule
    ],
    declarations: [
        WrapperViewComponent
    ],
    exports: [
        WrapperViewComponent
    ]
})
export class WrapperViewModule { }
