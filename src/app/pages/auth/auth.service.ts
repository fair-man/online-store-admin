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

    constructor(private http: HttpClient) {
    }

    login(authData): Observable<any> {
        return this.http.post('/auth/login', authData).pipe(tap(
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
