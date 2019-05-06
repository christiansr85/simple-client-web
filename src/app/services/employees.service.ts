import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Employee } from '../models';

@Injectable()
export class EmployeesService {

    private source: string;

    private readonly javaBaseUrl: string = '/api/java';
    private readonly phpBaseUrl: string = '/api/php';

    constructor(private httpClient: HttpClient) {
        this.setSource();
    }

    setSource(): void {
        this.source = this.javaBaseUrl;
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