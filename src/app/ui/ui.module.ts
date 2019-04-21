import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CardComponent} from './card/card.component';
import {FieldComponent} from './field/field.component';
import {SelectComponent} from './select/select.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [
        CardComponent,
        FieldComponent,
        SelectComponent
    ],
    exports: [
        CardComponent,
        FieldComponent,
        SelectComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class UiModule {
}
