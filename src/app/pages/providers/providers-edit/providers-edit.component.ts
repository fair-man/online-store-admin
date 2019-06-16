import {Component, OnInit} from '@angular/core';

import {PROVIDERS_PATHS} from '../providers';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-providers-edit',
    templateUrl: './providers-edit.component.html',
    styleUrls: ['./providers-edit.component.scss']
})
export class ProvidersEditComponent implements OnInit {
    breadcrumbs: Breadcrumb[] = [
        {text: 'Поставщики', url: PROVIDERS_PATHS.providersList}, {text: 'Редактирование поставщика', url: null}
    ];

    constructor(private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }
}
