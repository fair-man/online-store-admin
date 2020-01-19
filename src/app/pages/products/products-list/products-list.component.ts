import {Component, OnInit} from '@angular/core';

import {Product, PRODUCTS_PATHS} from '../products';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';
import {ProductsService} from '../products.service';
import {Enums} from '../../../configs/Enums';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    public Enums = Enums;
    public productsPath = PRODUCTS_PATHS;
    public productName: string;
    public productCode: string;
    public productsSearchError: string | null;
    public productsList: Product[] | null;

    breadcrumbs: Breadcrumb[] = [{text: 'Продукты', url: null}];

    constructor(private breadcrumbsService: BreadcrumbsService,
                private productsService: ProductsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

    onSearchProduct() {
        this.productsService.searchProducts({p_name: this.productName || '', p_code: this.productCode || ''})
            .subscribe(
                (response) => {
                    this.productsSearchError = null;
                    this.productsList = response.data;
                },
                (error) => {
                    this.productsList = null;
                    this.productsSearchError = Enums.errorCodes[100000];
                    console.log(error);
                }
            );
    }

    onResetSearchProduct() {
        this.productName = '';
        this.productCode = '';
        this.productsList = null;
        this.productsSearchError = null;
    }

}
