import { Component, OnInit } from '@angular/core';

import { findIndex } from 'lodash';

import { CategoryProduct, CharacteristicsGroup } from '../../../models/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-characteristic-group-manage',
  templateUrl: './characteristic-group-manage.component.html',
  styleUrls: ['./characteristic-group-manage.component.scss']
})
export class CharacteristicGroupManageComponent implements OnInit {
  public categoriesProducts: CategoryProduct[];
  public categoryProducts: CategoryProduct;
  public characteristicsGroups: CharacteristicsGroup[];
  public characteristicSearch: string;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
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

  getCharacteristics() {
    this.productsService.getCharacteristicsGroups({})
      .subscribe(
        (response) => {
          this.characteristicsGroups = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangeCategoryProductsItem(categoryProduct: CategoryProduct) {
    this.categoryProducts = null;

    setTimeout(() => {
      this.categoryProducts = categoryProduct;
      this.characteristicsGroups.forEach((group) => {
        group['isChecked'] = categoryProduct.groups_characteristics.indexOf(group.id) > -1;
        return group;
      });
    });
  }

}
