import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesComponent } from '../employees/employees.component';
import { WrapperViewComponent } from './wrapper-view.component';

export const rootRoutes: Routes = [
    {
        path: 'app',
        component: WrapperViewComponent,
        children: [
            {
                path: 'employees',
                component: EmployeesComponent,
            }
        ]
    },
    { path: '', redirectTo: '/app', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(rootRoutes)],
    exports: [RouterModule],
})
export class WrapperViewRoutingModule { }
