import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-edit-users-widget',
  templateUrl: './create-edit-users-widget.component.html',
  styleUrls: ['./create-edit-users-widget.component.scss']
})
export class CreateEditUsersWidgetComponent implements OnInit {
  roleSelected = {role_name: 'Диспетчер'};

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
