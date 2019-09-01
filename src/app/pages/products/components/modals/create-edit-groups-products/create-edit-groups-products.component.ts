import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-edit-groups-products',
  templateUrl: './create-edit-groups-products.component.html',
  styleUrls: ['./create-edit-groups-products.component.scss']
})
export class CreateEditGroupsProductsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
