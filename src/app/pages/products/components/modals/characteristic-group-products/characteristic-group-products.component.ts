import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-characteristic-group-products',
  templateUrl: './characteristic-group-products.component.html',
  styleUrls: ['./characteristic-group-products.component.scss']
})
export class CharacteristicGroupProductsComponent implements OnInit {
  @Input() groupInfo;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
