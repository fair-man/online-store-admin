import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupCategoryProduct } from '../../../../../models/products';

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
  public groupCreate: GroupModal = {name: 'create', groupCategoryProduct: null, groupName: null, groupDescription: null};
  public groupEdit: GroupModal = {name: 'edit', groupCategoryProduct: null, groupName: null, groupDescription: null};

  @Input() groupsCategoriesProducts: GroupCategoryProduct[];
  constructor(public activeModal: NgbActiveModal) {
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

}
