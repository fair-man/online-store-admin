import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsViewComponent } from './products-view/products-view.component';
import { CreateEditProductsWidgetComponent } from './components/create-edit-products-widget/create-edit-products-widget.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { UiModule } from '../../ui/ui.module';
import { CreateEditGroupsProductsComponent } from './components/modals/create-edit-groups-products/create-edit-groups-products.component';
import { CreateEditGroupsSubcategoriesProductsComponent } from './components/modals/create-edit-groups-subcategories-products/create-edit-groups-subcategories-products.component';
import { CreateEditCategoriesProductsComponent } from './components/modals/create-edit-categories-products/create-edit-categories-products.component';
import { CharacteristicGroupCreateComponent } from './characteristic-group-create/characteristic-group-create.component';
import { CharacteristicGroupManageComponent } from './characteristic-group-manage/characteristic-group-manage.component';

@NgModule({
  declarations: [
    ProductsViewComponent,
    CreateEditProductsWidgetComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    ProductsListComponent,
    CreateEditGroupsProductsComponent,
    CreateEditGroupsSubcategoriesProductsComponent,
    CreateEditCategoriesProductsComponent,
    CharacteristicGroupCreateComponent,
    CharacteristicGroupManageComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    CreateEditGroupsProductsComponent,
    CreateEditGroupsSubcategoriesProductsComponent,
    CreateEditCategoriesProductsComponent
  ]
})
export class ProductsModule {
}
