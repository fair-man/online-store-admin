import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {cloneDeep} from 'lodash';

import {Enums} from '../../../../configs/Enums';
import {UsersService} from '../../users.service';
import {Role} from '../../../../models/role';
import {StreetType} from '../../../../models/address';
import {DateTimePickerDateObj} from '../../../../models/moment';
import {MaskReplace} from '../../../../utils/mask-replace';
import {User} from '../../../../models/user';
import {USERS_PATHS} from '../../users';

@Component({
    selector: 'app-create-edit-users-widget',
    templateUrl: './create-edit-users-widget.component.html',
    styleUrls: ['./create-edit-users-widget.component.scss']
})
export class CreateEditUsersWidgetComponent implements OnInit {
    userId: string;
    userData: User;
    moment = require('moment');
    phoneMask = Enums.masks.phoneMask;
    birthDate: Date;
    roleSelected: Role | null;
    rolesList: Role[] | null;
    streetTypeActualSelected: StreetType | null;
    streetTypeRegistrationSelected: StreetType | null;
    streetTypesList: StreetType[] | null;
    base64preview = null;
    selectedFile = null;
    isSelectedFile = false;
    isActualRegistration = true;
    userForm: FormGroup;
    dataLoading = false;

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((routeParams) => {
            const id = routeParams.id;

            this.userId = id;

            if (id) {
                this.getEditUnionData(id);
            } else {
                this.getCreateUnionData();
            }
        });
    }

    getCreateUnionData(): void {
        this.dataLoading = true;
        this.usersService.getCreateUnionData()
            .subscribe(
                (response) => {
                    this.rolesList = response[0]['data'].roles;
                    this.streetTypesList = response[1]['data'].street_types;
                    this.makeCreateUserForm();
                    this.initUiData();
                    this.dataLoading = false;
                },
                (error) => {
                    console.error(error);
                    this.dataLoading = false;
                }
            );
    }

    getEditUnionData(id): void {
        this.dataLoading = true;
        this.usersService.getEditUnionData(id)
            .subscribe(
                (response) => {
                    this.rolesList = response[0]['data'].roles;
                    this.streetTypesList = response[1]['data'].street_types;
                    this.userData = response[2]['data'];
                    this.makeEditUserForm();
                    this.initUiData();
                    this.dataLoading = false;
                },
                (error) => {
                    console.error(error);
                    this.dataLoading = false;
                }
            );
    }

    makeCreateUserForm() {
        this.userForm = new FormGroup({
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
    }

    makeEditUserForm() {
        const userData = this.userData.user_data;
        const registrationAddress = this.userData.user_data_address_registration;
        const actualAddress = this.userData.user_data_address_actual;
        const phones = this.userData.user_data_phones;

        this.userForm = new FormGroup({
            first_name: new FormControl(userData.first_name, Validators.required),
            last_name: new FormControl(userData.last_name, Validators.required),
            patronymic_name: new FormControl(userData.patronymic_name),
            birth_date: new FormControl(userData.birth_date, Validators.required),
            email: new FormControl(userData.email, Validators.required),
            actual_registration_address: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            phone_house: new FormControl(''),
            phone_mobile: new FormControl(phones && phones.length ? phones[0].phone : '', Validators.required),
            user_data_address_registration: new FormGroup({
                region: new FormControl(registrationAddress.region, Validators.required),
                district: new FormControl(registrationAddress.district, Validators.required),
                city: new FormControl(registrationAddress.city),
                street: new FormControl(registrationAddress.street, Validators.required),
                street_type: new FormControl('', Validators.required),
                building: new FormControl(registrationAddress.building),
                house: new FormControl(registrationAddress.house, Validators.required),
                flat: new FormControl(registrationAddress.flat),
                actual: new FormControl(0),
                registration: new FormControl(1),
            }),
            user_data_address_actual: new FormGroup({
                region: new FormControl(actualAddress.region, Validators.required),
                district: new FormControl(actualAddress.district, Validators.required),
                city: new FormControl(actualAddress.city),
                street: new FormControl(actualAddress.street, Validators.required),
                street_type: new FormControl('', Validators.required),
                building: new FormControl(actualAddress.building),
                house: new FormControl(actualAddress.house, Validators.required),
                flat: new FormControl(actualAddress.flat),
                actual: new FormControl(1),
                registration: new FormControl(0),
            })
        });
    }

    initUiData() {
        if (this.userId) {
            const userData = this.userData.user_data;
            const actualAddress = this.userData.user_data_address_actual;
            const registrationAddress = this.userData.user_data_address_registration;

            this.onChangeRole(userData.role);
            this.onChangeActualStreetType(actualAddress.street_type);
            this.onChangeRegistrationStreetType(registrationAddress.street_type);
            this.birthDate = new Date(userData.birth_date);
            this.updateFieldsValidators(userData.actual_registration_address);
            this.subscribeDataChanges();

            if (userData && userData.photo_src) {
                this.isSelectedFile = true;
            }
        } else {
            this.updateFieldsValidators(true);
            this.subscribeDataChanges();
        }
    }

    updateFieldsValidators(isChecked) {
        const validatorsField = [
            'region', 'district', 'city', 'street',
            'street_type', 'building', 'house',
            'flat', 'actual', 'registration'
        ];

        this.isActualRegistration = !!isChecked;

        validatorsField.forEach((field) => {
            if (isChecked) {
                this.userForm.get('user_data_address_actual').get(field).disable();
                this.userForm.get('user_data_address_actual').get(field).clearValidators();
                this.userForm.get('user_data_address_actual').get(field).updateValueAndValidity();
            } else {
                this.userForm.get('user_data_address_actual').get(field).enable();
                this.userForm.get('user_data_address_actual').get(field).updateValueAndValidity();
            }
        });
    }

    subscribeDataChanges() {
        this.userForm.get('actual_registration_address').valueChanges.subscribe((val) => {
            this.updateFieldsValidators(val);
        });
    }

    onChangeRole(roleSelected: Role): void {
        this.roleSelected = roleSelected;
        this.userForm.get('role').setValue(roleSelected.id || null);
    }

    onBlurPhoneMobile() {
        const phoneVal = MaskReplace.replace(this.userForm.value.phone_mobile, 'phone');

        this.userForm.get('phone_mobile').setValue(phoneVal.length < 9 ? '' : phoneVal);
    }

    onChangeBirthDate(date: DateTimePickerDateObj): void {
        const birthDate = date && date.dateMillis ? this.moment(date.dateMillis).format('YYYY-MM-DD HH:mm:ss') : null;
        this.userForm.get('birth_date').setValue(birthDate);
    }

    onChangeAddUserPhoto($event): void {
        const file: File = $event.target.files[0];
        const myReader: FileReader = new FileReader();

        this.selectedFile = file;
        this.isSelectedFile = true;
        myReader.onloadend = (e) => { this.base64preview = myReader.result; };
        myReader.readAsDataURL(file);
    }

    onResetUserPhoto(): void {
        this.selectedFile = null;
        this.base64preview = null;
        this.isSelectedFile = false;
    }

    onChangeRegistrationStreetType(streetType: StreetType): void {
        this.streetTypeRegistrationSelected = streetType;
        this.userForm.get('user_data_address_registration').get('street_type').setValue(streetType.id || null);
    }

    onChangeActualStreetType(streetType: StreetType): void {
        this.streetTypeActualSelected = streetType;
        this.userForm.get('user_data_address_actual').get('street_type').setValue(streetType.id || null);
    }

    onSaveOrEditUser(): void {
        const userForm = this.userForm.value;
        const requestObj = {
            user_data: {
                first_name: userForm.first_name,
                last_name: userForm.last_name,
                patronymic_name: userForm.patronymic_name,
                birth_date: userForm.birth_date,
                email: userForm.email,
                actual_registration_address: +this.isActualRegistration,
                role: userForm.role
            },
            user_data_address_registration: userForm.user_data_address_registration,
            user_data_address_actual: this.isActualRegistration ?
                cloneDeep(userForm.user_data_address_registration) : userForm.user_data_address_actual,
            user_data_phones: [{phone: userForm.phone_mobile, type: 2}]
        };

        if (this.isActualRegistration) {
            requestObj.user_data_address_actual.actual = 1;
            requestObj.user_data_address_actual.registration = 0;
        }

        if (this.userId) {
            requestObj.user_data_address_registration.id = this.userData.user_data_address_registration.id;
            requestObj.user_data_address_actual.id = this.userData.user_data_address_actual.id;
            this.editUser(this.userId, requestObj);
        } else {
            this.createUser(requestObj);
        }
    }

    createUser(requestObj) {
        this.usersService.createUser({user_json: requestObj})
            .subscribe(
                (response) => {
                    this.checkUploadPhotoAvatar(response['data']);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    editUser(userId, requestObj) {
        this.usersService.editUser(userId, {user_json: requestObj})
            .subscribe(
                (response) => {
                    this.checkUploadPhotoAvatar(response['data']);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    checkUploadPhotoAvatar(userData) {
        const userId = userData.user_data.id;

        if (this.selectedFile) {
            this.uploadUserAvatar(userId);
        } else {
            this.redirectToPreviewPage(userId);
        }
    }

    uploadUserAvatar(userId) {
        const formData = new FormData();
        formData.append('file_upload', this.selectedFile);

        this.usersService.userPhotoUpload(userId, formData)
            .subscribe(
                (response) => {
                    this.redirectToPreviewPage(userId);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    redirectToPreviewPage(userId) {
        this.router.navigate(['/', USERS_PATHS.usersList, userId]);
    }
}
