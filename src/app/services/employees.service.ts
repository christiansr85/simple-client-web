import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class EmployeesService {

    constructor(private httpClient: HttpClient) {

    }

    getAll(): Observable<any> {
        return this.httpClient.get('http://127.0.0.1:9090/employee');
    }
}