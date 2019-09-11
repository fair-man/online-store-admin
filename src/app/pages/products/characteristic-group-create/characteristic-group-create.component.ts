import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-characteristic-group-create',
  templateUrl: './characteristic-group-create.component.html',
  styleUrls: ['./characteristic-group-create.component.scss']
})
export class CharacteristicGroupCreateComponent implements OnInit {
  public characteristicGroupForm = new FormGroup({
    ch_name: new FormControl('', Validators.required),
    ch_description: new FormControl('', Validators.required),
    ch_is_main: new FormControl(0)
  });
  public stateMessage: string | null;
  public state: boolean;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  onSubmitCreateCharacteristicGroupForm() {
    this.stateMessage = null;
    this.state = false;
    this.characteristicGroupForm.value.ch_is_main = +this.characteristicGroupForm.value.ch_is_main;
    this.productsService.createCharacteristicGroup(this.characteristicGroupForm.value)
      .subscribe(
        (response) => {
          this.stateMessage = 'Характеристика создана успешно';
          this.state = true;
        },
        (error) => {
          this.stateMessage = 'Ошибка при создании характеристики';
          this.state = true;
        },
      );
  }

}
