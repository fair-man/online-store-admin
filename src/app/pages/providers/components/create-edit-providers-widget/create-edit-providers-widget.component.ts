import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {StreetType} from '../../../../models/address';
import {DateTimePickerDateObj} from '../../../../models/moment';
import {MaskReplace} from '../../../../utils/mask-replace';
import {Enums} from '../../../../configs/Enums';
import {ProvidersService} from '../../providers.service';

@Component({
    selector: 'app-create-edit-providers-widget',
    templateUrl: './create-edit-providers-widget.component.html',
    styleUrls: ['./create-edit-providers-widget.component.scss']
})
export class CreateEditProvidersWidgetComponent implements OnInit {
    moment = require('moment');
    providerId: number;
    phoneMask = Enums.masks.phoneMask;
    isActualLegal: boolean;
    contractStartDate = {initDate: null, dateObj: null, options: null};
    contractEndDate = {initDate: null, dateObj: null, options: null};
    streetTypeActualSelected: StreetType | null;
    streetTypeRegistrationSelected: StreetType | null;
    streetTypesList: StreetType[] | null;
    providersCreateEditForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        phone_house: new FormControl(''),
        phone_mobile: new FormControl('', Validators.required),
        provider_data_contract: new FormGroup({
            c_number: new FormControl(null, Validators.required),
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

    constructor(private providersService: ProvidersService) {}

    ngOnInit() {
        this.isActualLegal = false;
        this.getCreateUnionData();
    }

    getCreateUnionData() {
        this.providersService.getCreateUnionData()
            .subscribe(
                (response) => {
                    this.streetTypesList = response[0]['data'].street_types;
                    this.subscribeDataChanges();
                },
                (error) => {}
            );
    }

    subscribeDataChanges() {
        this.providersCreateEditForm.get('actual_legal_address').valueChanges.subscribe((val) => {
            this.updateFieldsValidators(val);
        });
    }

    updateFieldsValidators(isChecked) {
        const validatorsField = [
            'region', 'district', 'city', 'street',
            'street_type', 'building', 'house',
            'flat', 'actual', 'registration'
        ];

        this.isActualLegal = !!isChecked;

        validatorsField.forEach((field) => {
            if (isChecked) {
                this.providersCreateEditForm.get('provider_data_address_actual').get(field).disable();
                this.providersCreateEditForm.get('provider_data_address_actual').get(field).clearValidators();
                this.providersCreateEditForm.get('provider_data_address_actual').get(field).updateValueAndValidity();
            } else {
                this.providersCreateEditForm.get('provider_data_address_actual').get(field).enable();
                if (['region', 'district', 'street', 'street_type', 'house'].indexOf(field) > -1) {
                    this.providersCreateEditForm.get('provider_data_address_actual')
                                                .get(field).setValidators(Validators.required);
                }
                this.providersCreateEditForm.get('provider_data_address_actual').get(field).updateValueAndValidity();
            }
        });
    }

    onChangeContractStartDate(dateObj: DateTimePickerDateObj) {
        const d = dateObj && dateObj.dateMillis ? this.moment(dateObj.dateMillis).format('YYYY-MM-DD HH:mm:ss') : null;
        this.contractStartDate.dateObj = dateObj;

        if (dateObj.dateMillis) {
            this.contractEndDate.options = {minDate: this.moment(dateObj.dateMillis).add(1, 'day')._d};
        }

        this.providersCreateEditForm.get('provider_data_contract').get('start_date').setValue(d);
    }

    onChangeContractEndDate(dateObj: DateTimePickerDateObj) {
        const d = dateObj && dateObj.dateMillis ? this.moment(dateObj.dateMillis).format('YYYY-MM-DD HH:mm:ss') : null;
        this.contractEndDate.dateObj = dateObj;
        this.providersCreateEditForm.get('provider_data_contract').get('end_date').setValue(d);
    }

    onBlurPhoneMobile() {
        const phoneVal = MaskReplace.replace(this.providersCreateEditForm.value.phone_mobile, 'phone');
        this.providersCreateEditForm.get('phone_mobile').setValue(phoneVal.length < 9 ? '' : phoneVal);
    }

    onChangeRegistrationStreetType(streetType: StreetType) {
        this.streetTypeRegistrationSelected = streetType;
        this.providersCreateEditForm.get('provider_data_address_registration')
                                    .get('street_type').setValue(streetType.id || null);
    }

    onChangeActualStreetType(streetType: StreetType) {
        this.streetTypeActualSelected = streetType;
        this.providersCreateEditForm.get('provider_data_address_actual')
                                    .get('street_type').setValue(streetType.id || null);
    }

    onSaveOrEditProvider() {
        const form = this.providersCreateEditForm.value;
        const requestObj = {provider_json: {
            provider_data: {name: form.name, email: form.email},
            provider_data_address_registration: form.provider_data_address_registration,
            provider_data_address_actual: form.provider_data_address_actual,
            provider_data_contract: form.provider_data_contract,
            provider_data_phones: [{phone: form.phone_mobile, type: 2}]
        }};

        if (this.isActualLegal) {
            requestObj.provider_json.provider_data_address_actual = form.provider_data_address_registration;
        }

        this.providersService.createProvider(requestObj)
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
