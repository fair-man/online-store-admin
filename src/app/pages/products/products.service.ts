import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {CustomHttpResponse} from '../../classes/http';
import {
    GroupCategoryProduct,
    GroupSubCategoryProduct,
    CategoryProduct,
    GroupCharacteristics
} from '../../models/products';
import {Product} from './products';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {
    }

    getGroupsCategoriesProducts(): Observable<CustomHttpResponse<GroupCategoryProduct[]>> {
        return this.http.get<CustomHttpResponse<GroupCategoryProduct[]>>('/products/groups_categories');
    }

    createGroupCategoryProduct(data): Observable<CustomHttpResponse<GroupCategoryProduct>> {
        return this.http.post<CustomHttpResponse<GroupCategoryProduct>>('/products/groups_categories/create', data);
    }

    updateGroupCategoryProduct(data): Observable<CustomHttpResponse<GroupCategoryProduct>> {
        return this.http.put<CustomHttpResponse<GroupCategoryProduct>>('/products/groups_categories/update', data);
    }

    getGroupsSubCategoriesProducts(params): Observable<CustomHttpResponse<GroupSubCategoryProduct[]>> {
        return this.http.get<CustomHttpResponse<GroupSubCategoryProduct[]>>('/products/groups_subcategories',
            {params: params});
    }

    createGroupSubCategoryProduct(data): Observable<CustomHttpResponse<GroupSubCategoryProduct>> {
        return this.http.post<CustomHttpResponse<GroupSubCategoryProduct>>('/products/groups_subcategories/create', data);
    }

    updateGroupSubCategoryProduct(data): Observable<CustomHttpResponse<GroupSubCategoryProduct>> {
        return this.http.put<CustomHttpResponse<GroupSubCategoryProduct>>('/products/groups_subcategories/update', data);
    }

    getCategories(params): Observable<CustomHttpResponse<CategoryProduct[]>> {
        return this.http.get<CustomHttpResponse<CategoryProduct[]>>(`/products/categories`, {params: params});
    }

    getCategoriesGroups(params): Observable<CustomHttpResponse<GroupCharacteristics[]>> {
        return this.http.get<CustomHttpResponse<GroupCharacteristics[]>>(`/products/categories/groups`, {params: params});
    }

    getCategoriesManage(): Observable<CustomHttpResponse<CategoryProduct[]>> {
        return this.http.get<CustomHttpResponse<CategoryProduct[]>>(`/products/categories/manage`);
    }

    updateCategoryGroupsCharacteristics(data): Observable<CustomHttpResponse<GroupCharacteristics>> {
        return this.http.put<CustomHttpResponse<GroupCharacteristics>>(`/products/categories/manage/update`, data);
    }

    createCategoryProduct(data): Observable<CustomHttpResponse<CategoryProduct>> {
        return this.http.post<CustomHttpResponse<CategoryProduct>>(`/products/categories/create`, data);
    }

    updateCategoryProduct(data): Observable<CustomHttpResponse<CategoryProduct>> {
        return this.http.put<CustomHttpResponse<CategoryProduct>>(`/products/categories/update`, data);
    }

    getCharacteristicsGroups(): Observable<CustomHttpResponse<GroupCharacteristics[]>> {
        return this.http.get<CustomHttpResponse<GroupCharacteristics[]>>(`/products/groups/characteristics`);
    }

    createCharacteristicGroup(data): Observable<CustomHttpResponse<GroupCharacteristics>> {
        return this.http.post<CustomHttpResponse<GroupCharacteristics>>(`/products/groups/characteristics/create`, data);
    }

    editCharacteristicGroup(data): Observable<CustomHttpResponse<GroupCharacteristics>> {
        return this.http.put<CustomHttpResponse<GroupCharacteristics>>(`/products/groups/characteristics/update`, data);
    }

    createProduct(data): Observable<any> {
        return this.http.post(`/products/create`, data);
    }

    searchProducts(params): Observable<CustomHttpResponse<Product[]>> {
        return this.http.get<CustomHttpResponse<Product[]>>(`/products/search`, {params: params});
    }

    getProduct(productId): Observable<any> {
        return this.http.get<any>(`/products/${productId}`);
    }

    invoiceCreate(data): Observable<any> {
        return this.http.post(`/products/invoice/create`, data);
    }
}
