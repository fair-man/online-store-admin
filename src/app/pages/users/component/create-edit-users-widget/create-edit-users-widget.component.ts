import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {Enums} from '../../../../configs/Enums';
import {UsersService} from '../../users.service';
import {Role} from '../../../../models/role';
import {StreetTypes} from '../../../../models/address';
import {DateTimePickerDateObj} from '../../../../models/moment';

@Component({
    selector: 'app-create-edit-users-widget',
    templateUrl: './create-edit-users-widget.component.html',
    styleUrls: ['./create-edit-users-widget.component.scss']
})
export class CreateEditUsersWidgetComponent implements OnInit {
    moment = require('moment');
    phoneMask = Enums.masks.phoneMask;
    roleSelected: Role | null;
    rolesList: Role[] | null;
    streetTypeActualSelected: StreetTypes | null;
    streetTypeRegistrationSelected: StreetTypes | null;
    streetTypesList: StreetTypes[] | null;
    base64preview = null;
    selectedFile = null;
    userForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        patronymic_name: new FormControl(''),
        birth_date: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        actual_registration_address: new FormControl(0, Validators.required),
        role: new FormControl('', Validators.required),
        phone_house: new FormControl(''),
        phone_mobile: new FormControl('', Validators.required),
        user_data_address_registration: new FormGroup({
            region: new FormControl('', Validators.required),
            district: new FormControl('', Validators.required),
            city: new FormControl(''),
            street: new FormControl('', Validators.required),
            street_type: new FormControl('', Validators.required),
            building: new FormControl(''),
            house: new FormControl('', Validators.required),
            flat: new FormControl(''),
            actual: new FormControl(0),
            registration: new FormControl(1),
        }),
        user_data_address_actual: new FormGroup({
            region: new FormControl('', Validators.required),
            district: new FormControl('', Validators.required),
            city: new FormControl(''),
            street: new FormControl('', Validators.required),
            street_type: new FormControl('', Validators.required),
            building: new FormControl(''),
            house: new FormControl('', Validators.required),
            flat: new FormControl(''),
            actual: new FormControl(1),
            registration: new FormControl(0),
        })
    });

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.getCreateUnionData();
    }
    getCreateUnionData(): void {
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

    onChangeRole(roleSelected: Role): void {
        this.roleSelected = roleSelected;
        this.userForm.get('role').setValue(roleSelected.id || null);
    }

    onChangeBirthDate(date: DateTimePickerDateObj): void {
        const birthDate = date && date.dateMillis ? this.moment(date.dateMillis).format('YYYY-MM-DD HH:mm:ss') : null;
        this.userForm.get('birth_date').setValue(birthDate);
    }

    onChangeAddUserPhoto($event): void {
        const file: File = $event.target.files[0];
        const myReader: FileReader = new FileReader();

        this.selectedFile = file;
        myReader.onloadend = (e) => { this.base64preview = myReader.result; };
        myReader.readAsDataURL(file);
    }

    onResetUserPhoto(): void {
        this.selectedFile = null;
        this.base64preview = null;
    }

    onChangeRegistrationStreetType(streetType: StreetTypes): void {
        this.streetTypeRegistrationSelected = streetType;
        this.userForm.get('user_data_address_registration').get('street_type').setValue(streetType.id || null);
    }

    onChangeActualStreetType(streetType: StreetTypes): void {
        this.streetTypeActualSelected = streetType;
        this.userForm.get('user_data_address_actual').get('street_type').setValue(streetType.id || null);
    }

    onSaveOrEditUser(): void {
        console.log(this.userForm);
    }
}
