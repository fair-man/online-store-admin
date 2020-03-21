import { Address } from './address';
import { Role } from './role';
import { Phone } from './phone';

export interface User {
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

export interface User {
    csrf_token: string;
    user_data: User;
    user_data_address_registration: Address;
    user_data_address_actual: Address;
    user_data_phones: Phone[];
}

export interface Users {
    users: User[];
}
