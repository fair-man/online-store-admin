import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductsService } from '../../products.service';
import { CategoryProduct, GroupCategoryProduct, GroupSubCategoryProduct } from '../../../../models/products';
import {
  CreateEditGroupsProductsComponent
} from '../modals/create-edit-groups-products/create-edit-groups-products.component';
import {
  CreateEditGroupsSubcategoriesProductsComponent
} from '../modals/create-edit-groups-subcategories-products/create-edit-groups-subcategories-products.component';
import { CreateEditCategoriesProductsComponent } from '../modals/create-edit-categories-products/create-edit-categories-products.component';

@Component({
  selector: 'app-create-edit-products-widget',
  templateUrl: './create-edit-products-widget.component.html',
  styleUrls: ['./create-edit-products-widget.component.scss']
})
export class CreateEditProductsWidgetComponent implements OnInit {
  public comboboxSelectedItem;
  public groupsCategoriesProducts: GroupCategoryProduct[];
  public groupCategoryProduct: GroupCategoryProduct;
  public groupsSubCategoriesProducts: GroupSubCategoryProduct[];
  public groupSubCategoryProduct: GroupSubCategoryProduct;
  public categoriesProducts: CategoryProduct[];
  public categoryProduct: CategoryProduct;

  constructor(private productsService: ProductsService,
              public modalService: NgbModal) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
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

  onChangeGroupsCategoriesProductsItem(groupCategoryProduct: GroupCategoryProduct) {
    this.groupCategoryProduct = groupCategoryProduct;
    this.groupsSubCategoriesProducts = null;
    this.groupSubCategoryProduct = null;
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
  }

  onChangeCategoriesProductsItem(item) {
    this.categoryProduct = item;
  }

  onOpenCategoriesProductsDialog() {
    const categoriesModal = this.modalService.open(CreateEditCategoriesProductsComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-wrapper',
      backdrop: 'static'
    });

    categoriesModal.componentInstance.groupsSubCategoriesProducts = this.groupsSubCategoriesProducts;
  }

}
