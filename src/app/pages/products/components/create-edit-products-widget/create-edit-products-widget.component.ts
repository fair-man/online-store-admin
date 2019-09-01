import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../products.service';
import { GroupCategoryProduct, GroupSubCategoryProduct } from '../../../../models/products';

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

  constructor(private productsService: ProductsService) {
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

  onChangeGroupsSubCategoriesProductsItem(groupSubCategoryProduct: GroupSubCategoryProduct) {
    this.groupSubCategoryProduct = groupSubCategoryProduct;
  }

  onChangeComboboxItem(item) {
    console.log(item);
    this.comboboxSelectedItem = item;
  }

}
