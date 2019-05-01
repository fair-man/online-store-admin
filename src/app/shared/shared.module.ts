import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TopbarComponent} from './topbar/topbar.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule
    ],
    exports: [
        NgbModule,
        TopbarComponent,
        BreadcrumbsComponent
    ],
    declarations: [
        TopbarComponent,
        BreadcrumbsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule {
}
