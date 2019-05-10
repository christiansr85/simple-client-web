import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards';

import { EmployeesComponent, EmployeeComponent } from '../employees/components';
import { WrapperViewComponent } from './wrapper-view.component';

export const rootRoutes: Routes = [
    {
        path: 'app',
        component: WrapperViewComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'employees',
                pathMatch: 'full'
            },
            {
                path: 'employees',
                component: EmployeesComponent,
            },
            {
                path: 'employee',
                component: EmployeeComponent
            },
            {
                path: 'employee/:id',
                component: EmployeeComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(rootRoutes)],
    exports: [RouterModule],
})
export class WrapperViewRoutingModule { }
