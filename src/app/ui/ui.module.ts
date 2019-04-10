import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {FieldComponent} from './field/field.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CardComponent,
        FieldComponent
    ],
    exports: [
        CardComponent,
        FieldComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class UiModule {
}
