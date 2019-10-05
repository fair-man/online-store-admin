import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { findIndex } from 'lodash';

import { ProductsService } from '../../products.service';
import {
  CategoryProduct, GroupCategoryProduct, GroupCharacteristics,
  GroupSubCategoryProduct
} from '../../../../models/products';
import {
  CreateEditGroupsProductsComponent
} from '../modals/create-edit-groups-products/create-edit-groups-products.component';
import {
  CreateEditGroupsSubcategoriesProductsComponent
} from '../modals/create-edit-groups-subcategories-products/create-edit-groups-subcategories-products.component';
import { CreateEditCategoriesProductsComponent } from '../modals/create-edit-categories-products/create-edit-categories-products.component';
import { PRODUCTS_PATHS } from '../../products';

@Component({
  selector: 'app-create-edit-products-widget',
  templateUrl: './create-edit-products-widget.component.html',
  styleUrls: ['./create-edit-products-widget.component.scss']
})
export class CreateEditProductsWidgetComponent implements OnInit {
  public groupsCategoriesProducts: GroupCategoryProduct[];
  public groupCategoryProduct: GroupCategoryProduct;
  public groupsSubCategoriesProducts: GroupSubCategoryProduct[];
  public groupSubCategoryProduct: GroupSubCategoryProduct;
  public categoriesProducts: CategoryProduct[];
  public categoryProduct: CategoryProduct;
  public groupsCharacteristics: GroupCharacteristics[];
  public productsPath = PRODUCTS_PATHS;

  constructor(private productsService: ProductsService,
              public modalService: NgbModal) {
  }

  ngOnInit() {
    this.getGroupsCategories();
  }

  getGroupsCategories() {
    this.productsService.getGroupsCategoriesProducts()
      .subscribe(
        (response) => {
          this.groupsCategoriesProducts = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getSubCategories(groupCategoryId: number) {
    this.productsService.getGroupsSubCategoriesProducts({g_id: groupCategoryId})
      .subscribe(
        (response) => {
          this.groupsSubCategoriesProducts = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCategoriesProducts(groupSubCategoryId: number) {
    this.productsService.getCategories({g_id: groupSubCategoryId})
      .subscribe(
        (response) => {
          this.categoriesProducts = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCategoriesGroupsProducts(categoryId: number) {
    this.productsService.getCategoriesGroups({c_id: categoryId})
      .subscribe(
        (response) => {
          this.groupsCharacteristics = response.data.map((ch, index) => {
            ch.sort_order = index + 1;
            ch.characteristics = [];
            return ch;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangeGroupsCategoriesProductsItem(groupCategoryProduct: GroupCategoryProduct) {
    this.groupCategoryProduct = groupCategoryProduct;
    this.groupsSubCategoriesProducts = null;
    this.groupSubCategoryProduct = null;
    this.categoriesProducts = null;
    this.categoryProduct = null;
    this.groupsCharacteristics = null;
    this.getSubCategories(groupCategoryProduct.id);
  }

  onOpenGroupsCategoriesDialog() {
    const groupCategoriesModal = this.modalService.open(CreateEditGroupsProductsComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-wrapper',
      backdrop: 'static'
    });

    groupCategoriesModal.componentInstance.groupsCategoriesProducts = this.groupsCategoriesProducts;
  }

  onChangeGroupsSubCategoriesProductsItem(groupSubCategoryProduct: GroupSubCategoryProduct) {
    this.groupSubCategoryProduct = groupSubCategoryProduct;
    this.categoriesProducts = null;
    this.categoryProduct = null;
    this.groupsCharacteristics = null;
    this.getCategoriesProducts(groupSubCategoryProduct.id);
  }

  onOpenGroupsSubCategoriesDialog() {
    const groupSubCategoriesModal = this.modalService.open(CreateEditGroupsSubcategoriesProductsComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-wrapper',
      backdrop: 'static'
    });

    groupSubCategoriesModal.componentInstance.groupsCategoriesProducts = this.groupsCategoriesProducts;
    groupSubCategoriesModal.componentInstance.groupsSubCategoriesProducts = this.groupsSubCategoriesProducts;
    groupSubCategoriesModal.componentInstance.groupCategoryProduct = this.groupCategoryProduct;

    groupSubCategoriesModal.result.then(
      (closedData) => {
        if (!closedData) {
          return;
        }
        const type = closedData.type;
        const index = findIndex(this.groupsSubCategoriesProducts, {id: this.groupSubCategoryProduct.id});

        if (type === 'update') {
          if (index > -1) {
            this.groupsSubCategoriesProducts[index] = closedData.groupSubcategory;
          }

          if (this.groupSubCategoryProduct) {
            this.groupSubCategoryProduct = closedData.groupSubcategory;
          }
        }

        if (type === 'drop') {
          if (index > -1) {
            this.groupsSubCategoriesProducts.splice(index, 1);
          }

          if (this.groupSubCategoryProduct) {
            this.groupSubCategoryProduct = null;
          }
        }
      },
      (dismissedData) => {
        console.log('Dismissed', dismissedData);
      }
    );
  }

  onChangeCategoriesProductsItem(categoryProduct: CategoryProduct) {
    this.categoryProduct = categoryProduct;
    this.groupsCharacteristics = null;
    this.getCategoriesGroupsProducts(categoryProduct.id);
  }

  onOpenCategoriesProductsDialog() {
    const categoriesModal = this.modalService.open(CreateEditCategoriesProductsComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-wrapper',
      backdrop: 'static'
    });

    categoriesModal.componentInstance.groupsSubCategoriesProducts = this.groupsSubCategoriesProducts;
    categoriesModal.componentInstance.groupSubCategoryProduct = this.groupSubCategoryProduct;
    categoriesModal.componentInstance.categoriesProducts = this.categoriesProducts;

    categoriesModal.result.then(
      (closedData) => {
        if (!closedData) {
          return;
        }
        const type = closedData.type;
        const index = findIndex(this.categoriesProducts, {id: this.categoryProduct.id});

        if (type === 'update') {
          if (index > -1) {
            this.categoriesProducts[index] = closedData.categoryProduct;
          }

          if (this.groupSubCategoryProduct) {
            this.categoryProduct = closedData.categoryProduct;
          }
        }

        if (type === 'drop') {
          if (index > -1) {
            this.categoriesProducts.splice(index, 1);
          }

          if (this.categoryProduct) {
            this.categoryProduct = null;
          }
        }
      },
      (dismissedData) => {
        console.log('Dismissed', dismissedData);
      }
    );
  }

  sortOrderGroupsCharacteristics(item, type, index) {
    let sortItem;

    switch (type) {
      case 'up':
        sortItem = this.groupsCharacteristics[index - 1];
        break;
      case 'down':
        sortItem = this.groupsCharacteristics[index + 1];
        break;
      default:
        break;
    }

    if (!sortItem || sortItem.is_main) {
      return;
    }

    item.sort_order = sortItem.sort_order;
    sortItem.sort_order = index + 1;
    this.groupsCharacteristics = this.groupsCharacteristics.sort((a, b) => {
        return a.sort_order - b.sort_order;
    });
  }

  sortOrderCharacteristics(items, item, type, index) {
    let sortItem;

    switch (type) {
      case 'up':
        sortItem = items.characteristics[index - 1];
        break;
      case 'down':
        sortItem = items.characteristics[index + 1];
        break;
      default:
        break;
    }

    if (!sortItem) {
      return;
    }

    item.sort_order = sortItem.sort_order;
    sortItem.sort_order = index + 1;
    items.characteristics = items.characteristics.sort((a, b) => {
      return a.sort_order - b.sort_order;
    });
  }

  onAddCharacteristic(group) {
    const characteristics = group.characteristics;
    const count = characteristics.length ? characteristics[characteristics.length - 1].sort_order + 1 : 1;
    group.characteristics.push({
      fakeId: +new Date(),
      name: 'Новая характеристика ' + count,
      value: '',
      description: '',
      sort_order: count
    });
  }

}
