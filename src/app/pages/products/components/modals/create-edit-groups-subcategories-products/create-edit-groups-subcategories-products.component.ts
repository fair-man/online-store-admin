import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GroupCategoryProduct, GroupSubCategoryProduct } from '../../../../../models/products';
import { ProductsService } from '../../../products.service';

export interface GroupModal {
  name: string;
  groupCategoryProduct: GroupSubCategoryProduct | null;
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

  @Input() groupsCategoriesProducts: GroupCategoryProduct[];
  @Input() groupsSubCategoriesProducts: GroupSubCategoryProduct[];
  constructor(public activeModal: NgbActiveModal,
              private productsService: ProductsService) { }

  ngOnInit() {
    this.groupModeSelected = 'create';
    this.groupTypeSelected = this.groupCreate;
  }

  onChangeGroupsCategoriesProductsItem(groupCategoryProduct: GroupSubCategoryProduct) {
    this.groupTypeSelected.groupSubCategoryProduct = groupCategoryProduct;
  }

  onChangeGroupsSubCategoriesProductsItem(groupSubCategoryProduct: GroupSubCategoryProduct) {
    this.groupTypeSelected.groupSubCategoryProduct = groupSubCategoryProduct;
    this.groupTypeSelected.groupName = groupSubCategoryProduct.name;
    this.groupTypeSelected.groupDescription = groupSubCategoryProduct.description;
  }

  onChangeGroupMode(mode) {
    this.groupTypeSelected = mode === 'create' ? this.groupCreate : this.groupEdit;
  }

}
