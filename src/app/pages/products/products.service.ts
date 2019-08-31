import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs/index';

import { CustomHttpResponse } from '../../classes/http';
import { GroupCategoryProduct, GroupSubCategoryProduct } from '../../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getGroupsCategoriesProducts(): Observable<CustomHttpResponse<GroupCategoryProduct[]>> {
    return this.http.get<GroupCategoryProduct[]>('/products/groups_categories');
  }

  createGroupCategoryProduct(data): Observable<CustomHttpResponse<GroupCategoryProduct>> {
    return this.http.post<GroupCategoryProduct>('/products/groups_categories', data);
  }

  getGroupsSubCategoriesProducts(params): Observable<CustomHttpResponse<GroupSubCategoryProduct[]>> {
    return this.http.get<GroupSubCategoryProduct[]>('/products/groups_subcategories', {params: params});
  }
}
