import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Employee } from '../models';

@Injectable()
export class EmployeesService {

    private source: string;

    private readonly javaBaseUrl: string = '/api/java';
    private readonly phpBaseUrl: string = 'http://127.0.0.1:8000/api/php';

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

    delete(id: string): Observable<any> {
        const url = [this.source, 'employee', id].join('/');
        return this.httpClient.delete(url);
    }
}