import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GroupSubCategoryProduct } from '../../../../../models/products';

@Component({
  selector: 'app-create-edit-categories-products',
  templateUrl: './create-edit-categories-products.component.html',
  styleUrls: ['./create-edit-categories-products.component.scss']
})
export class CreateEditCategoriesProductsComponent implements OnInit {
  groupsSubCategoriesProducts: GroupSubCategoryProduct[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
