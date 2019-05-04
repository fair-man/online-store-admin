import {StreetType} from './address';
import {Role} from './role';

export interface Phone {
    id: number;
    phone: string;
    type: number;
}

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    patronymic_name: string | null;
    birth_date: string;
    email: string;
    actual_registration_address: number;
    role: Role;
    photo_src: string | null;
}

export interface UserAddress {
    id: number | null;
    region: string;
    district: string;
    city: string;
    street: string;
    street_type: StreetType;
    building: string | null;
    house: string;
    flat: string;
    actual: number;
    registration: number;
}

export interface User {
    csrf_token: string;
    user_data: UserData;
    user_data_address_registration: UserAddress;
    user_data_address_actual: UserAddress;
    user_data_phones: Phone[];
}

export interface Users {
    users: UserData[];
}
