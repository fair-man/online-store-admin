import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs/index';

import {AddressService} from '../../services/address.service';
import {StreetTypes} from '../../models/address';
import {CustomHttpResponse} from '../../classes/http';
import {Providers, ProviderFull} from '../../models/provider';

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

    getProvider(providerId): Observable<CustomHttpResponse<ProviderFull>> {
        return this.http.get<CustomHttpResponse<ProviderFull>>(`/providers/${providerId}`);
    }

    getEditUnionData(providerId) {
        const streetTypes = this.getStreetTypes();
        const provider = this.getProvider(providerId);
        return forkJoin([streetTypes, provider]);
    }

    getProviders(): Observable<CustomHttpResponse<Providers>> {
        return this.http.get<CustomHttpResponse<Providers>>('/providers');
    }

    createProvider(providerJson): Observable<CustomHttpResponse<ProviderFull>> {
        return this.http.post<CustomHttpResponse<ProviderFull>>(`/providers`, providerJson);
    }
}
