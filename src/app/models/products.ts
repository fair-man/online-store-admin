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
    characteristics?: Characteristic[];
    options?: Characteristic[];
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

export interface Product {
    pt_gc_id?: number;
    pt_gs_id?: number;
    pt_c_id: number;
    pt_id: number;
    pt_name: string;
    pt_description: string;
    pt_vendor_code: string;
    pt_price: string;
    pt_count: number;
    pt_created_date: string;
    pt_groups_description_options?: GroupCharacteristics[];
}
