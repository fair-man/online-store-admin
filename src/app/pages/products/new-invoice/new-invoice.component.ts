import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

import {Product, PRODUCTS_PATHS} from '../products';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';
import {ProvidersService} from '../../providers/providers.service';
import {Provider} from '../../../models/provider';
import {ProductsService} from '../products.service';
import {Enums} from '../../../configs/Enums';

@Component({
    selector: 'app-new-invoice',
    templateUrl: './new-invoice.component.html',
    styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {
    public productsPath = PRODUCTS_PATHS;
    public productCode: string;
    public productsSearchError: string | null;
    public providersList: Provider[];
    public providerSelected: Provider;
    public productsSearchList: Product[];

    public invoiceForm: FormGroup = new FormGroup({
        provider: new FormControl('', Validators.required),
        invoiceNumber: new FormControl('', Validators.required),
        invoiceCost: new FormControl('', Validators.required),
        products: new FormArray([])
    });

    breadcrumbs: Breadcrumb[] = [
        {text: 'Продукты', url: this.productsPath.PRODUCTS},
        {text: 'Приемка', url: null},
    ];

    constructor(private breadcrumbsService: BreadcrumbsService,
                private providersService: ProvidersService,
                private productsService: ProductsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
        this.getProvidersNames();
    }

    getProvidersNames() {
        this.providersService.getProvidersNames().subscribe(
            (response) => this.providersList = response['data'].providers,
            (error) => console.log(error)
        );
    }

    onChangeProvider(provider: Provider) {
        this.providerSelected = provider;
        this.invoiceForm.controls['provider'].setValue(provider.id);
    }

    onSearchProduct() {
        this.productsService.searchProducts({p_code: this.productCode})
            .subscribe(
                (response) => {
                    this.productsSearchList = response.data;
                },
                (error) => {
                    this.productsSearchList = null;
                    this.productsSearchError = Enums.errorCodes[100000];
                }
            );
    }

    onCreateInvoice() {
    }

}
