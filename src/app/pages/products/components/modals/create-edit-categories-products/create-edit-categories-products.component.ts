import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep, findIndex } from 'lodash';

import { CategoryProduct, GroupCategoryProduct, GroupSubCategoryProduct } from '../../../../../models/products';
import { ProductsService } from '../../../products.service';

export interface GroupModal {
  name: string;
  groupSubCategoryProduct: GroupSubCategoryProduct | null;
  categoryProduct: CategoryProduct | null;
  groupName: string;
  groupDescription: string;
}

@Component({
  selector: 'app-create-edit-categories-products',
  templateUrl: './create-edit-categories-products.component.html',
  styleUrls: ['./create-edit-categories-products.component.scss']
})
export class CreateEditCategoriesProductsComponent implements OnInit {
  public groupModeSelected: string;
  public groupTypeSelected: GroupModal;
  public groupCreate: GroupModal = {name: 'create', categoryProduct: null, groupSubCategoryProduct: null,
    groupName: null, groupDescription: null};
  public groupEdit: GroupModal = {name: 'edit', categoryProduct: null, groupSubCategoryProduct: null,
    groupName: null, groupDescription: null};

  @Input() groupsSubCategoriesProducts: GroupSubCategoryProduct[];
  @Input() groupSubCategoryProduct: GroupSubCategoryProduct;
  @Input() categoriesProducts: GroupCategoryProduct[];

  constructor(public activeModal: NgbActiveModal,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.groupModeSelected = 'create';
    this.groupTypeSelected = this.groupCreate;
    this.groupCreate.groupSubCategoryProduct = cloneDeep(this.groupSubCategoryProduct);
    this.groupEdit.groupSubCategoryProduct = cloneDeep(this.groupSubCategoryProduct);
  }

  onChangeCategoriesProductsItem(category: CategoryProduct) {
    this.groupTypeSelected.categoryProduct = category;
    this.groupTypeSelected.groupName = category.name;
    this.groupTypeSelected.groupDescription = category.description;
  }

  onChangeGroupsSubCategoriesProductsItem(groupSubCategoryProduct: GroupSubCategoryProduct) {
    this.groupTypeSelected.groupSubCategoryProduct = groupSubCategoryProduct;
  }

  onChangeGroupMode(mode) {
    this.groupTypeSelected = mode === 'create' ? this.groupCreate : this.groupEdit;
  }

  onSaveGroupSubCategories() {
    const groupSubCategoryData = {
      c_id: this.groupTypeSelected.categoryProduct && this.groupTypeSelected.categoryProduct.id || null,
      c_group_subcategory_id: this.groupTypeSelected.groupSubCategoryProduct.id || null,
      c_name: this.groupTypeSelected.groupName,
      c_description: this.groupTypeSelected.groupDescription
    };

    if (this.groupTypeSelected.name === 'create') {
      this.createCategory(groupSubCategoryData);
    } else {
      this.editCategory(groupSubCategoryData);
    }
  }

  createCategory(data) {
    this.productsService.createCategoryProduct(data)
      .subscribe(
        (response) => {
          this.categoriesProducts.push(response.data);
          this.activeModal.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editCategory(data) {
    this.productsService.updateCategoryProduct(data)
      .subscribe(
        (response) => {
          const index = findIndex(this.categoriesProducts, {id: response['data'].id});
          let type = '';

          if (index > -1 && this.groupSubCategoryProduct.id === response['data'].group_subcategory_id) {
            type = 'update';
          } else if (index > -1) {
            type = 'drop';
          }

          this.activeModal.close({categoryProduct: response.data, type});
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
