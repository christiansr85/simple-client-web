import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Employee } from '../models';

@Injectable()
export class EmployeesService {

    source: string;

    static readonly JAVA: string = '/api/java';
    static readonly PHP: string = '/api/php';

    constructor(private httpClient: HttpClient) {
        this.setSource();
    }

    setSource(source?: string): void {
        this.source = source || EmployeesService.JAVA;
    }

    get(userId: number) {
        const url = [this.source, 'employee', userId].join('/');
        return <Observable<Employee>>this.httpClient.get(url);
    }

    getAll(): Observable<Employee[]> {
        const url = [this.source, 'employee'].join('/');
        return <Observable<Employee[]>>this.httpClient.get(url);
    }

    delete(userId: number): Observable<any> {
        const url = [this.source, 'employee', userId].join('/');
        return this.httpClient.delete(url);
    }

    create(employee: Employee): Observable<any> {
        const url = [this.source, 'employee'].join('/');
        return this.httpClient.post(url, employee);
    }

    update(employee: Employee, userId: number): Observable<any> {
        const url = [this.source, 'employee', userId].join('/');
        return this.httpClient.patch(url, employee);
    }
}