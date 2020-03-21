import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PROVIDERS_PATHS } from '../../providers';
import { StreetType } from '../../../../models/address';
import { ProviderFull } from '../../../../models/provider';
import { MaskReplace } from '../../../../utils/mask-replace';
import { Enums } from '../../../../configs/Enums';
import { ProvidersService } from '../../providers.service';

import { cloneDeep } from 'lodash';

@Component({
    selector: 'app-create-edit-providers-widget',
    templateUrl: './create-edit-providers-widget.component.html',
    styleUrls: ['./create-edit-providers-widget.component.scss']
})
export class CreateEditProvidersWidgetComponent implements OnInit {
    moment = require('moment');
    loading: boolean;
    providerId: number;
    providerData: ProviderFull;
    phoneMask = Enums.masks.phoneMask;
    isActualLegal: boolean | number;
    streetTypeActualSelected: StreetType | null;
    streetTypeRegistrationSelected: StreetType | null;
    streetTypesList: StreetType[] | null;
    providersCreateEditForm: FormGroup;
    providerError: string | null;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private providersService: ProvidersService) {
    }

    ngOnInit() {
        this.isActualLegal = false;
        this.route.params.subscribe((routeParams) => {
            this.providerId = routeParams.id;

            if (this.providerId) {
                this.getEditUnionData();
            } else {
                this.getCreateUnionData();
            }
        });
    }

    getEditUnionData() {
        this.loading = true;
        this.providersService.getEditUnionData(this.providerId)
            .subscribe(
                (response) => {
                    this.streetTypesList = response[0]['data'].street_types;
                    this.providerData = response[1]['data'];
                    this.createProviderEditForm();
                    this.subscribeDataChanges();
                    this.loading = false;
                }
            );
    }

    createProviderEditForm() {
        const providerData = this.providerData.provider_data;
        const providerDataAddressRegistration = this.providerData.provider_data_address_registration;
        const providerDataAddressActual = this.providerData.provider_data_address_actual;

        this.providersCreateEditForm = new FormGroup({
            name: new FormControl(providerData.name),
            email: new FormControl(providerData.email),
            phone_house: new FormControl(''),
            phone_mobile: new FormControl(this.providerData.provider_data_phones[0].phone, Validators.required),
            provider_data_address_registration: new FormGroup({
                region: new FormControl(providerDataAddressRegistration.region, Validators.required),
                district: new FormControl(providerDataAddressRegistration.district, Validators.required),
                city: new FormControl(providerDataAddressRegistration.city),
                street: new FormControl(providerDataAddressRegistration.street, Validators.required),
                street_type: new FormControl('', Validators.required),
                building: new FormControl(providerDataAddressRegistration.building),
                house: new FormControl(providerDataAddressRegistration.house, Validators.required),
                flat: new FormControl(providerDataAddressRegistration.flat),
                actual: new FormControl(0),
                registration: new FormControl(1)
            }),
            provider_data_address_actual: new FormGroup({
                region: new FormControl(providerDataAddressActual.region, Validators.required),
                district: new FormControl(providerDataAddressActual.district, Validators.required),
                city: new FormControl(providerDataAddressActual.city),
                street: new FormControl(providerDataAddressActual.street, Validators.required),
                street_type: new FormControl('', Validators.required),
                building: new FormControl(providerDataAddressActual.building),
                house: new FormControl(providerDataAddressActual.house, Validators.required),
                flat: new FormControl(providerDataAddressActual.flat),
                actual: new FormControl(1),
                registration: new FormControl(0)
            }),
            actual_legal_address: new FormControl(0, Validators.required),
        });

        this.initUiData();
    }

    initUiData() {
        this.onChangeRegistrationStreetType(this.providerData.provider_data_address_registration.street_type);
        this.onChangeActualStreetType(this.providerData.provider_data_address_actual.street_type);
        this.isActualLegal = this.providerData.provider_data.actual_registration_address;
    }

    getCreateUnionData() {
        this.loading = true;
        this.providersService.getCreateUnionData()
            .subscribe(
                (response) => {
                    this.streetTypesList = response[0]['data'].street_types;
                    this.createProviderCreateForm();
                    this.subscribeDataChanges();
                    this.loading = false;
                },
                (error) => {
                }
            );
    }

    createProviderCreateForm() {
        this.providersCreateEditForm = new FormGroup({
            name: new FormControl(''),
            email: new FormControl(''),
            phone_house: new FormControl(''),
            phone_mobile: new FormControl('', Validators.required),
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
        const requestObj = {
            provider_json: {
                provider_data: {
                    id: +this.providerId || null,
                    name: form.name,
                    email: form.email,
                    status: 1,
                    actual_registration_address: +this.isActualLegal
                },
                provider_data_address_registration: form.provider_data_address_registration,
                provider_data_address_actual: form.provider_data_address_actual,
                provider_data_phones: [{phone: form.phone_mobile, type: 2}]
            }
        };

        if (this.isActualLegal) {
            requestObj.provider_json.provider_data_address_actual = cloneDeep(form.provider_data_address_registration);
            requestObj.provider_json.provider_data_address_actual.actual = 1;
            requestObj.provider_json.provider_data_address_actual.registration = 0;
        }

        if (this.providerId) {
            requestObj.provider_json.provider_data_address_registration.id =
                this.providerData.provider_data_address_registration.id;
            requestObj.provider_json.provider_data_address_actual.id =
                this.providerData.provider_data_address_actual.id;
            this.editProvider(requestObj);
        } else {
            this.createProvider(requestObj);
        }
    }

    createProvider(data) {
        this.providersService.createProvider(data)
            .subscribe(
                (response) => {
                    this.router.navigate([PROVIDERS_PATHS.providersList]);
                },
                (error) => {
                    this.providerError = 'Ошибка при создании поставщика.';
                }
            );
    }

    editProvider(data) {
        this.providersService.editProvider(this.providerId, data)
            .subscribe(
                (response) => {
                    this.router.navigate([PROVIDERS_PATHS.providersList]);
                },
                (error) => {
                    this.providerError = 'Ошибка при обновлении поставщика.';
                }
            );
    }
}
