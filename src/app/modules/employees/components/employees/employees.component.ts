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

/**
 * View which contains the employees list.
 */
@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

    /**
     * Flag which indicates if the view has been loaded.
     */
    loaded: boolean = false;

    /**
     * Flag which indicates if the view is performing any async and blocking action.
     */
    loading: boolean = false;

    /**
     * Async storage for the employees collection.
     */
    employees$: Observable<Employee[]>;

    /**
     * Subscription to handle all the component's suscriptions.
     */
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

    /**
     * Calls to retrieve all employees.
     */
    getAllEmployees(): void {
        this.storeEmployee.dispatch(new EmployeeActions.EmployeeListAction());
    }

    /**
     * Calls to delete an employee. Before of this, a confirm dialog appears.
     * @param employee The employee to remove.
     */
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

    /**
     * Redirects to the detail view in order to update an employee.
     * @param employee The employee to update.
     */
    onUpdate(employee: Employee): void {
        this.router.navigate(['app', 'employee', employee.userId]);
    }

    /**
     * Redirects to the detail view in order to create a new employee.
     */
    onAdd(): void {
        this.router.navigate(['app', 'employee']);
    }

    /**
     * Displays a snackbar to indicate any performed action.
     * @param message The message to display in the snackbar.
     */
    openSnackBar(message: string): void {
        this.snackBar.open(message, null, {
            duration: 3000
        });
    }
}
