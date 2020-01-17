export interface GroupCategoryProduct {
    id: number;
    name: string;
    description: string | null;
}

export interface GroupSubCategoryProduct {
    id: number;
    group_category_id: number;
    name: string;
    description: string | null;
}

export interface CategoryProduct {
    id: number;
    name: string;
    description: string | null;
    group_subcategory_id: number;
    groups_characteristics?: any;
}

export interface GroupCharacteristics {
    id: number;
    name: string;
    description: string | null;
    is_main: number;
    sort_order: number;
    characteristics?: any;
    isChecked?: boolean;
}

export interface Characteristic {
    id?: number;
    fakeId?: number;
    name: string;
    value: string;
    description: string | null;
    sort_order: number;
}
