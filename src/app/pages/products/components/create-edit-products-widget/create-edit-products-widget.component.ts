import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductsService } from '../../products.service';
import { GroupCategoryProduct, GroupSubCategoryProduct } from '../../../../models/products';
import {
  CreateEditGroupsProductsComponent
} from '../modals/create-edit-groups-products/create-edit-groups-products.component';
import {
  CreateEditGroupsSubcategoriesProductsComponent
} from '../modals/create-edit-groups-subcategories-products/create-edit-groups-subcategories-products.component';

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
          this.groupsCategoriesProducts = response['data'].groups_categories;
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
          this.groupsSubCategoriesProducts = response['data'].groups_subcategories;
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

  onChangeGroupsSubCategoriesProductsItem(groupSubCategoryProduct: GroupSubCategoryProduct) {
    this.groupSubCategoryProduct = groupSubCategoryProduct;
  }

  onChangeComboboxItem(item) {
    console.log(item);
    this.comboboxSelectedItem = item;
  }

}
