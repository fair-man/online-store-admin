export interface Role {
    id: number;
    role_name: string;
}

export interface RolesHttpInterface {
    roles: Role[];
}
