import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) { }

    private baseUrl: string = '/api/php';

    login(user: string, password: string): Observable<any> {
        const url: string = this.baseUrl + '/login';
        const body = { user, password };
        return this.httpClient.post(url, body);
    }
}