import { Component, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/models';

@Component({
    selector: 'app-employees-detail',
    templateUrl: './employees-detail.component.html',
    styleUrls: ['./employees-detail.component.scss']
})
export class EmployeesDetailComponent {

    onAccept: EventEmitter<Employee> = new EventEmitter<Employee>();
    onCancel: EventEmitter<any> = new EventEmitter<any>();

    @Input() employee: Employee = {};

    constructor(
        public translate: TranslateService,
    ) { }
}
