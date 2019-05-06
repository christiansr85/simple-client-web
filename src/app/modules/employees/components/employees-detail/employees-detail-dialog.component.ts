import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-employees-detail-dialog',
    templateUrl: './employees-detail-dialog.component.html',
    styleUrls: ['./employees-detail-dialog.component.scss']
})
export class EmployeesDetailDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<EmployeesDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
