import {Component, OnInit} from '@angular/core';

import {PROVIDERS_PATHS} from '../providers';
import {ProvidersService} from '../providers.service';
import {Provider} from '../../../models/provider';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-providers-list',
    templateUrl: './providers-list.component.html',
    styleUrls: ['./providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {
    PROVIDERS_PATHS = PROVIDERS_PATHS;
    providers: Provider[];
    breadcrumbs: Breadcrumb[] = [{text: 'Поставщики', url: null}];

    constructor(private providersService: ProvidersService,
                private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.providersService.getProviders().subscribe(
            (response) => this.providers = response['data'].providers,
            (error) => console.log(error)
        );

        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
