import {Component, OnInit} from '@angular/core';

import {PRODUCTS_PATHS} from '../products';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    public productsPath = PRODUCTS_PATHS;
    breadcrumbs: Breadcrumb[] = [{text: 'Продукты', url: null}];

    constructor(private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
