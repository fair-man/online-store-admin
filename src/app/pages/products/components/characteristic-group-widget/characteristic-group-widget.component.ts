import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../products.service';
import { GroupCharacteristics } from '../../../../models/products';

@Component({
  selector: 'app-characteristic-group-widget',
  templateUrl: './characteristic-group-widget.component.html',
  styleUrls: ['./characteristic-group-widget.component.scss']
})
export class CharacteristicGroupWidgetComponent implements OnInit {
  public groupCharacteristicForm = new FormGroup({
    ch_name: new FormControl('', Validators.required),
    ch_description: new FormControl('', Validators.required),
    ch_is_main: new FormControl(0)
  });
  public stateMessage: string | null;
  public state: boolean;

  @Input() groupInfo: GroupCharacteristics;
  @Input() isEdit: boolean;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    if (this.groupInfo) {
      this.groupCharacteristicForm.get('ch_name').setValue(this.groupInfo.name);
      this.groupCharacteristicForm.get('ch_description').setValue(this.groupInfo.description);
      this.groupCharacteristicForm.get('ch_is_main').setValue(this.groupInfo.is_main);
    }
  }

  onSubmitCreateGroupCharacteristicForm() {
    if (this.isEdit) {
      this.editGroupCharacteristicForm();
    } else {
      this.createGroupCharacteristicForm();
    }
  }

  private createGroupCharacteristicForm() {
    this.stateMessage = null;
    this.state = false;
    this.groupCharacteristicForm.value.ch_is_main = +this.groupCharacteristicForm.value.ch_is_main;
    this.productsService.createCharacteristicGroup(this.groupCharacteristicForm.value)
      .subscribe(
        (response) => {
          this.stateMessage = 'Характеристика создана успешно';
          this.state = true;
        },
        (error) => {
          this.stateMessage = 'Ошибка при создании характеристики';
          this.state = false;
        },
      );
  }

  private editGroupCharacteristicForm() {
    this.stateMessage = null;
    this.state = false;
    this.groupCharacteristicForm.value.ch_is_main = +this.groupCharacteristicForm.value.ch_is_main;
    this.productsService.editCharacteristicGroup(
      Object.assign({ch_id: this.groupInfo.id}, this.groupCharacteristicForm.value))
      .subscribe(
        (response) => {
          this.groupInfo = Object.assign(this.groupInfo, response.data);
          this.stateMessage = 'Характеристика отредактирована успешно';
          this.state = true;
        },
        (error) => {
          this.stateMessage = 'Ошибка при редактировании характеристики';
          this.state = false;
        },
      );
  }

}
