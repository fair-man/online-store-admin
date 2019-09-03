import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs/index';

import { CustomHttpResponse } from '../../classes/http';
import {
  GroupCategoryProduct,
  GroupsCategoryProduct,
  GroupSubCategoryProduct,
  GroupsSubCategoryProduct
} from '../../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getGroupsCategoriesProducts(): Observable<CustomHttpResponse<GroupsCategoryProduct>> {
    return this.http.get<CustomHttpResponse<GroupsCategoryProduct>>('/products/groups_categories');
  }

  createGroupCategoryProduct(data): Observable<CustomHttpResponse<GroupCategoryProduct>> {
    return this.http.post<CustomHttpResponse<GroupCategoryProduct>>('/products/groups_categories/create', data);
  }

  updateGroupCategoryProduct(data): Observable<CustomHttpResponse<GroupCategoryProduct>> {
    return this.http.put<CustomHttpResponse<GroupCategoryProduct>>('/products/groups_categories/update', data);
  }

  getGroupsSubCategoriesProducts(params): Observable<CustomHttpResponse<GroupsSubCategoryProduct>> {
    return this.http.get<CustomHttpResponse<GroupsSubCategoryProduct>>('/products/groups_subcategories', {params: params});
  }
}
