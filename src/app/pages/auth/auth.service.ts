import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';

import {User} from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: User;
    isLoggedIn = false;
    httpOptions = {
        headers: new HttpHeaders({
            'withCredentials': 'true'
        }),
        withCredentials: true
    };


    constructor(private http: HttpClient) {
    }

    login(authData): Observable<any> {
        return this.http.post('/auth/login', authData, this.httpOptions).pipe(tap(
            (response) => {
                this.userData = response['data'];
                this.isLoggedIn = true;
            }
        ));
    }

    getCSRFToken() {
        return this.userData.csrf_token;
    }

    checkLogged() {
        return this.isLoggedIn;
    }

    checkAuth(): Observable<any> {
        return this.http.get('/auth/check_auth').pipe(tap(
            (response) => {
                this.userData = response['data'];
                this.isLoggedIn = true;
            }
        ));
    }
}
