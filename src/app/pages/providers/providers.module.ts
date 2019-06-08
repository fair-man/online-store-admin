import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ProvidersService} from './providers.service';
import {ProvidersRoutingModule} from './providers-routing.module';
import {ProvidersListComponent} from './providers-list/providers-list.component';
import {UiModule} from '../../ui/ui.module';
import {SharedModule} from '../../shared/shared.module';
import { ProvidersCreateComponent } from './providers-create/providers-create.component';
import { CreateEditProvidersWidgetComponent } from './components/create-edit-providers-widget/create-edit-providers-widget.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        SharedModule,
        ProvidersRoutingModule
    ],
    exports: [
        ProvidersListComponent,
        ProvidersCreateComponent,
        CreateEditProvidersWidgetComponent
    ],
    declarations: [
        ProvidersListComponent,
        ProvidersCreateComponent,
        CreateEditProvidersWidgetComponent
    ],
    providers: [
        ProvidersService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProvidersModule {
}
