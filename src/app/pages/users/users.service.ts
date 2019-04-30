import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

import {RolesHttpInterface} from '../../models/role';
import {StreetTypesHttpInterface} from '../../models/address';

import {CustomHttpResponse} from '../../classes/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {
    }
    getUsersByRole(roleId) {
        return this.http.get(`/users/by_role/${roleId}`);
    }
    getRoles(): Observable<CustomHttpResponse<RolesHttpInterface>> {
        return this.http.get<CustomHttpResponse<RolesHttpInterface>>(`/roles/`);
    }
    getStreetTypes(): Observable<CustomHttpResponse<StreetTypesHttpInterface>> {
        return this.http.get<CustomHttpResponse<StreetTypesHttpInterface>>(`/address/street_types`);
    }
    getCreateUnionData() {
        const roles = this.getRoles();
        const streetTypes = this.getStreetTypes();
        return forkJoin([roles, streetTypes]);
    }
    createUser(data) {
        return this.http.post(`/users`, data);
    }
}
