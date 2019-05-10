import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models';
import { EmployeesService } from 'src/app/services';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnDestroy {

    employee: Employee = {};

    private subscriptions: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private employeesService: EmployeesService
    ) {

        const id = this.route.snapshot.params['id'];
        if (id) {
            this.subscriptions.add(
                this.employeesService.get(id)
                    .subscribe(emp => {
                        this.employee = emp;
                    })
            );
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onCancel(): void {
        this.location.back();
    }
}