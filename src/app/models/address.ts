export interface StreetType {
    id: number;
    name: string;
}

export interface StreetTypes {
    street_types: StreetType[];
}

export interface Address {
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
