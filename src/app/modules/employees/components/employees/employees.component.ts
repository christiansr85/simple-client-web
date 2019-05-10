import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/models';
import { EmployeesService } from 'src/app/services';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[];
    employeesLoaded: boolean = false;

    constructor(
        public translate: TranslateService,
        private employeesService: EmployeesService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getAllEmployees();
    }

    getAllEmployees(): void {
        this.employeesLoaded = false;
        this.employeesService.getAll().subscribe(result => {
            this.employees = result;
            this.employeesLoaded = true;
        });
    }

    delete(employee: Employee): void {
        this.employeesService.delete(employee.userId)
            .subscribe(() => {
                this.getAllEmployees();
            });
    }

    onUpdate(employee: Employee): void {
        this.router.navigate(['app', 'employee', employee.userId]);
    }

    onAdd(): void {
        this.router.navigate(['app','employee']);
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
