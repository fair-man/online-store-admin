import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { findIndex } from 'lodash';

import { GroupCategoryProduct } from '../../../../../models/products';
import { ProductsService } from '../../../products.service';

export interface GroupModal {
    name: string;
    groupCategoryProduct: GroupCategoryProduct | null;
    groupName: string;
    groupDescription: string;
}

@Component({
    selector: 'app-create-edit-groups-products',
    templateUrl: './create-edit-groups-products.component.html',
    styleUrls: ['./create-edit-groups-products.component.scss']
})
export class CreateEditGroupsProductsComponent implements OnInit {
    public groupModeSelected: string;
    public groupTypeSelected: GroupModal;
    public groupCategoryProduct: GroupCategoryProduct;
    public groupCreate: GroupModal = {
        name: 'create',
        groupCategoryProduct: null,
        groupName: null,
        groupDescription: null
    };
    public groupEdit: GroupModal = {name: 'edit', groupCategoryProduct: null, groupName: null, groupDescription: null};

    @Input() groupsCategoriesProducts: GroupCategoryProduct[];

    constructor(public activeModal: NgbActiveModal,
                private productsService: ProductsService) {
    }

    ngOnInit() {
        this.groupModeSelected = 'create';
        this.groupTypeSelected = this.groupCreate;
    }

    onChangeGroupsCategoriesProductsItem(groupCategoryProduct: GroupCategoryProduct) {
        this.groupEdit.groupCategoryProduct = groupCategoryProduct;
        this.groupEdit.groupName = groupCategoryProduct.name;
        this.groupEdit.groupDescription = groupCategoryProduct.description;
    }

    onChangeGroupMode(mode) {
        this.groupTypeSelected = mode === 'create' ? this.groupCreate : this.groupEdit;
    }

    onSaveGroupCategories() {
        const groupCategoryData = {
            g_id: this.groupEdit.groupCategoryProduct ? this.groupEdit.groupCategoryProduct.id : null,
            g_name: this.groupTypeSelected.groupName,
            g_description: this.groupTypeSelected.groupDescription
        };

        if (this.groupModeSelected === 'create') {
            this.createGroupCategory(groupCategoryData);
        } else {
            this.updateGroupCategory(groupCategoryData);
        }
    }

    createGroupCategory(data) {
        this.productsService.createGroupCategoryProduct(data)
            .subscribe(
                (response) => {
                    this.groupsCategoriesProducts.push(response['data']);
                    this.activeModal.close();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    updateGroupCategory(data) {
        this.productsService.updateGroupCategoryProduct(data)
            .subscribe(
                (response) => {
                    const index = findIndex(this.groupsCategoriesProducts, {id: response['data'].id});

                    if (index > -1) {
                        this.groupsCategoriesProducts[index] = response['data'];
                    }

                    this.activeModal.close();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

}
