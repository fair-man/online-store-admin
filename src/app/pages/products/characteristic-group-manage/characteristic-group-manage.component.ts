import { Component, OnInit } from '@angular/core';

import { filter, findIndex } from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryProduct, GroupCharacteristics } from '../../../models/products';
import { ProductsService } from '../products.service';
import {
    CharacteristicGroupProductsComponent
} from '../components/modals/characteristic-group-products/characteristic-group-products.component';
import { PRODUCTS_PATHS } from '../products';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-characteristic-group-manage',
    templateUrl: './characteristic-group-manage.component.html',
    styleUrls: ['./characteristic-group-manage.component.scss']
})
export class CharacteristicGroupManageComponent implements OnInit {
    public categoriesProducts: CategoryProduct[];
    public categoryProducts: CategoryProduct;
    public groupsCharacteristics: GroupCharacteristics[];
    public characteristicSearch: string;
    public productsPath = PRODUCTS_PATHS;
    public breadcrumbs: Breadcrumb[] = [
        {text: 'Продукты', url: PRODUCTS_PATHS.PRODUCTS},
        {text: 'Привязка групп характеристик к категориям', url: null}
    ];

    constructor(private productsService: ProductsService,
                private breadcrumbsService: BreadcrumbsService,
                public modalService: NgbModal) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
        this.getCategories();
    }

    private getCategories() {
        this.productsService.getCategoriesManage()
            .subscribe(
                (response) => {
                    this.categoriesProducts = response.data;
                    this.getCharacteristics();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    private getCharacteristics() {
        this.productsService.getCharacteristicsGroups()
            .subscribe(
                (response) => {
                    this.groupsCharacteristics = response.data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public onChangeCategoryProductsItem(categoryProduct: CategoryProduct) {
        this.categoryProducts = null;

        setTimeout(() => {
            this.categoryProducts = categoryProduct;
            this.groupsCharacteristics.forEach((group) => {
                group['isChecked'] = categoryProduct.groups_characteristics.indexOf(group.id) > -1;
                return group;
            });
        });
    }

    public onSubmitGroupBundle() {
        this.productsService.updateCategoryGroupsCharacteristics({
            c_id: this.categoryProducts.id,
            c_groups: filter(this.groupsCharacteristics, g => g.isChecked).map(i => i['id'])
        }).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public onOpenEditGroupCharacteristicDialog(group) {
        const groupCategoriesModal = this.modalService.open(CharacteristicGroupProductsComponent, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-wrapper modal-wrapper--w-700',
            backdrop: 'static'
        });

        groupCategoriesModal.componentInstance.groupInfo = group;
        groupCategoriesModal.result.then(
            (groupData: GroupCharacteristics) => {
                this.updateGroupCategoryData(groupData);
            },
            (groupData: GroupCharacteristics) => {
                this.updateGroupCategoryData(groupData);
            },
        );
    }

    private updateGroupCategoryData(group: GroupCharacteristics) {
        const index = findIndex(this.groupsCharacteristics, {id: group.id});

        if (index > -1) {
            this.groupsCharacteristics[index] = group;
        }
    }

}
