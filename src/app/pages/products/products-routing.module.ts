import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PRODUCTS_PATHS } from './products';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CharacteristicGroupCreateComponent } from './characteristic-group-create/characteristic-group-create.component';
import { CharacteristicGroupManageComponent } from './characteristic-group-manage/characteristic-group-manage.component';

const routes: Routes = [
  {path: PRODUCTS_PATHS.PRODUCTS, component: ProductsListComponent, canActivate: [AuthGuard]},
  {path: PRODUCTS_PATHS.PRODUCT_CREATE, component: ProductsCreateComponent, canActivate: [AuthGuard]},
  {path: PRODUCTS_PATHS.PRODUCT_EDIT, component: ProductsEditComponent, canActivate: [AuthGuard]},
  {
    path: PRODUCTS_PATHS.PRODUCT_CHARACTERISTIC_CREATE,
    component: CharacteristicGroupCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: PRODUCTS_PATHS.PRODUCT_CHARACTERISTIC_MANAGE,
    component: CharacteristicGroupManageComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
