import {Component, OnInit} from '@angular/core';

import {Enums} from '../../../../configs/Enums';
import {UsersService} from '../../users.service';
import {Role} from '../../../../models/role';
import {StreetTypes} from '../../../../models/address';

@Component({
    selector: 'app-create-edit-users-widget',
    templateUrl: './create-edit-users-widget.component.html',
    styleUrls: ['./create-edit-users-widget.component.scss']
})
export class CreateEditUsersWidgetComponent implements OnInit {
    phoneMask = Enums.masks.phoneMask;
    roleSelected: Role | null;
    rolesList: Role[] | null;
    streetTypeActualSelected: StreetTypes | null;
    streetTypeRegistrationSelected: StreetTypes | null;
    streetTypesList: StreetTypes[] | null;
    myModel;

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.getCreateUnionData();
    }
    getCreateUnionData() {
        this.usersService.getCreateUnionData()
            .subscribe(
                (response) => {
                    this.rolesList = response[0]['data'].roles;
                    this.streetTypesList = response[1]['data'].street_types;
                },
                (error) => {
                    console.error(error);
                }
            );
    }

    onChangeRole(roleSelected: Role) {
        this.roleSelected = roleSelected;
    }

    onChangeBirthDate(date) {
        console.log(date);
    }

}
