import { DataSource } from '@angular/cdk/collections';
import { EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map, merge } from 'rxjs/operators';

import { EmployeesTableDatabase } from './employees-table.database';

export class EmployeesTableDataSource extends DataSource<any> {
    constructor(private database: EmployeesTableDatabase, private sort?: MatSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        const displayDataChanges: any[] = [
            this.database.dataChange
        ];
        if (this.sort) {
            displayDataChanges.push(this.sort.sortChange);
        }

        return of(merge(...displayDataChanges)).pipe(map(() => {
            return this.getSortedData(this.database.data.slice());
        }));
    }

    getSortedData(data: any[]): any[] {
        if (!this.sort || !this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string | Date = '';
            let propertyB: number | string | Date = '';

            switch (this.sort.active) {
                case 'name':
                    [propertyA, propertyB] = [a.name ? a.name : '', b.name ? b.name : ''];
                    break;
                case 'clockIn':
                    [propertyA, propertyB] = [a.clockIn ? a.clockIn : '', b.clockIn ? b.clockIn : ''];
                    break;
                case 'clockOut':
                    [propertyA, propertyB] = [a.clockOut ? a.clockOut : '', b.clockOut ? b.clockOut : ''];
                    break;
                case 'active':
                    [propertyA, propertyB] = [a.active ? a.active : '', b.active ? b.active : ''];
                    break;
            }

            const valueA: any = propertyA;
            const valueB: any = propertyB;

            let evaluation = null;
            if (valueA === 0 && valueB === 0) {
                evaluation = 1;
            } else if (valueA === 0) {
                evaluation = 1;
            } else if (valueB === 0) {
                evaluation = -1;
            } else {
                evaluation = valueA < valueB ? -1 : 1;
            }

            return evaluation * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect() { }
}
