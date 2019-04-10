import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './auth.service';
import {AuthComponent} from './auth/auth.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
    ],
    declarations: [
        AuthComponent
    ],
    exports: [
        AuthComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {
}
