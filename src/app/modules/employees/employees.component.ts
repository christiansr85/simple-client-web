import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesService } from 'src/app/services';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employees: any[];
    employeesLoaded: boolean = false;

    constructor(public translate: TranslateService, private employeesService: EmployeesService) {
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
}
