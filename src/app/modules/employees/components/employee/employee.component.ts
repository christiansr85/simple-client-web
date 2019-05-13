import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models';
import { EmployeesService } from 'src/app/services';

/**
 * View container for single employee view.
 */
@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    /**
     * Stores the employee object represented in the view, if any.
     */
    employee: Employee = {};

    /**
     * Flag which indicates if the view has been already loaded.
     */
    loaded: boolean = false;

    /**
     * Handles when a non existing user is requested.
     */
    userNotFound: boolean = false;

    /**
     * Form represented in the view.
     */
    private employeeForm: FormGroup;

    /**
     * Handles the view's subscriptions.
     */
    private subscriptions: Subscription = new Subscription();

    /**
     * If previous url is the login page, then we try to avoid to go back to it.
     */
    private previousUrlIsLogin: boolean = true;

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

    ngOnInit(): void {
        this.previousUrlIsLogin = this.route.snapshot.queryParams['loggedIn'];
    }

    /**
     * Goes to the previous location in navigator history.
     */
    onCancel(): void {
        if (this.previousUrlIsLogin) {
            this.router.navigate(['app', 'employees']);
        } else {
            this.location.back();
        }
    }

    /**
     * Executed every time the employee's form is changed.
     * @param form The form which has been changed.
     */
    onFormChange(form: FormGroup): void {
        this.employeeForm = form;
    }

    /**
     * Creates an employee object from the view's form and saves/updates it.
     */
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

    /**
     * Calls to create a new employee.
     * @param employee The employee to save.
     */
    create(employee: Employee): Observable<any> {
        return this.employeesService.create(employee);
    }

    /**
     * Calls to update an existing employee.
     * @param employee The employee to update.
     */
    update(employee: Employee): Observable<any> {
        return this.employeesService.update(employee, employee.userId);
    }

    /**
     * Opens a sanckbar object to indicate an action.
     * @param message The message to display in the snackbar.
     */
    openSnackBar(message: string): void {
        this.snackBar.open(message, null, {
            duration: 3000
        });
    }
}