import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialog } from 'src/app/components';
import { Employee } from 'src/app/models';

import * as EmployeeActions from '../../store/employee.actions';
import * as EmployeeReducers from '../../store/employee.reducers';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
    employees: Employee[];
    loaded: boolean = false;
    loading: boolean = false;

    employees$: Observable<Employee[]>;

    private subscription: Subscription = new Subscription();
    constructor(
        public translate: TranslateService,
        private storeEmployee: Store<EmployeeReducers.EmployeeState>,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        this.employees$ = this.storeEmployee.select(EmployeeReducers.getAll);
        this.subscription.add(
            this.storeEmployee.select(EmployeeReducers.selectFlags)
                .subscribe(({ loaded, loading }) => {
                    this.loaded = loaded;
                    this.loading = loading;
                })
        );
    }

    ngOnInit(): void {
        this.getAllEmployees();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getAllEmployees(): void {
        this.storeEmployee.dispatch(new EmployeeActions.EmployeeListAction());
    }

    delete(employee: Employee): void {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            disableClose: true,
            data: { message: this.translate.instant('employees.delete_confirm') }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && JSON.parse(result) === true) {
                this.storeEmployee.dispatch(new EmployeeActions.EmployeeDeleteAction(employee.userId));
                this.openSnackBar(this.translate.instant('employees.employee_deleted'));
            }
        });
    }

    onUpdate(employee: Employee): void {
        this.router.navigate(['app', 'employee', employee.userId]);
    }

    onAdd(): void {
        this.router.navigate(['app', 'employee']);
    }

    openSnackBar(message: string): void {
        this.snackBar.open(message, null, {
            duration: 3000
        });
    }
}
