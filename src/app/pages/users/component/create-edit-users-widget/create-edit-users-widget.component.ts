import { Component, OnInit } from '@angular/core';

import {Enums} from '../../../../configs/Enums';

@Component({
  selector: 'app-create-edit-users-widget',
  templateUrl: './create-edit-users-widget.component.html',
  styleUrls: ['./create-edit-users-widget.component.scss']
})
export class CreateEditUsersWidgetComponent implements OnInit {
  phoneMask = Enums.masks.phoneMask;
  roleSelected = {role_name: 'Диспетчер'};
  myModel;

  constructor() { }

  ngOnInit() {
  }

  onChangeRole(roleSelected) {
    this.roleSelected = roleSelected;
  }

  onChangeBirthDate(date) {
    console.log(date);
  }

}
