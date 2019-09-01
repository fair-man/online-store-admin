import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsViewComponent } from './products-view/products-view.component';
import { CreateEditProductsWidgetComponent } from './components/create-edit-products-widget/create-edit-products-widget.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { UiModule } from '../../ui/ui.module';
import { CreateEditGroupsProductsComponent } from './components/modals/create-edit-groups-products/create-edit-groups-products.component';

@NgModule({
  declarations: [
    ProductsViewComponent,
    CreateEditProductsWidgetComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    ProductsListComponent,
    CreateEditGroupsProductsComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    ProductsRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    CreateEditGroupsProductsComponent
  ]
})
export class ProductsModule {
}
