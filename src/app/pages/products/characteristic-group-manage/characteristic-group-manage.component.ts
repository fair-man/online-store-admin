import { Component, OnInit } from '@angular/core';

import { filter, findIndex } from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryProduct, CharacteristicsGroup } from '../../../models/products';
import { ProductsService } from '../products.service';
import {
  CharacteristicGroupProductsComponent
} from '../components/modals/characteristic-group-products/characteristic-group-products.component';

@Component({
  selector: 'app-characteristic-group-manage',
  templateUrl: './characteristic-group-manage.component.html',
  styleUrls: ['./characteristic-group-manage.component.scss']
})
export class CharacteristicGroupManageComponent implements OnInit {
  public categoriesProducts: CategoryProduct[];
  public categoryProducts: CategoryProduct;
  public groupsCharacteristics: CharacteristicsGroup[];
  public characteristicSearch: string;

  constructor(private productsService: ProductsService,
              public modalService: NgbModal) {
  }

  ngOnInit() {
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
    this.productsService.getCharacteristicsGroups({})
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
      (groupData: CharacteristicsGroup) => {
        this.updateGroupCategoryData(groupData);
      },
      (groupData: CharacteristicsGroup) => {
        this.updateGroupCategoryData(groupData);
      },
    );
  }

  private updateGroupCategoryData(group: CharacteristicsGroup) {
    const index = findIndex(this.groupsCharacteristics, {id: group.id});

    if (index > -1) {
      this.groupsCharacteristics[index] = group;
    }
  }

}
