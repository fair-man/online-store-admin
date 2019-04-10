import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {
    }
    getUsersByRole(roleId) {
        return this.http.get(`/users/by_role/${roleId}`);
    }
}
