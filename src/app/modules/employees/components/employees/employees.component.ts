import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/models';
import { EmployeesService } from 'src/app/services';
import { MatDialog } from '@angular/material';
import { ConfirmDialog } from 'src/app/components';
import { Store } from '@ngrx/store';
import * as EmployeeReducers from '../../store/employee.reducers';
import * as EmployeeActions from '../../store/employee.actions';
import { Observable, Subscription } from 'rxjs';

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
        private employeesService: EmployeesService,
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
            }
        });
    }

    onUpdate(employee: Employee): void {
        this.router.navigate(['app', 'employee', employee.userId]);
    }

    onAdd(): void {
        this.router.navigate(['app', 'employee']);
    }
}
