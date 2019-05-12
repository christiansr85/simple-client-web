import { Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EmployeesTableDatabase } from './employees-table.database';
import { EmployeesTableDataSource } from './employees-table.datasource';
import { Employee } from 'src/app/models';

/**
 * Table which lists the employees list.
 */
@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit, OnChanges {

    /**
     * List of the employees to display in the table.
     */
    @Input() employees: Employee[];

    /**
     * Flag which indicates if the view has been loaded.
     */
    @Input() loaded: boolean = false;

    /**
     * Event emitter triggered when user wants to delete an employee.
     */
    @Output() onDelete: EventEmitter<Employee> = new EventEmitter<Employee>();

    /**
     * Event emitter triggered when user wants to update an employee.
     */
    @Output() onUpdate: EventEmitter<Employee> = new EventEmitter<Employee>();

    /**
     * The employees actually rendered in the table, taking in account the filters.
     */
    data: Employee[] = [];

    /**
     * Filters' model object.
     */
    filters: {
        name: string,
        active: number
    } = {
            name: '',
            active: 2
        }

    /**
     * Columns to display.
     */
    displayedColumns: string[] = ['name', 'clockIn', 'clockOut', 'active', 'actions'];

    /**
     * Datasource object for the table.
     */
    dataSource: EmployeesTableDataSource;

    /**
     * Database which contains the records to display and that is passed to the datasource.
     */
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

    /**
     * Renders the table component.
     * @param data The collection of employees to display.
     */
    renderTable(data: Employee[]) {
        this.data = data;
        this.dataBase = new EmployeesTableDatabase(data);
        this.dataSource = new EmployeesTableDataSource(this.dataBase);
    }

    /**
     * Applies the name filter.
     */
    applyFilterName(): void {
        const data = this.selectData();
        this.renderTable(data);
    }

    /**
     * Applies the active filter.
     */
    applyFilterActive(): void {
        const data = this.selectData();
        this.renderTable(data);
    }

    /**
     * Filters the source data by the parameters inserted in the view.
     */
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