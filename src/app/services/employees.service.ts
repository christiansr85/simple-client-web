import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Employee } from '../models';

/**
 * Data source provider.
 */
@Injectable()
export class EmployeesService {

    /**
     * The data source to use. It can be the java or the php service.
     */
    source: string;

    /**
     * Proxy url to fetch data from java service.
     */
    static readonly JAVA: string = '/api/java';

    /**
     * Proxy url to fetch data from php service.
     */
    static readonly PHP: string = '/api/php';

    constructor(private httpClient: HttpClient) {
        this.setSource();
    }

    /**
     * Sets a new source to request for the data.
     * @param source The proxy url to use in the requests.
     */
    setSource(source?: string): void {
        this.source = source || EmployeesService.JAVA;
    }

    /**
     * Gets a single user from its userId.
     * @param userId The userId of the user to retrieve.
     */
    get(userId: number) {
        const url = [this.source, 'employee', userId].join('/');
        return <Observable<Employee>>this.httpClient.get(url);
    }

    /**
     * Gets a list of all available employees.
     */
    getAll(): Observable<Employee[]> {
        const url = [this.source, 'employee'].join('/');
        return <Observable<Employee[]>>this.httpClient.get(url);
    }

    /**
     * Deletes an employee.
     * @param userId The userId of the employee to remove.
     */
    delete(userId: number): Observable<any> {
        const url = [this.source, 'employee', userId].join('/');
        return this.httpClient.delete(url);
    }

    /**
     * Creates a new employee.
     * @param employee The employee data.
     */
    create(employee: Employee): Observable<any> {
        const url = [this.source, 'employee'].join('/');
        return this.httpClient.post(url, employee);
    }

    /**
     * Updates an existing employee.
     * @param employee The employee data to use to update the employee.
     * @param userId The userId of the employee to update.
     */
    update(employee: Employee, userId: number): Observable<any> {
        const url = [this.source, 'employee', userId].join('/');
        return this.httpClient.patch(url, employee);
    }
}