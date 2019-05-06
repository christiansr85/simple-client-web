import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/models';

@Component({
    selector: 'app-employees-detail-dialog',
    templateUrl: './employees-detail-dialog.component.html',
    styleUrls: ['./employees-detail-dialog.component.scss']
})
export class EmployeesDetailDialogComponent {

    onAccept: EventEmitter<Employee> = new EventEmitter<Employee>();
    onCancel: EventEmitter<any> = new EventEmitter<any>();

    employee: Employee;

    constructor(
        public translate: TranslateService,
        public dialogRef: MatDialogRef<EmployeesDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Employee
    ) {
        this.employee = data || {};
    }
}
