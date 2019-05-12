import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models';
import { EmployeesService } from 'src/app/services';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnDestroy {

    employee: Employee = {};
    loaded: boolean = false;
    userNotFound: boolean = false;

    private employeeForm: FormGroup;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private snackBar: MatSnackBar,
        private employeesService: EmployeesService,
        private translate: TranslateService
    ) {
        this.userNotFound = false;
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.subscriptions.add(
                this.employeesService.get(id)
                    .subscribe(
                        emp => {
                            if (emp) {
                                this.employee = emp;
                            } else {
                                this.userNotFound = true;
                            }
                            this.loaded = true;
                        })
            );
        } else {
            this.loaded = true;
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onCancel(): void {
        this.location.back();
    }

    onFormChange(form: FormGroup): void {
        this.employeeForm = form;
    }

    store(): void {
        if (this.employeeForm) {
            this.employee.name = this.employeeForm.controls.name.value;
            this.employee.active = this.employeeForm.controls.active.value;
            this.employee.clockIn = this.employeeForm.controls.clockIn.value;
            this.employee.clockOut = this.employeeForm.controls.clockOut.value;

            const action = this.employee.userId ? this.update(this.employee) : this.create(this.employee);
            action.subscribe(() => {
                let messageKey: string = 'employees.employee_updated';
                if (!this.employee.userId) {
                    messageKey = 'employees.employee_created';
                }
                this.openSnackBar(this.translate.instant(messageKey));
                this.router.navigate(['app', 'employees']);
            });
        }
    }

    create(employee: Employee): Observable<any> {
        return this.employeesService.create(employee);
    }

    update(employee: Employee): Observable<any> {
        return this.employeesService.update(employee, employee.userId);
    }

    openSnackBar(message: string): void {
        this.snackBar.open(message, null, {
            duration: 3000
        });
    }
}