import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTimePicker } from './time-picker.component';

export { UiTimePicker } from './time-picker.component';
export { NgbTimepickerConfig } from './time-picker.config';
export { NgbTimeStruct } from './ngb-time-struct';
export { NgbTimeAdapter } from './ngb-time-adapter';

@NgModule({
    declarations: [UiTimePicker],
    exports: [UiTimePicker],
    imports: [CommonModule]
})
export class UITimePickerModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: UITimePickerModule};
    }
}
