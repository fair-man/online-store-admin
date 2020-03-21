import { Component, OnInit } from '@angular/core';

import { PRODUCTS_PATHS } from '../products';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-characteristic-group-create',
    templateUrl: './characteristic-group-create.component.html',
    styleUrls: ['./characteristic-group-create.component.scss']
})
export class CharacteristicGroupCreateComponent implements OnInit {
    public productsPath = PRODUCTS_PATHS;
    public breadcrumbs: Breadcrumb[] = [
        {text: 'Продукты', url: PRODUCTS_PATHS.PRODUCTS},
        {text: 'Создание группы характеристик', url: null}
    ];

    constructor(private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
