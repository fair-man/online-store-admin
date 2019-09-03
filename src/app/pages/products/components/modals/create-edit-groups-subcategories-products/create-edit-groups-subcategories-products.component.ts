import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep, findIndex } from 'lodash';

import { GroupCategoryProduct, GroupSubCategoryProduct } from '../../../../../models/products';
import { ProductsService } from '../../../products.service';

export interface GroupModal {
  name: string;
  groupCategoryProduct: GroupCategoryProduct | null;
  groupSubCategoryProduct: GroupSubCategoryProduct | null;
  groupName: string;
  groupDescription: string;
}

@Component({
  selector: 'app-create-edit-groups-subcategories-products',
  templateUrl: './create-edit-groups-subcategories-products.component.html',
  styleUrls: ['./create-edit-groups-subcategories-products.component.scss']
})
export class CreateEditGroupsSubcategoriesProductsComponent implements OnInit {
  public groupModeSelected: string;
  public groupTypeSelected: GroupModal;
  public groupCreate: GroupModal = {name: 'create', groupCategoryProduct: null, groupSubCategoryProduct: null,
    groupName: null, groupDescription: null};
  public groupEdit: GroupModal = {name: 'edit', groupCategoryProduct: null, groupSubCategoryProduct: null,
    groupName: null, groupDescription: null};

  @Input() groupCategoryProduct: GroupCategoryProduct;
  @Input() groupsCategoriesProducts: GroupCategoryProduct[];
  @Input() groupsSubCategoriesProducts: GroupSubCategoryProduct[];
  constructor(public activeModal: NgbActiveModal,
              private productsService: ProductsService) { }

  ngOnInit() {
    this.groupModeSelected = 'create';
    this.groupTypeSelected = this.groupCreate;
    this.groupCreate.groupCategoryProduct = cloneDeep(this.groupCategoryProduct);
    this.groupEdit.groupCategoryProduct = cloneDeep(this.groupCategoryProduct);
  }

  onChangeGroupsCategoriesProductsItem(groupCategoryProduct: GroupCategoryProduct) {
    this.groupTypeSelected.groupCategoryProduct = groupCategoryProduct;
  }

  onChangeGroupsSubCategoriesProductsItem(groupSubCategoryProduct: GroupSubCategoryProduct) {
    this.groupTypeSelected.groupSubCategoryProduct = groupSubCategoryProduct;
    this.groupTypeSelected.groupName = groupSubCategoryProduct.name;
    this.groupTypeSelected.groupDescription = groupSubCategoryProduct.description;
  }

  onChangeGroupMode(mode) {
    this.groupTypeSelected = mode === 'create' ? this.groupCreate : this.groupEdit;
  }

  onSaveGroupSubCategories() {
    const groupSubCategoryData = {
      g_id: this.groupTypeSelected.groupSubCategoryProduct && this.groupTypeSelected.groupSubCategoryProduct.id || null,
      g_group_category_id: this.groupTypeSelected.groupCategoryProduct.id || null,
      g_name: this.groupTypeSelected.groupName,
      g_description: this.groupTypeSelected.groupDescription
    };

    if (this.groupTypeSelected.name === 'create') {
      this.createSubCategory(groupSubCategoryData);
    } else {
      this.editSubCategory(groupSubCategoryData);
    }
  }

  createSubCategory(data) {
    this.productsService.createGroupSubCategoryProduct(data)
      .subscribe(
        (response) => {
          this.groupsSubCategoriesProducts.push(response['data']);
          this.activeModal.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editSubCategory(data) {
    this.productsService.updateGroupSubCategoryProduct(data)
      .subscribe(
        (response) => {
          const index = findIndex(this.groupsSubCategoriesProducts, {id: response['data'].id});

          if (index > -1 && this.groupCategoryProduct.id === response['data'].group_category_id) {
            this.groupsSubCategoriesProducts[index] = response['data'];
          } else if (index > -1) {
            this.groupsSubCategoriesProducts.splice(index, 1);
          }

          this.activeModal.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
