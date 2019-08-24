import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {UsersModule} from './users/users.module';
import {ProvidersModule} from './providers/providers.module';
import {ProductsModule} from './products/products.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        HomeModule,
        UsersModule,
        ProvidersModule,
        ProductsModule
    ],
    exports: [
        AuthModule,
        HomeModule,
        UsersModule,
        ProvidersModule,
        ProductsModule
    ]
})
export class PagesModule {
}
