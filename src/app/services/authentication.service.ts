import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

/**
 * Service to handle the authentication feeature.
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    /**
     * Proxy url of the authentication service. It's fixed with the php service.
     */
    private readonly phpBaseUrl: string = '/api/php';

    /**
     * Async object to handle the user.
     */
    private currentUserSubject: BehaviorSubject<User>;

    /**
     * Observable object to handle the user.
     */
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * Accessor to retrieve the current logged user.
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Calls to log in the application.
     * @param email The email of the user who wants to log in.
     * @param password The password of the user who wants to log in.
     */
    login(email: string, password: string) {
        return this.http.post<any>(`${this.phpBaseUrl}/auth/login`, { email, password })
            .pipe(map(result => {
                let user: User;
                // Login successful if there's a jwt token in the response
                if (result && result.access_token) {
                    user = {
                        token: result.access_token,
                        name: result.user.name,
                        email: result.user.email,
                        id: result.user._id
                    };
                    // Store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    /**
     * Logs out from the application.
     */
    logout() {
        // Removes user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}