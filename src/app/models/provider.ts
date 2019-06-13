import {Address} from './address';
import {Phone} from './phone';
import {Contract} from './contract';

export interface Provider {
    provider_data: {
        id: number,
        name: string,
        email: string,
        created_date: string
    };
    provider_data_contract: Contract;
    provider_data_address_registration: Address;
    provider_data_address_actual: Address;
    provider_data_phones: Phone[];
}
