export interface Product {
    pt_id: number;
    pt_c_id: number;
    pt_name: string;
    pt_description: string;
    pt_vendor_code: string;
    pt_price: string;
    pt_count: number;
    pt_created_date: string;
}

export const PRODUCTS_PATHS = {
    PRODUCTS: 'products',
    PRODUCT_CREATE: 'products/create',
    PRODUCT_EDIT: 'products/edit/:id',
    PRODUCT_CHARACTERISTIC_CREATE: 'products/characteristic/create',
    PRODUCT_CHARACTERISTIC_MANAGE: 'products/characteristic/manage',
};
