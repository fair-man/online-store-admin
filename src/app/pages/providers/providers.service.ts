import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UsersService} from '../users/users.service';

@Injectable({
    providedIn: 'root'
})
export class ProvidersService {

    constructor(
        private http: HttpClient,
        private usersService: UsersService
    ) {}

    getStreetTypes() {
        return this.usersService.getStreetTypes();
    }
}
