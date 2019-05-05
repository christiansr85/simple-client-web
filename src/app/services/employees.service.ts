import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Employee } from '../models';

@Injectable()
export class EmployeesService {

    private source: string;

    private readonly javaBaseUrl: string = 'http://127.0.0.1:9090';
    private readonly phpBaseUrl: string = 'http://127.0.0.1:8000/api';

    constructor(private httpClient: HttpClient) {
        this.setSource();
    }

    setSource(): void {
        this.source = this.phpBaseUrl;
    }

    getAll(): Observable<Employee[]> {
        const url = this.source + '/employee';
        return <Observable<Employee[]>>this.httpClient.get(url);
    }
}