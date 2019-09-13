import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { CustomHttpResponse } from '../../classes/http';
import {
  GroupCategoryProduct, GroupSubCategoryProduct, CategoryProduct,
  CharacteristicsGroup
} from '../../models/products';

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

  getCategoriesManage(): Observable<any> {
    return this.http.get<any>(`/products/categories/manage`);
  }

  updateCategoryGroupsCharacteristics(data): Observable<any> {
    return this.http.put<any>(`/products/categories/manage/update`, data);
  }

  createCategoryProduct(data): Observable<CustomHttpResponse<CategoryProduct>> {
    return this.http.post<CustomHttpResponse<CategoryProduct>>(`/products/categories/create`, data);
  }

  updateCategoryProduct(data): Observable<CustomHttpResponse<CategoryProduct>> {
    return this.http.put<CustomHttpResponse<CategoryProduct>>(`/products/categories/update`, data);
  }

  getCharacteristicsGroups(data): Observable<any> {
    return this.http.get<any>(`/products/groups/characteristics`);
  }

  createCharacteristicGroup(data): Observable<CustomHttpResponse<CharacteristicsGroup>> {
    return this.http.post<CustomHttpResponse<CharacteristicsGroup>>(`/products/groups/characteristics/create`, data);
  }

  editCharacteristicGroup(data): Observable<CustomHttpResponse<CharacteristicsGroup>> {
    return this.http.put<CustomHttpResponse<CharacteristicsGroup>>(`/products/groups/characteristics/update`, data);
  }
}
