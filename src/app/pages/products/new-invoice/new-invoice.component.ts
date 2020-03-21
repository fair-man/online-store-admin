import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { cloneDeep } from 'lodash';

import { PRODUCTS_PATHS } from '../products';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';
import { ProvidersService } from '../../providers/providers.service';
import { Provider } from '../../../models/provider';
import { ProductsService } from '../products.service';
import { Enums } from '../../../configs/Enums';
import { AuthService } from '../../auth/auth.service';
import { Product } from '../../../models/products';

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
    public productsSearchList: Product[] | null;
    public isShowCreateProductBlock: boolean;
    public isErrorInvoiceCreate: string | null;

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

    constructor(private fb: FormBuilder,
                private router: Router,
                private breadcrumbsService: BreadcrumbsService,
                private providersService: ProvidersService,
                private productsService: ProductsService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isShowCreateProductBlock = false;
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

    onAddProductForInvoice(product: Product) {
        const products = this.invoiceForm.get('products') as FormArray;
        products.push(this.fb.group({
            pt_id: new FormControl(product.pt_id, Validators.required),
            pt_name: new FormControl(product.pt_name, Validators.required),
            pt_vendor_code: new FormControl(product.pt_vendor_code, Validators.required),
            pt_price: new FormControl(null, Validators.required),
            pt_count: new FormControl(null, Validators.required)
        }));
        this.productCode = '';
        this.productsSearchList = null;
    }

    onToggleCreateProductBlock() {
        this.isShowCreateProductBlock = !this.isShowCreateProductBlock;
    }

    onCreateInvoice() {
        const requestObj = cloneDeep(this.invoiceForm.value);
        requestObj.user_id = this.authService.userData.user_data.id;
        requestObj.invoice_number = +requestObj.invoiceNumber;
        requestObj.invoice_cost = +requestObj.invoiceCost;
        requestObj.products = requestObj.products.map((product) => {
            return {
                pt_id: product.pt_id,
                pt_count: +product.pt_count,
                pt_price: +product.pt_price
            };
        });
        delete requestObj.invoiceNumber;
        delete requestObj.invoiceCost;

        this.productsService.invoiceCreate(requestObj)
            .subscribe(
                (response) => {
                    this.router.navigate(['/', PRODUCTS_PATHS.PRODUCTS]);
                    this.isErrorInvoiceCreate = null;
                },
                (error) => {
                    this.isErrorInvoiceCreate = Enums.errorCodes[100000];
                }
            );
    }

}
