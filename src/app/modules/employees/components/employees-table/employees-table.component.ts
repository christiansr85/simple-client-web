import { Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EmployeesTableDatabase } from './employees-table.database';
import { EmployeesTableDataSource } from './employees-table.datasource';
import { Employee } from 'src/app/models';

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit, OnChanges {

    @Input() employees: Employee[];
    @Input() loaded: boolean = false;

    filters: {
        name: string,
        active: number
    } = {
            name: '',
            active: 2
        }
    displayedColumns: string[] = ['name', 'clockIn', 'clockOut', 'active'];
    dataSource: EmployeesTableDataSource;
    private dataBase: EmployeesTableDatabase;

    constructor(public translate: TranslateService) { }

    ngOnInit() {
        this.renderTable(this.selectData());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.employees) {
            this.renderTable(this.selectData());
        }
    }

    renderTable(data: Employee[]) {
        if (data && data.length) {
            this.dataBase = new EmployeesTableDatabase(data);
            this.dataSource = new EmployeesTableDataSource(this.dataBase);
        }
    }

    applyFilterName(): void {
        const data = this.selectData();
        this.renderTable(data);
    }

    applyFilterActive(): void {
        const data = this.selectData();
        this.renderTable(data);
    }

    private selectData(): any[] {
        const data: any[] = this.employees && this.employees.length ? this.employees.slice() : [];
        const filteredData = data
            .filter(item => {
                return item.name.toLowerCase().includes(this.filters.name.trim().toLowerCase());
            })
            .filter(item => {
                if (!this.filters.active) {
                    return !item.active
                } else if (this.filters.active === 1) {
                    return item.active;
                }
                return true;
            });
        return filteredData;
    }
}