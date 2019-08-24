import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators';
import { BehaviorSubject, Observable } from 'rxjs/index';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userData: BehaviorSubject<User>;
  userData: User;
  isLoggedIn = false;

  constructor(private http: HttpClient) {
    this._userData = <BehaviorSubject<User>>new BehaviorSubject(null);
  }

  get userState() {
    return this._userData.asObservable();
  }

  login(authData): Observable<any> {
    return this.http.post('/auth/login', authData).pipe(tap(
      (response) => {
        this.userData = response['data'];
        this.isLoggedIn = true;
        this._userData.next(Object.assign({}, response['data']));
      }
    ));
  }

  logout(): Observable<any> {
    return this.http.post(`/auth/logout`, {}).pipe(tap(
      (response) => {
        this.userData = null;
        this.isLoggedIn = false;
        this._userData.next(null);
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
        this._userData.next(Object.assign({}, response['data']));
      }
    ));
  }
}
