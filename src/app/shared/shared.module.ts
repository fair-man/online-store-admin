import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        NgbModule,
        TopbarComponent
    ],
    declarations: [
        TopbarComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule {
}
