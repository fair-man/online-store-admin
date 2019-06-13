import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs/index';

import {AddressService} from '../../services/address.service';
import {StreetTypes} from '../../models/address';
import {CustomHttpResponse} from '../../classes/http';
import {Provider} from '../../models/provider';

@Injectable({
    providedIn: 'root'
})
export class ProvidersService {

    constructor(
        private http: HttpClient,
        private addressService: AddressService
    ) {}

    getStreetTypes(): Observable<CustomHttpResponse<StreetTypes>> {
        return this.addressService.getStreetTypes();
    }

    getCreateUnionData() {
        const streetTypes = this.getStreetTypes();
        return forkJoin([streetTypes]);
    }

    createProvider(providerJson): Observable<CustomHttpResponse<Provider>> {
        return this.http.post<CustomHttpResponse<Provider>>(`/providers`, providerJson);
    }
}
