import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/models';
import { EmployeesService } from 'src/app/services';

import { EmployeesDetailDialogComponent } from './components/employees-detail/employees-detail-dialog.component';

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
        public dialog: MatDialog
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

    onUpdateDialog(employee: Employee): void {
        const dialogRef = this.dialog.open(EmployeesDetailDialogComponent, {
            data: employee
        });

        dialogRef.componentInstance.onAccept.subscribe(employee => {
            this.update(employee);
            dialogRef.close();
        });
        dialogRef.componentInstance.onCancel.subscribe(() => {
            dialogRef.close();
        });
    }

    onAddDialog(): void {
        const dialogRef = this.dialog.open(EmployeesDetailDialogComponent, {
        });

        dialogRef.componentInstance.onAccept.subscribe(employee => {
            this.create(employee);
            dialogRef.close();
        });
        dialogRef.componentInstance.onCancel.subscribe(() => {
            dialogRef.close();
        });
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
