import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PROVIDERS_PATHS} from '../providers';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {ProviderFull} from '../../../models/provider';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';
import {ProvidersService} from '../providers.service';

@Component({
    selector: 'app-providers-view',
    templateUrl: './providers-view.component.html',
    styleUrls: ['./providers-view.component.scss']
})
export class ProvidersViewComponent implements OnInit {
    providerData: ProviderFull;
    breadcrumbs: Breadcrumb[] = [{text: 'Поставщики', url: PROVIDERS_PATHS.providersList}];

    constructor(private breadcrumbsService: BreadcrumbsService,
                private router: Router,
                private route: ActivatedRoute,
                private providersService: ProvidersService) {
    }

    ngOnInit() {
        this.route.params.subscribe((routeParams) => {
            this.providerId = routeParams.id;

            this.getProviderData(this.providerId);
        });
    }

    getProviderData(providerId) {
        this.providersService.getProvider(providerId)
            .subscribe((response) => {
                this.providerData = response['data'];
                this.breadcrumbs.push({text: this.providerData.provider_data.name, url: null});
                this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
            });
    }

}
