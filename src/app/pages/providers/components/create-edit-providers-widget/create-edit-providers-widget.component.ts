import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {Enums} from '../../../../configs/Enums';

@Component({
    selector: 'app-create-edit-providers-widget',
    templateUrl: './create-edit-providers-widget.component.html',
    styleUrls: ['./create-edit-providers-widget.component.scss']
})
export class CreateEditProvidersWidgetComponent implements OnInit {
    phoneMask = Enums.masks.phoneMask;
    isActualLegal = false;
    startDate: Date;
    endDate: Date;
    providersCreateEditForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        phone_house: new FormControl(''),
        phone_mobile: new FormControl('', Validators.required),
        provider_data_contract: new FormGroup({
            c_number: new FormControl('', Validators.required),
            start_date: new FormControl('', Validators.required),
            end_date: new FormControl('', Validators.required),
        }),
        provider_data_address_registration: new FormGroup({
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
        provider_data_address_actual: new FormGroup({
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
        }),
        actual_legal_address: new FormControl(0, Validators.required),
    });

    constructor() {
    }

    ngOnInit() {
    }

    onSaveOrEditProvider() {

    }

    onChangeContractStartDate() {}

    onChangeContractEndDate() {}

}
