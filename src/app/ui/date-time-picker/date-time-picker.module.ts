import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    UIDatePickerModule,
    UIDatePickerNumberModule,
    UIDatePickerDateModule,
    UIDatePickerMomentModule,
    UIDatePickerStringModule
} from '../date-picker/date-picker.module';
import {UITimePickerModule} from '../time-picker/time-picker.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UIDatePickerModule,
        UIDatePickerNumberModule,
        UIDatePickerDateModule,
        UIDatePickerMomentModule,
        UIDatePickerStringModule,
        UITimePickerModule
    ],
    exports: [
        UIDatePickerModule,
        UIDatePickerNumberModule,
        UIDatePickerDateModule,
        UIDatePickerMomentModule,
        UIDatePickerStringModule,
        UITimePickerModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class DateTimePickerModule {
}
