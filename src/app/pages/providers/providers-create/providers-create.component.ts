import { Component, OnInit } from '@angular/core';

import { PROVIDERS_PATHS } from '../providers';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-providers-create',
    templateUrl: './providers-create.component.html',
    styleUrls: ['./providers-create.component.scss']
})
export class ProvidersCreateComponent implements OnInit {
    breadcrumbs: Breadcrumb[] = [
        {text: 'Поставщики', url: PROVIDERS_PATHS.providersList}, {text: 'Создание поставщика', url: null}
    ];

    constructor(private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
