import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/models';
import { EmployeesService } from 'src/app/services';
import { MatDialog } from '@angular/material';
import { ConfirmDialog } from 'src/app/components';
import { Store } from '@ngrx/store';
import * as EmployeeReducers from '../../store/employee.reducers';
import * as EmployeeActions from '../../store/employee.actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[];
    employeesLoaded: boolean = false;

    employees$: Observable<Employee[]>;
    constructor(
        public translate: TranslateService,
        private storeEmployee: Store<EmployeeReducers.EmployeeState>,
        private dialog: MatDialog,
        private employeesService: EmployeesService,
        private router: Router
    ) {
        this.employees$ = this.storeEmployee.select(EmployeeReducers.selectAll);
    }

    ngOnInit(): void {
        this.getAllEmployees();        
    }

    getAllEmployees(): void {
        // this.employeesLoaded = false;
        // this.employeesService.getAll().subscribe(result => {
        //     this.employees = result;
        //     this.employeesLoaded = true;
        // });
        this.storeEmployee.dispatch(new EmployeeActions.EmployeeListAction());
    }

    delete(employee: Employee): void {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            disableClose: true,
            data: { message: this.translate.instant('employees.delete_confirm') }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && JSON.parse(result) === true) {
                this.employeesService.delete(employee.userId)
                    .subscribe(() => {
                        this.getAllEmployees();
                    });
            }
        });
    }

    onUpdate(employee: Employee): void {
        this.router.navigate(['app', 'employee', employee.userId]);
    }

    onAdd(): void {
        this.router.navigate(['app', 'employee']);
    }

    create(employee: Employee): void {
        this.employeesService.create(employee)
            .subscribe(() => {
                this.getAllEmployees();
            });
    }

    update(employee: Employee): void {
        this.employeesService.update(employee, employee.userId)
            .subscribe(() => {
                this.getAllEmployees();
            });
    }
}
