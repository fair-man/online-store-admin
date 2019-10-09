import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {CustomHttpResponse} from '../classes/http';
import {StreetTypes} from '../models/address';

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    constructor(private http: HttpClient) {
    }

    getStreetTypes(): Observable<CustomHttpResponse<StreetTypes>> {
        return this.http.get<CustomHttpResponse<StreetTypes>>(`/address/street_types`);
    }
}
