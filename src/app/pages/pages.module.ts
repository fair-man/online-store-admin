import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {UsersModule} from './users/users.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        HomeModule,
        UsersModule
    ],
    exports: [
        AuthModule,
        HomeModule,
        UsersModule
    ]
})
export class PagesModule {
}
