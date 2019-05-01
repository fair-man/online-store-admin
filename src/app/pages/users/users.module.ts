import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UiModule} from '../../ui/ui.module';
import {SharedModule} from '../../shared/shared.module';
import {UsersRoutingModule} from './users-routing.module';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersCreateComponent} from './users-create/users-create.component';
import {UsersEditComponent} from './users-edit/users-edit.component';

import {UsersService} from './users.service';
import {CreateEditUsersWidgetComponent} from './component/create-edit-users-widget/create-edit-users-widget.component';
import {UsersViewComponent} from './users-view/users-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        UiModule,
        SharedModule
    ],
    declarations: [
        UsersListComponent,
        UsersCreateComponent,
        UsersEditComponent,
        CreateEditUsersWidgetComponent,
        UsersViewComponent
    ],
    exports: [
        UsersListComponent,
        UsersCreateComponent,
        UsersEditComponent,
        UsersViewComponent
    ],
    providers: [
        UsersService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class UsersModule {
}
