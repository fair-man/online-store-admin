import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-edit-products-widget',
  templateUrl: './create-edit-products-widget.component.html',
  styleUrls: ['./create-edit-products-widget.component.scss']
})
export class CreateEditProductsWidgetComponent implements OnInit {
  public comboboxSelectedItem;

  constructor() {
  }

  ngOnInit() {
  }

  onChangeComboboxItem(item) {
    console.log(item);
    this.comboboxSelectedItem = item;
  }

}
