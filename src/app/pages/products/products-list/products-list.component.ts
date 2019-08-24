import { Component, OnInit } from '@angular/core';

import { PRODUCTS_PATHS } from '../products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  public PRODUCTS_PATHS = PRODUCTS_PATHS;

  constructor() { }

  ngOnInit() {
  }

}
