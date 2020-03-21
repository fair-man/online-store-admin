import { Component, OnInit } from '@angular/core';

import { PRODUCTS_PATHS } from '../products';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-products-edit',
    templateUrl: './products-edit.component.html',
    styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit {
    public productsPath = PRODUCTS_PATHS;
    public breadcrumbs: Breadcrumb[] = [
        {text: 'Продукты', url: PRODUCTS_PATHS.PRODUCTS},
        {text: 'Редактирование продукта', url: null}
    ];
    constructor(private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
