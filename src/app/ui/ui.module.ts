import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {DateTimePickerModule} from './date-time-picker/date-time-picker.module';
import {UIDatePickerModule} from './date-picker/date-picker.module';
import {UITimePickerModule} from './time-picker/time-picker.module';

import {CardComponent} from './card/card.component';
import {FieldComponent} from './field/field.component';
import {SelectComponent} from './select/select.component';
import {DateTimePickerComponent} from './date-time-picker/date-time-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DateTimePickerModule,
        UIDatePickerModule,
        UITimePickerModule
    ],
    declarations: [
        CardComponent,
        FieldComponent,
        SelectComponent,
        DateTimePickerComponent
    ],
    exports: [
        DateTimePickerModule,
        UIDatePickerModule,
        UITimePickerModule,
        CardComponent,
        FieldComponent,
        SelectComponent,
        DateTimePickerComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class UiModule {
}
