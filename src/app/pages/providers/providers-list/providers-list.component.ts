import {Component, OnInit} from '@angular/core';

import {PROVIDERS_PATHS} from '../providers';
import {ProvidersService} from '../providers.service';
import {Provider} from '../../../models/provider';

@Component({
    selector: 'app-providers-list',
    templateUrl: './providers-list.component.html',
    styleUrls: ['./providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {
    PROVIDERS_PATHS = PROVIDERS_PATHS;
    providers: Provider[];

    constructor(private providersService: ProvidersService) {
    }

    ngOnInit() {
        this.providersService.getProviders().subscribe(
            (response) => this.providers = response['data'].providers,
            (error) => console.log(error)
        );
    }

}
