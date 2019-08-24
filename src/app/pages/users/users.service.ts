import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

import { Roles } from '../../models/role';
import { StreetTypes } from '../../models/address';
import { User, Users } from '../../models/user';

import { CustomHttpResponse } from '../../classes/http';
import { AddressService } from '../../services/address.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private addressService: AddressService) {
  }

  getRoles(): Observable<CustomHttpResponse<Roles>> {
    return this.http.get<CustomHttpResponse<Roles>>(`/roles/`);
  }

  getStreetTypes(): Observable<CustomHttpResponse<StreetTypes>> {
    return this.addressService.getStreetTypes();
  }

  getUsersByRole(roleId): Observable<CustomHttpResponse<Users>> {
    return this.http.get<CustomHttpResponse<Users>>(`/users/by_role/${roleId}`);
  }

  createUser(data): Observable<CustomHttpResponse<User>> {
    return this.http.post<CustomHttpResponse<User>>(`/users`, data);
  }

  editUser(u_id, data): Observable<CustomHttpResponse<User>> {
    return this.http.put<CustomHttpResponse<User>>(`/users/${u_id}`, data);
  }

  getUserInfo(id): Observable<CustomHttpResponse<User>> {
    return this.http.get<CustomHttpResponse<User>>(`/users/${id}`);
  }

  getCreateUnionData() {
    const roles = this.getRoles();
    const streetTypes = this.getStreetTypes();
    return forkJoin([roles, streetTypes]);
  }

  getEditUnionData(id) {
    const roles = this.getRoles();
    const streetTypes = this.getStreetTypes();
    const userData = this.getUserInfo(id);
    return forkJoin([roles, streetTypes, userData]);
  }

  userPhotoUpload(id, data) {
    return this.http.post(`/users/avatar_upload/${id}`, data);
  }
}
